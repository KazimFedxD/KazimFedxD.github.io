// src/components/project-detail/CodeSnippet.jsx
// Terminal-shaped code block. Monospace font, language label in the title
// bar, no third-party highlighter. A small "Copy" button.

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "../../lib/cn";

const LANG_HINT = {
  python: "python",
  py: "python",
  javascript: "javascript",
  js: "javascript",
  jsx: "javascript",
  tsx: "typescript",
  ts: "typescript",
  bash: "bash",
  sh: "bash",
  shell: "bash",
  dockerfile: "dockerfile",
  docker: "dockerfile",
  yaml: "yaml",
  yml: "yaml",
  json: "json",
  html: "html",
  css: "css",
  sql: "sql",
  env: "env",
  text: "text",
};

function tokenize(code, lang) {
  // Tiny, deliberate highlighter. Returns a list of {text, kind} tokens.
  // Kinds: kw, str, num, com, op, fn, tag, attr, prop, plain.
  // We do NOT aim for full coverage — just enough to make code scannable.
  const out = [];
  const lines = String(code).split("\n");
  const keywordsByLang = {
    python: /\b(def|class|import|from|return|if|elif|else|for|while|try|except|finally|raise|with|as|in|is|not|and|or|None|True|False|self|async|await|lambda|pass|yield|break|continue|global|nonlocal)\b/g,
    javascript: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|super|this|import|from|export|default|async|await|try|catch|finally|throw|of|in|typeof|instanceof|null|undefined|true|false)\b/g,
    bash: /\b(if|then|else|elif|fi|for|in|do|done|while|case|esac|function|return|exit|export|source|alias)\b/g,
    yaml: /^(---|[a-z_][\w-]*:)/gm,
  };
  const stringRe = /("[^"\n]*"|'[^'\n]*'|`[^`\n]*`)/g;
  const numberRe = /\b(\d+(?:\.\d+)?)\b/g;
  const commentRe = {
    python: /(#.*$)/gm,
    javascript: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g,
    bash: /(#.*$)/gm,
  };

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (li > 0) out.push({ text: "\n", kind: "plain" });
    let i = 0;
    while (i < line.length) {
      const rest = line.slice(i);
      // comments first
      const cm = (commentRe[lang] || /(#[^\n]*$)/gm).exec(rest);
      if (cm && cm.index === 0) {
        out.push({ text: cm[0], kind: "com" });
        i += cm[0].length;
        continue;
      }
      // strings
      const sm = stringRe.exec(rest);
      if (sm && sm.index === 0) {
        out.push({ text: sm[0], kind: "str" });
        i += sm[0].length;
        continue;
      }
      // keywords
      const kwRe = keywordsByLang[lang];
      if (kwRe) {
        kwRe.lastIndex = 0;
        const km = kwRe.exec(rest);
        if (km && km.index === 0) {
          out.push({ text: km[0], kind: "kw" });
          i += km[0].length;
          continue;
        }
      }
      // numbers
      const nm = numberRe.exec(rest);
      if (nm && nm.index === 0) {
        out.push({ text: nm[0], kind: "num" });
        i += nm[0].length;
        continue;
      }
      // default: advance one char
      out.push({ text: rest[0], kind: "plain" });
      i += 1;
    }
  }
  return out;
}

const KIND_COLOR = {
  kw: "text-terminal",
  str: "text-signal-warn",
  num: "text-signal-info",
  com: "text-ink-3 italic",
  op: "text-ink-1",
  fn: "text-ink",
  plain: "text-ink-1",
};

export default function CodeSnippet({ code, language = "text", filename, className }) {
  const [copied, setCopied] = useState(false);
  const lang = LANG_HINT[String(language).toLowerCase()] || "text";
  const tokens = useMemoStyle(code, lang);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(code));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      /* noop */
    }
  };

  return (
    <div className={cn("rounded-sm border border-rule overflow-hidden bg-carbon-2", className)}>
      <div className="flex items-center justify-between gap-2 px-3 py-1.5 border-b border-rule bg-carbon-1">
        <div className="font-mono text-[10px] text-ink-3 uppercase tracking-normal flex items-center gap-2 min-w-0">
          <span className="text-terminal">›</span>
          <span className="truncate">{filename || lang}</span>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="font-mono text-[10px] text-ink-2 hover:text-terminal-1 inline-flex items-center gap-1"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check size={11} strokeWidth={1.75} /> : <Copy size={11} strokeWidth={1.75} />}
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="m-0 p-3 overflow-x-auto text-[12.5px] leading-[1.55] font-mono whitespace-pre">
        <code>
          {tokens.map((t, i) => (
            <span key={i} className={KIND_COLOR[t.kind] || KIND_COLOR.plain}>{t.text}</span>
          ))}
        </code>
      </pre>
    </div>
  );
}

// Keep tokenizer pure per render — but use a small cache to avoid
// re-tokenizing the same code on every render of the same snippet.
function useMemoStyle(code, lang) {
  return useMemo(() => tokenize(code, lang), [code, lang]);
}
