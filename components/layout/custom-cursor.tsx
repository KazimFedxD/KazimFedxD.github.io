"use client"

import { useEffect, useRef, useState } from "react"

const lerp  = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

const DEFAULT_R = 220, DEFAULT_G = 38, DEFAULT_B = 38

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"))
  return match ? decodeURIComponent(match[1]) : null
}
function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return
  document.cookie = `${name}=${encodeURIComponent(value)};max-age=${days * 86400};path=/;SameSite=Lax`
}
function loadCursorColor() {
  const saved = getCookie("rm_cursor_color")
  if (saved) {
    const parts = saved.split(",").map(Number)
    if (parts.length === 3 && parts.every(n => !isNaN(n))) return { r: parts[0], g: parts[1], b: parts[2] }
  }
  return { r: DEFAULT_R, g: DEFAULT_G, b: DEFAULT_B }
}
function loadCursorStyle() {
  const saved = getCookie("rm_cursor_style")
  const n = saved ? parseInt(saved) : 1
  return isNaN(n) || n < 1 || n > 5 ? 1 : n
}

const TAIL_LEN = 28
const TAIL_GAP = 1

interface Ring     { x: number; y: number; r: number; life: number; maxR: number }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; r: number; hue: number }
interface Spark    { x: number; y: number; vx: number; vy: number; life: number }

type DrawCtx = {
  ctx: CanvasRenderingContext2D
  dx: number; dy: number
  rx: number; ry: number
  curR: number; curG: number; curB: number
  clickBlend: number; typingBlend: number
  speed: number; vx: number; vy: number
  frame: number
  tail: { x: number; y: number; speed: number }[]
  tailHead: number
  rings: Ring[]
  particles: Particle[]
  sparks: Spark[]
}

function rgb_(r: number, g: number, b: number, a: number) {
  return `rgba(${r},${g},${b},${clamp(a,0,1).toFixed(3)})`
}
const white_ = (a: number) => `rgba(255,255,255,${clamp(a,0,1).toFixed(3)})`

