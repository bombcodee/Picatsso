'use client';

import { useEffect } from 'react';
import { usePicatssoStore } from './use-picatsso-store';
import type { FlowStep } from './use-picatsso-store';

const STEP_HASH: Record<FlowStep, string> = {
  0: '',
  1: '#input',
  2: '#analyzing',
  3: '#result',
  4: '#generating',
  5: '#artwork',
};

const HASH_TO_STEP: Record<string, FlowStep> = {
  '': 0,
  '#input': 1,
  '#analyzing': 2,
  '#result': 3,
  '#generating': 4,
  '#artwork': 5,
};

/** 브라우저 히스토리와 플로우 단계를 연동하는 훅 */
export function useFlowHistory() {
  const { currentStep, goToStep } = usePicatssoStore();

  // 단계 변경 시 URL 해시 업데이트
  useEffect(() => {
    const hash = STEP_HASH[currentStep];
    const currentHash = window.location.hash;

    if (currentHash !== hash) {
      if (hash === '') {
        window.history.pushState(null, '', window.location.pathname);
      } else {
        window.history.pushState(null, '', hash);
      }
    }
  }, [currentStep]);

  // 브라우저 뒤로가기 감지
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      const step = HASH_TO_STEP[hash] ?? 0;
      goToStep(step);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [goToStep]);
}
