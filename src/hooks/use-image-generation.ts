'use client';

import { useCallback } from 'react';
import { usePicatssoStore } from './use-picatsso-store';
import type { GeneratedArtwork } from '@/lib/types';

/** 아트워크 이미지 생성 API 호출 훅 */
export function useImageGeneration() {
  const {
    analysis, sceneDescription, sceneImage,
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
      /** 장면 사진이 있으면 FormData로, 없으면 JSON으로 전달 */
      const response = sceneImage
        ? await sendWithSceneImage(analysis, sceneDescription, sceneImage)
        : await sendJsonOnly(analysis, sceneDescription);

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
  }, [analysis, sceneDescription, sceneImage, setArtworks, setGenerationLoading, setGenerationError, goToStep]);

  return { generate };
}

/** 장면 사진이 있을 때 — FormData로 사진 + JSON 전달 */
async function sendWithSceneImage(
  analysis: NonNullable<ReturnType<typeof usePicatssoStore.getState>['analysis']>,
  sceneDescription: string,
  sceneImage: File,
): Promise<Response> {
  const formData = new FormData();
  formData.append('analysis', JSON.stringify(analysis));
  formData.append('sceneDescription', sceneDescription);
  formData.append('sceneImage', sceneImage);

  return fetch('/api/generate', {
    method: 'POST',
    body: formData,
  });
}

/** 장면 사진이 없을 때 — 기존처럼 JSON 전달 */
async function sendJsonOnly(
  analysis: NonNullable<ReturnType<typeof usePicatssoStore.getState>['analysis']>,
  sceneDescription: string,
): Promise<Response> {
  return fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ analysis, sceneDescription }),
  });
}
