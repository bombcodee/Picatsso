'use client';

import { LoadingSpinner } from './LoadingSpinner';

const MESSAGES = [
  '고양이의 마음을 읽는 중...',
  '사진 속 표정을 분석하고 있어요...',
  '성격 유형을 매칭하는 중...',
  '어울리는 화풍을 찾고 있어요...',
  '감정 색감을 계산하는 중...',
  '집사와의 관계를 파악하고 있어요...',
];

export function AnalysisLoading() {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h3 className="text-xl font-bold mb-2">AI가 분석 중이에요</h3>
      <LoadingSpinner messages={MESSAGES} intervalMs={2500} />
    </div>
  );
}
