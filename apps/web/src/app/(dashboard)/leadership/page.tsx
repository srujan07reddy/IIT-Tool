import { Heading, Stack, Text } from '@coaching-ops/ui';

import { KpiGrid } from '@/components/leadership/kpi-grid';
import { ReadinessHeatmap } from '@/components/leadership/readiness-heatmap';
import { getLeadershipKpis, getReadinessHeatmap } from '@/services/management.service';

export default async function LeadershipPage() {
  const [metrics, heatmap] = await Promise.all([getLeadershipKpis(), getReadinessHeatmap()]);

  return (
    <Stack gap={20}>
      <div>
        <Heading>Leadership management</Heading>
        <Text>Executive summary layout with concurrent data fetches and a restrained dashboard treatment.</Text>
      </div>
      <KpiGrid metrics={metrics} />
      <ReadinessHeatmap data={heatmap} />
    </Stack>
  );
}
