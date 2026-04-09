/**
 * 장면 사진 분석 프롬프트 — 고양이 시점으로 장면 묘사 생성 (1.5차 AI)
 *
 * [한국어 번역 — 확인용]
 * 이 사진에 뭐가 있는지 고양이의 시선으로 묘사해줘.
 * 고양이는 바닥 높이(약 25cm)에서 이 장면을 올려다보고 있다.
 *
 * 다음을 포함해서 영어 3~5문장으로 묘사:
 * - 공간 구조 (실내/실외, 가구, 구조물)
 * - 사람이나 동물의 위치, 자세, 크기감 (고양이 눈높이 기준)
 * - 눈에 띄는 물체 (공, 장난감, 음식 등)
 * - 빛의 방향과 분위기 (밝은지 어두운지)
 * - 색상은 무시 (고양이 색각은 별도 처리함)
 *
 * 집사가 추가한 설명: "{userDescription}"
 * 이 설명을 참고하되, 사진에서 직접 보이는 것을 우선으로 묘사해라.
 */
export const SCENE_ANALYSIS_PROMPT = `Describe what is in this photo from a cat's perspective.
The cat is looking at this scene from ground level (about 25cm height), looking up.

Include in your description (3-5 sentences in English):
- Spatial structure (indoor/outdoor, furniture, structures)
- People or animals: their positions, postures, and how large they appear from a cat's low viewpoint
- Notable objects (balls, toys, food, plants, etc.)
- Light direction and atmosphere (bright, dim, warm, cool)
- Do NOT describe colors (cat color vision is handled separately)

The cat's owner added this note: "{userDescription}"
Use this as context, but prioritize what is directly visible in the photo.

Respond with ONLY the scene description, no JSON, no formatting — just plain English text.`;

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
  "temperament": "playful 또는 calm 또는 fierce 또는 curious 또는 aloof 또는 chaotic 또는 melancholy 중 하나",
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
 * 피카소 큐비즘 공통 베이스 — 모든 그림에 항상 적용되는 기본 화법
 *
 * [한국어 번역 — 확인용]
 * 피카소 큐비즘 기본 화법으로 그린다:
 * - 굵고 자신 있는 윤곽선으로 면을 분할
 * - 한 사물을 여러 각도에서 동시에 보여주는 다중 시점
 * - 기하학적으로 단순화된 형태 — 대상을 각진 면으로 쪼갬
 * - 평면적 색 채우기 — 사실적 그라데이션 대신 단색 면을 나란히 배치
 * - 약간의 비율 왜곡 — 고양이의 낮은 시점에서 보면 사물이 자연스럽게 왜곡됨
 * 이것은 고양이가 세상을 보는 방식이다 — 넓은 시야각(200°)에서 오는 다중 관점이
 * 피카소의 큐비즘과 자연스럽게 만난다.
 */
export const CUBISM_BASE_BLOCK = `Paint in Picasso's Cubist foundational style:
- Bold, confident outlines dividing the canvas into distinct planes
- Multiple simultaneous viewpoints — show objects from several angles at once
- Geometrically simplified forms — break subjects into angular faceted planes
- Flat color fills — place solid color planes side by side instead of realistic gradients
- Slight proportion distortion — natural from a cat's low ground-level perspective
This is how a cat sees the world — its wide field of vision (200°) naturally creates the multiple perspectives that define Cubism.`;

/**
 * 고양이×피카소 연결 — 과학적 근거를 프롬프트에 녹임
 *
 * [한국어 번역 — 확인용]
 * 고양이의 실제 시각 특성이 화풍에 반영된다:
 * - 넓은 시야각(200°) → 한 장면을 여러 각도에서 동시에 봄 → 큐비즘의 다중 시점
 * - 이색형 색각 → 파란/녹/노란만 보이고 빨강은 흐릿 → 자연스럽게 제한된 팔레트
 * - 야간 시력 (간상세포 풍부) → 어두운 곳에서도 파란빛이 선명 → 깊은 블루 톤
 * - 낮은 시점 (바닥 높이) → 사물이 크고 왜곡되어 보임 → 비율 변형과 역동적 구도
 * - 움직임 추적 본능 → 정지한 것도 생동감 있게 포착 → 역동적 붓터치
 */
export const CAT_PICASSO_CONNECTION = `The cat's real visual traits inform the art:
- Wide field of vision (200°) → sees multiple angles simultaneously → Cubist multi-perspective
- Dichromatic color vision → only blues/greens/yellows visible → naturally limited palette
- Superior night vision (rod cells) → blue light stays vivid in darkness → deep blue undertones
- Low ground-level viewpoint → objects appear enlarged and distorted → proportion distortion
- Motion-tracking instinct → captures energy even in still scenes → dynamic brushstrokes`;

