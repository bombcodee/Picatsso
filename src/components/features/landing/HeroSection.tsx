'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';

export function HeroSection() {
  const goToStep = usePicatssoStore((s) => s.goToStep);

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* 배경 장식 — 피카소풍 도형들 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#4A90D9]/10 rounded-full blur-2xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-[#D4C36A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-[#7BAE7F]/10 rounded-full blur-2xl" />
        <div className="absolute top-20 right-1/4 w-16 h-16 border-2 border-[#4A90D9]/20 rotate-45" />
        <div className="absolute bottom-32 right-10 w-12 h-12 border-2 border-[#D4C36A]/20 rotate-12 rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto text-center px-4">
        {/* 태그라인 */}
        <p className="text-sm md:text-base text-[#4A90D9] font-medium mb-4 tracking-wide">
          AI x 고양이 시각 과학 x 피카소
        </p>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          당신의 고양이가{' '}
          <span className="brush-underline picatsso-title">직접 그린</span>
          {' '}그림
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          반려묘의 성격을 AI가 분석하고,{' '}
          <strong className="text-foreground">고양이가 실제로 보는 색감</strong>으로{' '}
          피카소 스타일의 예술 작품을 만들어드립니다.
        </p>

        {/* CTA */}
        <button
          onClick={() => goToStep(1)}
          className="bg-[#4A90D9] hover:bg-[#2E5FA1] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg shadow-[#4A90D9]/25"
        >
          🐱 우리 고양이 그림 그리기
        </button>

        {/* 서브 텍스트 */}
        <p className="mt-4 text-sm text-muted-foreground">
          무료로 시작 · 사진 한 장이면 충분해요
        </p>
      </div>
    </section>
  );
}
