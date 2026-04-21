import { ApplicationStage } from '@coaching-ops/types';
import { Badge, Card, CardContent, CardHeader, CardTitle, Heading, Stack, Text } from '@coaching-ops/ui';

import { ApplicationTimeline } from '@/components/applications/application-timeline';
import { DocumentChecklist } from '@/components/applications/document-checklist';
import { PaymentSummary } from '@/components/applications/payment-summary';
import { listApplications } from '@/services/applications.service';

const stages = [
  ApplicationStage.DRAFT,
  ApplicationStage.DOCUMENTS_PENDING,
  ApplicationStage.READY_FOR_SUBMISSION,
];

export default async function ApplicationsPage() {
  const applications = await listApplications();
  const featuredApplication = applications[0];

  return (
    <Stack gap={20}>
      <div>
        <Heading>Operations dashboard</Heading>
        <Text>Grouped application pipeline with high-level stage counts and action tools for the operations team.</Text>
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {stages.map((stage) => {
          const count = applications.filter((item) => item.stage === stage).length;
          return (
            <Card key={stage}>
              <CardContent style={{ display: 'grid', gap: 8 }}>
                <Text style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.8rem' }}>
                  {stage.replaceAll('_', ' ')}
                </Text>
                <div style={{ fontSize: '2rem', fontWeight: 800 }}>{count}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', alignItems: 'start' }}>
        {stages.map((stage) => (
          <Card key={stage}>
            <CardHeader>
              <CardTitle>{stage.replaceAll('_', ' ')}</CardTitle>
            </CardHeader>
            <CardContent style={{ display: 'grid', gap: 12 }}>
              {applications
                .filter((item) => item.stage === stage)
                .map((application) => (
                  <div
                    key={application.id}
                    style={{
                      borderRadius: 18,
                      border: '1px solid rgba(148, 163, 184, 0.16)',
                      padding: '1rem',
                      background: 'rgba(30, 41, 59, 0.42)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <strong>
                        {application.student.firstName} {application.student.lastName}
                      </strong>
                      <Badge tone="info">{application.examName}</Badge>
                    </div>
                    <Text style={{ marginTop: 8 }}>{application.student.email}</Text>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {featuredApplication ? (
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1.15fr 1fr' }}>
          <ApplicationTimeline events={featuredApplication.timeline} />
          <div style={{ display: 'grid', gap: 16 }}>
            <DocumentChecklist initialItems={featuredApplication.checklist} />
            <PaymentSummary summary={featuredApplication.paymentSummary} />
          </div>
        </div>
      ) : null}
    </Stack>
  );
}
