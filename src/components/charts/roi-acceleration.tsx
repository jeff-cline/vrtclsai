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
import { roiAcceleration } from "@/lib/mock-data";

export function RoiAccelerationChart({ height = 280 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={roiAcceleration} margin={{ top: 10, right: 18, left: 0, bottom: 4 }}>
        <defs>
          <linearGradient id="gradRoi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D084" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#00D084" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradRoiTrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2F80ED" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#2F80ED" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke="rgba(220,227,234,0.07)" />
        <XAxis
          dataKey="week"
          stroke="rgba(220,227,234,0.4)"
          tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }}
          tickFormatter={(v) => `W${v}`}
        />
        <YAxis
          stroke="rgba(220,227,234,0.4)"
          tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }}
          tickFormatter={(v) => `${v}x`}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(11,22,39,0.95)",
            border: "1px solid rgba(0,194,255,0.3)",
            borderRadius: 8,
            fontFamily: "IBM Plex Mono",
            fontSize: 12,
          }}
          formatter={(v: number) => `${v}x`}
        />
        <Legend
          wrapperStyle={{
            fontFamily: "IBM Plex Mono",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
          formatter={(v) => (v === "predictive" ? "Predictive (cum. ROAS)" : "Traditional baseline")}
        />
        <Area
          type="monotone"
          dataKey="traditional"
          stroke="#2F80ED"
          fill="url(#gradRoiTrad)"
          strokeWidth={1.5}
        />
        <Area
          type="monotone"
          dataKey="predictive"
          stroke="#00D084"
          fill="url(#gradRoi)"
          strokeWidth={2.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
