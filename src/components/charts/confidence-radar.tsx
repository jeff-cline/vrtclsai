"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { confidenceDistribution } from "@/lib/mock-data";

export function ConfidenceRadarChart({ height = 320 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={confidenceDistribution} outerRadius="78%">
        <PolarGrid stroke="rgba(220,227,234,0.12)" />
        <PolarAngleAxis
          dataKey="industry"
          tick={{ fontSize: 10, fontFamily: "IBM Plex Mono", fill: "rgba(220,227,234,0.7)" }}
        />
        <PolarRadiusAxis
          stroke="rgba(220,227,234,0.2)"
          tick={{ fontSize: 9, fontFamily: "IBM Plex Mono", fill: "rgba(220,227,234,0.4)" }}
          angle={90}
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
        <Radar
          dataKey="confidence"
          stroke="#00C2FF"
          fill="#00C2FF"
          fillOpacity={0.25}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
