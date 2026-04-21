import { Card, CardContent, CardHeader, CardTitle, Heading, Stack, Text } from '@coaching-ops/ui';

export default function DashboardPage() {
  const cards = [
    {
      title: 'Admissions Pulse',
      body: '42 students need counselor follow-up before the next scholarship cut-off.',
    },
    {
      title: 'Faculty Load',
      body: 'Physics team is 86% through this week’s closure target with two batches at risk.',
    },
    {
      title: 'Operations Desk',
      body: '17 exam applications are awaiting document verification or fee clearance.',
    },
  ];

  return (
    <Stack gap={20}>
      <div>
        <Heading>Operational overview</Heading>
        <Text>One shared shell now wraps the authenticated product surface, ready for role-aware workflows.</Text>
      </div>
      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>{card.body}</Text>
            </CardContent>
          </Card>
        ))}
      </div>
    </Stack>
  );
}
