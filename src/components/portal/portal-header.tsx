import { Badge } from "@/components/ui/badge";

export function PortalHeader({
  eyebrow,
  title,
  subtitle,
  liveLabel = "Live",
  tone = "green",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  liveLabel?: string;
  tone?: "green" | "cyan" | "gold";
}) {
  return (
    <header className="mb-10 flex items-end justify-between gap-6">
      <div>
        {eyebrow && (
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ai-cyan">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-platinum/65">{subtitle}</p>}
      </div>
      <Badge tone={tone} className="hidden sm:inline-flex">
        {liveLabel}
      </Badge>
    </header>
  );
}
