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

/**
 * 이미지 생성 프롬프트 — "고양이가 화가라면, 이 장면을 이렇게 그릴 거야!"
 *
 * [한국어 번역 — 확인용]
 *
 * 너는 고양이로서 그림을 그리고 있다. 이 고양이는 {temperament} 성격의 화가 — "{personalityType}".
 * 이 고양이가 붓을 들고 지금 눈앞에 보이는 장면을 그린다고 상상해라.
 *
 * === 고양이가 보고 있는 장면 ===
 * {sceneDescription}
 *
 * === 중요 규칙 ===
 * - 반드시 위의 장면만 그려라. 고양이 성격 설명이나 좋아하는 것 목록에 있는 물체를 직접 그림에 추가하지 마라.
 * - 장면 사진이 있으면 그 사진의 구도를 충실히 재해석해라.
 * - 이것은 고양이를 그린 그림이 아니다. 고양이가 그린 그림이다 — 고양이 눈에 보이는 세상.
 * - 고양이의 낮은 시점(바닥 높이)에서 올려다보듯 그려라.
 * - 구석에 발자국, 살짝 기울어진 수평선, 호기심 어린 구도 등 고양이다운 터치를 넣어라.
 *
 * === 화풍 (성격이 결정) ===
 * - 화풍: {artStyleName} — 피카소의 {picassoPeriod}에서 영감
 * - {characteristics}
 * - 스타일 키워드: {promptKeywords}
 * - 붓터치, 구도, 에너지가 고양이의 {temperament} 성격을 반영
 *
 * === 색감 (고양이 이색형 시각 — 절대 규칙) ===
 * 고양이가 실제로 볼 수 있는 색만 사용:
 * - 파란색 (#4A90D9, #2E5FA1, #6BB3E0) — 선명하고 지배적
 * - 녹색 (#7BAE7F, #4A7C59) — 보조, 약간 탁한
 * - 노란색 (#D4C36A, #B8A93E) — 악센트
 * - 빨간색/주황색 절대 금지 — 탁한 갈색(#8B7D6B)과 회색으로 대체
 * - 전체적으로 채도 낮은, 파스텔 같은, 몽환적인 품질
 *
 * === 감정 표현 (파레이돌리아 효과) ===
 * 좋아하는 것({loves})을 직접 그리지 않는다.
 * 대신, 장면 속 자연물(그림자, 구름, 반사광, 패턴, 질감)이 좋아하는 것의 형태를 은근히 닮도록 한다.
 * 마치 고양이가 세상 모든 것에서 좋아하는 것을 보는 것처럼.
 * - 좋아하는 강도가 클수록 파레이돌리아가 뚜렷: 구름이 츄르 모양, 물웅덩이에 비친 빛이 장난감 실루엣
 * - 좋아하는 것이 많으면 그림 전체가 따뜻하고 파란 톤이 풍부
 * 싫어하는 것({dislikes})도 직접 그리지 않는다.
 * 대신, 그림의 흐릿하고 어두운 구석에 불안한 형태로 살짝 암시만 한다.
 *
 * === 분위기 ===
 * {keywords}
 *
 * 결과물은 아름답고, 갤러리에 걸 만하고, 보는 사람이
 * "맞아, 이 고양이라면 정확히 이렇게 그렸을 거야"라고 느끼는 작품이어야 한다.
 */
export const IMAGE_GENERATION_TEMPLATE = `You are painting AS a cat. This cat is a painter with a {temperament} personality — a "{personalityType}".
Imagine: this cat picked up a brush and painted what it sees right now.

=== THE SCENE THE CAT IS LOOKING AT ===
{sceneDescription}

=== CRITICAL RULES ===
- Paint ONLY the scene described above. Do NOT add objects from the cat's personality description or favorites list directly into the painting.
- If a scene photo is provided, faithfully reinterpret that photo's composition in the art style.
- This is NOT a painting OF a cat. This is a painting BY a cat — what the cat sees through its eyes.
- Paint from a cat's low perspective (ground level, looking up at things).
- Include subtle cat-like touches: a paw print in the corner, slightly tilted horizon, curious framing.

=== PAINTING STYLE (determined by personality) ===
- Art style: {artStyleName} — inspired by Picasso's {picassoPeriod}
- {characteristics}
- Style keywords: {promptKeywords}
- The brushstrokes, composition, and energy reflect the cat's {temperament} personality

=== COLOR PALETTE (Cat Dichromatic Vision — ABSOLUTE RULE) ===
Use ONLY colors a cat can actually see:
- Blues (#4A90D9, #2E5FA1, #6BB3E0) — vivid and dominant
- Greens (#7BAE7F, #4A7C59) — secondary, slightly muted
- Yellows (#D4C36A, #B8A93E) — accents
- NO reds or oranges — replace with muted browns (#8B7D6B) and grays
- Overall: desaturated, pastel-like, dreamlike quality

=== EMOTIONAL EXPRESSION (Pareidolia Effect) ===
Do NOT paint the cat's favorite things ({loves}) directly.
Instead, natural elements in the scene (shadows, clouds, reflections, patterns, textures) should subtly RESEMBLE the shapes of things the cat loves.
As if the cat sees its favorite things everywhere it looks.
- The stronger the love, the more visible the pareidolia: clouds shaped like treats, light reflections resembling toy silhouettes.
- If the cat loves many things, the overall painting feels warm with rich blue tones.
Do NOT paint the cat's disliked things ({dislikes}) directly.
Instead, the dim, dark corners of the painting subtly hint at uneasy shapes.

=== MOOD ===
{keywords}

The result should be beautiful, gallery-worthy, and make viewers think "yes, this is exactly how this cat would paint this scene."`;
