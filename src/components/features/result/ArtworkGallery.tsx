'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { ArtworkCard } from './ArtworkCard';

export function ArtworkGallery() {
  const artworks = usePicatssoStore((s) => s.artworks);

  if (artworks.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {artworks.map((artwork, index) => (
        <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
      ))}
    </div>
  );
}
