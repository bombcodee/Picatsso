'use client';

import { LoadingSpinner } from './LoadingSpinner';

const MESSAGES = [
  '붓을 들고 있는 중...',
  '캔버스를 준비하고 있어요...',
  '고양이의 눈으로 색을 칠하는 중...',
  '피카소의 영감을 불러오는 중...',
  '거의 다 됐어요! 마무리 중...',
];

export function GenerationLoading() {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="text-5xl mb-4">🎨</div>
      <h3 className="text-xl font-bold mb-2">아트워크 생성 중</h3>
      <LoadingSpinner messages={MESSAGES} intervalMs={3000} />
    </div>
  );
}
