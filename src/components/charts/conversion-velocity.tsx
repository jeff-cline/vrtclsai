"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { conversionVelocity } from "@/lib/mock-data";

export function ConversionVelocityChart({ height = 280 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={conversionVelocity} margin={{ top: 10, right: 18, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="2 4" stroke="rgba(220,227,234,0.07)" />
        <XAxis
          dataKey="day"
          stroke="rgba(220,227,234,0.4)"
          tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }}
          tickFormatter={(v) => `D${v}`}
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
        />
        <Legend
          wrapperStyle={{
            fontFamily: "IBM Plex Mono",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
          formatter={(v) => (v === "predictive" ? "Predictive cohort" : "Cold list")}
        />
        <Line
          type="monotone"
          dataKey="predictive"
          stroke="#00D084"
          strokeWidth={2.5}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="cold"
          stroke="#FFC857"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
