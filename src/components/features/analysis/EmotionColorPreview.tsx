'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { EMOTION_COLOR_MAP } from '@/lib/constants';

export function EmotionColorPreview() {
  const analysis = usePicatssoStore((s) => s.analysis);
  if (!analysis) return null;

  const { emotionalColorMap, ownerRelationship, ownerRelationshipDetail } = analysis;

  const sections = [
    { key: 'loves' as const, items: emotionalColorMap.loves, ...EMOTION_COLOR_MAP.loves },
    { key: 'likes' as const, items: emotionalColorMap.likes, ...EMOTION_COLOR_MAP.likes },
    { key: 'neutral' as const, items: emotionalColorMap.neutral, ...EMOTION_COLOR_MAP.neutral },
    { key: 'dislikes' as const, items: emotionalColorMap.dislikes, ...EMOTION_COLOR_MAP.dislikes },
  ];

  const ownerColor = ownerRelationship === 'close'
    ? EMOTION_COLOR_MAP.loves.color
    : ownerRelationship === 'neutral'
      ? EMOTION_COLOR_MAP.neutral.color
      : EMOTION_COLOR_MAP.dislikes.color;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-sm text-muted-foreground">감정 색감 맵</h4>

      {/* 감정별 대상 */}
      <div className="grid grid-cols-2 gap-3">
        {sections.map(({ key, items, color, label }) => (
          <div key={key} className="bg-white rounded-lg p-3 border">
            <div className="flex items-center gap-2 mb-2">
              <div className="emotion-dot w-4 h-4" style={{ backgroundColor: color }} />
              <span className="text-xs font-medium">{label}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {items.length > 0 ? items.map((item) => (
                <span
                  key={item}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {item}
                </span>
              )) : (
                <span className="text-xs text-muted-foreground">-</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 집사와의 관계 — 재미 요소 핵심 */}
      <div className="bg-white rounded-xl p-4 border text-center">
        <p className="text-sm text-muted-foreground mb-2">
          🐱 고양이 눈에 집사는...
        </p>
        <div
          className="inline-block px-4 py-2 rounded-full text-white font-semibold text-sm"
          style={{ backgroundColor: ownerColor }}
        >
          {ownerRelationship === 'close' && '✨ 선명한 파란색! (매우 좋아해요)'}
          {ownerRelationship === 'neutral' && '🟡 노란색 (그럭저럭...)'}
          {ownerRelationship === 'distant' && '🌫️ 흐릿한 회색 (관심 없음...)'}
          {ownerRelationship === 'complicated' && '🎭 복잡한 색감 (감정이 복잡해요)'}
        </div>
        {ownerRelationshipDetail && (
          <p className="mt-2 text-xs text-muted-foreground">{ownerRelationshipDetail}</p>
        )}
      </div>
    </div>
  );
}
