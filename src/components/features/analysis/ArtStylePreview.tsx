'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { TEMPERAMENT_TO_ART_STYLE } from '@/lib/constants';

export function ArtStylePreview() {
  const analysis = usePicatssoStore((s) => s.analysis);
  if (!analysis) return null;

  const style = TEMPERAMENT_TO_ART_STYLE[analysis.temperament];

  return (
    <div className="bg-muted/30 rounded-xl p-5 space-y-3">
      <h4 className="font-semibold text-sm text-muted-foreground">매칭된 화풍</h4>
      <div>
        <p className="text-lg font-bold">{style.name}</p>
        <p className="text-sm text-muted-foreground">
          피카소의 큐비즘을 베이스로 한 독자적 화풍
        </p>
      </div>
      <p className="text-sm text-muted-foreground">{style.characteristics}</p>
    </div>
  );
}
