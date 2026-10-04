// @ts-nocheck
//
// This is a direct, deliberately-imperative port of the standalone
// box-computer.html prototype: a canvas text-mode terminal, a synthesized
// audio engine, and a small window manager, none of which map cleanly
// onto declarative React state without a much larger rewrite. React's
// job here is just the mount boundary - it renders the static markup
// once (see box-computer.tsx) and hands the root node to this function,
// which owns everything inside it exactly like the original page did.
// The one thing a permanent standalone page never had to worry about -
// a real unmount - is why every persistent timer/listener below is
// tracked in cleanupFns and torn down in the returned cleanup().
//
// @ts-nocheck because this file is ~1300 lines of untyped DOM
// manipulation carried over verbatim from the prototype; retrofitting
// strict types throughout is a real follow-up, not a rewrite worth
// rushing alongside a straight functional port.

// Personal content lives under `portfolio_data/` and `data/` and is imported
// at module-init time so editing those files propagates without touching the
// engine. The `IDENTITY` block and `mdInline()` helper below are the only
// adapters; everything else is composed inside `initBoxComputer` itself.
import homeJson from '@/portfolio_data/content/home.json';
import aboutRaw from '@/portfolio_data/content/about';
import achievements from '@/portfolio_data/content/achievements.json';
import contact from '@/portfolio_data/content/contact.json';
import education from '@/portfolio_data/content/education.json';
import experience from '@/portfolio_data/content/experience.json';
import skills from '@/portfolio_data/content/skills.json';
import linksMap from '@/portfolio_data/links.json';
import { getSortedProjects } from '@/portfolio_data/projectsData';

// ponytail: identity literal - the only "who am I" hardcode the engine carries.
// Everything else (name, summary, email, github, projects, skills) flows from
// the imports above; this one is infra (deploy target), not portfolio content.
var BRAND_HOST = 'fedxd.net';

