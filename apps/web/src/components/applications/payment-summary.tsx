'use client';

import type { PaymentSummary as PaymentSummaryData } from '@coaching-ops/types';
import { Badge, Card, CardContent, CardHeader, CardTitle, Text } from '@coaching-ops/ui';

export function PaymentSummary({ summary }: { summary: PaymentSummaryData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment summary</CardTitle>
      </CardHeader>
      <CardContent style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Total fee</Text>
          <strong>Rs. {summary.totalFee.toLocaleString()}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Paid</Text>
          <strong>Rs. {summary.paidAmount.toLocaleString()}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Due</Text>
          <strong>Rs. {summary.dueAmount.toLocaleString()}</strong>
        </div>
        <Badge tone={summary.status === 'CLEAR' ? 'success' : 'warning'}>
          {summary.status === 'CLEAR' ? 'No dues pending' : `Due by ${summary.dueDate ? new Date(summary.dueDate).toLocaleDateString() : 'soon'}`}
        </Badge>
      </CardContent>
    </Card>
  );
}
