'use client';

import type { KpiMetric } from '@coaching-ops/types';
import { Card, CardContent, Text } from '@coaching-ops/ui';

export function KpiGrid({ metrics }: { metrics: KpiMetric[] }) {
  return (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <CardContent style={{ display: 'grid', gap: 10 }}>
            <Text style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {metric.label}
            </Text>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc' }}>{metric.value}</div>
            {metric.delta ? <Text>{metric.delta}</Text> : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
