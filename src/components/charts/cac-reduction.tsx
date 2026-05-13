"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { cacReduction } from "@/lib/mock-data";

export function CacReductionChart({ height = 280 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={cacReduction} margin={{ top: 10, right: 18, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="2 4" stroke="rgba(220,227,234,0.07)" />
        <XAxis
          dataKey="month"
          stroke="rgba(220,227,234,0.4)"
          tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }}
        />
        <YAxis
          stroke="rgba(220,227,234,0.4)"
          tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }}
          tickFormatter={(v) => `$${v}`}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(11,22,39,0.95)",
            border: "1px solid rgba(0,194,255,0.3)",
            borderRadius: 8,
            fontFamily: "IBM Plex Mono",
            fontSize: 12,
          }}
          formatter={(v: number) => `$${v}`}
        />
        <Legend
          wrapperStyle={{
            fontFamily: "IBM Plex Mono",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
          formatter={(v) => (v === "predictive" ? "Predictive CAC" : "Traditional CAC")}
        />
        <Bar dataKey="traditional" fill="rgba(255,200,87,0.45)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="predictive" fill="#00C2FF" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
