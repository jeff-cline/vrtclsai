"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { decayCurve } from "@/lib/mock-data";

export function DecayCurveChart({ height = 280 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={decayCurve} margin={{ top: 10, right: 18, left: 0, bottom: 4 }}>
        <defs>
          <linearGradient id="gradPredictive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00C2FF" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#00C2FF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradCompetitor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFC857" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#FFC857" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke="rgba(220,227,234,0.07)" />
        <XAxis
          dataKey="hour"
          stroke="rgba(220,227,234,0.4)"
          tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }}
          tickFormatter={(v) => `${v}h`}
        />
        <YAxis
          stroke="rgba(220,227,234,0.4)"
          tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(11,22,39,0.95)",
            border: "1px solid rgba(0,194,255,0.3)",
            borderRadius: 8,
            fontFamily: "IBM Plex Mono",
            fontSize: 12,
          }}
          labelFormatter={(v) => `Hour ${v}`}
          formatter={(v: number, n) => [`${v}%`, n === "quality" ? "Predictive" : "Industry avg"]}
        />
        <Legend
          wrapperStyle={{
            fontFamily: "IBM Plex Mono",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
          formatter={(v) => (v === "quality" ? "Predictive (decay-aware)" : "Industry average")}
        />
        <Area
          type="monotone"
          dataKey="competitor"
          stroke="#FFC857"
          fill="url(#gradCompetitor)"
          strokeWidth={1.5}
        />
        <Area
          type="monotone"
          dataKey="quality"
          stroke="#00C2FF"
          fill="url(#gradPredictive)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
