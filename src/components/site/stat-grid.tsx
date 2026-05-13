import { trustStats } from "@/lib/mock-data";

export function StatGrid() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-platinum/10 bg-platinum/5 sm:grid-cols-3 lg:grid-cols-6">
      {trustStats.map((s) => (
        <div key={s.label} className="bg-navy-900/80 p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ai-cyan">
            {s.label}
          </div>
          <div className="mt-3 font-display text-3xl font-semibold tracking-tight text-white num">
            {s.value}
          </div>
          <div className="mt-1.5 text-[11px] text-platinum/50">{s.note}</div>
        </div>
      ))}
    </div>
  );
}