/**
 * 이미지 생성 프롬프트 — "고양이가 화가라면, 이 장면을 이렇게 그릴 거야!"
 *
 * [한국어 번역 — 확인용]
 *
 * 너는 고양이로서 그림을 그리고 있다. 이 고양이는 "{personalityType}" — {artistLabel}.
 * 이 고양이가 붓을 들고 지금 눈앞에 보이는 장면을 그린다고 상상해라.
 *
 * === 고양이가 보고 있는 장면 ===
 * {sceneDescription}
 *
 * === 중요 규칙 ===
 * (기존과 동일)
 *
 * === 큐비즘 공통 베이스 (모든 그림에 적용) ===
 * {CUBISM_BASE_BLOCK}
 *
 * === 고양이×피카소 연결 ===
 * {CAT_PICASSO_CONNECTION}
 *
 * === 이 고양이만의 악센트 (성격이 결정) ===
 * - 이 고양이의 그림 분위기: {characteristics}
 * - 분위기 키워드: {moodKeywords}
 * - 붓터치, 구도, 에너지가 고양이의 {temperament} 성격을 반영
 *
 * === 색감 (고양이 이색형 시각 — 절대 규칙) ===
 * (기존과 동일)
 *
 * === 감정 표현 (파레이돌리아 + 실제 존재 시 강조) ===
 * (기존과 동일)
 *
 * === 분위기 ===
 * {keywords}
 */
export const IMAGE_GENERATION_TEMPLATE = `You are painting AS a cat. This cat is a "{personalityType}" — {artistLabel}.
Imagine: this cat picked up a brush and painted what it sees right now.

=== THE SCENE THE CAT IS LOOKING AT ===
{sceneDescription}

=== CRITICAL RULES ===
- Paint ONLY the scene described above. Do NOT add objects from the cat's personality description or favorites list directly into the painting.
- If a scene photo is provided, faithfully reinterpret that photo's composition in the art style.
- This is NOT a painting OF a cat. This is a painting BY a cat — what the cat sees through its eyes.
- Paint from a cat's low perspective (ground level, looking up at things).
- Include subtle cat-like touches: a paw print in the corner, slightly tilted horizon, curious framing.

=== CUBIST FOUNDATION (applied to ALL paintings) ===
{cubismBase}

=== CAT × PICASSO CONNECTION ===
{catPicassoConnection}

=== THIS CAT'S PERSONAL ACCENT (determined by personality) ===
- This cat's painting mood: {characteristics}
- Mood keywords: {moodKeywords}
- The brushstrokes, composition, and energy reflect the cat's {temperament} personality

=== COLOR PALETTE (Cat Dichromatic Vision — ABSOLUTE RULE) ===
Use ONLY colors a cat can actually see:
- Blues (#4A90D9, #2E5FA1, #6BB3E0) — vivid and dominant
- Greens (#7BAE7F, #4A7C59) — secondary, slightly muted
- Yellows (#D4C36A, #B8A93E) — accents
- NO reds or oranges — replace with muted browns (#8B7D6B) and grays
- Overall: desaturated, pastel-like, dreamlike quality

=== EMOTIONAL EXPRESSION (Pareidolia + Direct Emphasis) ===

RULE 1 — If a loved thing ({loves}) ACTUALLY EXISTS in the scene:
Paint it clearly and prominently in vivid, glowing blue tones. It should radiate warmth and importance, as if it's the most beautiful thing in the painting. The cat sees it with adoration.

RULE 2 — If a disliked thing ({dislikes}) ACTUALLY EXISTS in the scene:
Paint it in dull, murky gray-brown tones. It should look faded, unpleasant, and slightly distorted — as if the cat wishes it wasn't there.

RULE 3 — If a loved thing is NOT in the scene (Pareidolia):
Do NOT paint it directly. Instead, natural elements (shadows, clouds, reflections, patterns, textures) should subtly RESEMBLE the shapes of things the cat loves. As if the cat sees its favorite things everywhere it looks.
- The stronger the love, the more visible the pareidolia: clouds shaped like treats, light reflections resembling toy silhouettes.
- If the cat loves many things, the overall painting feels warm with rich blue tones.

RULE 4 — If a disliked thing is NOT in the scene:
Do NOT paint it directly. Instead, the dim, dark corners of the painting subtly hint at uneasy shapes.

=== MOOD ===
{keywords}

The result should be beautiful, gallery-worthy, and make viewers think "yes, this is exactly how this cat would paint this scene."`;
