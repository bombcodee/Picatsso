'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { PERSONALITY_TAGS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';

export function PersonalityTagSelector() {
  const { tags, setTags } = usePicatssoStore();

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        성격 키워드 선택 <span className="text-muted-foreground font-normal">(여러 개 가능)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {PERSONALITY_TAGS.map((tag) => {
          const isSelected = tags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={isSelected ? 'default' : 'outline'}
              className={`cursor-pointer transition-all select-none ${
                isSelected
                  ? 'bg-[#4A90D9] hover:bg-[#2E5FA1] text-white border-[#4A90D9]'
                  : 'hover:border-[#4A90D9] hover:text-[#4A90D9]'
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
