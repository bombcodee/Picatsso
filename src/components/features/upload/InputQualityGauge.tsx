'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';

const STEPS = [
  { check: (s: StoreSnapshot) => s.images.length > 0, label: '사진', message: '기본 분석이 가능해요' },
  { check: (s: StoreSnapshot) => s.description.trim().length > 20, label: '설명', message: '성격이 보이기 시작해요!' },
  { check: (s: StoreSnapshot) => s.tags.length > 0, label: '태그', message: '화풍 매칭이 정확해질 거예요' },
  { check: (s: StoreSnapshot) => s.relationshipDescription.trim().length > 10, label: '관계', message: '감정 색감까지 반영돼요!' },
  { check: (s: StoreSnapshot) => s.favoriteThings.trim().length > 0 || s.dislikedThings.trim().length > 0, label: '취향', message: '감정 색감이 풍부해져요!' },
  { check: (s: StoreSnapshot) => s.sceneDescription.trim().length > 5, label: '장면', message: '완벽해요! 고양이가 멋진 그림을 그릴 거예요' },
];

interface StoreSnapshot {
  images: File[];
  description: string;
  tags: string[];
  relationshipDescription: string;
  favoriteThings: string;
  dislikedThings: string;
  sceneDescription: string;
}

const EMOJIS = ['😺', '😸', '😻', '🎨', '🖌️', '✨'];
const COLORS = ['#B8BCC0', '#D4C36A', '#7BAE7F', '#4A90D9', '#2E5FA1', '#1E3A5F'];

export function InputQualityGauge() {
  const store = usePicatssoStore();
  const snapshot: StoreSnapshot = {
    images: store.images,
    description: store.description,
    tags: store.tags,
    relationshipDescription: store.relationshipDescription,
    favoriteThings: store.favoriteThings,
    dislikedThings: store.dislikedThings,
    sceneDescription: store.sceneDescription,
  };

  const completed = STEPS.filter((step) => step.check(snapshot)).length;
  const percentage = Math.round((completed / STEPS.length) * 100);
  const currentMessage = completed === 0
    ? '정보를 입력하면 분석 정확도가 올라가요'
    : STEPS.filter((step) => step.check(snapshot)).pop()?.message ?? '';

  return (
    <div className="bg-muted/30 rounded-xl p-4 space-y-3">
      {/* 게이지 바 */}
      <div className="flex items-center gap-3">
        <span className="text-lg">{EMOJIS[Math.min(completed, EMOJIS.length - 1)]}</span>
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium">입력 완성도</span>
            <span className="font-bold" style={{ color: COLORS[Math.min(completed, COLORS.length - 1)] }}>
              {percentage}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${percentage}%`,
                backgroundColor: COLORS[Math.min(completed, COLORS.length - 1)],
              }}
            />
          </div>
        </div>
      </div>

      {/* 상태 메시지 */}
      <p className="text-sm text-muted-foreground text-center">
        {currentMessage}
      </p>

      {/* 단계 도트 */}
      <div className="flex justify-center gap-2">
        {STEPS.map((step, i) => (
          <div
            key={step.label}
            className="flex flex-col items-center gap-1"
          >
            <div
              className="w-2 h-2 rounded-full transition-colors"
              style={{
                backgroundColor: step.check(snapshot) ? COLORS[Math.min(i, COLORS.length - 1)] : '#D0CFC8',
              }}
            />
            <span className={`text-[10px] ${step.check(snapshot) ? 'text-foreground' : 'text-muted-foreground'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
