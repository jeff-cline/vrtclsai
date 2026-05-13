import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  glow = false,
}: {
  className?: string;
  children: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-platinum/10 bg-navy-800/60 backdrop-blur-md p-6",
        glow && "glow-ring",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      className={cn(
        "font-display text-lg font-semibold text-white tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardLabel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "text-[10px] uppercase tracking-[0.18em] text-ai-cyan font-mono",
        className
      )}
    >
      {children}
    </div>
  );
}
