'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export function RelationshipInput() {
  const {
    relationshipDescription, setRelationshipDescription,
    favoriteThings, setFavoriteThings,
    dislikedThings, setDislikedThings,
  } = usePicatssoStore();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          집사와 어떻게 지내나요?
        </label>
        <Textarea
          value={relationshipDescription}
          onChange={(e) => setRelationshipDescription(e.target.value)}
          placeholder="예: 무릎 위에 올라오는 걸 좋아하고, 자기 전에 꼭 옆에 와서 꾹꾹이를 해요. 다만 손으로 만지는 건 별로 안 좋아해요."
          rows={3}
          className="resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            <span className="inline-block w-3 h-3 rounded-full bg-[#4A90D9] mr-1 align-middle" />
            {' '}좋아하는 것
          </label>
          <Input
            value={favoriteThings}
            onChange={(e) => setFavoriteThings(e.target.value)}
            placeholder="예: 츄르, 낚싯대 장난감, 캣타워"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            <span className="inline-block w-3 h-3 rounded-full bg-[#8B7D6B] mr-1 align-middle" />
            {' '}싫어하는 것
          </label>
          <Input
            value={dislikedThings}
            onChange={(e) => setDislikedThings(e.target.value)}
            placeholder="예: 목욕, 큰 소리, 낯선 사람"
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        💡 이 정보를 바탕으로 고양이 눈에 좋아하는 것은 <strong className="cat-blue">파란색</strong>으로,
        싫어하는 것은 <strong className="cat-muted">회색</strong>으로 표현돼요
      </p>
    </div>
  );
}
