'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { Textarea } from '@/components/ui/textarea';

export function CatDescriptionForm() {
  const { description, setDescription } = usePicatssoStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        고양이 설명
      </label>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="예: 3살 코숏 수컷이에요. 평소에 장난기가 많고 호기심이 넘쳐서 집 안 곳곳을 탐험해요. 높은 곳을 좋아하고 창밖을 구경하는 걸 즐겨요."
        rows={4}
        className="resize-none"
      />
      <p className="text-xs text-muted-foreground text-right">
        {description.length}자
      </p>
    </div>
  );
}
