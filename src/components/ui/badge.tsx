import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "cyan",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "cyan" | "green" | "blue" | "gold" | "neutral";
}) {
  const tones = {
    cyan: "bg-ai-cyan/10 text-ai-cyan border-ai-cyan/30",
    green: "bg-ai-green/10 text-ai-green border-ai-green/30",
    blue: "bg-ai-blue/10 text-ai-blue border-ai-blue/30",
    gold: "bg-ai-gold/10 text-ai-gold border-ai-gold/30",
    neutral: "bg-platinum/10 text-platinum border-platinum/20",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em]",
        tones[tone],
        className
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
}
