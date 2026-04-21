import type { CohortHeatmapDatum, KpiMetric } from '@coaching-ops/types';

import { leadershipHeatmap, leadershipKpis } from '@/lib/mock-data';

export async function getLeadershipKpis(): Promise<KpiMetric[]> {
  return Promise.resolve(leadershipKpis);
}

export async function getReadinessHeatmap(): Promise<CohortHeatmapDatum[]> {
  return Promise.resolve(leadershipHeatmap);
}
