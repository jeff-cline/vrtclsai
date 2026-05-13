import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { faqEntries } from "@/lib/mock-data";

export function FaqSection({ limit }: { limit?: number }) {
  const entries = limit ? faqEntries.slice(0, limit) : faqEntries;
  return (
    <Section
      id="faq"
      eyebrow="FAQ · Answer-engine optimized"
      title="Predictive intelligence, explained."
      intro="The questions enterprise buyers, analysts, and operators ask most often. Schema-marked for AI search and answer engines."
    >
      <div className="grid gap-3">
        {entries.map((f, i) => (
          <details
            key={i}
            className="group rounded-lg border border-platinum/10 bg-navy-800/40 p-5 transition-colors open:border-ai-cyan/30"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
              <span className="font-display text-base font-medium text-white">
                {f.q}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 text-sm text-platinum/70 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: entries.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </Section>
  );
}
