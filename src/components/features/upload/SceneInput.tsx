'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { Textarea } from '@/components/ui/textarea';

export function SceneInput() {
  const { sceneDescription, setSceneDescription } = usePicatssoStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        🎨 고양이가 지금 뭘 보고 있나요?
      </label>
      <p className="text-xs text-muted-foreground">
        고양이가 바라보는 장면이 그림의 주제가 돼요. 이 장면을 고양이가 직접 그립니다!
      </p>
      <Textarea
        value={sceneDescription}
        onChange={(e) => setSceneDescription(e.target.value)}
        placeholder="예: 창밖의 비 오는 거리를 바라보고 있어요 / 츄르를 뚫어지게 쳐다보고 있어요 / 집사가 퇴근하고 들어오는 현관문을 보고 있어요"
        rows={3}
        className="resize-none"
      />
    </div>
  );
}
