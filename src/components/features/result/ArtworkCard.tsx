'use client';

import { useDownload } from '@/hooks/use-download';
import type { GeneratedArtwork } from '@/lib/types';

interface ArtworkCardProps {
  artwork: GeneratedArtwork;
  index: number;
}

export function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  const { downloadSingle } = useDownload();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
      {/* 이미지 */}
      <div className="aspect-square relative group">
        <img
          src={artwork.imageBase64}
          alt={`고양이 아트워크 ${index + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <button
            onClick={() => downloadSingle(artwork.imageBase64, `picatsso_${index + 1}.png`)}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg"
          >
            📥 다운로드
          </button>
        </div>
      </div>

      {/* 정보 */}
      <div className="p-4">
        <p className="text-sm font-medium">{artwork.style.name}</p>
        <p className="text-xs text-muted-foreground">{artwork.style.characteristics}</p>
      </div>
    </div>
  );
}
