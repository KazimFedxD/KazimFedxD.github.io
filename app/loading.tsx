
export default function RootLoading() {
  return (
    <>
      {/* Top progress bar */}
      <div className="fixed inset-x-0 top-0 z-[9999] h-0.5 overflow-hidden bg-primary/10">
        <div
          className="h-full bg-primary"
          style={{ animation: "loading-bar 1.4s ease-in-out infinite" }}
        />
      </div>
      <style>{`
        @keyframes loading-bar {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="relative flex min-h-screen flex-col items-center justify-center gap-3" style={{ overflow: "clip" }}>
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 7%, transparent) 0%, transparent 70%)" }}
        />
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="inline-block h-2 w-2 animate-ping rounded-full bg-primary opacity-75" />
          loading...
        </div>
      </div>
    </>
  )
}

