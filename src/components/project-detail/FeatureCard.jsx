// src/components/project-detail/FeatureCard.jsx
// Title + monospace icon label + prose + "Why it matters" + "How it works"
// + optional code snippet. One feature per card.

import CodeSnippet from "./CodeSnippet";

const ICON_MAP = {
  Mic: "🎤", Brain: "🧠", Volume2: "🔊", Languages: "🌐",
  Construction: "🚧", Code2: "💻", Sparkles: "✨", Lock: "🔒",
  Database: "🗄️", Zap: "⚡", Server: "🖥️", Shield: "🛡️",
  Trophy: "🏆", Rocket: "🚀", Mail: "✉️", Star: "⭐",
  Image: "🖼️", Cpu: "🧮", Gamepad2: "🎮", BarChart3: "📊",
  RefreshCw: "🔄", Package: "📦", GitBranch: "🌿", Eye: "👁️",
  Hash: "#", Terminal: "▶", FileText: "📄", ListChecks: "✅",
  Award: "🏅", Flame: "🔥", TrendingUp: "📈", Calculator: "🧮",
  Coins: "🪙", Map: "🗺️", BookOpen: "📖", Search: "🔍",
};

export default function FeatureCard({ feature }) {
  const emoji = ICON_MAP[feature.icon] || "·";
  return (
    <article className="rounded-sm border border-rule bg-carbon-1 p-5">
      <div className="flex items-center gap-2">
        <span className="font-mono text-base" aria-hidden="true">{emoji}</span>
        <h3 className="text-lg font-semibold text-ink leading-tight">
          {feature.title}
        </h3>
      </div>
      <p className="mt-2 text-sm text-ink-1 leading-relaxed">
        {feature.description}
      </p>

      {feature.whyItMatters && (
        <div className="mt-4">
          <div className="font-mono text-[10px] text-ink-3 uppercase mb-1.5">
            Why it matters
          </div>
          <p className="text-sm text-ink-1 leading-relaxed">
            {feature.whyItMatters}
          </p>
        </div>
      )}

      {feature.howItWorks && feature.howItWorks.length > 0 && (
        <div className="mt-4">
          <div className="font-mono text-[10px] text-ink-3 uppercase mb-1.5">
            How it works
          </div>
          <ol className="flex flex-col gap-1.5 text-sm text-ink-1">
            {feature.howItWorks.map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-mono text-xs text-terminal-1 shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {feature.codeSnippets && feature.codeSnippets.length > 0 && (
        <div className="mt-4 space-y-3">
          {feature.codeSnippets.map((s, i) => (
            <CodeSnippet key={i} language={s.language} code={s.code} filename={s.filename} />
          ))}
        </div>
      )}
    </article>
  );
}
