import { EMOTION_COLOR_MAP } from '@/lib/constants';

const VISION_COMPARISON = [
  { human: '선명한 빨간색', cat: '흐린 갈색', humanColor: '#E74C3C', catColor: '#8B7D6B' },
  { human: '밝은 주황색', cat: '탁한 베이지', humanColor: '#E67E22', catColor: '#9E8E7E' },
  { human: '파란색', cat: '선명한 파란색', humanColor: '#3498DB', catColor: '#4A90D9' },
  { human: '녹색', cat: '약간 흐린 녹색', humanColor: '#2ECC71', catColor: '#7BAE7F' },
  { human: '노란색', cat: '인식 가능한 노란색', humanColor: '#F1C40F', catColor: '#D4C36A' },
];

export function CatVisionSection() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">
          🐱 고양이가 보는 세상
        </h3>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          고양이는 이색형 색각(dichromatic vision)을 가지고 있어요.
          파란색과 노란색은 선명하게 보지만, 빨간색은 거의 보이지 않아요.
        </p>

        {/* 색상 비교 */}
        <div className="bg-muted/30 rounded-2xl p-6 mb-10">
          <div className="grid grid-cols-3 gap-2 text-center text-sm font-medium mb-4">
            <div>색상</div>
            <div>👤 인간의 눈</div>
            <div>🐱 고양이의 눈</div>
          </div>
          {VISION_COMPARISON.map((item) => (
            <div key={item.human} className="grid grid-cols-3 gap-2 items-center py-2">
              <div className="text-sm text-muted-foreground">{item.human}</div>
              <div className="flex justify-center">
                <div
                  className="w-10 h-10 rounded-full shadow-sm"
                  style={{ backgroundColor: item.humanColor }}
                />
              </div>
              <div className="flex justify-center">
                <div
                  className="w-10 h-10 rounded-full shadow-sm"
                  style={{ backgroundColor: item.catColor }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 감정 색감 시스템 소개 */}
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4">
            💡 감정 색감 시스템
          </h4>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
            Picatsso는 고양이가 좋아하는 것을 파란색으로, 싫어하는 것을 회색으로 표현해요.
            고양이의 눈으로 본 세상에 감정을 입힌 그림이 탄생합니다.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {Object.entries(EMOTION_COLOR_MAP).map(([key, { color, label, description }]) => (
              <div key={key} className="flex flex-col items-center gap-1">
                <div
                  className="emotion-dot shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs font-medium">{label}</span>
                <span className="text-xs text-muted-foreground">{description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
