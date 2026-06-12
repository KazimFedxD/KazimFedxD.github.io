// src/components/project-detail/ApiReference.jsx
// Table of method/path/auth/description. Method is a monospace tag.

import Chip from "../ui/Chip";

const METHOD_VARIANT = {
  GET: "muted",
  POST: "success",
  PUT: "warn",
  PATCH: "warn",
  DELETE: "err",
  WS: "info",
};

const AUTH_VARIANT = {
  none: "muted",
  public: "muted",
  required: "warn",
  jwt: "info",
  true: "required",   // boolean true → required auth
  false: "none",      // boolean false → no auth
};

// Normalize the auth field to a lowercase string. Data files are inconsistent:
// some store booleans (`auth: true`), others store strings (`auth: "jwt"`).
function normalizeAuth(auth) {
  if (auth === true)  return "required";
  if (auth === false) return "none";
  if (auth == null)   return "none";
  return String(auth).toLowerCase();
}

export default function ApiReference({ endpoints }) {
  if (!endpoints || endpoints.length === 0) return null;
  return (
    <div className="flex flex-col gap-3">
      {endpoints.map((ep, i) => {
        const method = String(ep.method || "GET").toUpperCase();
        const auth = normalizeAuth(ep.auth);
        return (
          <article key={i} className="rounded-sm border border-rule bg-carbon-1 p-3 md:p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Chip
                variant={METHOD_VARIANT[method] || "muted"}
                size="sm"
                className="font-semibold"
              >
                {method}
              </Chip>
              <code className="font-mono text-sm text-ink break-all">{ep.path}</code>
              <Chip
                variant={AUTH_VARIANT[auth] || "muted"}
                size="sm"
                className="ml-auto"
              >
                {auth}
              </Chip>
            </div>
            {ep.description && (
              <p className="mt-2 text-sm text-ink-1 leading-relaxed">
                {ep.description}
              </p>
            )}
            {ep.body && (
              <pre className="mt-3 rounded-sm border border-rule bg-carbon-2 p-3 text-[12.5px] font-mono text-ink-1 overflow-x-auto">
                {typeof ep.body === "string" ? ep.body : JSON.stringify(ep.body, null, 2)}
              </pre>
            )}
            {ep.response && (
              <pre className="mt-3 rounded-sm border border-rule bg-carbon-2 p-3 text-[12.5px] font-mono text-ink-1 overflow-x-auto">
                {typeof ep.response === "string" ? ep.response : JSON.stringify(ep.response, null, 2)}
              </pre>
            )}
          </article>
        );
      })}
    </div>
  );
}
