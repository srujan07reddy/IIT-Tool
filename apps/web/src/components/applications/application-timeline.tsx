'use client';

import type { ApplicationTimelineEvent } from '@coaching-ops/types';
import { Badge, Card, CardContent, CardHeader, CardTitle, Text } from '@coaching-ops/ui';

export function ApplicationTimeline({ events }: { events: ApplicationTimelineEvent[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application timeline</CardTitle>
      </CardHeader>
      <CardContent style={{ display: 'grid', gap: 18 }}>
        {events.map((event, index) => (
          <div key={event.id} style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 14 }}>
            <div style={{ display: 'grid', justifyItems: 'center' }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: '#38bdf8',
                  marginTop: 6,
                }}
              />
              {index < events.length - 1 ? (
                <span style={{ width: 2, flex: 1, background: 'rgba(148, 163, 184, 0.22)', minHeight: 40 }} />
              ) : null}
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <strong>{event.title}</strong>
                <Badge tone="info">{event.stage.replaceAll('_', ' ')}</Badge>
              </div>
              <Text>{event.description}</Text>
              <Text style={{ fontSize: '0.85rem' }}>
                {new Date(event.occurredAt).toLocaleDateString()} by {event.actorName}
              </Text>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
