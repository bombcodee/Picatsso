'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { useDownload } from '@/hooks/use-download';

export function ResultActions() {
  const { artworks, resetFlow } = usePicatssoStore();
  const { downloadAll } = useDownload();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <button
        onClick={() => downloadAll(artworks)}
        className="bg-[#4A90D9] hover:bg-[#2E5FA1] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105"
      >
        📥 전체 다운로드
      </button>
      <button
        onClick={resetFlow}
        className="border border-border hover:bg-muted text-foreground px-6 py-3 rounded-full text-sm font-medium transition-colors"
      >
        🐱 다른 고양이 그리기
      </button>
    </div>
  );
}
