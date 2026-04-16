"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ScrollDepthData {
  depth: number; // 0-100
  users: number;
}

interface ScrollDepthChartProps {
  data?: ScrollDepthData[];
}

const DEFAULT_DATA: ScrollDepthData[] = [
  { depth: 10, users: 100 },
  { depth: 25, users: 87 },
  { depth: 50, users: 62 },
  { depth: 75, users: 38 },
  { depth: 90, users: 21 },
  { depth: 100, users: 14 },
];

function getBarColor(depth: number): string {
  if (depth <= 25) return "#22c55e";
  if (depth <= 50) return "#84cc16";
  if (depth <= 75) return "#f59e0b";
  return "#ef4444";
}

export function ScrollDepthChart({ data = DEFAULT_DATA }: ScrollDepthChartProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Scroll Depth</h3>
      <p className="text-xs text-muted-foreground">% of visitors who scrolled to each depth</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="depth" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} width={36} />
          <Tooltip
            formatter={(value) => [`${value}%`, "Reached"]}
            labelFormatter={(label) => `Scroll depth: ${label}%`}
          />
          <Bar dataKey="users" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry.depth)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
