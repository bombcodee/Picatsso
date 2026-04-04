'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { ArtworkGallery } from './ArtworkGallery';
import { ResultActions } from './ResultActions';

export function ResultPage() {
  const analysis = usePicatssoStore((s) => s.analysis);

  return (
    <div className="max-w-3xl mx-auto space-y-8 step-enter">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">완성!</p>
        <h2 className="text-2xl font-bold mb-2">
          <span className="picatsso-title">{analysis?.personalityType ?? '고양이'}</span>의 작품
        </h2>
        <p className="text-muted-foreground">
          고양이의 시선으로 그린 피카소풍 아트워크입니다
        </p>
      </div>

      <ArtworkGallery />
      <ResultActions />
    </div>
  );
}