// ponytail: minimal md→html for about content. Handles exactly the syntax used in
// `portfolio_data/content/about` (## / ###, **bold**, - bullets, > quotes)
// and ignores everything else. Larger feature surface = bigger surface area
// for parsing bugs; the file is small and stable, so this is enough.
function mdInline(text) {
  var lines = String(text || '').split(/\r?\n/);
  var out = [];
  var listOpen = false;
  for (var i = 0; i < lines.length; i++) {
    var raw = lines[i];
    var line = raw
      .replace(/^###\s+(.+)$/, '<h3>$1</h3>')
      .replace(/^##\s+(.+)$/, '<h4>$1</h4>')
      .replace(/^>\s*(.*)$/, '<i>$1</i>')
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    if (/^\s*-\s+/.test(raw)) {
      if (!listOpen) { out.push('<ul>'); listOpen = true; }
      out.push('<li>' + line.replace(/^\s*-\s+/, '') + '</li>');
    } else {
      if (listOpen) { out.push('</ul>'); listOpen = false; }
      if (line.trim() === '') {
        // paragraph break (caller can decide if they want one)
      } else {
        out.push(line);
      }
    }
  }
  if (listOpen) out.push('</ul>');
  return out.join('\n');
}

var IDENTITY = {
  name: homeJson.header.name,                                                            // "Kazim Abbas"
  handle: String(homeJson.header.name || '').split(/\s+/)[0].toLowerCase() || 'kazim',  // first token, lowercased
  host: BRAND_HOST,                                                                      // fedxd.net
  email: (contact.contactInfo.find(function (c) { return /email/i.test(c.title); }) || {}).value || 'kazim@fedxd.net',
  github: (contact.contactInfo.find(function (c) { return /github/i.test(c.title); }) || {}).value || 'https://github.com/KazimFedxD',
  summary: homeJson.summary,
  typing: homeJson.typingAnimation.sequences.map(function (s) { return s.text; }),
  statsLine: homeJson.stats.map(function (s) { return s.value + ' ' + s.label; }).join(' · '),
  location: (education.formalEducation[0] || {}).location || 'Karachi, Pakistan',
  achievementsLine: achievements.stats.map(function (s) { return s.value + ' ' + s.label; }).join(' · '),
  responseTime: contact.responseTime,
  contactTags: contact.tags,
};

export function initBoxComputer(root: HTMLElement) {
  var cleanupFns = [];
  function onCleanup(fn){ cleanupFns.push(fn); }
  // Every listener directly owned by this function (not per-window/per-app
  // ones, which die naturally with their own DOM node) is registered with
  // this signal, so a single abort() on unmount removes all of them without
  // having to hand-track each one. This matters more than it would on a
  // permanent page: React Strict Mode in dev deliberately runs an effect's
  // setup -> cleanup -> setup again on mount specifically to catch gaps
  // exactly like this one - without it, the second setup call attaches a
  // second, independent copy of every listener (dicon clicks, the desktop
  // click-to-focus handler, etc.) with its own separate `openApps` closure,
  // so a single click on an icon silently opened two windows instead of one.
  var abortController = new AbortController();
  var signal = abortController.signal;
  function runCleanup(){
    abortController.abort();
    cleanupFns.forEach(function(fn){ try { fn(); } catch (e) {} });
    cleanupFns = [];
  }

  // This used to hard-block anything under 900px behind a "come back on
  // desktop" message - which meant the whole site (this sim IS the whole
  // site now) gave every phone visitor a dead end. isSmall() below already
  // drives real responsive behavior (fullscreen windows instead of floating
  // ones, no drag/resize) - it just never used to get a chance to run.
  var canvas = root.querySelector('#crtCanvas');
  var input = root.querySelector('#cmd');
  var screenEl = root.querySelector('#screen');
  var desktop = root.querySelector('#desktop');
  var windowsEl = root.querySelector('#windows');
  var tasklist = root.querySelector('#tasklist');
  var clockEl = root.querySelector('#clock');
  var msbTimeEl = root.querySelector('#msbTime');
  var rootmenu = root.querySelector('#rootmenu');
  var menubtn = root.querySelector('#menubtn');
  var pwr = root.querySelector('#pwr');
  var pwrring = root.querySelector('#pwrring');
  var shutdownBtn = root.querySelector('#shutdownBtn');

  var powered = false;
  var bootTime = null;
  var mode = 'boot'; // boot | shell | desktop

  function prefersReduced(){ return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function wait(ms){ return new Promise(function(res){ setTimeout(res, prefersReduced() ? Math.min(ms,20) : ms); }); }
  function isSmall(){ return window.innerWidth < 700; }

  /* ================================================================
     SYNTHESIZED AUDIO
     ================================================================ */
  var actx = null, flybackOsc, flybackGain, humOsc, humGain, fanSource, fanFilter, fanGain, fanLfo;
  function audioCtx(){ if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); return actx; }
  // browsers sometimes auto-suspend an AudioContext (backgrounded tab,
  // power saving, etc) - when that happens every playing node goes
  // silent, including the "constant" fan hum, with no event telling us.
  // Poll for it and resume immediately; this is the actual fix for the
  // fan "sometimes just stopping."
  var audioWatchdog = setInterval(function(){
    if (actx && actx.state === 'suspended') actx.resume().catch(function(){});
  }, 1500);
  onCleanup(function(){ clearInterval(audioWatchdog); });
  function onVisibilityChange(){
    if (!document.hidden && actx && actx.state === 'suspended') actx.resume().catch(function(){});
  }
  document.addEventListener('visibilitychange', onVisibilityChange);
  onCleanup(function(){ document.removeEventListener('visibilitychange', onVisibilityChange); });
  onCleanup(function(){ if (actx) { actx.close().catch(function(){}); } });
  function tone(freq, duration, type, startTime, gainVal){
    var c = audioCtx();
    var osc = c.createOscillator(), gain = c.createGain();
    osc.type = type || 'square';
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(gainVal || 0.12, startTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain).connect(c.destination);
    osc.start(startTime); osc.stop(startTime + duration);
  }
  function playSwitchClick(){
    try {
      var c = audioCtx(), t = c.currentTime;
      var n = Math.floor(c.sampleRate * 0.012);
      var buf = c.createBuffer(1, n, c.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
      var src = c.createBufferSource(); src.buffer = buf;
      var hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1800;
      var gain = c.createGain(); gain.gain.value = 0.22;
      src.connect(hp).connect(gain).connect(c.destination);
      src.start(t);
      tone(2400, 0.02, 'square', t, 0.05);
    } catch(e) {}
  }
  function playDegauss(){
    try {
      var c = audioCtx(), t = c.currentTime;
      var osc = c.createOscillator(), gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, t);
      osc.frequency.exponentialRampToValueAtTime(50, t + 0.5);
      gain.gain.setValueAtTime(0.17, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      osc.connect(gain).connect(c.destination);
      osc.start(t); osc.stop(t + 0.6);
    } catch(e) {}
  }
  function playCollapseThump(){
    try {
      var c = audioCtx(), t = c.currentTime;
      var osc = c.createOscillator(), gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.28);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.connect(gain).connect(c.destination);
      osc.start(t); osc.stop(t + 0.3);
    } catch(e) {}
  }
  function startAmbient(){
    try {
      var c = audioCtx();
      flybackOsc = c.createOscillator(); flybackGain = c.createGain();
      flybackOsc.type = 'sine'; flybackOsc.frequency.value = 15734;
      flybackGain.gain.setValueAtTime(0, c.currentTime);
      flybackGain.gain.linearRampToValueAtTime(0.006, c.currentTime + 0.3);
      flybackOsc.connect(flybackGain).connect(c.destination); flybackOsc.start();

      humOsc = c.createOscillator(); humGain = c.createGain();
      humOsc.type = 'sine'; humOsc.frequency.value = 60;
      humGain.gain.setValueAtTime(0, c.currentTime);
      humGain.gain.linearRampToValueAtTime(0.01, c.currentTime + 0.3);
      humOsc.connect(humGain).connect(c.destination); humOsc.start();

      // old machines ran hot - a constant filtered-noise fan/PSU whir,
      // looped from a short noise buffer, with a slow LFO on the filter
      // so it breathes slightly instead of droning as a static tone
      var bufSize = c.sampleRate * 2;
      var buf = c.createBuffer(1, bufSize, c.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
      fanSource = c.createBufferSource(); fanSource.buffer = buf; fanSource.loop = true;
      fanFilter = c.createBiquadFilter(); fanFilter.type = 'bandpass';
      fanFilter.frequency.value = 220; fanFilter.Q.value = 0.8;
      fanGain = c.createGain();
      fanGain.gain.setValueAtTime(0, c.currentTime);
      fanGain.gain.linearRampToValueAtTime(0.035, c.currentTime + 0.8);
      fanLfo = c.createOscillator(); fanLfo.type = 'sine'; fanLfo.frequency.value = 0.25;
      var fanLfoGain = c.createGain(); fanLfoGain.gain.value = 25;
      fanLfo.connect(fanLfoGain).connect(fanFilter.frequency);
      fanSource.connect(fanFilter).connect(fanGain).connect(c.destination);
      fanSource.start(); fanLfo.start();
    } catch(e) {}
  }
  function stopAmbient(){
    try {
      var c = audioCtx(), t = c.currentTime;
      if (flybackGain) { flybackGain.gain.linearRampToValueAtTime(0, t + 0.15); flybackOsc.stop(t + 0.2); }
      if (humGain) { humGain.gain.linearRampToValueAtTime(0, t + 0.15); humOsc.stop(t + 0.2); }
      if (fanGain) {
        fanGain.gain.linearRampToValueAtTime(0, t + 0.3);
        fanSource.stop(t + 0.35); fanLfo.stop(t + 0.35);
      }
    } catch(e) {}
  }
  function playPostBeep(){ try { tone(825, 0.14, 'square', audioCtx().currentTime, 0.11); } catch(e) {} }
  function playKeyClick(){ try { tone(1300 + Math.random()*400, 0.018, 'square', audioCtx().currentTime, 0.018); } catch(e) {} }
  function playDriveHum(duration){
    try {
      var c = audioCtx(), t = c.currentTime;
      var osc = c.createOscillator(), lfo = c.createOscillator(), lfoGain = c.createGain(), gain = c.createGain();
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(78, t);
      lfo.frequency.value = 5.5; lfoGain.gain.value = 5;
      lfo.connect(lfoGain).connect(osc.frequency);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.045, t + 0.2);
      gain.gain.setValueAtTime(0.045, t + duration - 0.25);
      gain.gain.linearRampToValueAtTime(0, t + duration);
      osc.connect(gain).connect(c.destination);
      lfo.start(t); osc.start(t); lfo.stop(t + duration); osc.stop(t + duration);
    } catch(e) {}
  }
  function playSeekClick(){
    try {
      var c = audioCtx(), t = c.currentTime;
      var n = Math.floor(c.sampleRate * 0.018);
      var buf = c.createBuffer(1, n, c.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      var src = c.createBufferSource(); src.buffer = buf;
      var gain = c.createGain(); gain.gain.value = 0.05;
      src.connect(gain).connect(c.destination);
      src.start(t);
    } catch(e) {}
  }
  // ascending "system ready" chime for startx - original notes, not any real OS's melody
  function playStartxChime(){
    try {
      var c = audioCtx(), t = c.currentTime;
      [392, 494, 587, 784].forEach(function(f, i){ tone(f, 0.22, 'triangle', t + i * 0.11, 0.08); });
    } catch(e) {}
  }

  /* ================================================================
     REUSABLE PIXELATED TEXT-MODE TERMINAL FACTORY
     ================================================================ */
  var PRIMARY = '#3cf28a', DIM = '#1f7a4a', RED = '#3cf28a', WHITE = '#f5e3e0', AMBER = '#e8b23d';

  function createTerm(canvasEl, containerEl, opts){
    opts = opts || {};
    var cctx = canvasEl.getContext('2d');
    var PXSCALE = opts.pxscale || 3;
    var COLS = opts.cols || 78;
    var cellW = 0, cellH = 0, fontPx = 0;
    var lines = [];
    var showPrompt = false;
    var promptLabel = opts.prompt || 'rm> ';
    var cursorOn = true;
    var inputEl = opts.inputEl || null;
    var localBuffer = '';
    var scrollOffset = 0;
    var lastMaxRows = 1, lastVisualLen = 0;
    var cmdHistory = [], histIndex = 0;

    function resize(){
      var rect = containerEl.getBoundingClientRect();
      // getBoundingClientRect forces a synchronous layout, so this is
      // never stale - but the very first resize() call (fired from
      // initBoxComputer's mount effect) can genuinely land before the
      // container has a real box yet, especially in dev where extra
      // render passes/HMR add timing noise. Math.max(1, ...) below stopped
      // that from crashing, but a 1px-tall canvas buffer then just stuck
      // forever, since nothing else ever re-triggered a recompute - the
      // ResizeObserver below is what makes this self-healing instead.
      var w = Math.max(1, Math.round(rect.width / PXSCALE));
      var h = Math.max(1, Math.round(rect.height / PXSCALE));
      canvasEl.width = w; canvasEl.height = h;
      fontPx = Math.max(6, Math.floor(w / COLS * 1.62));
      cellW = w / COLS; cellH = fontPx * 1.55;
      cctx.imageSmoothingEnabled = false;
      render();
    }
    var resizeObserver = new ResizeObserver(function(){ resize(); });
    resizeObserver.observe(containerEl);
    function curValue(){ return inputEl ? inputEl.value : localBuffer; }
    function wrapText(text, maxLen){
      // canvas fillText never wraps on its own - a long line just runs
      // off the edge. Real terminals hard-wrap onto a new row at the
      // column width, so that's what this replicates.
      if (text.length <= maxLen) return [text];
      var out = [];
      for (var i = 0; i < text.length; i += maxLen) out.push(text.slice(i, i + maxLen));
      return out;
    }
    function render(){
      cctx.imageSmoothingEnabled = false;
      cctx.fillStyle = '#080510';
      cctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
      cctx.font = fontPx + 'px Consolas, monospace';
      cctx.textBaseline = 'top';
      var padX = cellW * 0.9, padY = cellH * 0.5;
      var charW = cctx.measureText('M').width || cellW || 1;
      var maxChars = Math.max(10, Math.floor((canvasEl.width - padX * 1.6) / charW));

      var visualRows = [];
      for (var li = 0; li < lines.length; li++) {
        var parts = wrapText(lines[li].text, maxChars);
        for (var pi = 0; pi < parts.length; pi++) visualRows.push({ text: parts[pi], color: lines[li].color });
      }

      var promptRows = [], cursorRowIdx = 0, cursorX = padX;
      if (showPrompt) {
        var val = curValue();
        var full = promptLabel + val;
        var wrappedFull = wrapText(full, maxChars);
        for (var wi = 0; wi < wrappedFull.length; wi++) promptRows.push(wrappedFull[wi]);
        cursorRowIdx = wrappedFull.length - 1;
        cursorX = padX + cctx.measureText(wrappedFull[wrappedFull.length - 1]).width;
      }

      var maxRows = Math.max(1, Math.floor((canvasEl.height - padY * 2) / cellH) - promptRows.length);
      lastMaxRows = maxRows; lastVisualLen = visualRows.length;
      var maxOffset = Math.max(0, visualRows.length - maxRows);
      if (scrollOffset > maxOffset) scrollOffset = maxOffset;
      var end = visualRows.length - scrollOffset;
      var visible = visualRows.slice(Math.max(0, end - maxRows), end);
      for (var i = 0; i < visible.length; i++) {
        cctx.fillStyle = visible[i].color || PRIMARY;
        cctx.fillText(visible[i].text, padX, padY + i * cellH);
      }

      if (showPrompt && scrollOffset === 0) {
        var baseRow = visible.length;
        for (var pr = 0; pr < promptRows.length; pr++) {
          var rowText = promptRows[pr];
          var y = padY + (baseRow + pr) * cellH;
          if (pr === 0) {
            var labelPart = rowText.slice(0, Math.min(rowText.length, promptLabel.length));
            var restPart = rowText.slice(labelPart.length);
            cctx.fillStyle = RED; cctx.fillText(labelPart, padX, y);
            cctx.fillStyle = PRIMARY; cctx.fillText(restPart, padX + cctx.measureText(labelPart).width, y);
          } else {
            cctx.fillStyle = PRIMARY; cctx.fillText(rowText, padX, y);
          }
        }
        if (cursorOn) {
          // sized from the *actual* glyph metrics, not the assumed cell
          // grid - that mismatch was making the cursor block huge
          var curH = fontPx * 1.12;
          cctx.fillStyle = PRIMARY;
          cctx.fillRect(cursorX, padY + (baseRow + cursorRowIdx) * cellH + fontPx * 0.06, charW * 0.82, curH);
        }
      }
    }
    function addLine(text, color){ lines.push({ text: text, color: color }); scrollOffset = 0; render(); }
    function replaceLastLine(text, color){ lines[lines.length - 1] = { text: text, color: color }; render(); }
    function clearLines(){ lines = []; scrollOffset = 0; render(); }
    var blinkTimer = setInterval(function(){ cursorOn = !cursorOn; if (showPrompt) render(); }, 530);

    // scrollback: mouse wheel walks scrollOffset back through visualRows;
    // clamped against the bounds render() computed on its last pass
    // scoped to the canvas itself, not containerEl - for the main terminal
    // containerEl is the whole #screen, shared by every window and the
    // desktop, so listening there ate scroll input for the entire sim
    function onWheel(e){
      e.preventDefault();
      var maxOffset = Math.max(0, lastVisualLen - lastMaxRows);
      var rowsPerNotch = 3;
      scrollOffset = Math.min(maxOffset, Math.max(0, scrollOffset + (e.deltaY < 0 ? rowsPerNotch : -rowsPerNotch)));
      render();
    }
    canvasEl.addEventListener('wheel', onWheel, { passive: false });

    function historyPush(cmd){
      if (!cmd) return;
      if (cmdHistory[cmdHistory.length - 1] !== cmd) cmdHistory.push(cmd);
      histIndex = cmdHistory.length;
    }
    function historyUp(){
      if (!cmdHistory.length) return;
      histIndex = Math.max(0, histIndex - 1);
      var v = cmdHistory[histIndex] || '';
      if (inputEl) inputEl.value = v; else localBuffer = v;
      render();
    }
    function historyDown(){
      if (!cmdHistory.length) return;
      histIndex = Math.min(cmdHistory.length, histIndex + 1);
      var v = histIndex < cmdHistory.length ? cmdHistory[histIndex] : '';
      if (inputEl) inputEl.value = v; else localBuffer = v;
      render();
    }

    // interactive mode: while set, the next line the user submits goes to
    // this function instead of runShellCommand - used for small multi-turn
    // terminal games (e.g. `guess`) without needing a whole separate shell
    // mode. Handler returns true to keep going, false/undefined to exit.
    var activeGame = null;

    return {
      resize: resize, render: render, addLine: addLine, replaceLastLine: replaceLastLine, clearLines: clearLines,
      setPrompt: function(p){ promptLabel = p; },
      getLabel: function(){ return promptLabel; },
      historyPush: historyPush, historyUp: historyUp, historyDown: historyDown,
      showPrompt: function(v){ showPrompt = v; render(); },
      isPromptShown: function(){ return showPrompt; },
      typeLocal: function(v){ localBuffer = v; render(); },
      getLocal: function(){ return localBuffer; },
      getGame: function(){ return activeGame; },
      setGame: function(fn){ activeGame = fn; },
      // the cursor-blink interval outlives its DOM element otherwise -
      // every terminal instance (main + each opened Terminal window) needs
      // this called when it goes away, not just when the whole sim unmounts
      destroy: function(){ clearInterval(blinkTimer); canvasEl.removeEventListener('wheel', onWheel); resizeObserver.disconnect(); },
    };
  }

  var main = createTerm(canvas, screenEl, { prompt: 'login: ', inputEl: input });

  /* ================================================================
     BIOS + LINUX BOOT
     Every phase is tagged with the session id that was active when it
     started. `alive(s)` is checked after every await; power off (or a
     fresh power on) bumps `session`, so a stale chain notices on its
     very next step and stops instead of continuing to write to a
     screen that's supposed to be off.
     ================================================================ */
  var session = 0;
  function alive(s){ return powered && session === s; }

  async function biosPhase(s){
    main.addLine('fedxd.net BIOS v4.51PG (C) FEDXD SYSTEMS 2024-2026', RED);
    main.addLine('', DIM);
    await wait(350); if (!alive(s)) return;
    main.addLine('CPU: RM386SX-40  Cache: 64KB', DIM);
    await wait(260); if (!alive(s)) return;
    main.addLine('Press DEL to enter SETUP', DIM);
    await wait(700); if (!alive(s)) return;
    main.addLine('', DIM);
    main.addLine('Memory Test :     0K OK', WHITE);
    await wait(200); if (!alive(s)) return;
    var mem = 0, target = 65536;
    while (mem < target) {
      mem = Math.min(target, mem + 1400 + Math.floor(Math.random() * 2600));
      main.replaceLastLine('Memory Test : ' + mem + 'K OK', WHITE);
      await wait(85); if (!alive(s)) return;
    }
    playPostBeep();
    await wait(350); if (!alive(s)) return;
    main.addLine('640K Base Memory, ' + (target - 640) + 'K Extended Memory', DIM);
    await wait(550); if (!alive(s)) return;
    main.addLine('', DIM);
    main.addLine('Detecting IDE drives ...', DIM);
    if (!prefersReduced()) playDriveHum(1.8);
    await wait(500); if (!alive(s)) return; if (!prefersReduced()) playSeekClick();
    await wait(500); if (!alive(s)) return; if (!prefersReduced()) playSeekClick();
    await wait(700); if (!alive(s)) return;
    main.addLine('  Primary Master  : FX-QUANTUM LPS40S  40MB', PRIMARY);
    await wait(300); if (!alive(s)) return;
    main.addLine('  Primary Slave   : None', DIM);
    await wait(900); if (!alive(s)) return;
    main.addLine('', DIM);
    main.addLine('Booting from hard disk...', WHITE);
    await wait(900); if (!alive(s)) return;
    main.clearLines();
    await kernelPhase(s);
  }

  var KERNEL_LINES = [
    '[    0.000000] Linux version 5.4.0-rm (' + IDENTITY.handle + '@' + IDENTITY.host + ')',
    '[    0.041233] Command line: root=/dev/hda1 ro quiet',
    '[    0.183921] CPU0: RM386SX-40 detected, 65536K memory',
    '[    0.291832] Console: colour VGA+ 80x25',
    '[    0.402011] pci 0000:00:00.0: bridge configuration',
    '[    0.588213] ide0: FX-QUANTUM LPS40S, 40MB',
    '[    0.812233] EXT2-fs: mounted filesystem read-write',
    '[    1.203441] Freeing unused kernel memory: 640K',
    '[    1.402881] Adding 65536K swap',
    '[    1.611200] random: crng init done',
    '[    1.844931] Welcome to FX-Linux 5.4.0-rm',
  ];
  async function kernelPhase(s){
    for (var i = 0; i < KERNEL_LINES.length; i++) {
      main.addLine(KERNEL_LINES[i], i === KERNEL_LINES.length - 1 ? PRIMARY : DIM);
      await wait(120 + Math.random() * 90); if (!alive(s)) return;
    }
    await wait(500); if (!alive(s)) return;
    main.addLine('', DIM);
    await loginPhase(s);
  }

  async function loginPhase(s){
    mode = 'login';
    main.addLine('fedxd.net login: ' + IDENTITY.handle, WHITE);
    await wait(500); if (!alive(s)) return;
    main.addLine('Password: ********', DIM);
    await wait(650); if (!alive(s)) return;
    main.addLine('Last login: Mon Aug 10 22:14:03 on tty1', DIM);
    main.addLine('', DIM);
    main.addLine(IDENTITY.name + " — type 'startx' to launch the desktop, or 'help' for commands.", DIM);
    main.addLine('', DIM);
    if (!alive(s)) return;
    mode = 'shell';
    main.setPrompt(IDENTITY.handle + '@fedxd.net:~$ ');
    main.showPrompt(true);
    focusCatcher();
  }

  async function startxPhase(s){
    main.showPrompt(false);
    main.addLine(IDENTITY.handle + '@fedxd.net:~$ startx', WHITE);
    await wait(300); if (!alive(s)) return;
    main.addLine('X.Org X Server 1.20 — starting...', DIM);
    await wait(450); if (!alive(s)) return;
    main.addLine('(II) FX-VGA(0): initialized', DIM);
    await wait(350); if (!alive(s)) return;
    main.addLine('(II) window manager: rmwm starting', DIM);
    await wait(500); if (!alive(s)) return;
    playStartxChime();
    await wait(300); if (!alive(s)) return;
    mode = 'desktop';
    desktop.classList.add('show');
    updateClock();
  }

  function focusCatcher(){ input.focus({ preventScroll: true }); }

  // A pending setTimeout from the *previous* power toggle was never being
  // cancelled, so mashing the button fast stacked poweron/poweroff classes
  // together (their animations conflict) and let a stale callback fire
  // after a newer one, undoing it. animTimer + resetScreenAnim fix both.
  var animTimer = null;
  function clearAnimTimer(){ if (animTimer) { clearTimeout(animTimer); animTimer = null; } }
  function resetScreenAnim(){
    screenEl.classList.remove('poweron', 'poweroff', 'flicker');
    void screenEl.offsetWidth; // force reflow so a class re-added below actually restarts its animation
  }

  function powerOn(){
    session++; var mySession = session;
    clearAnimTimer();
    powered = true; mode = 'boot'; bootTime = Date.now();
    pwrring.classList.add('on');
    playSwitchClick();
    setTimeout(playDegauss, 90);
    startAmbient();
    main.clearLines(); main.showPrompt(false);
    desktop.classList.remove('show');
    windowsEl.innerHTML = ''; tasklist.innerHTML = ''; openApps = {};
    // resize() reads getBoundingClientRect(), which - unlike a
    // ResizeObserver's box-size tracking - reflects whatever CSS transform
    // happens to be live at that exact instant. Reading it BEFORE
    // resetScreenAnim() clears any still-playing poweroff/poweron/flicker
    // animation class from a previous toggle could catch .screen mid
    // scale-transform, permanently wedging the canvas at a tiny rendered
    // size (nothing ever re-triggers a correction afterward, since the
    // element's real layout box never actually changes). Reset first.
    resetScreenAnim();
    main.resize();
    if (!prefersReduced()) {
      screenEl.classList.add('poweron');
      animTimer = setTimeout(function(){
        animTimer = null;
        if (session !== mySession) return; // powered off again before the flash finished
        screenEl.classList.remove('poweron');
        screenEl.classList.add('flicker');
        // second, belt-and-suspenders resize once the poweron scale
        // animation has fully finished and been removed - by now .screen
        // is guaranteed untransformed (flicker only animates opacity)
        main.resize();
        biosPhase(mySession);
      }, 560);
    } else {
      screenEl.classList.add('flicker');
      main.resize();
      biosPhase(mySession);
    }
  }
  function powerOff(){
    session++; // invalidates any boot/kernel/login/startx chain still in flight
    clearAnimTimer();
    powered = false; mode = 'boot';
    rootmenu.classList.remove('show');
    main.showPrompt(false);
    desktop.classList.remove('show');
    pwrring.classList.remove('on');
    playSwitchClick();
    playCollapseThump();
    stopAmbient();
    resetScreenAnim();
    if (!prefersReduced()) {
      screenEl.classList.add('poweroff');
      animTimer = setTimeout(function(){
        animTimer = null;
        screenEl.classList.remove('poweroff');
        main.clearLines();
      }, 460);
    } else { main.clearLines(); }
  }
  function pressAndRun(cb){
    pwr.classList.add('pressed');
    setTimeout(function(){ pwr.classList.remove('pressed'); }, 110);
    cb();
  }
  pwr.addEventListener('click', function(){ pressAndRun(function(){ powered ? powerOff() : powerOn(); }); }, { signal: signal });
  shutdownBtn.addEventListener('click', function(){ rootmenu.classList.remove('show'); pressAndRun(powerOff); }, { signal: signal });

  /* ================================================================
     SHARED SHELL COMMAND SET (used by main console + Terminal windows)
     ================================================================ */
  var HELP = [
    'available commands:',
    '  help            show this list',
    '  whoami          who runs this thing',
    '  about           short bio',
    '  contact         how to reach me',
    '  hire            why you should hire me',
    '  github          open the real GitHub profile in a new tab',
    '  guess           guess a number 1-100',
    '  rps <choice>    rock, paper, or scissors vs the CPU',
    '  ls              list home directory',
    '  pwd             print working directory',
    '  date            current date and time',
    '  uname           system info',
    '  uptime          how long this session has run',
    '  neofetch        system summary',
    '  cowsay <text>   a cow says things',
    '  fortune         a random quote',
    '  echo <text>     print text back',
    '  startx          launch the graphical desktop (Files, Games & more)',
    '  clear           clear the screen',
  ];
  function runShellCommand(raw, term, ctx){
    var trimmed = raw.trim();
    var game = term.getGame();
    if (game) {
      term.addLine(term.getLabel() + trimmed, WHITE);
      var cont = game(trimmed, term);
      if (!cont) term.setGame(null);
      return;
    }
    if (!trimmed) return;
    term.addLine(term.getLabel() + trimmed, WHITE);
    var cmd = trimmed.toLowerCase();
    if (cmd === 'help') { HELP.forEach(function(l){ term.addLine(l, DIM); }); term.addLine('', DIM); return; }
    if (cmd === 'whoami') { term.addLine(IDENTITY.name + ' — ' + IDENTITY.summary, WHITE); term.addLine('', DIM); return; }
    if (cmd === 'about') {
      IDENTITY.typing.forEach(function (line) { term.addLine(line, WHITE); });
      term.addLine('', DIM); return;
    }
    if (cmd === 'contact') {
      term.addLine(IDENTITY.email, WHITE);
      term.addLine(IDENTITY.github.replace(/^https?:\/\//, ''), WHITE);
      term.addLine(IDENTITY.responseTime, DIM);
      term.addLine('', DIM); return;
    }
    if (cmd === 'hire') {
      term.addLine(IDENTITY.name + ' — ' + (skills.header && skills.header.subtitle ? skills.header.subtitle : 'available for hire'), WHITE);
      term.addLine(IDENTITY.achievementsLine, WHITE);
      term.addLine('run `contact` to reach out.', DIM);
      term.addLine('', DIM); return;
    }
    if (cmd === 'github') {
      // opens through the visitor's own browser tab, not fetched/proxied -
      // this is the only thing the shell can send you to outside the sim
      term.addLine('opening ' + ALLOWED_LINKS.github + ' ...', WHITE);
      term.addLine('', DIM);
      window.open(ALLOWED_LINKS.github, '_blank', 'noopener,noreferrer');
      return;
    }
    if (cmd === 'guess') {
      var target = Math.floor(Math.random() * 100) + 1;
      var tries = 0;
      term.addLine('guess a number 1-100. type a number, or "quit" to give up.', WHITE);
      term.addLine('', DIM);
      term.setGame(function(input, t){
        var v = input.trim().toLowerCase();
        if (v === 'quit') { t.addLine('gave up - it was ' + target + '.', DIM); t.addLine('', DIM); return false; }
        var n = parseInt(v, 10);
        if (isNaN(n) || v === '') { t.addLine('enter a number 1-100, or "quit"', DIM); t.addLine('', DIM); return true; }
        tries++;
        if (n === target) {
          t.addLine('correct! ' + target + ' in ' + tries + ' guess' + (tries === 1 ? '' : 'es') + '.', PRIMARY);
          t.addLine('', DIM);
          playStartxChime();
          return false;
        }
        t.addLine(n < target ? 'higher' : 'lower', DIM);
        t.addLine('', DIM);
        return true;
      });
      return;
    }
    if (cmd.indexOf('rps') === 0) {
      var rpsChoice = trimmed.split(' ')[1] ? trimmed.split(' ')[1].toLowerCase() : '';
      var rpsOpts = ['rock', 'paper', 'scissors'];
      if (rpsOpts.indexOf(rpsChoice) === -1) {
        term.addLine('usage: rps <rock|paper|scissors>', DIM); term.addLine('', DIM); return;
      }
      var rpsCpu = rpsOpts[Math.floor(Math.random() * 3)];
      term.addLine('you: ' + rpsChoice + '   cpu: ' + rpsCpu, WHITE);
      if (rpsCpu === rpsChoice) { term.addLine('draw.', DIM); }
      else if ((rpsChoice === 'rock' && rpsCpu === 'scissors') || (rpsChoice === 'paper' && rpsCpu === 'rock') || (rpsChoice === 'scissors' && rpsCpu === 'paper')) {
        term.addLine('you win!', PRIMARY); playStartxChime();
      } else {
        term.addLine('you lose.', RED); playCollapseThump();
      }
      term.addLine('', DIM);
      return;
    }
    if (cmd === 'ls') {
      term.addLine('about.md  contact.md  hire.md  projects/  games/  .bashrc', DIM);
      term.addLine('', DIM); return;
    }
    if (cmd === 'pwd') { term.addLine('/home/' + IDENTITY.handle, WHITE); term.addLine('', DIM); return; }
    if (cmd === 'date') { term.addLine(new Date().toString(), WHITE); term.addLine('', DIM); return; }
    if (cmd === 'uname' || cmd === 'uname -a') {
      term.addLine('Linux fedxd.net 5.4.0-rm #1 SMP RM386SX-40 GNU/Linux', WHITE);
      term.addLine('', DIM); return;
    }
    if (cmd === 'uptime') {
      var secs = bootTime ? Math.floor((Date.now() - bootTime) / 1000) : 0;
      var m = Math.floor(secs / 60), sRem = secs % 60;
      term.addLine('up ' + m + 'm ' + sRem + 's, 1 user, load average: 0.08, 0.03, 0.01', WHITE);
      term.addLine('', DIM); return;
    }
    if (cmd === 'neofetch') {
      term.addLine(IDENTITY.handle + '@fedxd.net', RED);
      term.addLine('-----------', RED);
      term.addLine('OS: FX-Linux 5.4.0-rm', WHITE);
      term.addLine('Host: fedxd.net', WHITE);
      term.addLine('Kernel: 5.4.0-rm', WHITE);
      term.addLine('Shell: rmsh 2.0', WHITE);
      term.addLine('CPU: RM386SX-40', WHITE);
      term.addLine('Memory: 65536K', WHITE);
      term.addLine('', DIM);
      // real, live numbers from the actual GitHub account - appended once
      // the fetch resolves rather than editing an existing line in place,
      // so it can't race with whatever the user types in the meantime
      fetch('/api/github/stats').then(function(r){ return r.json(); }).then(function(d){
        term.addLine('github: ' + d.public_repos + ' repos, ' + d.followers + ' followers, ' + d.stars + ' stars', DIM);
        term.addLine('', DIM);
      }).catch(function(){});
      return;
    }
    if (cmd.indexOf('cowsay') === 0) {
      var msg = trimmed.slice(6).trim() || 'moo';
      var bar = new Array(msg.length + 3).join('-');
      term.addLine(' ' + bar, DIM);
      term.addLine('< ' + msg + ' >', WHITE);
      term.addLine(' ' + bar, DIM);
      term.addLine('        \\   ^__^', DIM);
      term.addLine('         \\  (oo)\\_______', DIM);
      term.addLine('            (__)\\       )\\/\\', DIM);
      term.addLine('                ||----w |', DIM);
      term.addLine('                ||     ||', DIM);
      term.addLine('', DIM); return;
    }
    if (cmd === 'fortune') {
      var fortunes = [
        'You will find a bug right before deploying.',
        'A clean commit history is its own reward.',
        'sudo will not save you today.',
        'The fix was one character. It always is.',
        'Someone, somewhere, is grepping your code.',
      ];
      term.addLine(fortunes[Math.floor(Math.random() * fortunes.length)], WHITE);
      term.addLine('', DIM); return;
    }
    if (cmd.indexOf('echo') === 0) {
      term.addLine(trimmed.slice(4).trim(), WHITE);
      term.addLine('', DIM); return;
    }
    if (cmd === 'clear') { term.clearLines(); return; }
    if (cmd === 'sudo' || cmd.indexOf('sudo ') === 0) {
      term.addLine('rm is not in the sudoers file. This incident will be reported.', RED);
      term.addLine('', DIM); return;
    }
    if (cmd === 'startx') {
      // startxPhase() needs the current session token (added when the
      // power-toggle race fix was put in) - this call site never passed
      // it, so alive(undefined) failed immediately and startx did nothing
      if (ctx === 'main') { startxPhase(session); } else { term.addLine('startx: display already active', DIM); term.addLine('', DIM); }
      return;
    }
    term.addLine(cmd.split(' ')[0] + ': command not found', RED);
    term.addLine('', DIM);
  }

  // real shell tab-completion, not the browser's native "jump focus to
  // the next element" behavior a bare <input> gives you by default
  var ALL_CMDS = ['help','whoami','about','ls','contact','hire','github','guess','rps','pwd','date','uname','uptime','neofetch','cowsay','fortune','echo','startx','clear'];
  function tabComplete(inputEl, term){
    var val = inputEl.value.toLowerCase();
    if (!val) return;
    var match = ALL_CMDS.find(function(c){ return c.indexOf(val) === 0; });
    if (match) { inputEl.value = match; term.render(); }
  }

  input.addEventListener('input', function(){ main.render(); }, { signal: signal });
  input.addEventListener('keydown', function(e){
    if (mode !== 'shell') return;
    // showPrompt(false) (e.g. mid-startx) only hides the drawn prompt, it
    // never blurred/disabled the input - so typing "startx" again while the
    // first one was still animating queued a second, overlapping run of it,
    // which read as the boot text firing "3 times". Block shell input
    // entirely while there's no prompt to be typing into.
    if (!main.isPromptShown()) return;
    if (e.key === 'Enter') {
      var v = input.value; input.value = '';
      main.historyPush(v.trim());
      runShellCommand(v, main, 'main');
      main.render();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      tabComplete(input, main);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      main.historyUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      main.historyDown();
    } else if (e.key.length === 1) playKeyClick();
  }, { signal: signal });
  screenEl.addEventListener('click', function(e){
    // #screen is an ancestor of every floating window, so this fired on
    // every click anywhere on the desktop - including inside an open
    // Terminal window, right after that window's own click handler had
    // just focused ITS input. This bubbled-up handler then stole focus
    // straight back to the hidden main-console input, so a windowed
    // Terminal could never actually receive keystrokes. Only refocus the
    // main console when the click wasn't inside a window.
    if (powered && mode === 'shell' && !e.target.closest('.win')) focusCatcher();
  }, { signal: signal });

  // Everything the sim can navigate to for real. `<a>` tags inside PAGES
  // html below either carry data-app (jumps to another app inside the sim,
  // handled by openApp) or data-link (opens a real URL in the visitor's
  // own browser via window.open - never fetched/proxied server-side, so
  // "no special network stuff" as requested). Any link not wired to one of
  // those two things is inert by design - the address bar and page content
  // are not a general-purpose way to browse to arbitrary URLs.
  // ponytail: derived from portfolio_data/links.json (project repos) +
  // IDENTITY. Adding a project to portfolio_data/links.json shows up here
  // without an engine edit.
  function repoSlug(name) {
    return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  var ALLOWED_LINKS = (function () {
    var out = {
      github: IDENTITY.github,
      email: 'mailto:' + IDENTITY.email,
    };
    Object.keys(linksMap).forEach(function (name) {
      out['repo-' + repoSlug(name)] = linksMap[name];
    });
    return out;
  })();

  /* ================================================================
     REAL SITE CONTENT — pulled from the actual fedxd.net
     source (about-page-content.tsx, data/skills.ts),
     not placeholder copy.
     ================================================================ */
  // ponytail: PAGES is data-driven. html is composed at module load from
  // portfolio_data. Editing those files updates the windows without an
  // engine edit. The existing CSS hooks (.tag, h1, h2, .card, .pill, hr)
  // are preserved verbatim - only the content source moves from hardcoded
  // strings to data.
  function projectCardHtml(p) {
    var slug = repoSlug(p.title);
    var badge = p.badge ? ' <i>' + p.badge + '</i>' : '';
    var titleHtml = '<b><a href="#" data-link="repo-' + slug + '">' + p.title + '</a></b>' + badge;
    var techPills = '<div>' + (p.tech || []).map(function (t) {
      return '<span class="pill">' + t + '</span>';
    }).join('') + '</div>';
    return '<div class="card">' + titleHtml + '<span>' + p.description + '</span>' + techPills + '</div>';
  }
  var sortedProjects = getSortedProjects();
  var FEATURED_COUNT = 6;
  var featuredProjects = sortedProjects.slice(0, FEATURED_COUNT);
  var moreProjects = sortedProjects.slice(FEATURED_COUNT);

  var PAGES = {
    about: {
      title: 'About Me',
      addr: 'http://' + IDENTITY.host + '/about.html',
      html:
        '<span class="tag">// about</span><h1>' + IDENTITY.name + '</h1>' +
        '<p>' + IDENTITY.summary + '</p>' +
        '<h2>Bio</h2>' + mdInline(aboutRaw) +
        '<h2>Where I&rsquo;ve been</h2>' +
        experience.experiences.map(function (e) {
          return '<div class="card"><b>' + e.role + ' &mdash; ' + e.company + '</b><span>' + e.period + ' &middot; ' + e.location + '<br/>' + e.description + '</span></div>';
        }).join('') +
        '<h2>Highlights</h2><ul>' +
        achievements.achievements.map(function (a) {
          return '<li><b>' + a.title + '</b> &mdash; ' + a.position + ' (' + a.year + '). ' + a.description + '</li>';
        }).join('') +
        '</ul><hr><p>Stats: ' + IDENTITY.statsLine + ' &middot; ' + IDENTITY.achievementsLine + '</p>' +
        '<p><a href="#" data-app="projects">View projects &rarr;</a></p>',
    },
    projects: {
      title: 'Projects',
      addr: 'http://' + IDENTITY.host + '/projects.html',
      html:
        '<span class="tag">// projects</span><h1>Projects</h1>' +
        '<p>' + IDENTITY.statsLine + ' &middot; ' + sortedProjects.length + ' shipped.</p>' +
        '<h2>Featured</h2>' +
        featuredProjects.map(projectCardHtml).join('') +
        (moreProjects.length ? '<h2>More Projects</h2>' + moreProjects.map(projectCardHtml).join('') : '') +
        '<hr><p><a href="#" data-link="github">View everything on GitHub &rarr;</a></p>',
    },
    contact: {
      title: 'Contact',
      addr: 'http://' + IDENTITY.host + '/contact.html',
      html:
        '<span class="tag">// contact</span><h1>Get In Touch</h1>' +
        '<p>' + (contact.header && contact.header.subtitle ? contact.header.subtitle : 'Open to opportunities.') + '</p>' +
        contact.contactInfo.map(function (c) {
          // map common channels to existing ALLOWED_LINKS keys so the user
          // gets the existing <a data-link="..."> click behavior; anything
          // not on that list falls back to a plain href.
          var kind = /email/i.test(c.title) ? 'email' : /github/i.test(c.title) ? 'github' : null;
          var anchor = kind
            ? '<a href="#" data-link="' + kind + '">' + c.title + '</a>'
            : '<a href="' + c.link + '" target="_blank" rel="noopener noreferrer">' + c.title + '</a>';
          return '<div class="card"><b>' + anchor + '</b><span>' + c.value + '</span></div>';
        }).join('') +
        '<hr><p>Based in ' + IDENTITY.location + ' &middot; ' + IDENTITY.responseTime + '.</p>',
    },
    hire: {
      title: 'Hire Me',
      addr: 'http://' + IDENTITY.host + '/hire.html',
      html:
        '<span class="tag">// hire</span><h1>Available for Hire</h1>' +
        '<p>' + (skills.header && skills.header.subtitle ? skills.header.subtitle : IDENTITY.summary) + '</p>' +
        skills.categories.map(function (cat) {
          return '<h2>' + cat.title + '</h2>' +
            cat.skills.map(function (s) {
              return '<div class="card"><b>' + s.name + '</b><span>Level ' + s.level + '/100</span></div>';
            }).join('');
        }).join('') +
        '<hr><p>Reach out via <a href="#" data-app="contact">Contact</a> &middot; ' + IDENTITY.contactTags.slice(0, 4).join(' &middot; ') + '</p>',
    },
  };

  /* ================================================================
     FILE MANAGER (virtual filesystem browsing the same content)
     ================================================================ */
  var FS_TREE = {
    name: IDENTITY.handle, type: 'dir', children: [
      { name: 'about.md', type: 'file', app: 'about' },
      { name: 'contact.md', type: 'file', app: 'contact' },
      { name: 'hire.md', type: 'file', app: 'hire' },
      { name: 'projects', type: 'dir', children: [
        { name: 'readme.md', type: 'file', app: 'projects' },
      ] },
      { name: 'games', type: 'dir', children: [
        { name: 'minesweeper', type: 'file', app: 'minesweeper' },
        { name: 'snake', type: 'file', app: 'snake' },
        { name: 'tictactoe', type: 'file', app: 'tictactoe' },
        { name: '2048', type: 'file', app: '2048' },
        { name: 'pong', type: 'file', app: 'pong' },
        { name: 'memory', type: 'file', app: 'memory' },
        { name: 'simon', type: 'file', app: 'simon' },
      ] },
    ],
  };
  function buildFileManager(body){
    var stack = [FS_TREE];
    function draw(){
      var node = stack[stack.length - 1];
      var pathStr = '/home/' + stack.map(function(n){ return n.name; }).join('/');
      body.innerHTML =
        '<div class="filemgr">' +
        '  <div class="filemgr-toolbar">' +
        '    <button id="fmUp"' + (stack.length <= 1 ? ' disabled' : '') + '>&uarr; Up</button>' +
        '    <span class="filemgr-path">' + pathStr + '</span>' +
        '  </div>' +
        '  <div class="filemgr-list" id="fmList"></div>' +
        '</div>';
      var list = body.querySelector('#fmList');
      (node.children || []).forEach(function(child){
        var item = document.createElement('div');
        item.className = 'filemgr-item';
        item.innerHTML = '<div class="glyph">' + (child.type === 'dir' ? '&#128193;' : '&#128196;') + '</div><span>' + child.name + '</span>';
        item.addEventListener('click', function(){
          if (child.type === 'dir') { stack.push(child); draw(); }
          else openApp(child.app);
        });
        list.appendChild(item);
      });
      var up = body.querySelector('#fmUp');
      if (up) up.addEventListener('click', function(){ stack.pop(); draw(); });
    }
    draw();
  }

  /* ================================================================
     MINESWEEPER
     ================================================================ */
  function buildMinesweeper(body){
    var COLS = 9, ROWS = 9, MINES = 10;
    var grid, revealed, flags, over, first;
    var NUMCOLOR = ['', '#5b9bd5', '#4fdc7a', '#3cf28a', '#a463f2', '#e8b23d', '#4fdc7a', '#dff5e6', '#8a8574'];

    function init(){
      grid = [];
      for (var r = 0; r < ROWS; r++) {
        var row = [];
        for (var c = 0; c < COLS; c++) row.push({ mine: false, revealed: false, flagged: false, adj: 0 });
        grid.push(row);
      }
      revealed = 0; flags = 0; over = false; first = true;
    }
    function placeMines(ar, ac){
      var placed = 0;
      while (placed < MINES) {
        var r = Math.floor(Math.random() * ROWS), c = Math.floor(Math.random() * COLS);
        if (grid[r][c].mine || (Math.abs(r - ar) <= 1 && Math.abs(c - ac) <= 1)) continue;
        grid[r][c].mine = true; placed++;
      }
      for (var r2 = 0; r2 < ROWS; r2++) for (var c2 = 0; c2 < COLS; c2++) {
        if (grid[r2][c2].mine) continue;
        var n = 0;
        for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) {
          var rr = r2 + dr, cc = c2 + dc;
          if (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLS && grid[rr][cc].mine) n++;
        }
        grid[r2][c2].adj = n;
      }
    }
    function reveal(r, c){
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
      var cell = grid[r][c];
      if (cell.revealed || cell.flagged) return;
      cell.revealed = true; revealed++;
      if (cell.adj === 0 && !cell.mine) {
        for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) if (dr || dc) reveal(r + dr, c + dc);
      }
    }
    function renderBoard(){
      var html = '';
      for (var r = 0; r < ROWS; r++) {
        html += '<div class="mrow">';
        for (var c = 0; c < COLS; c++) {
          var cell = grid[r][c];
          var cls = 'mcell' + (cell.revealed ? ' rev' : '');
          var content = '';
          if (cell.revealed) {
            if (cell.mine) content = '&#128163;';
            else if (cell.adj > 0) content = '<span style="color:' + NUMCOLOR[cell.adj] + '">' + cell.adj + '</span>';
          } else if (cell.flagged) content = '&#9873;';
          html += '<div class="' + cls + '" data-r="' + r + '" data-c="' + c + '">' + content + '</div>';
        }
        html += '</div>';
      }
      return html;
    }

    init();
    body.innerHTML =
      '<div class="msweep">' +
      '  <div class="msweep-bar"><span id="msFlags"></span><button id="msReset">&#128512; reset</button><span id="msStatus"></span></div>' +
      '  <div class="mgrid" id="mGrid"></div>' +
      '</div>';
    var gridEl = body.querySelector('#mGrid');
    var flagsEl = body.querySelector('#msFlags');
    var statusEl = body.querySelector('#msStatus');

    function update(){
      gridEl.innerHTML = renderBoard();
      flagsEl.textContent = 'MINES: ' + (MINES - flags);
    }

    body.querySelector('#msReset').addEventListener('click', function(){ init(); statusEl.textContent = ''; update(); });
    gridEl.addEventListener('click', function(e){
      var cellEl = e.target.closest('.mcell'); if (!cellEl || over) return;
      var r = +cellEl.getAttribute('data-r'), c = +cellEl.getAttribute('data-c');
      var cell = grid[r][c];
      if (cell.flagged) return;
      if (first) { placeMines(r, c); first = false; }
      if (cell.mine) {
        cell.revealed = true; over = true;
        for (var rr = 0; rr < ROWS; rr++) for (var cc = 0; cc < COLS; cc++) if (grid[rr][cc].mine) grid[rr][cc].revealed = true;
        statusEl.textContent = 'BOOM';
        playCollapseThump();
        update();
        return;
      }
      playKeyClick();
      reveal(r, c);
      if (revealed === ROWS * COLS - MINES) { over = true; statusEl.textContent = 'CLEARED'; playStartxChime(); }
      update();
    });
    gridEl.addEventListener('contextmenu', function(e){
      e.preventDefault();
      var cellEl = e.target.closest('.mcell'); if (!cellEl || over) return;
      var r = +cellEl.getAttribute('data-r'), c = +cellEl.getAttribute('data-c');
      var cell = grid[r][c];
      if (cell.revealed) return;
      cell.flagged = !cell.flagged;
      playSeekClick();
      flags += cell.flagged ? 1 : -1;
      update();
    });
    update();
  }

  /* ================================================================
     SNAKE
     ================================================================ */
  function buildSnake(body){
    var COLS = 20, ROWS = 15;
    body.innerHTML =
      '<div class="snake-wrap" tabindex="0">' +
      '  <div class="snake-bar"><span id="snScore">SCORE: 0</span><button id="snReset">&#8635; restart</button><span id="snStatus"></span></div>' +
      '  <canvas class="snake-canvas"></canvas>' +
      '</div>';
    var wrap = body.querySelector('.snake-wrap');
    var canvas = body.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var scoreEl = body.querySelector('#snScore');
    var statusEl = body.querySelector('#snStatus');
    var cell = 16, snake, dir, nextDir, food, score, over, timer;

    function resizeCanvas(){
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      cell = Math.max(6, Math.floor(Math.min(rect.width / COLS, rect.height / ROWS)));
      canvas.width = cell * COLS;
      canvas.height = cell * ROWS;
      draw();
    }
    function randFood(){
      var pos;
      do { pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }; }
      while (snake.some(function(s){ return s.x === pos.x && s.y === pos.y; }));
      return pos;
    }
    function draw(){
      ctx.fillStyle = '#0b0f0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#3cf28a';
      ctx.fillRect(food.x * cell, food.y * cell, cell, cell);
      for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#f5e3e0' : '#8e85a8';
        ctx.fillRect(snake[i].x * cell + 1, snake[i].y * cell + 1, cell - 2, cell - 2);
      }
    }
    function tick(){
      if (over) return;
      dir = nextDir;
      var head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      var hit = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
        snake.some(function(s){ return s.x === head.x && s.y === head.y; });
      if (hit) {
        over = true; statusEl.textContent = 'GAME OVER'; playCollapseThump();
        return;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 10; scoreEl.textContent = 'SCORE: ' + score;
        food = randFood(); playKeyClick();
      } else {
        snake.pop();
      }
      draw();
    }
    function reset(){
      snake = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }];
      dir = { x: 1, y: 0 }; nextDir = { x: 1, y: 0 };
      score = 0; over = false;
      food = randFood();
      statusEl.textContent = ''; scoreEl.textContent = 'SCORE: 0';
      draw();
    }

    wrap.addEventListener('keydown', function(e){
      var k = e.key;
      if ((k === 'ArrowUp' || k === 'w') && dir.y === 0) { nextDir = { x: 0, y: -1 }; e.preventDefault(); }
      else if ((k === 'ArrowDown' || k === 's') && dir.y === 0) { nextDir = { x: 0, y: 1 }; e.preventDefault(); }
      else if ((k === 'ArrowLeft' || k === 'a') && dir.x === 0) { nextDir = { x: -1, y: 0 }; e.preventDefault(); }
      else if ((k === 'ArrowRight' || k === 'd') && dir.x === 0) { nextDir = { x: 1, y: 0 }; e.preventDefault(); }
    });
    wrap.addEventListener('click', function(){ wrap.focus(); });
    body.querySelector('#snReset').addEventListener('click', reset);

    reset();
    var ro = new ResizeObserver(function(){ resizeCanvas(); });
    ro.observe(canvas);
    requestAnimationFrame(function(){ wrap.focus(); });
    timer = setInterval(tick, 130);

    return function cleanup(){ clearInterval(timer); ro.disconnect(); };
  }

  /* ================================================================
     TIC-TAC-TOE (minimax CPU — never loses)
     ================================================================ */
  function buildTicTacToe(body){
    body.innerHTML =
      '<div class="ttt">' +
      '  <div class="ttt-bar"><span id="tStatus">Your turn (X)</span><button id="tReset">&#8635; restart</button></div>' +
      '  <div class="ttt-board-wrap"><div class="ttt-grid" id="tGrid"></div></div>' +
      '</div>';
    var gridEl = body.querySelector('#tGrid');
    var statusEl = body.querySelector('#tStatus');
    var WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    var board, over;

    function winner(b){
      for (var i = 0; i < WINS.length; i++) {
        var w = WINS[i];
        if (b[w[0]] && b[w[0]] === b[w[1]] && b[w[1]] === b[w[2]]) return b[w[0]];
      }
      if (b.every(function(c){ return c; })) return 'draw';
      return null;
    }
    function minimax(b, player){
      var win = winner(b);
      if (win === 'X') return { score: -1 };
      if (win === 'O') return { score: 1 };
      if (win === 'draw') return { score: 0 };
      var moves = [];
      for (var i = 0; i < 9; i++) {
        if (!b[i]) {
          var b2 = b.slice(); b2[i] = player;
          moves.push({ index: i, score: minimax(b2, player === 'O' ? 'X' : 'O').score });
        }
      }
      var best = moves[0];
      moves.forEach(function(m){
        if (player === 'O' ? m.score > best.score : m.score < best.score) best = m;
      });
      return best;
    }
    function render(){
      gridEl.innerHTML = '';
      board.forEach(function(v, i){
        var c = document.createElement('div');
        c.className = 'ttt-cell';
        c.textContent = v || '';
        if (v === 'X') c.style.color = '#f5e3e0';
        if (v === 'O') c.style.color = '#3cf28a';
        c.addEventListener('click', function(){ play(i); });
        gridEl.appendChild(c);
      });
    }
    function finish(w){
      over = true;
      if (w === 'draw') statusEl.textContent = 'DRAW';
      else if (w === 'X') { statusEl.textContent = 'YOU WIN'; playStartxChime(); }
      else { statusEl.textContent = 'CPU WINS'; playCollapseThump(); }
    }
    function play(i){
      if (over || board[i]) return;
      board[i] = 'X'; playKeyClick();
      var w = winner(board);
      render();
      if (w) { finish(w); return; }
      setTimeout(function(){
        var mv = minimax(board.slice(), 'O');
        if (mv && mv.index !== undefined) board[mv.index] = 'O';
        var w2 = winner(board);
        render();
        if (w2) finish(w2);
      }, 260);
    }
    function reset(){
      board = new Array(9).fill(null);
      over = false;
      statusEl.textContent = 'Your turn (X)';
      render();
    }

    body.querySelector('#tReset').addEventListener('click', reset);
    reset();
  }

  /* ================================================================
     2048
     ================================================================ */
  function build2048(body){
    var SIZE = 4;
    body.innerHTML =
      '<div class="g2048-wrap" tabindex="0">' +
      '  <div class="g2048-bar"><span id="g2Score">SCORE: 0</span><button id="g2Reset">&#8635; restart</button><span id="g2Status"></span></div>' +
      '  <div class="g2048-board" id="g2Board"></div>' +
      '</div>';
    var wrap = body.querySelector('.g2048-wrap');
    var boardEl = body.querySelector('#g2Board');
    var scoreEl = body.querySelector('#g2Score');
    var statusEl = body.querySelector('#g2Status');
    var grid, score, over;

    function emptyCells(){
      var out = [];
      for (var r = 0; r < SIZE; r++) for (var c = 0; c < SIZE; c++) if (!grid[r][c]) out.push({ r: r, c: c });
      return out;
    }
    function spawn(){
      var cells = emptyCells();
      if (!cells.length) return;
      var cell = cells[Math.floor(Math.random() * cells.length)];
      grid[cell.r][cell.c] = Math.random() < 0.9 ? 2 : 4;
    }
    function reset(){
      grid = [];
      for (var r = 0; r < SIZE; r++) grid.push([0, 0, 0, 0]);
      score = 0; over = false;
      spawn(); spawn();
      statusEl.textContent = ''; scoreEl.textContent = 'SCORE: 0';
      render();
    }
    function render(){
      boardEl.innerHTML = '';
      for (var r = 0; r < SIZE; r++) for (var c = 0; c < SIZE; c++) {
        var v = grid[r][c];
        var cell = document.createElement('div');
        cell.className = 'g2048-cell' + (v ? ' v' + Math.min(v, 2048) : '');
        cell.textContent = v || '';
        boardEl.appendChild(cell);
      }
    }
    function slideLine(line){
      var vals = line.filter(function(v){ return v; });
      var merged = [], gained = 0;
      for (var i = 0; i < vals.length; i++) {
        if (i < vals.length - 1 && vals[i] === vals[i + 1]) {
          var m = vals[i] * 2;
          merged.push(m); gained += m; i++;
        } else merged.push(vals[i]);
      }
      while (merged.length < SIZE) merged.push(0);
      return { line: merged, gained: gained };
    }
    function move(dir){
      if (over) return;
      var newGrid = [];
      for (var i = 0; i < SIZE; i++) newGrid.push([0, 0, 0, 0]);
      var gained = 0;
      function getLine(i){
        var line = [];
        for (var j = 0; j < SIZE; j++) line.push(dir === 'left' || dir === 'right' ? grid[i][j] : grid[j][i]);
        if (dir === 'right' || dir === 'down') line.reverse();
        return line;
      }
      function setLine(i, line){
        if (dir === 'right' || dir === 'down') line.reverse();
        for (var j = 0; j < SIZE; j++) {
          if (dir === 'left' || dir === 'right') newGrid[i][j] = line[j]; else newGrid[j][i] = line[j];
        }
      }
      for (var i = 0; i < SIZE; i++) {
        var result = slideLine(getLine(i));
        gained += result.gained;
        setLine(i, result.line);
      }
      var moved = false;
      for (var r = 0; r < SIZE; r++) for (var c = 0; c < SIZE; c++) if (newGrid[r][c] !== grid[r][c]) moved = true;
      if (!moved) return;
      grid = newGrid;
      score += gained;
      scoreEl.textContent = 'SCORE: ' + score;
      if (gained > 0) playSeekClick(); else playKeyClick();
      spawn();
      render();
      checkOver();
    }
    function canMove(){
      if (emptyCells().length) return true;
      for (var r = 0; r < SIZE; r++) for (var c = 0; c < SIZE; c++) {
        var v = grid[r][c];
        if (c < SIZE - 1 && grid[r][c + 1] === v) return true;
        if (r < SIZE - 1 && grid[r + 1][c] === v) return true;
      }
      return false;
    }
    function checkOver(){
      var has2048 = grid.some(function(row){ return row.some(function(v){ return v >= 2048; }); });
      if (has2048) { over = true; statusEl.textContent = 'YOU WIN'; playStartxChime(); return; }
      if (!canMove()) { over = true; statusEl.textContent = 'GAME OVER'; playCollapseThump(); }
    }

    wrap.addEventListener('keydown', function(e){
      var map = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down', a: 'left', d: 'right', w: 'up', s: 'down' };
      if (map[e.key]) { e.preventDefault(); move(map[e.key]); }
    });
    wrap.addEventListener('click', function(){ wrap.focus(); });
    body.querySelector('#g2Reset').addEventListener('click', reset);
    reset();
    requestAnimationFrame(function(){ wrap.focus(); });
  }

  /* ================================================================
     PONG (vs a deliberately-imperfect CPU)
     ================================================================ */
  function buildPong(body){
    body.innerHTML =
      '<div class="pong-wrap" tabindex="0">' +
      '  <div class="pong-bar"><span id="pgScore">0 : 0</span><button id="pgReset">&#8635; restart</button><span id="pgStatus"></span></div>' +
      '  <canvas class="pong-canvas"></canvas>' +
      '</div>';
    var wrap = body.querySelector('.pong-wrap');
    var canvas = body.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var scoreEl = body.querySelector('#pgScore');
    var statusEl = body.querySelector('#pgStatus');
    var PADH = 60, PADW = 8, BALLR = 6;
    var W = 0, H = 0, playerY = 0, cpuY = 0, ballX = 0, ballY = 0, ballVX = 0, ballVY = 0;
    var playerScore = 0, cpuScore = 0, over = false, keys = {};

    function resizeCanvas(){
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = rect.width; canvas.height = rect.height;
      W = canvas.width; H = canvas.height;
    }
    function serve(dir){
      ballX = W / 2; ballY = H / 2;
      var ang = Math.random() * 0.6 - 0.3;
      ballVX = dir * 4;
      ballVY = 4 * Math.sin(ang);
    }
    function reset(){
      playerY = H / 2 - PADH / 2; cpuY = playerY;
      playerScore = 0; cpuScore = 0; over = false;
      statusEl.textContent = ''; scoreEl.textContent = '0 : 0';
      serve(Math.random() < 0.5 ? -1 : 1);
    }
    function draw(){
      ctx.fillStyle = '#0b0f0a'; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#2a2a26'; ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f5e3e0'; ctx.fillRect(10, playerY, PADW, PADH);
      ctx.fillStyle = '#3cf28a'; ctx.fillRect(W - 10 - PADW, cpuY, PADW, PADH);
      ctx.beginPath(); ctx.arc(ballX, ballY, BALLR, 0, Math.PI * 2); ctx.fillStyle = '#f5e3e0'; ctx.fill();
    }
    function checkWin(){
      if (playerScore >= 7) { over = true; statusEl.textContent = 'YOU WIN'; playStartxChime(); }
      else if (cpuScore >= 7) { over = true; statusEl.textContent = 'CPU WINS'; playCollapseThump(); }
    }
    function tick(){
      if (!W) return;
      if (over) { draw(); return; }
      if (keys.up) playerY -= 6;
      if (keys.down) playerY += 6;
      playerY = Math.max(0, Math.min(H - PADH, playerY));
      var target = ballY - PADH / 2 + (Math.random() * 10 - 5);
      cpuY += Math.max(-4.2, Math.min(4.2, (target - cpuY) * 0.12));
      cpuY = Math.max(0, Math.min(H - PADH, cpuY));

      ballX += ballVX; ballY += ballVY;
      if (ballY < BALLR || ballY > H - BALLR) ballVY *= -1;
      if (ballX - BALLR < 10 + PADW && ballY > playerY && ballY < playerY + PADH && ballVX < 0) {
        ballVX *= -1.05; ballVY += Math.random() * 2 - 1; playKeyClick();
      }
      if (ballX + BALLR > W - 10 - PADW && ballY > cpuY && ballY < cpuY + PADH && ballVX > 0) {
        ballVX *= -1.05; ballVY += Math.random() * 2 - 1; playKeyClick();
      }
      if (ballX < 0) { cpuScore++; scoreEl.textContent = playerScore + ' : ' + cpuScore; checkWin(); if (!over) serve(1); }
      else if (ballX > W) { playerScore++; scoreEl.textContent = playerScore + ' : ' + cpuScore; checkWin(); if (!over) serve(-1); }
      draw();
    }

    wrap.addEventListener('keydown', function(e){
      if (e.key === 'ArrowUp' || e.key === 'w') { keys.up = true; e.preventDefault(); }
      else if (e.key === 'ArrowDown' || e.key === 's') { keys.down = true; e.preventDefault(); }
    });
    wrap.addEventListener('keyup', function(e){
      if (e.key === 'ArrowUp' || e.key === 'w') keys.up = false;
      else if (e.key === 'ArrowDown' || e.key === 's') keys.down = false;
    });
    wrap.addEventListener('pointermove', function(e){
      var rect = canvas.getBoundingClientRect();
      playerY = e.clientY - rect.top - PADH / 2;
    });
    wrap.addEventListener('click', function(){ wrap.focus(); });
    body.querySelector('#pgReset').addEventListener('click', function(){ resizeCanvas(); reset(); });

    var ro = new ResizeObserver(function(){ resizeCanvas(); });
    ro.observe(canvas);
    requestAnimationFrame(function(){ resizeCanvas(); reset(); wrap.focus(); });
    var timer = setInterval(tick, 1000 / 60);

    return function cleanup(){ clearInterval(timer); ro.disconnect(); };
  }

  /* ================================================================
     MEMORY MATCH
     ================================================================ */
  function buildMemory(body){
    var SYMS = ['&#9733;', '&#9829;', '&#9670;', '&#9824;', '&#9827;', '&#9728;', '&#9834;', '&#9760;'];
    body.innerHTML =
      '<div class="mem-wrap">' +
      '  <div class="mem-bar"><span id="memMoves">MOVES: 0</span><button id="memReset">&#8635; restart</button><span id="memStatus"></span></div>' +
      '  <div class="mem-grid" id="memGrid"></div>' +
      '</div>';
    var gridEl = body.querySelector('#memGrid');
    var movesEl = body.querySelector('#memMoves');
    var statusEl = body.querySelector('#memStatus');
    var cards, flipped, matched, moves, busy, flipTimer;

    function shuffle(arr){
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
      }
      return arr;
    }
    function render(){
      gridEl.innerHTML = '';
      cards.forEach(function(sym, i){
        var el = document.createElement('div');
        var isUp = flipped.indexOf(i) !== -1 || matched.indexOf(i) !== -1;
        el.className = 'mem-card' + (isUp ? ' up' : '') + (matched.indexOf(i) !== -1 ? ' matched' : '');
        el.innerHTML = isUp ? sym : '';
        el.addEventListener('click', function(){ flip(i); });
        gridEl.appendChild(el);
      });
    }
    function flip(i){
      if (busy || matched.indexOf(i) !== -1 || flipped.indexOf(i) !== -1) return;
      flipped.push(i);
      playKeyClick();
      render();
      if (flipped.length === 2) {
        moves++;
        movesEl.textContent = 'MOVES: ' + moves;
        busy = true;
        var a = flipped[0], b = flipped[1];
        if (cards[a] === cards[b]) {
          matched.push(a, b);
          flipped = [];
          busy = false;
          render();
          if (matched.length === cards.length) { statusEl.textContent = 'CLEARED in ' + moves; playStartxChime(); }
          else playSeekClick();
        } else {
          try { tone(200, 0.16, 'square', audioCtx().currentTime, 0.08); } catch (e) {}
          flipTimer = setTimeout(function(){ flipped = []; busy = false; flipTimer = null; render(); }, 700);
        }
      }
    }
    function reset(){
      if (flipTimer) { clearTimeout(flipTimer); flipTimer = null; }
      cards = shuffle(SYMS.concat(SYMS));
      flipped = []; matched = []; moves = 0; busy = false;
      movesEl.textContent = 'MOVES: 0';
      statusEl.textContent = '';
      render();
    }
    body.querySelector('#memReset').addEventListener('click', reset);
    reset();

    return function cleanup(){ if (flipTimer) clearTimeout(flipTimer); };
  }

  /* ================================================================
     SIMON SAYS
     ================================================================ */
  function buildSimon(body){
    var COLORS = ['g', 'r', 'y', 'b'];
    body.innerHTML =
      '<div class="simon-wrap">' +
      '  <div class="simon-bar"><span id="smScore">ROUND: 0</span><button id="smReset">&#8635; restart</button><span id="smStatus">watch...</span></div>' +
      '  <div class="simon-pad">' +
      '    <div class="simon-btn g" data-c="g"></div><div class="simon-btn r" data-c="r"></div>' +
      '    <div class="simon-btn y" data-c="y"></div><div class="simon-btn b" data-c="b"></div>' +
      '  </div>' +
      '</div>';
    var scoreEl = body.querySelector('#smScore');
    var statusEl = body.querySelector('#smStatus');
    var btns = {};
    COLORS.forEach(function(c){ btns[c] = body.querySelector('.simon-btn.' + c); });
    var seq, playerPos, accepting, round, timers = [];

    function clearTimers(){ timers.forEach(clearTimeout); timers = []; }
    function flash(c){
      return new Promise(function(resolve){
        btns[c].classList.add('lit');
        var t1 = setTimeout(function(){
          btns[c].classList.remove('lit');
          var t2 = setTimeout(resolve, 150);
          timers.push(t2);
        }, 380);
        timers.push(t1);
      });
    }
    function playSeq(){
      accepting = false;
      statusEl.textContent = 'watch...';
      return new Promise(function(r){ var t = setTimeout(r, 400); timers.push(t); })
        .then(function(){
          var chain = Promise.resolve();
          seq.forEach(function(c){ chain = chain.then(function(){ return flash(c); }); });
          return chain;
        })
        .then(function(){
          accepting = true;
          playerPos = 0;
          statusEl.textContent = 'your turn';
        });
    }
    function nextRound(){
      round++;
      scoreEl.textContent = 'ROUND: ' + round;
      seq.push(COLORS[Math.floor(Math.random() * 4)]);
      playSeq();
    }
    function reset(){
      clearTimers();
      seq = []; round = 0; accepting = false; playerPos = 0;
      scoreEl.textContent = 'ROUND: 0';
      statusEl.textContent = '';
      nextRound();
    }
    function press(c){
      if (!accepting) return;
      btns[c].classList.add('lit');
      var t = setTimeout(function(){ btns[c].classList.remove('lit'); }, 150);
      timers.push(t);
      playKeyClick();
      if (c !== seq[playerPos]) {
        accepting = false;
        statusEl.textContent = 'GAME OVER (round ' + round + ')';
        playCollapseThump();
        return;
      }
      playerPos++;
      if (playerPos === seq.length) {
        accepting = false;
        var t2 = setTimeout(nextRound, 500);
        timers.push(t2);
      }
    }
    COLORS.forEach(function(c){ btns[c].addEventListener('click', function(){ press(c); }); });
    body.querySelector('#smReset').addEventListener('click', reset);
    reset();

    return function cleanup(){ clearTimers(); };
  }

  /* ================================================================
     WINDOW MANAGER
     ================================================================ */
  var openApps = {};
  var zTop = 10;

  function updateClock(){
    var t = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    clockEl.textContent = t;
    msbTimeEl.textContent = t;
  }
  var clockTimer = setInterval(updateClock, 15000);
  onCleanup(function(){ clearInterval(clockTimer); });

  function makeWinChrome(title){
    var win = document.createElement('div');
    win.className = 'win';
    win.innerHTML =
      '<div class="win-title"><span class="t">' + title + '</span>' +
      '<button class="win-btn wclose" aria-label="Close"><span class="icon-mask icon-close"></span></button></div>' +
      '<div class="win-body"></div>' +
      '<div class="win-resize" aria-hidden="true"></div>';
    return win;
  }
  function bringToFront(win){ zTop++; win.style.zIndex = zTop; }
  function makeDraggable(win, handle){
    var dragging = false, ox = 0, oy = 0;
    handle.addEventListener('pointerdown', function(e){
      if (isSmall()) return;
      // setPointerCapture on the handle redirects the eventual click to
      // the handle too (per spec, capture retargets the compat mouse
      // events derived from this pointer) - if that capture were taken
      // unconditionally, clicking the close button inside the title bar
      // would never actually fire *its* click. Bail before capturing.
      if (e.target.closest('.win-btn')) return;
      dragging = true; handle.setPointerCapture(e.pointerId);
      ox = e.clientX - win.offsetLeft; oy = e.clientY - win.offsetTop;
      bringToFront(win);
    });
    handle.addEventListener('pointermove', function(e){
      if (!dragging) return;
      win.style.left = Math.max(0, e.clientX - ox) + 'px';
      win.style.top = Math.max(0, e.clientY - oy) + 'px';
    });
    handle.addEventListener('pointerup', function(e){ dragging = false; });
  }
  function makeResizable(win, handle, termApi){
    var resizing = false, sx = 0, sy = 0, sw = 0, sh = 0;
    handle.addEventListener('pointerdown', function(e){
      if (isSmall()) return;
      resizing = true; handle.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY; sw = win.offsetWidth; sh = win.offsetHeight;
      bringToFront(win);
      e.stopPropagation();
    });
    handle.addEventListener('pointermove', function(e){
      if (!resizing) return;
      win.style.width = Math.max(300, sw + (e.clientX - sx)) + 'px';
      win.style.height = Math.max(220, sh + (e.clientY - sy)) + 'px';
      if (termApi) termApi.resize();
    });
    handle.addEventListener('pointerup', function(){ resizing = false; });
  }

  function appTitle(id){
    if (id === 'term') return 'Terminal — ' + IDENTITY.handle + '@fedxd.net';
    if (id === 'files') return 'My Files';
    if (id === 'minesweeper') return 'Minesweeper';
    if (id === 'snake') return 'Snake';
    if (id === 'tictactoe') return 'Tic-Tac-Toe';
    if (id === '2048') return '2048';
    if (id === 'pong') return 'Pong';
    if (id === 'memory') return 'Memory Match';
    if (id === 'simon') return 'Simon Says';
    return PAGES[id].title;
  }
  function openApp(id){
    if (openApps[id]) { bringToFront(openApps[id].win); return; }
    var isTerm = id === 'term';
    var win = makeWinChrome(appTitle(id));
    var small = isSmall();
    var n = Object.keys(openApps).length;
    win.style.left = small ? '2px' : (50 + n * 28) + 'px';
    win.style.top = small ? '2px' : (30 + n * 26) + 'px';
    win.style.width = small ? 'calc(100% - 4px)' : '660px';
    win.style.height = small ? 'calc(100% - 30px)' : '480px';
    bringToFront(win);
    windowsEl.appendChild(win);

    var body = win.querySelector('.win-body');
    var termApi = null;
    var cleanup = null;
    if (isTerm) {
      body.innerHTML = '<div class="win-term"><canvas></canvas>' +
        '<input class="typecatcher" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Terminal input" /></div>';
      var c = body.querySelector('canvas'), holder = body.querySelector('.win-term');
      var winInput = body.querySelector('input');
      termApi = createTerm(c, holder, { prompt: IDENTITY.handle + '@fedxd.net:~$ ', inputEl: winInput });
      cleanup = function(){ termApi.destroy(); };
      requestAnimationFrame(function(){
        termApi.resize();
        termApi.addLine('Last login: just now', DIM);
        termApi.addLine('', DIM);
        termApi.showPrompt(true);
      });
      holder.addEventListener('click', function(){ winInput.focus({ preventScroll: true }); });
      winInput.addEventListener('input', function(){ termApi.render(); });
      winInput.addEventListener('keydown', function(e){
        if (e.key === 'Enter') {
          var v = winInput.value; winInput.value = '';
          termApi.historyPush(v.trim());
          runShellCommand(v, termApi, 'window');
          termApi.render();
        } else if (e.key === 'Tab') {
          e.preventDefault();
          tabComplete(winInput, termApi);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          termApi.historyUp();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          termApi.historyDown();
        } else if (e.key.length === 1) playKeyClick();
      });
    } else if (id === 'files') {
      buildFileManager(body);
    } else if (id === 'minesweeper') {
      buildMinesweeper(body);
    } else if (id === 'snake') {
      cleanup = buildSnake(body);
    } else if (id === 'tictactoe') {
      buildTicTacToe(body);
    } else if (id === '2048') {
      build2048(body);
    } else if (id === 'pong') {
      cleanup = buildPong(body);
    } else if (id === 'memory') {
      cleanup = buildMemory(body);
    } else if (id === 'simon') {
      cleanup = buildSimon(body);
    } else {
      var page = PAGES[id];
      body.innerHTML =
        '<div class="win-browser">' +
        '  <div class="browser-menubar"><span>File</span><span>Edit</span><span>View</span><span>Go</span><span>Bookmarks</span><span>Help</span></div>' +
        '  <div class="browser-toolbar">' +
        '    <button class="bbtn" disabled title="Back"><span class="icon-mask icon-chevron-left"></span></button>' +
        '    <button class="bbtn" disabled title="Forward"><span class="icon-mask icon-chevron-right"></span></button>' +
        '    <button class="bbtn" id="bReload" title="Reload"><span class="icon-mask icon-reload"></span></button>' +
        '    <div class="browser-addr-wrap"><span class="browser-addr-label">Location:</span><div class="browser-addr">' + page.addr + '</div></div>' +
        '    <div class="browser-throbber" id="bThrobber" aria-hidden="true"></div>' +
        '  </div>' +
        '  <div class="browser-page">' + page.html + '</div>' +
        '  <div class="browser-status"><span id="bStatus">Done</span><span class="browser-status-zone">Internet zone</span></div>' +
        '</div>';

      var pageEl = body.querySelector('.browser-page');
      var statusEl = body.querySelector('#bStatus');
      var throbberEl = body.querySelector('#bThrobber');
      // Links inside page content are inert unless explicitly wired: data-app
      // jumps to another window inside the sim, data-link opens a real URL
      // through the visitor's own browser, restricted to ALLOWED_LINKS.
      pageEl.addEventListener('click', function(e){
        var link = e.target.closest('a');
        if (!link) return;
        e.preventDefault();
        var appId = link.getAttribute('data-app');
        if (appId) { openApp(appId); return; }
        var linkKey = link.getAttribute('data-link');
        if (linkKey && ALLOWED_LINKS[linkKey]) {
          window.open(ALLOWED_LINKS[linkKey], '_blank', 'noopener,noreferrer');
        }
      });
      body.querySelector('#bReload').addEventListener('click', function(){
        throbberEl.classList.add('spin');
        statusEl.textContent = 'Loading ' + page.addr + '...';
        setTimeout(function(){
          throbberEl.classList.remove('spin');
          statusEl.textContent = 'Done';
        }, 450 + Math.random() * 400);
      });
    }

    win.querySelector('.wclose').addEventListener('click', function(){ closeApp(id); });
    win.addEventListener('pointerdown', function(){ bringToFront(win); syncTaskbar(); });
    makeDraggable(win, win.querySelector('.win-title'));
    makeResizable(win, win.querySelector('.win-resize'), termApi);

    openApps[id] = { win: win, term: termApi, cleanup: cleanup };
    syncTaskbar();
  }
  function closeApp(id){
    if (!openApps[id]) return;
    if (openApps[id].cleanup) openApps[id].cleanup();
    openApps[id].win.remove();
    delete openApps[id];
    syncTaskbar();
  }
  function syncTaskbar(){
    tasklist.innerHTML = '';
    Object.keys(openApps).forEach(function(id){
      var b = document.createElement('button');
      b.className = 'taskbtn';
      var label = document.createElement('span');
      label.textContent = appTitle(id);
      var x = document.createElement('span');
      x.className = 'tclose';
      x.textContent = '×';
      x.setAttribute('aria-label', 'Close ' + appTitle(id));
      b.appendChild(label);
      b.appendChild(x);
      b.addEventListener('click', function(e){
        if (e.target === x) { closeApp(id); return; }
        bringToFront(openApps[id].win);
      });
      tasklist.appendChild(b);
    });
  }

  root.querySelectorAll('.dicon').forEach(function(el){
    el.addEventListener('click', function(){ openApp(el.getAttribute('data-app')); }, { signal: signal });
    el.addEventListener('keydown', function(e){ if (e.key === 'Enter') openApp(el.getAttribute('data-app')); }, { signal: signal });
  });
  rootmenu.querySelectorAll('button[data-app]').forEach(function(el){
    el.addEventListener('click', function(){ rootmenu.classList.remove('show'); openApp(el.getAttribute('data-app')); }, { signal: signal });
  });
  menubtn.addEventListener('click', function(){ rootmenu.classList.toggle('show'); }, { signal: signal });
  function onOutsideClick(e){
    if (!rootmenu.contains(e.target) && e.target !== menubtn) rootmenu.classList.remove('show');
  }
  document.addEventListener('click', onOutsideClick);
  onCleanup(function(){ document.removeEventListener('click', onOutsideClick); });

  function onMainResize(){ if (powered) main.resize(); }
  window.addEventListener('resize', onMainResize);
  onCleanup(function(){ window.removeEventListener('resize', onMainResize); });

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReduced()) {
    var onTiltMove = function(e){
      var x = (e.clientX / window.innerWidth - 0.5) * 4;
      var y = (e.clientY / window.innerHeight - 0.5) * -4;
      screenEl.style.transform = 'rotateY(' + x + 'deg) rotateX(' + y + 'deg)';
    };
    document.addEventListener('mousemove', onTiltMove);
    onCleanup(function(){ document.removeEventListener('mousemove', onTiltMove); });
  }

  main.resize();
  onCleanup(function(){ main.destroy(); });
  onCleanup(function(){
    // close any still-open app windows and their own timers/listeners
    // (Snake's game loop etc.) rather than leaving them running detached
    Object.keys(openApps).forEach(function(id){ if (openApps[id].cleanup) openApps[id].cleanup(); });
  });

  return runCleanup;
}