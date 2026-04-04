'use client';

import { useCallback } from 'react';
import { usePicatssoStore } from './use-picatsso-store';
import type { GeneratedArtwork } from '@/lib/types';

/** 아트워크 이미지 생성 API 호출 훅 */
export function useImageGeneration() {
  const {
    analysis,
    setArtworks, setGenerationLoading, setGenerationError, goToStep,
  } = usePicatssoStore();

  const generate = useCallback(async () => {
    if (!analysis) {
      setGenerationError('분석 결과가 없습니다. 먼저 고양이를 분석해주세요.');
      return;
    }

    setGenerationLoading(true);
    setGenerationError(null);
    goToStep(4); // 생성 중

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysis }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ?? '이미지 생성에 실패했습니다.');
      }

      const data = await response.json() as { artworks: GeneratedArtwork[] };
      setArtworks(data.artworks);
      setGenerationLoading(false);
      goToStep(5); // 최종 결과
    } catch (error) {
      const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      setGenerationError(message);
      goToStep(3); // 분석 결과로 돌아감
    }
  }, [analysis, setArtworks, setGenerationLoading, setGenerationError, goToStep]);

  return { generate };
}
