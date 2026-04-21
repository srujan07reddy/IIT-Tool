'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Text } from '@coaching-ops/ui';

export function AiConceptCard({
  teachingStrategy,
  whyLearn,
}: {
  teachingStrategy: string;
  whyLearn: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      style={{
        background: 'linear-gradient(135deg, rgba(14, 116, 144, 0.26), rgba(37, 99, 235, 0.18))',
        border: '1px solid rgba(125, 211, 252, 0.18)',
      }}
    >
      <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div>
          <CardTitle>AI teaching context</CardTitle>
          <Text>Expandable faculty support panel</Text>
        </div>
        <button
          onClick={() => setExpanded((current) => !current)}
          style={{
            borderRadius: 999,
            border: '1px solid rgba(125, 211, 252, 0.2)',
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#f8fafc',
            padding: '0.65rem 0.9rem',
            cursor: 'pointer',
          }}
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </CardHeader>
      {expanded ? (
        <CardContent style={{ display: 'grid', gap: 14 }}>
          <div>
            <h4 style={{ margin: '0 0 0.35rem', color: '#f8fafc' }}>Teaching strategy</h4>
            <Text>{teachingStrategy}</Text>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.35rem', color: '#f8fafc' }}>Why learn</h4>
            <Text>{whyLearn}</Text>
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
}
