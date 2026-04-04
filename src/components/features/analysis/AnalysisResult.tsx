'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { Badge } from '@/components/ui/badge';

export function AnalysisResult() {
  const analysis = usePicatssoStore((s) => s.analysis);
  if (!analysis) return null;

  const energyLabel = { high: '높음 🔥', medium: '보통 ✨', low: '낮음 😴' };

  return (
    <div className="space-y-4">
      {/* 성격 유형 */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">당신의 고양이는...</p>
        <h3 className="text-3xl font-bold picatsso-title">{analysis.personalityType}</h3>
      </div>

      {/* 성격 설명 */}
      <p className="text-center text-muted-foreground leading-relaxed">
        {analysis.description}
      </p>

      {/* 키워드 배지 */}
      <div className="flex flex-wrap justify-center gap-2">
        {analysis.keywords.map((keyword) => (
          <Badge key={keyword} variant="outline" className="border-[#4A90D9] text-[#4A90D9]">
            {keyword}
          </Badge>
        ))}
      </div>

      {/* 에너지 레벨 */}
      <div className="text-center text-sm text-muted-foreground">
        에너지 레벨: {energyLabel[analysis.energyLevel]}
      </div>
    </div>
  );
}
