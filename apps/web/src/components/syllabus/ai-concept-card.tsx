import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Text } from '@coaching-ops/ui';
import { BrainCircuit, X } from 'lucide-react';

interface AiConceptCardProps {
  topic?: any;
  onClose?: () => void;
  teachingStrategy?: string;
  whyLearn?: string;
}

export function AiConceptCard({ topic, onClose, teachingStrategy, whyLearn }: AiConceptCardProps) {
  const strategy = teachingStrategy || "Start with a real-world example. Focus on common pitfalls: students often confuse mass with weight here. Use visual diagrams to illustrate the vectors before moving to formulas.";
  const imperative = whyLearn || "This concept forms the foundation for understanding complex mechanics. Historically, 15% of advanced JEE questions rely on a solid conceptual grasp of this specific topic.";
  const title = topic?.topic || "Neural Link Overview";
  return (
    <Card className="bg-[#0a0a0a]/90 backdrop-blur-[10px] border border-[#FF00E5] shadow-[0_0_20px_rgba(255,0,229,0.15)] rounded-none relative h-full">
      {onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 text-[#FF00E5]/50 hover:text-[#FF00E5] hover:drop-shadow-[0_0_5px_#FF00E5] transition-all">
          <X className="w-5 h-5" />
        </button>
      )}
      <CardHeader className="pb-4 border-b border-[#FF00E5]/30">
        <div className="flex items-center gap-2 mb-2">
          <BrainCircuit className="w-5 h-5 text-[#FF00E5] drop-shadow-[0_0_5px_#FF00E5]" />
          <span className="text-[10px] font-black text-[#FF00E5] uppercase tracking-widest drop-shadow-[0_0_5px_#FF00E5]">AI Neural Link</span>
        </div>
        <CardTitle className="text-lg font-bold uppercase tracking-wider text-[#E0E0E0]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        <div className="bg-[#FF00E5]/5 border border-[#FF00E5]/30 p-4 rounded-none shadow-[inset_0_0_10px_rgba(255,0,229,0.05)]">
          <Text className="text-[10px] font-black text-[#FF00E5] uppercase tracking-widest mb-2 drop-shadow-[0_0_2px_#FF00E5]">Strategic Imperative</Text>
          <Text className="text-xs text-[#E0E0E0]/80 leading-relaxed font-mono">
            {imperative}
          </Text>
        </div>
        <div className="bg-[#00F3FF]/5 border border-[#00F3FF]/30 p-4 rounded-none shadow-[inset_0_0_10px_rgba(0,243,255,0.05)]">
          <Text className="text-[10px] font-black text-[#00F3FF] uppercase tracking-widest mb-2 drop-shadow-[0_0_2px_#00F3FF]">Execution Vector</Text>
          <Text className="text-xs text-[#E0E0E0]/80 leading-relaxed font-mono">{strategy}</Text>
        </div>
      </CardContent>
    </Card>
  );
}