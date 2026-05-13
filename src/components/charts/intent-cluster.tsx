"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { behavioralClusters } from "@/lib/mock-data";

const palette: Record<string, string> = {
  "Intent Active": "#00D084",
  "Pre-Intent": "#00C2FF",
  Comparison: "#2F80ED",
  Dormant: "#FFC857",
};

export function IntentClusterChart({ height = 360 }: { height?: number }) {
  const groups = ["Intent Active", "Pre-Intent", "Comparison", "Dormant"];
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart margin={{ top: 10, right: 18, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="2 4" stroke="rgba(220,227,234,0.07)" />
        <XAxis
          type="number"
          dataKey="x"
          name="Behavioral signal index"
          stroke="rgba(220,227,234,0.4)"
          tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }}
          domain={[0, 100]}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Predictive score"
          stroke="rgba(220,227,234,0.4)"
          tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }}
          domain={[0, 100]}
        />
        <ZAxis type="number" dataKey="z" range={[40, 320]} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3", stroke: "rgba(0,194,255,0.4)" }}
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
        />
        {groups.map((g) => (
          <Scatter
            key={g}
            name={g}
            data={behavioralClusters.filter((c) => c.cluster === g)}
            fill={palette[g]}
            fillOpacity={0.65}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
