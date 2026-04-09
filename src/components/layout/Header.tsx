'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import type { FlowStep } from '@/hooks/use-picatsso-store';

/** 뒤로가기 가능한 이전 단계 매핑 */
const PREV_STEP: Partial<Record<FlowStep, FlowStep>> = {
  1: 0,  // 입력 → 랜딩
  3: 1,  // 분석 결과 → 입력
  5: 3,  // 최종 결과 → 분석 결과
};

export function Header() {
  const { currentStep, goToStep, resetFlow } = usePicatssoStore();

  const handleLogoClick = () => {
    if (currentStep === 0) return;
    resetFlow();
  };

  const prevStep = PREV_STEP[currentStep];
  const canGoBack = prevStep !== undefined;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 뒤로가기 버튼 */}
          {canGoBack && (
            <button
              onClick={() => goToStep(prevStep)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="이전 단계로"
            >
              ←
            </button>
          )}

          {/* 로고 */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">🎨</span>
            <h1 className="text-xl font-bold picatsso-title">Picatsso</h1>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/history"
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
          >
            라이브러리
          </a>
          {currentStep === 0 && (
            <button
              onClick={() => goToStep(1)}
              className="bg-[#4A90D9] hover:bg-[#2E5FA1] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
              시작하기
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
