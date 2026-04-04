'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';

export function Header() {
  const { currentStep, goToStep, resetFlow } = usePicatssoStore();

  const handleLogoClick = () => {
    if (currentStep === 0) return;
    resetFlow();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl">🎨</span>
          <h1 className="text-xl font-bold picatsso-title">Picatsso</h1>
        </button>

        {currentStep === 0 && (
          <button
            onClick={() => goToStep(1)}
            className="bg-[#4A90D9] hover:bg-[#2E5FA1] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
          >
            시작하기
          </button>
        )}
      </div>
    </header>
  );
}
