// src/pages/Contact.jsx
// Bridge surface. Three contact cards + EmailJS-powered form. Toast
// feedback, fallback mailto, dual-send (notification + confirmation).

import { useState } from "react";
import { Mail, Github, Linkedin, Send, AlertCircle, Clock } from "lucide-react";
import emailjs from "@emailjs/browser";

import { Section } from "../components/layout/PageShell";
import SectionHeader from "../components/ui/SectionHeader";
import Card, { CardBody } from "../components/ui/Card";
import Chip from "../components/ui/Chip";
import Button from "../components/ui/Button";
import { ToastContainer } from "../components/ui/Toast";
import { useToast } from "../hooks/useToast";
import { cn } from "../lib/cn";

import contactJson from "../portfolio_data/content/contact.json";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SERVICE_ID  = contactJson.form.emailJs.serviceId;
const TPL_NOTIFY  = contactJson.form.emailJs.templates.notification;
const TPL_CONFIRM = contactJson.form.emailJs.templates.confirmation;
const PUBLIC_KEY  = contactJson.form.emailJs.publicKey;
const FALLBACK    = contactJson.form.emailJs.fallbackEmail;

const ICON_FOR = { Mail, Github, Linkedin };

function ContactCard({ c }) {
  const Icon = ICON_FOR[c.icon] || Mail;
  return (
    <a
      href={c.link}
      target={c.link.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="block p-5 rounded-sm border border-rule bg-carbon-1 hover:border-terminal/60 hover:bg-carbon-2 transition-[border-color,background-color] duration-180 ease-out"
    >
      <div className="flex items-center gap-2 text-ink-2">
        <Icon size={14} strokeWidth={1.75} className="text-terminal" />
        <span className="font-mono text-xs uppercase">{c.title}</span>
      </div>
      <div className="mt-3 text-base text-ink font-medium break-all">{c.value}</div>
    </a>
  );
}

export default function Contact() {
  const { toasts, addToast, removeToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "ok" | "err" | null

  const onChange = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: null }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Required.";
    if (!form.email.trim()) er.email = "Required.";
    else if (!EMAIL_RE.test(form.email)) er.email = "That doesn't look like a valid email.";
    if (!form.message.trim()) er.message = "Required.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast({ type: "error", title: "Form incomplete", message: "Please fix the highlighted fields." });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    const payload = {
      user_name: form.name,
      email: form.email,
      subject: form.subject || "Portfolio Contact",
      message: form.message,
      timestamp: new Date().toLocaleString(),
    };
    try {
      // Send both: notification to me + confirmation to visitor.
      await Promise.all([
        emailjs.send(SERVICE_ID, TPL_NOTIFY,  payload, { publicKey: PUBLIC_KEY }),
        emailjs.send(SERVICE_ID, TPL_CONFIRM, payload, { publicKey: PUBLIC_KEY }),
      ]);
      setStatus("ok");
      setForm({ name: "", email: "", subject: "", message: "" });
      addToast({
        type: "success",
        title: "Message sent",
        message: "Thanks. I'll reply within 24–48 hours.",
      });
    } catch (err) {
      setStatus("err");
      addToast({
        type: "error",
        title: "Couldn't send via EmailJS",
        message: `Email me directly at ${FALLBACK}.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <Section as="section" className="pt-2 md:pt-6 pb-10">
        <div className="font-mono text-xs text-ink-3 mb-3">
          <span className="text-terminal">$</span> cat ./contact.txt
        </div>
        <h1 className="text-fluid-display font-semibold text-ink">
          {contactJson.header.title}
        </h1>
        <p className="mt-3 max-w-prose text-base md:text-lg text-ink-2 leading-relaxed">
          {contactJson.header.subtitle}
        </p>
      </Section>

      {/* ── CARDS ─────────────────────────────────────────────── */}
      <Section className="pt-2 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {contactJson.contactInfo.map((c) => (
            <ContactCard key={c.title} c={c} />
          ))}
        </div>
      </Section>

      {/* ── FORM ──────────────────────────────────────────────── */}
      <Section className="pt-2 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div>
            <SectionHeader
              eyebrow="message"
              title="Send a message"
              lede="I'll get a notification and you'll get a confirmation email."
            />
            <form
              onSubmit={onSubmit}
              noValidate
              className="mt-6 flex flex-col gap-4 max-w-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  id="name"
                  label="Name"
                  value={form.name}
                  onChange={onChange("name")}
                  error={errors.name}
                  required
                />
                <Field
                  id="email"
                  type="email"
                  label="Email"
                  value={form.email}
                  onChange={onChange("email")}
                  error={errors.email}
                  required
                />
              </div>
              <Field
                id="subject"
                label="Subject (optional)"
                value={form.subject}
                onChange={onChange("subject")}
              />
              <Field
                id="message"
                label="Message"
                value={form.message}
                onChange={onChange("message")}
                error={errors.message}
                multiline
                rows={6}
                required
              />

              <div className="flex items-center gap-3 flex-wrap">
                <Button
                  as="button"
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={submitting}
                  trailingArrow
                >
                  <Send size={14} strokeWidth={1.75} />
                  {submitting ? "Sending…" : "Send message"}
                </Button>
                <span className="inline-flex items-center gap-1.5 text-sm text-ink-2">
                  <Clock size={13} strokeWidth={1.75} />
                  {contactJson.responseTime}
                </span>
              </div>

              {status === "ok" && (
                <div role="status" className="rounded-sm border border-signal-ok/40 bg-signal-ok/10 p-3 text-sm text-ink-1">
                  <strong className="text-signal-ok">Sent.</strong> I'll get back to you soon.
                </div>
              )}
              {status === "err" && (
                <div role="alert" className="rounded-sm border border-signal-err/40 bg-signal-err/10 p-3 text-sm text-ink-1 flex items-start gap-2">
                  <AlertCircle size={14} strokeWidth={1.75} className="text-signal-err mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-signal-err">Couldn't send.</strong>{" "}
                    Email me directly at{" "}
                    <a className="text-terminal underline underline-offset-4" href={`mailto:${FALLBACK}`}>
                      {FALLBACK}
                    </a>
                    .
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Sidebar: tags + alternate email */}
          <aside className="flex flex-col gap-4">
            <Card>
              <CardBody>
                <div className="font-mono text-xs text-ink-3 mb-3">
                  <span className="text-terminal">$</span> tags
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {contactJson.tags.map((t) => (
                    <Chip key={t} size="sm" variant="tech">{t}</Chip>
                  ))}
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="font-mono text-xs text-ink-3 mb-3">
                  <span className="text-terminal">$</span> email --primary
                </div>
                <a
                  className="text-sm text-ink-1 hover:text-terminal-1 break-all"
                  href={`mailto:${FALLBACK}`}
                >
                  {FALLBACK}
                </a>
                <p className="mt-2 text-xs text-ink-3">
                  Primary address. Replies within 24–48 hours.
                </p>
              </CardBody>
            </Card>
          </aside>
        </div>
      </Section>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}

function Field({ id, label, type = "text", value, onChange, error, required, multiline, rows }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs text-ink-2 mb-1.5">
        {label}
        {required && <span className="text-signal-err ml-1" aria-hidden="true">*</span>}
      </label>
      <Tag
        id={id}
        name={id}
        type={multiline ? undefined : type}
        rows={rows}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(
          "w-full rounded-sm bg-carbon-1 border text-sm text-ink placeholder:text-ink-3",
          "px-3 py-2.5 focus:outline-none focus:border-terminal",
          "transition-colors duration-180 ease-out",
          multiline ? "resize-y min-h-32 font-mono" : "h-10",
          error ? "border-signal-err/60" : "border-rule"
        )}
      />
      {error && (
        <div id={`${id}-err`} className="mt-1.5 text-xs text-signal-err font-mono">
          {error}
        </div>
      )}
    </div>
  );
}
