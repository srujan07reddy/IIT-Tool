import type { ContextCard } from '@coaching-ops/types';
import { Card, Text, Button } from '@coaching-ops/ui';

interface Props {
  card: ContextCard;
  onVerify?: () => void;
}

export function AIConceptCard({ card, onVerify }: Props) {
  return (
    <Card className="p-6 max-w-md ml-8">
      <Text className="font-bold mb-4">AI Context Card</Text>
      <div>
        <Text className="font-semibold mb-2">Why Learn This?</Text>
        <Text className="text-sm mb-4 text-muted-foreground">{card.content.whyLearn}</Text>
      </div>
      <div>
        <Text className="font-semibold mb-2">Teaching Strategy</Text>
        <Text className="text-sm text-muted-foreground">{card.content.realWorldApplication}</Text>
      </div>
      {!card.isVerified && (
        <Button onClick={onVerify} className="mt-4">
          Verify Content
        </Button>
      )}
    </Card>
  );
}
