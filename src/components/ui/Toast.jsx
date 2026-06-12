// src/components/ui/Toast.jsx
// Imperative toast notifications. Used by the contact form.

import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useToast } from "../../hooks/useToast";
import { cn } from "../../lib/cn";

const iconFor = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const colorFor = {
  success: "text-signal-ok",
  error: "text-signal-err",
  info: "text-signal-info",
};

export function ToastContainer({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;
  return (
    <div
      className="fixed top-20 right-5 z-50 flex flex-col gap-2 max-w-sm w-[calc(100vw-2.5rem)]"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((t) => {
        const Icon = iconFor[t.type] || Info;
        return (
          <div
            key={t.id}
            role={t.type === "error" ? "alert" : "status"}
            aria-live={t.type === "error" ? "assertive" : "polite"}
            className={cn(
              "flex items-start gap-3 p-3 rounded-sm border",
              "bg-carbon-1 border-rule text-ink shadow-hover-lift"
            )}
          >
            <Icon size={16} strokeWidth={1.75} className={cn("mt-0.5", colorFor[t.type])} />
            <div className="flex-1 min-w-0">
              {t.title && (
                <div className="text-sm font-medium text-ink">{t.title}</div>
              )}
              {t.message && (
                <div className="text-xs text-ink-2 mt-0.5 break-words">
                  {t.message}
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => removeToast(t.id)}
              className="text-ink-3 hover:text-ink-1 -mt-0.5 -mr-0.5 p-0.5"
            >
              <X size={14} strokeWidth={1.75} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function ToastViewport() {
  const { toasts, removeToast } = useToast();
  return <ToastContainer toasts={toasts} removeToast={removeToast} />;
}

export default ToastViewport;
