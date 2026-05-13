import { cn } from "@/lib/utils";
import { Container } from "./container";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-28", className)}>
      <Container className={containerClassName}>
        {(eyebrow || title || intro) && (
          <div className="mb-14 max-w-3xl">
            {eyebrow && (
              <div className="mb-4 text-[11px] uppercase tracking-[0.22em] text-ai-cyan font-mono">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-semibold tracking-tight text-balance">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-5 text-lg text-platinum/70 text-balance leading-relaxed">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
