'use client';

import { useCallback } from 'react';
import { usePicatssoStore } from './use-picatsso-store';
import { fileToBase64 } from '@/services/storage';
import type { CatAnalysis } from '@/lib/types';

/** 고양이 성격 분석 API 호출 훅 */
export function useCatAnalysis() {
  const {
    images, description, tags,
    relationshipDescription, favoriteThings, dislikedThings,
    setAnalysis, setAnalysisLoading, setAnalysisError, goToStep,
  } = usePicatssoStore();

  const analyze = useCallback(async () => {
    setAnalysisLoading(true);
    setAnalysisError(null);
    goToStep(2); // 분석 중

    try {
      const formData = new FormData();

      for (const image of images) {
        formData.append('images', image);
      }

      formData.append('description', description);
      formData.append('tags', JSON.stringify(tags));
      formData.append('relationshipDescription', relationshipDescription);
      formData.append('favoriteThings', favoriteThings);
      formData.append('dislikedThings', dislikedThings);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ?? '분석에 실패했습니다.');
      }

      const analysis: CatAnalysis = await response.json();
      setAnalysis(analysis);
      setAnalysisLoading(false);
      goToStep(3); // 분석 결과
    } catch (error) {
      const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      setAnalysisError(message);
      goToStep(1); // 입력으로 돌아감
    }
  }, [
    images, description, tags,
    relationshipDescription, favoriteThings, dislikedThings,
    setAnalysis, setAnalysisLoading, setAnalysisError, goToStep,
  ]);

  return { analyze };
}
