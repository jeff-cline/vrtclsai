import { liveEvents } from "@/lib/mock-data";

export function LiveTicker() {
  const items = [...liveEvents, ...liveEvents];
  return (
    <div className="relative overflow-hidden border-y border-platinum/5 bg-navy-800/40 py-3">
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-900 to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-900 to-transparent" />
      <div className="flex animate-ticker gap-12 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-platinum/70">
        {items.map((e, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ai-green shadow-[0_0_8px_rgba(0,208,132,0.8)]" />
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
