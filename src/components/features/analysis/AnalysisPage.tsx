'use client';

import { useImageGeneration } from '@/hooks/use-image-generation';
import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { AnalysisResult } from './AnalysisResult';
import { ArtStylePreview } from './ArtStylePreview';
import { EmotionColorPreview } from './EmotionColorPreview';

export function AnalysisPage() {
  const { generate } = useImageGeneration();
  const generationError = usePicatssoStore((s) => s.generationError);

  return (
    <div className="max-w-2xl mx-auto space-y-8 step-enter">
      <AnalysisResult />

      <div className="grid md:grid-cols-2 gap-4">
        <ArtStylePreview />
        <div className="space-y-4">
          <EmotionColorPreview />
        </div>
      </div>

      {generationError && (
        <p className="text-destructive text-sm text-center">{generationError}</p>
      )}

      <div className="text-center">
        <button
          onClick={generate}
          className="bg-[#4A90D9] hover:bg-[#2E5FA1] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
        >
          🖌️ 그림 그리기
        </button>
        <p className="mt-2 text-xs text-muted-foreground">
          고양이의 시선으로 피카소풍 아트를 생성합니다
        </p>
      </div>
    </div>
  );
}