function tickParticles(p: DrawCtx) {
  const { ctx, curR: R, curG: G, curB: B, particles } = p
  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i]
    pt.life -= 0.028
    if (pt.life <= 0) { particles.splice(i, 1); continue }
    pt.x += pt.vx; pt.y += pt.vy
    pt.vy += 0.18
    pt.vx *= 0.96
    const a = (1 - Math.pow(1 - pt.life, 3)) * 0.9
    const blend = 1 - pt.life
    const pr = Math.round(lerp(R, 255, blend * 0.4))
    const pg = Math.round(lerp(G, 255, blend * 0.4))
    const pb = Math.round(lerp(B, 255, blend * 0.4))
    ctx.beginPath()
    ctx.arc(pt.x, pt.y, pt.r * pt.life, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${pr},${pg},${pb},${a})`
    ctx.fill()
  }
}

function tickSparks(p: DrawCtx) {
  const { ctx, curR: R, curG: G, curB: B, sparks } = p
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i]
    s.life -= 0.045
    if (s.life <= 0) { sparks.splice(i, 1); continue }
    const nx = s.x + s.vx; const ny = s.y + s.vy
    s.vx *= 0.93; s.vy *= 0.93
    ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(nx, ny)
    ctx.strokeStyle = `rgba(${R},${G},${B},${s.life * 0.6})`
    ctx.lineWidth = s.life * 1.5; ctx.lineCap = "round"; ctx.stroke()
    s.x = nx; s.y = ny
  }
}

function tickRings(p: DrawCtx, decay = 0.04) {
  const { ctx, curR: R, curG: G, curB: B, rings } = p
  for (let i = rings.length - 1; i >= 0; i--) {
    const rg = rings[i]; rg.life -= decay
    if (rg.life <= 0) { rings.splice(i, 1); continue }
    rg.r = rg.maxR * (1 - rg.life)
    const ea = rg.life * rg.life
    ctx.beginPath(); ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2)
    ctx.strokeStyle = rgb_(R, G, B, ea * 0.65); ctx.lineWidth = 1.8 * ea; ctx.stroke()
  }
}

function drawStyle1(p: DrawCtx) {
  const { ctx, dx, dy, rx, ry, curR: R, curG: G, curB: B,
    clickBlend, typingBlend, speed, vx, vy, frame, tail, tailHead } = p
  const rgb = (a: number) => rgb_(R, G, B, a)

  tickSparks(p); tickRings(p); tickParticles(p)

  for (let i = 0; i < TAIL_LEN - 1; i++) {
    const ai = (tailHead + i) % TAIL_LEN
    const bi = (tailHead + i + 1) % TAIL_LEN
    const t  = i / (TAIL_LEN - 1)
    const segSpeed = tail[ai].speed
    const speedBoost = clamp(segSpeed / 8, 0, 1)
    const a = t * t * (0.18 + speedBoost * 0.45) * (1 - typingBlend)
    if (a < 0.004) continue
    ctx.beginPath(); ctx.moveTo(tail[ai].x, tail[ai].y); ctx.lineTo(tail[bi].x, tail[bi].y)
    ctx.strokeStyle = rgb(a); ctx.lineWidth = lerp(0.4, 2.8, t); ctx.lineCap = "round"; ctx.stroke()
  }

  const breathe = Math.sin(frame * 0.022) * 0.04 + 1
  const baseR   = 18 * breathe * lerp(1, 0.75, clickBlend)
  const stretch = clamp(speed / 18, 0, 0.6)
  const angle   = Math.atan2(vy, vx)
  ctx.save(); ctx.translate(rx, ry); ctx.rotate(angle)
  ctx.beginPath(); ctx.ellipse(0, 0, baseR * (1 + stretch), baseR * (1 - stretch * 0.4), 0, 0, Math.PI * 2)
  ctx.strokeStyle = rgb(0.30 + clickBlend * 0.28); ctx.lineWidth = 1.2; ctx.stroke()
  ctx.restore()

  if (typingBlend > 0.05) {
    const blink = Math.sin(performance.now() / 1000 * Math.PI * 1.4) * 0.5 + 0.5
    const a = typingBlend * lerp(0.5, 1, blink * 0.6 + 0.4)
    const h = 20, cap = 6
    ctx.save(); ctx.strokeStyle = rgb(a); ctx.lineWidth = 1.5; ctx.lineCap = "round"
    ctx.beginPath(); ctx.moveTo(dx, dy - h/2); ctx.lineTo(dx, dy + h/2); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(dx - cap/2, dy - h/2); ctx.lineTo(dx + cap/2, dy - h/2); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(dx - cap/2, dy + h/2); ctx.lineTo(dx + cap/2, dy + h/2); ctx.stroke()
    ctx.restore()
  }

  if (typingBlend < 0.95) {
    const dotR = 2.5 * lerp(1, 0.5, clickBlend) * (1 - typingBlend * 0.85)
    if (dotR > 0.2) {
      const glowR = dotR * 5
      const glow = ctx.createRadialGradient(dx, dy, 0, dx, dy, glowR)
      glow.addColorStop(0, rgb(0.22 * (1 - typingBlend))); glow.addColorStop(1, rgb(0))
      ctx.beginPath(); ctx.arc(dx, dy, glowR, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill()
      ctx.beginPath(); ctx.arc(dx, dy, dotR, 0, Math.PI * 2); ctx.fillStyle = `rgb(${R},${G},${B})`; ctx.fill()
      ctx.beginPath(); ctx.arc(dx - dotR * 0.3, dy - dotR * 0.3, dotR * 0.35, 0, Math.PI * 2); ctx.fillStyle = white_(0.55); ctx.fill()
    }
  }

  const lag = Math.hypot(dx - rx, dy - ry)
  if (lag > 8 && typingBlend < 0.4) {
    ctx.save(); ctx.setLineDash([2, 4]); ctx.strokeStyle = rgb(clamp(lag / 80, 0, 0.18))
    ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(dx, dy); ctx.stroke()
    ctx.setLineDash([]); ctx.restore()
  }
}

function drawStyle2(p: DrawCtx) {
  const { ctx, dx, dy, curR: R, curG: G, curB: B, clickBlend, frame, speed } = p
  const breathe = Math.sin(frame * 0.03) * 0.04 + 1
  const size = 12 * breathe * lerp(1, 1.3, clickBlend)
  const gap  = 4

  tickRings(p, 0.035); tickParticles(p)

  ctx.save(); ctx.translate(dx, dy)
  ctx.strokeStyle = rgb_(R, G, B, 0.85); ctx.lineWidth = 1.5; ctx.lineCap = "round"

  const arms = [[1,0],[-1,0],[0,1],[0,-1]]
  for (const [ax, ay] of arms) {
    ctx.beginPath()
    ctx.moveTo(ax * gap, ay * gap)
    ctx.lineTo(ax * (size + gap), ay * (size + gap))
    ctx.stroke()
    const ex = ax * (size + gap); const ey = ay * (size + gap)
    const px = ay * 3; const py = ax * 3
    ctx.beginPath(); ctx.moveTo(ex - px, ey - py); ctx.lineTo(ex + px, ey + py); ctx.stroke()
  }

  ctx.beginPath(); ctx.arc(0, 0, 1.8 + clickBlend, 0, Math.PI * 2)
  ctx.fillStyle = rgb_(R, G, B, 1); ctx.fill()

  ctx.beginPath(); ctx.arc(0, 0, size + gap + 3, 0, Math.PI * 2)
  ctx.strokeStyle = rgb_(R, G, B, 0.18 + clickBlend * 0.15)
  ctx.lineWidth = 1; ctx.stroke()

  if (speed > 3) {
    const len = clamp(speed * 0.5, 0, 14)
    ctx.strokeStyle = rgb_(R, G, B, clamp(speed / 60, 0, 0.3))
    ctx.lineWidth = 0.8
    ctx.beginPath(); ctx.moveTo(-len, 0); ctx.lineTo(-len * 0.3, 0); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0, -len); ctx.lineTo(0, -len * 0.3); ctx.stroke()
  }
  ctx.restore()
}

function drawStyle3(p: DrawCtx) {
  const { ctx, dx, dy, curR: R, curG: G, curB: B, clickBlend, frame } = p
  const pulse = Math.sin(frame * 0.04) * 0.3 + 0.7
  const r     = 4 * lerp(1, 1.5, clickBlend)

  tickRings(p, 0.04); tickParticles(p); tickSparks(p)

  const glowR = r * 6
  const glow = ctx.createRadialGradient(dx, dy, 0, dx, dy, glowR)
  glow.addColorStop(0, rgb_(R, G, B, 0.13 * pulse))
  glow.addColorStop(0.5, rgb_(R, G, B, 0.04 * pulse))
  glow.addColorStop(1, rgb_(R, G, B, 0))
  ctx.beginPath(); ctx.arc(dx, dy, glowR, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill()

  ctx.beginPath(); ctx.arc(dx, dy, r, 0, Math.PI * 2); ctx.fillStyle = rgb_(R, G, B, 1); ctx.fill()
  ctx.beginPath(); ctx.arc(dx - r * 0.28, dy - r * 0.28, r * 0.32, 0, Math.PI * 2); ctx.fillStyle = white_(0.65); ctx.fill()
  ctx.beginPath(); ctx.arc(dx + r * 0.2, dy + r * 0.15, r * 0.12, 0, Math.PI * 2); ctx.fillStyle = white_(0.25); ctx.fill()
}

function drawStyle4(p: DrawCtx) {
  const { ctx, dx, dy, curR: R, curG: G, curB: B, clickBlend, speed, vx, vy, tail, tailHead } = p
  const scale = lerp(1, 1.25, clickBlend)

  tickParticles(p); tickSparks(p); tickRings(p, 0.035)

  for (let i = 0; i < TAIL_LEN - 1; i++) {
    const ai = (tailHead + i) % TAIL_LEN
    const t  = i / (TAIL_LEN - 1)
    const segSpeed = tail[ai].speed
    const a = t * t * 0.4 * clamp(segSpeed / 12, 0, 1)
    if (a < 0.01) continue
    const sr = (1.5 + Math.sin(i * 1.7) * 0.8) * t
    ctx.beginPath(); ctx.arc(tail[ai].x, tail[ai].y, sr, 0, Math.PI * 2)
    ctx.fillStyle = rgb_(R, G, B, a); ctx.fill()
  }

  const angle = speed > 1.5 ? Math.atan2(vy, vx) - Math.PI / 4 : -Math.PI / 4
  ctx.save(); ctx.translate(dx, dy); ctx.rotate(angle); ctx.scale(scale, scale)
  ctx.shadowColor = rgb_(R, G, B, 0.4); ctx.shadowBlur = 8
  const arrowPath = new Path2D("M 0 0 L 0 14 L 3.5 10.5 L 6 16 L 8 15 L 5.5 9.5 L 10 9.5 Z")
  ctx.fillStyle = rgb_(R, G, B, 0.95); ctx.fill(arrowPath)
  ctx.shadowBlur = 0
  ctx.strokeStyle = white_(0.35); ctx.lineWidth = 0.9; ctx.stroke(arrowPath)
  ctx.beginPath(); ctx.moveTo(1, 1); ctx.lineTo(1, 6)
  ctx.strokeStyle = white_(0.3); ctx.lineWidth = 1; ctx.stroke()
  ctx.restore()
}

function drawStyle5(p: DrawCtx) {
  const { ctx, dx, dy, curR: R, curG: G, curB: B, clickBlend, frame, speed } = p
  const outerR    = 16 * lerp(1, 0.85, clickBlend)
  const scanAngle = (frame * 0.05) % (Math.PI * 2)

  tickRings(p, 0.03); tickParticles(p)

  ctx.save()
  ctx.setLineDash([5, 4])
  ctx.lineDashOffset = -frame * 0.6
  ctx.beginPath(); ctx.arc(dx, dy, outerR, 0, Math.PI * 2)
  ctx.strokeStyle = rgb_(R, G, B, 0.38 + clickBlend * 0.22)
  ctx.lineWidth = 1.1; ctx.stroke()
  ctx.setLineDash([]); ctx.restore()

  ctx.beginPath(); ctx.arc(dx, dy, outerR * 0.5, 0, Math.PI * 2)
  ctx.strokeStyle = rgb_(R, G, B, 0.12)
  ctx.lineWidth = 0.7; ctx.stroke()

  const sweepW = Math.PI * (0.55 + speed * 0.005)
  ctx.save()
  ctx.beginPath(); ctx.moveTo(dx, dy)
  ctx.arc(dx, dy, outerR, scanAngle, scanAngle + sweepW)
  ctx.closePath()
  ctx.fillStyle = rgb_(R, G, B, 0.07 + speed * 0.002)
  ctx.fill()
  ctx.restore()

  ctx.save()
  ctx.shadowColor = rgb_(R, G, B, 0.6); ctx.shadowBlur = 6
  ctx.beginPath(); ctx.moveTo(dx, dy)
  ctx.lineTo(dx + Math.cos(scanAngle) * outerR, dy + Math.sin(scanAngle) * outerR)
  ctx.strokeStyle = rgb_(R, G, B, 0.85); ctx.lineWidth = 1.4; ctx.lineCap = "round"; ctx.stroke()
  ctx.shadowBlur = 0; ctx.restore()

  const trailAngle = scanAngle - 0.4
  ctx.beginPath(); ctx.moveTo(dx, dy)
  ctx.lineTo(dx + Math.cos(trailAngle) * outerR * 0.8, dy + Math.sin(trailAngle) * outerR * 0.8)
  ctx.strokeStyle = rgb_(R, G, B, 0.25); ctx.lineWidth = 0.8; ctx.stroke()

  ctx.save(); ctx.strokeStyle = rgb_(R, G, B, 0.2); ctx.lineWidth = 0.8
  ctx.setLineDash([2, 6])
  ctx.beginPath(); ctx.moveTo(dx - outerR * 1.2, dy); ctx.lineTo(dx + outerR * 1.2, dy); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(dx, dy - outerR * 1.2); ctx.lineTo(dx, dy + outerR * 1.2); ctx.stroke()
  ctx.setLineDash([]); ctx.restore()

  const br = outerR * 0.55; const bl = 5
  const corners = [[1,1],[-1,1],[1,-1],[-1,-1]]
  ctx.strokeStyle = rgb_(R, G, B, 0.45); ctx.lineWidth = 1.5; ctx.lineCap = "square"
  for (const [sx, sy] of corners) {
    ctx.beginPath(); ctx.moveTo(dx + sx * br, dy + sy * (br - bl)); ctx.lineTo(dx + sx * br, dy + sy * br); ctx.lineTo(dx + sx * (br - bl), dy + sy * br); ctx.stroke()
  }

  ctx.beginPath(); ctx.arc(dx, dy, 3.5 + clickBlend, 0, Math.PI * 2)
  ctx.fillStyle = rgb_(R, G, B, 0.95); ctx.fill()
  ctx.beginPath(); ctx.arc(dx - 1.2, dy - 1.2, 1.2, 0, Math.PI * 2)
  ctx.fillStyle = white_(0.5); ctx.fill()
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext("2d"); if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener("resize", resize)

    let mx = 0, my = 0
    let dx = 0, dy = 0
    let rx = 0, ry = 0
    let vx = 0, vy = 0
    let speed = 0

    const savedColor = loadCursorColor()
    let curR = savedColor.r, curG = savedColor.g, curB = savedColor.b
    let cursorStyle  = loadCursorStyle()
    let breakMode    = false
    let rainbowMode  = false
    let breakIntensity = 0
    let cursorScale  = 1

    const hiddenEls: { el: HTMLElement; oldVisibility: string }[] = []
    const tail:      { x: number; y: number; speed: number }[] = Array.from({ length: TAIL_LEN }, () => ({ x: 0, y: 0, speed: 0 }))
    const rings:     Ring[]     = []
    const particles: Particle[] = []
    const sparks:    Spark[]    = []
    let tailHead = 0, tailFrame = 0
    let clicking = false, typing = false, visible_ = false, rafId: number, frame = 0
    let clickBlend = 0, typingBlend = 0

    const onColorChange = (e: Event) => {
      const { r, g, b } = (e as CustomEvent).detail
      curR = r; curG = g; curB = b; rainbowMode = false
      setCookie("rm_cursor_color", `${r},${g},${b}`)
    }
    const onStyleChange = (e: Event) => {
      cursorStyle = (e as CustomEvent).detail as number
      setCookie("rm_cursor_style", String(cursorStyle))
    }
    const onBreak  = () => { breakMode = true; breakIntensity = 0; cursorScale = 1 }
    const onFix    = () => {
      breakMode = false; rainbowMode = false; breakIntensity = 0; cursorScale = 1
      for (const { el, oldVisibility } of hiddenEls) el.style.visibility = oldVisibility
      hiddenEls.length = 0
      const c = loadCursorColor(); curR = c.r; curG = c.g; curB = c.b
    }
    const onRainbow = () => { rainbowMode = true; breakMode = false }

    window.addEventListener("rm:cursor-color",   onColorChange)
    window.addEventListener("rm:cursor-style",   onStyleChange)
    window.addEventListener("rm:cursor-break",   onBreak)
    window.addEventListener("rm:cursor-fix",     onFix)
    window.addEventListener("rm:cursor-rainbow", onRainbow)

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (!visible_) { visible_ = true; setVisible(true) }
      typing = !!(e.target as HTMLElement).closest("input,textarea,[contenteditable]")
    }
    const onLeave = () => { visible_ = false; setVisible(false) }
    const onEnter = () => { visible_ = true;  setVisible(true) }

    const spawnClickBurst = (x: number, y: number) => {
      const count = 10 + Math.floor(Math.random() * 6)
      for (let i = 0; i < count; i++) {
        const a  = (Math.PI * 2 * i) / count + Math.random() * 0.4
        const sp = 1.5 + Math.random() * 3.5
        particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1.2, life: 0.7 + Math.random() * 0.4, r: 2 + Math.random() * 2.5, hue: 0 })
      }
      for (let i = 0; i < 8; i++) {
        const a  = (Math.PI * 2 * i) / 8 + Math.random() * 0.5
        const sp = 3 + Math.random() * 5
        sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.6 + Math.random() * 0.4 })
      }
      rings.push({ x, y, r: 0, life: 1, maxR: 30 })
      setTimeout(() => { if (rings.length < 30) rings.push({ x, y, r: 0, life: 1, maxR: 52 }) }, 60)
    }

    const onDown = () => {
      clicking = true
      spawnClickBurst(mx, my)
      if (breakMode && breakIntensity > 30) {
        const el = document.elementFromPoint(mx, my) as HTMLElement | null
        if (el && el !== document.body && el !== document.documentElement && !el.closest("canvas")) {
          let target: HTMLElement | null = el
          for (let i = 0; i < 3 && target; i++) {
            const tag = target.tagName.toLowerCase()
            if (["div","section","article","nav","header","footer","main","aside","p","h1","h2","h3","h4","h5","h6","a","button"].includes(tag)) break
            target = target.parentElement
          }
          if (target && target !== document.body) {
            hiddenEls.push({ el: target, oldVisibility: target.style.visibility })
            target.style.visibility = "hidden"
          }
        }
      }
    }
    const onUp = () => { clicking = false }

    document.addEventListener("mousemove",  onMove)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mousedown",  onDown)
    document.addEventListener("mouseup",    onUp)

    // Mutated in place every frame instead of reallocated - the arrays are
    // stable references, only the scalars change.
    const drawProps: DrawCtx = {
      ctx, dx: 0, dy: 0, rx: 0, ry: 0, curR, curG, curB,
      clickBlend: 0, typingBlend: 0, speed: 0, vx: 0, vy: 0, frame: 0,
      tail, tailHead: 0, rings, particles, sparks,
    }

    const draw = () => {
      rafId = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (!visible_) return
      frame++

      vx    = lerp(vx, mx - dx, 0.3)
      vy    = lerp(vy, my - dy, 0.3)
      speed = clamp(Math.hypot(vx, vy), 0, 50)

      if (rainbowMode) {
        const h = ((frame * 0.02 * 60) % 360) / 60
        const s = 1, l = 0.55
        const c2 = (1 - Math.abs(2 * l - 1)) * s
        const x2 = c2 * (1 - Math.abs(h % 2 - 1))
        const [r1,g1,b1] = h<1?[c2,x2,0]:h<2?[x2,c2,0]:h<3?[0,c2,x2]:h<4?[0,x2,c2]:h<5?[x2,0,c2]:[c2,0,x2]
        const m = l - c2/2
        curR = Math.round((r1+m)*255); curG = Math.round((g1+m)*255); curB = Math.round((b1+m)*255)
      }

      if (breakMode) {
        breakIntensity = Math.min(breakIntensity + 0.05, 100)
        const I = breakIntensity / 100
        if (I > 0.5) cursorScale = Math.max(0, cursorScale - 0.0003)
        const jitter = I * 30 * (1 + Math.sin(frame * 0.1) * 0.5)
        dx = lerp(dx, mx, 0.55) + (Math.random() - 0.5) * jitter
        dy = lerp(dy, my, 0.55) + (Math.random() - 0.5) * jitter
        rx = lerp(rx, mx, 0.10) + (Math.random() - 0.5) * jitter * 2.5
        ry = lerp(ry, my, 0.10) + (Math.random() - 0.5) * jitter * 2.5
        const t = frame * (0.05 + I * 0.3)
        if (I > 0.15) {
          curR = Math.floor(128 + Math.sin(t * 1.3) * 127 * I)
          curG = Math.floor(128 + Math.sin(t * 0.7 + 2) * 127 * I)
          curB = Math.floor(128 + Math.sin(t * 1.9 + 4) * 127 * I)
        }
        const ghostCount = Math.floor(I * 10)
        for (let g = 0; g < ghostCount; g++) {
          const gx = mx + (Math.random()-0.5) * I * 200
          const gy = my + (Math.random()-0.5) * I * 200
          const gr = Math.random()*255|0, gg2 = Math.random()*255|0, gb2 = Math.random()*255|0
          const ga = Math.random() * 0.4 * I
          ctx.beginPath(); ctx.arc(gx, gy, (3+Math.random()*8)*I, 0, Math.PI*2); ctx.fillStyle = `rgba(${gr},${gg2},${gb2},${ga})`; ctx.fill()
          ctx.beginPath(); ctx.arc(gx, gy, (10+Math.random()*30)*I, 0, Math.PI*2); ctx.strokeStyle = `rgba(${gr},${gg2},${gb2},${ga*0.6})`; ctx.lineWidth = Math.random()*3*I; ctx.stroke()
        }
        if (Math.random() < I * 0.5) rings.push({ x: dx+(Math.random()-0.5)*120*I, y: dy+(Math.random()-0.5)*120*I, r:0, life:1, maxR: 15+Math.random()*60*I })
        if (I > 0.4 && Math.random() < I * 0.15) rings.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r:0, life:1, maxR: 10+Math.random()*40 })
        if (I > 0.4 && Math.random() < I * 0.35) { ctx.save(); ctx.fillStyle = `rgba(${Math.random()*255|0},${Math.random()*255|0},${Math.random()*255|0},${I*0.2})`; ctx.fillRect(0, Math.random()*canvas.height, canvas.width, 1+Math.random()*6*I); ctx.restore() }
        if (I > 0.6 && Math.random() < I * 0.2) { ctx.save(); ctx.strokeStyle = `rgba(255,${Math.random()*100|0},${Math.random()*255|0},${I*0.5})`; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(0,Math.random()*canvas.height); ctx.lineTo(canvas.width,Math.random()*canvas.height); ctx.stroke(); ctx.restore() }
        if (I > 0.7 && Math.random() < I * 0.25) { for (let n = 0; n < Math.floor(I*40); n++) { ctx.fillStyle=`rgba(${Math.random()*255|0},${Math.random()*255|0},${Math.random()*255|0},${Math.random()*0.6})`; ctx.fillRect(mx+(Math.random()-0.5)*200, my+(Math.random()-0.5)*200, Math.random()*4, Math.random()*4) } }
      } else {
        dx = lerp(dx, mx, 0.55); dy = lerp(dy, my, 0.55)
        rx = lerp(rx, mx, 0.10); ry = lerp(ry, my, 0.10)
      }

      clickBlend  = lerp(clickBlend,  clicking ? 1 : 0, 0.30)
      typingBlend = lerp(typingBlend, typing   ? 1 : 0, 0.18)

      tailFrame++
      if (tailFrame % TAIL_GAP === 0) {
        tail[tailHead] = { x: dx, y: dy, speed }
        tailHead = (tailHead + 1) % TAIL_LEN
      }

      if (speed > 8 && Math.random() < 0.3 && (cursorStyle === 1 || cursorStyle === 4)) {
        sparks.push({ x: dx, y: dy, vx: (Math.random()-0.5)*2, vy: (Math.random()-0.5)*2, life: 0.4+Math.random()*0.3 })
      }

      if (cursorScale <= 0.01) return

      // Reused across frames instead of allocated fresh each tick to cut GC pressure.
      drawProps.dx = dx; drawProps.dy = dy; drawProps.rx = rx; drawProps.ry = ry
      drawProps.curR = curR; drawProps.curG = curG; drawProps.curB = curB
      drawProps.clickBlend = clickBlend; drawProps.typingBlend = typingBlend
      drawProps.speed = speed; drawProps.vx = vx; drawProps.vy = vy; drawProps.frame = frame
      drawProps.tailHead = tailHead

      if (breakMode && cursorScale < 1) {
        ctx.save(); ctx.translate(dx, dy); ctx.scale(cursorScale, cursorScale); ctx.translate(-dx, -dy)
        dispatchStyle(cursorStyle, drawProps)
        ctx.restore()
      } else {
        dispatchStyle(cursorStyle, drawProps)
      }
    }

    function dispatchStyle(s: number, props: DrawCtx) {
      switch (s) {
        case 2: drawStyle2(props); break
        case 3: drawStyle3(props); break
        case 4: drawStyle4(props); break
        case 5: drawStyle5(props); break
        default: drawStyle1(props)
      }
    }

    dx = rx = mx = window.innerWidth  / 2
    dy = ry = my = window.innerHeight / 2
    tail.forEach(pt => { pt.x = dx; pt.y = dy; pt.speed = 0 })
    rafId = requestAnimationFrame(draw)

    // Background tabs still receive rAF ticks on some platforms - stop the
    // loop outright instead of relying on browser throttling.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId)
      } else {
        rafId = requestAnimationFrame(draw)
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("resize",            resize)
      window.removeEventListener("rm:cursor-color",   onColorChange)
      window.removeEventListener("rm:cursor-style",   onStyleChange)
      window.removeEventListener("rm:cursor-break",   onBreak)
      window.removeEventListener("rm:cursor-fix",     onFix)
      window.removeEventListener("rm:cursor-rainbow", onRainbow)
      document.removeEventListener("mousemove",  onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mousedown",  onDown)
      document.removeEventListener("mouseup",    onUp)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
    />
  )
}
