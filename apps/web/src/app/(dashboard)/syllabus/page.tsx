import { Heading, Stack, Text } from '@coaching-ops/ui';

import { AiConceptCard } from '@/components/syllabus/ai-concept-card';
import { TopicStatusTable } from '@/components/syllabus/topic-status-table';
import { getTeachingConceptCard } from '@/services/context-cards.service';
import { getFullSyllabusTree } from '@/services/syllabus.service';

export default async function SyllabusPage() {
  const [tree, conceptCard] = await Promise.all([
    getFullSyllabusTree(),
    getTeachingConceptCard('Newton Laws'),
  ]);

  return (
    <Stack gap={20}>
      <div>
        <Heading>Course tracking dashboard</Heading>
        <Text>Hierarchical syllabus progress, inline status mutations, and AI teaching context now live in one faculty surface.</Text>
      </div>
      <AiConceptCard
        teachingStrategy={conceptCard.teachingStrategy}
        whyLearn={conceptCard.whyLearn}
      />
      <TopicStatusTable data={tree} />
    </Stack>
  );
}
