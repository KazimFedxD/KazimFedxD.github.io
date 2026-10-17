import type { Metadata } from "next"
import Link from "next/link"
import { PageShell, Breadcrumbs } from "@/components/seo/page-shell"
import { JsonLd, breadcrumbsSchema } from "@/lib/portfolio/json-ld"
import { getContact } from "@/lib/portfolio/content"
import { SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kazim Abbas (FedxD): email, GitHub, and LinkedIn. Open to remote backend roles and freelance work.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Kazim Abbas (FedxD)",
    description: "Email, GitHub, and LinkedIn. Replies within 24-48 hours.",
    url: `${SITE_URL}/contact`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Kazim Abbas (FedxD)",
    description: "Email, GitHub, and LinkedIn. Replies within 24-48 hours.",
  },
}

export default function ContactPage() {
  const contact = getContact()

  const breadcrumbs = breadcrumbsSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ])

  return (
    <PageShell>
      <JsonLd schema={breadcrumbs} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <header className="mb-12">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          {contact.header.title}
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          {contact.header.subtitle}
        </p>
        <p className="mt-4 font-mono text-sm text-primary">{contact.responseTime}</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-3">
        {contact.contactInfo.map((c) => {
          const isExternal = c.link.startsWith("http")
          return (
            <li key={c.title}>
              <a
                href={c.link}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="block rounded-xl border border-border bg-card p-5 transition hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <h2 className="font-mono text-sm font-semibold tracking-wide text-primary uppercase">
                  {c.title}
                </h2>
                <p className="mt-2 break-words text-sm text-foreground/85">{c.value}</p>
              </a>
            </li>
          )
        })}
      </ul>

      <section aria-labelledby="availability-heading" className="mt-16">
        <h2 id="availability-heading" className="mb-3 text-xl font-semibold tracking-tight">
          Open to
        </h2>
        <ul className="flex flex-wrap gap-2">
          {contact.tags.map((t) => (
            <li key={t} className="rounded-full bg-secondary px-3 py-1 font-mono text-sm text-secondary-foreground">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 rounded-xl border border-primary/40 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Send a message from the OS</h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/85">
          The interactive portfolio has a live contact form (EmailJS-powered). Open the OS, click the{" "}
          <span className="font-mono">Contact</span> icon, and submit.
        </p>
        <Link
          href={SITE_URL}
          className="mt-4 inline-block rounded-md border border-primary bg-primary px-4 py-2 font-mono text-sm font-semibold text-primary-foreground transition hover:brightness-110"
        >
          Open Interactive Portfolio →
        </Link>
      </section>
    </PageShell>
  )
}
