'use client';

import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import type { CohortHeatmapDatum } from '@coaching-ops/types';
import { Card, CardContent, CardHeader, CardTitle, Text } from '@coaching-ops/ui';

export function ReadinessHeatmap({ data }: { data: CohortHeatmapDatum[] }) {
  const chartData = data.map((item, index) => ({
    ...item,
    x: index + 1,
    y: item.readinessScore,
    z: item.readinessScore,
    name: `${item.cohort} - ${item.subject}`,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Readiness heatmap</CardTitle>
        <Text>Scatter intensity gives leadership a quick cohort-by-subject signal without extra drill-downs.</Text>
      </CardHeader>
      <CardContent style={{ height: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 16, right: 20, bottom: 16, left: 0 }}>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis dataKey="x" tick={false} stroke="#94a3b8" />
            <YAxis dataKey="y" stroke="#94a3b8" domain={[0, 100]} />
            <ZAxis dataKey="z" range={[180, 620]} />
            <Tooltip cursor={{ strokeDasharray: '4 4' }} />
            <Legend />
            <Scatter data={chartData} fill="#38bdf8" name="Readiness Score" />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
