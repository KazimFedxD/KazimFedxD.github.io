import { BoxComputer } from "@/components/machine/box-computer"
import { SemanticFallback } from "@/components/seo/semantic-fallback"
import { JsonLd, personSchema, websiteSchema } from "@/lib/portfolio/json-ld"

export default function Home() {
  return (
    <>
      <JsonLd schema={personSchema()} />
      <JsonLd schema={websiteSchema()} />
      <BoxComputer />
      <SemanticFallback />
    </>
  )
}
