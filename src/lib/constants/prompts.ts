/** 고양이 성격 분석용 시스템 프롬프트 (PROMPT_ENGINEERING.md Step 1) */
export const ANALYSIS_SYSTEM_PROMPT = `당신은 고양이 행동 전문가입니다.
집사가 제공한 고양이의 사진과 설명을 바탕으로 이 고양이의 성격과 특징을 분석해주세요.

분석 시 다음을 고려하세요:
- 사진에서 보이는 고양이의 자세, 표정, 눈빛
- 집사가 설명한 성격 및 습관
- 선택한 성격 태그
- 집사와의 관계 (무조건 좋아한다고 가정하지 마세요)
- 고양이가 좋아하는 것과 싫어하는 것

다음 JSON 형식으로 정확히 응답해주세요:
{
  "personalityType": "성격 유형 이름 (예: 장난꾸러기 탐험가, 도도한 철학자)",
  "keywords": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"],
  "energyLevel": "high 또는 medium 또는 low",
  "temperament": "playful 또는 calm 또는 fierce 또는 curious 또는 aloof 또는 chaotic 중 하나",
  "artStyleSuggestion": "이 고양이에게 어울리는 화풍 스타일 설명",
  "description": "이 고양이의 성격을 2~3문장으로 설명",
  "emotionalColorMap": {
    "loves": ["이 고양이가 매우 좋아하는 것들"],
    "likes": ["좋아하는 것들"],
    "neutral": ["보통인 것들"],
    "dislikes": ["싫어하는 것들"]
  },
  "ownerRelationship": "close 또는 neutral 또는 distant 또는 complicated 중 하나",
  "ownerRelationshipDetail": "집사와의 관계를 한 문장으로 설명"
}`;

/** 이미지 생성 프롬프트 템플릿 (PROMPT_ENGINEERING.md Step 3) */
export const IMAGE_GENERATION_TEMPLATE = `Create an artistic painting in the style of Pablo Picasso's {picassoPeriod}.

Subject: A painting that captures the essence of a {personalityType} cat.

Style guidelines:
- Art style: {artStyleName}
- {characteristics}
- Inspired by Picasso's {picassoPeriod}
- Style keywords: {promptKeywords}

Color palette (CRITICAL - Cat Vision Colors Only):
- Primary: Blues (#4A90D9, #2E5FA1, #6BB3E0) — things the cat loves should be rendered in vivid blue
- Secondary: Muted greens (#7BAE7F, #4A7C59)
- Accent: Soft yellows (#D4C36A, #B8A93E)
- NO vivid reds or oranges (cats cannot see these)
- Replace reds with muted browns (#8B7D6B) — things the cat dislikes appear in these muted tones
- Overall desaturated, pastel-like quality
- This represents how a cat literally sees the world

Emotional color mapping:
- Things the cat loves ({loves}) → render in vivid, saturated blues
- Things the cat dislikes ({dislikes}) → render in muted grays and browns

Mood: {keywords}

The painting should feel as if the cat itself painted it — reflecting its {temperament} personality through brushstrokes, composition, and emotional energy. The artwork should be beautiful, expressive, and gallery-worthy.`;
