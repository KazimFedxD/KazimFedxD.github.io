// Static, fully author-controlled markup - no user input ever flows into
// this string, so mounting it via innerHTML in box-computer.tsx carries
// none of dangerouslySetInnerHTML's usual XSS risk. It's kept as a plain
// HTML string (not JSX) specifically so it matches box-computer.css's
// selectors and box-computer-engine.ts's DOM lookups byte-for-byte.
export const BOX_COMPUTER_MARKUP = `
<div class="monitor" id="monitor">
  <div class="nameplate-wrap"><div class="nameplate">fedxd.net</div></div>

  <div class="screen-frame">
    <div class="screw tl"></div><div class="screw tr"></div>
    <div class="screw bl"></div><div class="screw br"></div>
    <div class="screen" id="screen">
      <div class="crt-inner">
        <canvas id="crtCanvas" aria-hidden="true"></canvas>
        <input class="typecatcher" id="cmd" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Console input" />

        <div class="desktop" id="desktop">
          <div class="mobile-statusbar" id="mobileStatusbar" aria-hidden="true">
            <span class="msb-time" id="msbTime">--:--</span>
            <span class="msb-icons">
              <span class="icon-mask icon-signal"></span>
              <span class="icon-mask icon-battery"></span>
            </span>
          </div>

          <div class="dicons">
            <div class="dicon" data-app="term" tabindex="0">
              <div class="glyph icon-terminal"></div><span>Terminal</span>
            </div>
            <div class="dicon" data-app="about" tabindex="0">
              <div class="glyph icon-user"></div><span>About Me</span>
            </div>
            <div class="dicon" data-app="projects" tabindex="0">
              <div class="glyph icon-code"></div><span>Projects</span>
            </div>
            <div class="dicon" data-app="contact" tabindex="0">
              <div class="glyph icon-mail"></div><span>Contact</span>
            </div>
            <div class="dicon" data-app="hire" tabindex="0">
              <div class="glyph icon-briefcase"></div><span>Hire Me</span>
            </div>
            <div class="dicon" data-app="files" tabindex="0">
              <div class="glyph icon-folder"></div><span>My Files</span>
            </div>
            <div class="dicon" data-app="minesweeper" tabindex="0">
              <div class="glyph icon-bomb"></div><span>Minesweeper</span>
            </div>
            <div class="dicon" data-app="snake" tabindex="0">
              <div class="glyph icon-snake"></div><span>Snake</span>
            </div>
            <div class="dicon" data-app="tictactoe" tabindex="0">
              <div class="glyph icon-grid-3x3"></div><span>Tic-Tac-Toe</span>
            </div>
            <div class="dicon" data-app="2048" tabindex="0">
              <div class="glyph icon-grid-2x2"></div><span>2048</span>
            </div>
            <div class="dicon" data-app="pong" tabindex="0">
              <div class="glyph icon-target"></div><span>Pong</span>
            </div>
            <div class="dicon" data-app="memory" tabindex="0">
              <div class="glyph icon-card"></div><span>Memory Match</span>
            </div>
            <div class="dicon" data-app="simon" tabindex="0">
              <div class="glyph icon-repeat"></div><span>Simon Says</span>
            </div>
          </div>

          <div class="windows" id="windows"></div>

          <div class="rootmenu" id="rootmenu">
            <button data-app="term">Terminal</button>
            <button data-app="about">About Me</button>
            <button data-app="projects">Projects</button>
            <button data-app="contact">Contact</button>
            <button data-app="hire">Hire Me</button>
            <button data-app="files">My Files</button>
            <button data-app="minesweeper">Minesweeper</button>
            <button data-app="snake">Snake</button>
            <button data-app="tictactoe">Tic-Tac-Toe</button>
            <button data-app="2048">2048</button>
            <button data-app="pong">Pong</button>
            <button data-app="memory">Memory Match</button>
            <button data-app="simon">Simon Says</button>
            <hr>
            <button id="shutdownBtn">Shut Down…</button>
          </div>

          <div class="panel">
            <div class="menubtn" id="menubtn">:: FX</div>
            <div class="tasklist" id="tasklist"></div>
            <div class="clock" id="clock">--:--</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="controls">
    <div class="ctrl-group"><div class="knob" aria-hidden="true"></div><span class="ctrl-label">BRIGHT</span></div>
    <div class="ctrl-group"><div class="knob b2" aria-hidden="true"></div><span class="ctrl-label">CONTRAST</span></div>
    <div class="ctrl-group">
      <button class="pwr" id="pwr" aria-label="Power">
        <span class="icon-mask icon-power"></span>
        <span class="ring" id="pwrring"></span>
      </button>
      <span class="ctrl-label">POWER</span>
    </div>
  </div>
</div>
`
