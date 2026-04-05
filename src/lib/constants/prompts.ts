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

/** 이미지 생성 프롬프트 템플릿 — "고양이가 화가라면, 이 장면을 이렇게 그릴 거야!" */
export const IMAGE_GENERATION_TEMPLATE = `You are painting AS a cat. This cat is a painter with a {temperament} personality — a "{personalityType}".

Imagine: this cat picked up a brush and painted what it sees right now.

THE SCENE THE CAT IS LOOKING AT:
{sceneDescription}

HOW THIS CAT PAINTS (personality-driven style):
- Art style: {artStyleName} — inspired by Picasso's {picassoPeriod}
- {characteristics}
- Style keywords: {promptKeywords}
- The brushstrokes, composition, and energy reflect the cat's {temperament} personality

COLOR PALETTE (CRITICAL — Cat Dichromatic Vision):
This painting uses ONLY colors a cat can actually see:
- Blues (#4A90D9, #2E5FA1, #6BB3E0) — vivid and dominant. Things the cat LOVES appear in brilliant blue: {loves}
- Greens (#7BAE7F, #4A7C59) — secondary, slightly muted
- Yellows (#D4C36A, #B8A93E) — accents
- NO reds or oranges — cats cannot see these. Replace with muted browns (#8B7D6B) and grays
- Things the cat DISLIKES appear dull and faded: {dislikes}
- Overall: desaturated, pastel-like, dreamlike quality

IMPORTANT:
- This is NOT a painting OF a cat. This is a painting BY a cat — what the cat sees through its eyes.
- The scene should be painted from a cat's low perspective (ground level, looking up at things)
- Include subtle cat-like touches: a paw print in the corner, slightly tilted horizon, curious framing

Mood: {keywords}

The result should be a beautiful, gallery-worthy artwork that makes people think "yes, this is exactly how a cat would paint this scene."`;
