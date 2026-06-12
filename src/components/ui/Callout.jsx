// src/components/ui/Callout.jsx
// Terminal-shaped info/warn/note block. Monospace label, hairline rule,
// content in prose. No fill, no left-stripe border.

import { Info, AlertTriangle, AlertOctagon, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/cn";

const variants = {
  note:  { Icon: Info,             color: "text-ink-2",  label: "NOTE" },
  info:  { Icon: Info,             color: "text-signal-info", label: "INFO" },
  warn:  { Icon: AlertTriangle,    color: "text-signal-warn", label: "WARN" },
  err:   { Icon: AlertOctagon,     color: "text-signal-err",  label: "ERR"  },
  ok:    { Icon: CheckCircle2,     color: "text-signal-ok",   label: "OK"   },
};

export default function Callout({ kind = "note", title, children, className }) {
  const v = variants[kind] || variants.note;
  const Icon = v.Icon;
  return (
    <div
      role={kind === "warn" || kind === "err" ? "alert" : undefined}
      className={cn(
        "my-4 rounded-sm border border-rule bg-carbon-1",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-rule">
        <Icon size={14} strokeWidth={1.75} className={v.color} aria-hidden="true" />
        <span className={cn("font-mono text-xs uppercase", v.color)}>
          {title || v.label}
        </span>
      </div>
      <div className="px-4 py-3 text-sm text-ink-1 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
