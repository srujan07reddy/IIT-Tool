'use client';

import { useState } from 'react';
import type { ApplicationDocumentCheck } from '@coaching-ops/types';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Dialog, Text } from '@coaching-ops/ui';

export function DocumentChecklist({ initialItems }: { initialItems: ApplicationDocumentCheck[] }) {
  const [items, setItems] = useState(initialItems);
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    status: 'VERIFIED' | 'REJECTED';
  } | null>(null);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Document checklist</CardTitle>
        </CardHeader>
        <CardContent style={{ display: 'grid', gap: 12 }}>
          {items.map((item) => (
            <label
              key={item.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                gap: 12,
                alignItems: 'center',
                borderRadius: 16,
                padding: '0.9rem 1rem',
                border: '1px solid rgba(148, 163, 184, 0.16)',
              }}
            >
              <div>
                <strong>{item.label}</strong>
                <Text>{item.reviewer ? `Reviewed by ${item.reviewer}` : 'Awaiting action'}</Text>
              </div>
              <Badge
                tone={item.status === 'VERIFIED' ? 'success' : item.status === 'REJECTED' ? 'danger' : 'warning'}
              >
                {item.status}
              </Badge>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button type="button" variant="secondary" onClick={() => setPendingAction({ id: item.id, status: 'VERIFIED' })}>
                  Verify
                </Button>
                <Button type="button" variant="danger" onClick={() => setPendingAction({ id: item.id, status: 'REJECTED' })}>
                  Reject
                </Button>
              </div>
            </label>
          ))}
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(pendingAction)}
        title="Confirm document action"
        description="This confirmation modal is intentionally routed through the shared UI layer before any mutation."
        onClose={() => setPendingAction(null)}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button type="button" variant="ghost" onClick={() => setPendingAction(null)}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (!pendingAction) return;
                setItems((current) =>
                  current.map((item) =>
                    item.id === pendingAction.id ? { ...item, status: pendingAction.status } : item,
                  ),
                );
                setPendingAction(null);
              }}
            >
              Confirm
            </Button>
          </div>
        }
      />
    </>
  );
}
