const FEATURES = [
  {
    emoji: '📸',
    title: '고양이 정보 입력',
    description: '사진과 성격 설명을 알려주세요. 집사와의 관계, 좋아하는 것도 함께요.',
    color: '#4A90D9',
  },
  {
    emoji: '🧠',
    title: 'AI 성격 분석',
    description: 'AI가 고양이의 성격을 분석하고, 어울리는 피카소 화풍을 매칭합니다.',
    color: '#7BAE7F',
  },
  {
    emoji: '🎨',
    title: '아트워크 생성',
    description: '고양이가 보는 색감으로 피카소풍 그림이 탄생합니다. 세상에 하나뿐인 작품!',
    color: '#D4C36A',
  },
];

export function FeatureSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
          어떻게 작동하나요?
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.emoji}</div>
              <div
                className="inline-block text-xs font-bold text-white px-3 py-1 rounded-full mb-3"
                style={{ backgroundColor: feature.color }}
              >
                STEP {index + 1}
              </div>
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
