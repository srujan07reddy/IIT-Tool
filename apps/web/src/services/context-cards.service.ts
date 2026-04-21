export interface ConceptCardContent {
  teachingStrategy: string;
  whyLearn: string;
}

export async function getTeachingConceptCard(topicName: string): Promise<ConceptCardContent> {
  return Promise.resolve({
    teachingStrategy: `Anchor ${topicName} in a recent exam pattern, then move from visual intuition to timed problem drills.`,
    whyLearn: `${topicName} unlocks linked problems in mixed-topic sections, so conceptual fluency directly improves score stability.`,
  });
}
