/**
 * 장면 사진 분석 프롬프트 — 고양이 시점으로 장면 묘사 생성 (1.5차 AI)
 *
 * [한국어 번역 — 확인용]
 * 이 사진을 화가를 위한 상세한 장면 지도로 묘사해줘.
 * 화면 위치(UPPER-LEFT, CENTER, LOWER-RIGHT 등)를 사용해서.
 *
 * 포함할 것:
 * 1. 공간: 실내/실외, 방 종류, 크기감
 * 2. 사람: 각 사람마다 — 위치, 자세(앉음/서있음/뒤돌아봄), 의상 특징(색상 제외), 방향
 * 3. 물체: 눈에 띄는 물체마다 — 위치, 상대적 크기, 종류
 * 4. 구조물: 가구, 계단, 문, 창문 — 위치와 비중
 * 5. 빛: 방향, 강도, 분위기
 * 6. 바닥: 바닥 재질, 바닥 높이(고양이 눈높이)에 있는 물체
 *
 * 고양이는 바닥 높이(약 25cm)에서 이 장면을 올려다보고 있다.
 * 그 낮은 시점에서 사물이 어떻게 보이는지 묘사.
 * 색상은 묘사하지 마 (고양이 색각은 별도 처리).
 *
 * 집사가 추가한 설명: "{userDescription}"
 * 이 설명을 참고하되, 사진에서 직접 보이는 것을 우선으로.
 * 영어 5~8문장으로. 공간적으로 정확하게.
 */
export const SCENE_ANALYSIS_PROMPT = `Describe this photo as a detailed scene map for a painter.
Use screen positions (UPPER-LEFT, CENTER, CENTER-RIGHT, LOWER-LEFT, etc.).

Include:
1. SPACE: Indoor/outdoor, room type, size feel
2. PEOPLE: For each person — screen position, posture (sitting/standing/turned away), notable clothing features (NO colors), facing direction (front/side/back)
3. OBJECTS: For each notable object — screen position, relative size (small/medium/large), type
4. STRUCTURE: Furniture, stairs, doors, windows — position and how much of the frame they occupy
5. LIGHT: Direction, intensity, atmosphere
6. GROUND LEVEL: Floor material, items at floor level — this is what the cat sees most clearly

The cat sees this from ground level (about 25cm height), looking up.
Describe how things appear from that low viewpoint — people's legs and feet are prominent, furniture towers above.
Do NOT describe colors (cat color vision is handled separately).

The cat's owner added this note: "{userDescription}"
Use this as context, but prioritize what is directly visible in the photo.

IMPORTANT: State the EXACT number of people and notable objects. "6 people" not "several people". "1 blue ball" not "toys on the floor".

Write 5-8 sentences in English. Be spatially precise.`;

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
  "ownerRelationshipDetail": "집사와의 관계를 한 문장으로 설명",
  "personalityTypeEn": "personality type name in English (e.g. Timid Explorer, Aloof Philosopher)",
  "keywordsEn": ["keyword1_en", "keyword2_en", "keyword3_en", "keyword4_en", "keyword5_en"],
  "emotionalColorMapEn": {
    "loves": ["things the cat loves most, in English"],
    "likes": ["things the cat likes, in English"],
    "neutral": ["neutral things, in English"],
    "dislikes": ["things the cat dislikes, in English"]
  }
}`;

/**
 * 피카소 큐비즘 공통 베이스 — A/B/C 테스트용 (정리 완료)
 *
 * 정리 내용:
 *   - CAT_PICASSO_CONNECTION 통합 (별도 블록 삭제, CUBISM 마지막 줄에 요약)
 *   - 중복 제거 ("다중 시점", "낮은 시점", "비율 왜곡"이 여러 곳에 있던 것 → CUBISM에만)
 *   - 충돌 해결 ("서툰 붓터치" + "갤러리급" → "서툴지만 매력적인")
 *   - 12줄 → 7줄로 압축
 *
 * 차이점:
 *   A안: + 금지 규칙 3줄
 *   B안: 금지 없음 (긍정 지시만)
 *   C안: + 금지 1줄 + "Fragment ALL" + "strange yet beautiful"
 */

/**
 * [A안 — 금지 규칙 포함]
 *
 * [한국어 번역]
 * 피카소의 게르니카, 우는 여인, 꿈처럼 그린다:
 * - 굵은 검은 윤곽선이 모든 형태를 각진 파편으로 쪼갬
 * - 한쪽 눈 정면, 다른 쪽 눈 측면 — 같은 얼굴에서
 * - 단색 면 채우기 — 면 안에 음영 없음, 인접 면의 다른 색으로 대비
 * - 같은 그림 안에서 모든 사물이 다른 각도로 보임 — 시점이 뒤죽박죽이라 원근법 불가능
 * - 중요한 건 크게, 안 중요한 건 작게 — 크기 = 고양이의 감정적 중요도
 * - 서툰 임파스토 붓터치 — 고양이가 발로 붓을 잡은 것처럼 매력적으로 불완전
 * 금지: 포토리얼리즘, 3D, 부드러운 그라데이션, 정확한 인체 비율
 */
const CUBISM_VERSION_A = `Paint like Picasso's Guernica, The Weeping Woman, and The Dream:
- Thick black outlines carving every form into angular fragmented shards
- One eye from front, the other in profile on the same face
- Each plane filled with ONE solid color — no shading within a plane, contrast from adjacent different colors
- Every object seen from a DIFFERENT angle — floor from above, table from side, faces front AND profile simultaneously. A jumble of clashing viewpoints that makes perspective impossible
- Important things LARGER, unimportant things shrunk — size = cat's emotional importance
- Clumsy impasto brushstrokes on rough canvas — charmingly imperfect, like a cat holding a brush with its paw
NEVER: NO photorealism, NO 3D shading, NO smooth gradients, NO accurate human anatomy
A cat's 200° field of vision naturally creates the clashing multiple perspectives that define Cubism.`;

/**
 * [B안 — 금지 없이 긍정 지시만]
 *
 * [한국어 번역]
 * 피카소의 게르니카, 우는 여인, 꿈처럼 그린다:
 * - 굵은 검은 윤곽선이 얼굴을 각진 파편으로 쪼갬
 * - 한쪽 눈 정면, 다른 쪽 눈 측면 — 같은 얼굴에서
 * - 단색 면 채우기 + 두꺼운 임파스토 붓터치, 거친 캔버스 질감
 * - 같은 그림 안에서 모든 사물이 다른 각도로 보임 — 시점이 뒤죽박죽
 * - 중요한 건 크게, 안 중요한 건 작게 — 크기 = 고양이의 감정적 중요도
 * - 서툰 붓터치 — 고양이가 발로 붓을 잡은 것처럼 매력적으로 불완전
 * - 두꺼운 유화 질감, 팔레트 나이프로 거칠게 올린 느낌
 */
const CUBISM_VERSION_B = `Painted like Picasso's Guernica, The Weeping Woman, and The Dream:
- Thick black outlines carving faces into angular fragmented shards
- One eye from front, the other in profile on the same face
- Each plane filled with ONE solid color, thick impasto brushstrokes on rough canvas
- Every object seen from a DIFFERENT angle — floor from above, table from side, faces front AND profile simultaneously. A jumble of clashing viewpoints that makes perspective impossible
- Important things LARGER, unimportant things shrunk — size = cat's emotional importance
- Clumsy impasto brushstrokes — charmingly imperfect, like a cat holding a brush with its paw
- Heavy oil paint texture, as if painted with a palette knife on raw canvas
A cat's 200° field of vision naturally creates the clashing multiple perspectives that define Cubism.`;

/**
 * [C안 — 금지 1줄 + 인물 면분할 강화 + 기묘한 아름다움]
 *
 * [한국어 번역]
 * 피카소의 게르니카, 우는 여인, 꿈처럼 그린다:
 * - 굵은 검은 윤곽선이 얼굴, 몸, 사물 모두를 각진 파편으로 쪼갬
 * - 한쪽 눈 정면, 다른 쪽 눈 측면, 코가 옆에 — 기묘하지만 매력적
 * - 배경뿐 아니라 인물도 전부 기하학적 면으로 분할
 * - 같은 그림 안에서 모든 사물이 다른 각도로 보임 — 시점이 뒤죽박죽
 * - 중요한 건 크게, 안 중요한 건 작게 — 크기 = 고양이의 감정적 중요도
 * - 서툰 임파스토 붓터치, 거친 캔버스 질감
 * - 포토리얼리즘 금지 — 갤러리에 걸린 실제 유화처럼
 */
const CUBISM_VERSION_C = `Painted like Picasso's Guernica, The Weeping Woman, and The Dream:
- Thick black outlines carving faces, bodies, AND objects into angular fragmented shards
- One eye from front, the other in profile, nose displaced — strange yet beautiful
- Fragment ALL subjects into geometric planes — people and objects too, not just backgrounds
- Every object seen from a DIFFERENT angle — floor from above, table from side, faces front AND profile simultaneously. A jumble of clashing viewpoints that makes perspective impossible
- Important things LARGER, unimportant things shrunk — size = cat's emotional importance
- Clumsy impasto brushstrokes on rough canvas — charmingly imperfect, like a cat holding a brush
- NO photorealism — this must look like a real oil painting in a gallery
A cat's 200° field of vision naturally creates the clashing multiple perspectives that define Cubism.`;

/** 현재 활성 버전 — 테스트 후 하나만 남길 것 */
export const CUBISM_BASE_BLOCK = CUBISM_VERSION_C;

/**
 * 이미지 생성 프롬프트 — "고양이가 화가라면, 이 장면을 이렇게 그릴 거야!"
 * (정리 완료 — CAT_PICASSO_CONNECTION 통합, 중복/충돌 제거, ~1000 토큰)
 *
 * [한국어 번역 — 확인용]
 *
 * 너는 고양이로서 그림을 그리고 있다. 이 고양이는 "{personalityType}" — {artistLabel}.
 * 이 고양이가 붓을 들고 지금 눈앞에 보이는 장면을 그린다고 상상해라.
 *
 * === 장면 ===
 * === 규칙 ===  (장면만 그리기 / 고양이 시점 / 고양이 터치)
 * === 큐비즘 화법 ===  (CUBISM_BASE_BLOCK)
 * === 이 고양이의 분위기 ===  (성격 악센트)
 * === 색감 ===  (고양이 이색형 시각)
 * === 감정 표현 ===  (파레이돌리아 + 직접 강조)
 * === 분위기 키워드 ===
 */
export const IMAGE_GENERATION_TEMPLATE = `You are painting AS a cat — "{personalityType}", {artistLabel}.
This cat picked up a brush and painted what it sees right now.

=== SCENE ===
{sceneDescription}

=== RULES ===
- Paint ONLY the scene above. Do NOT add objects from the cat's favorites list.
- Keep the EXACT number of people and objects from the scene description. Do NOT add or remove anyone.
- This is a painting BY a cat — paint from ground level (25cm), looking up at everything.
- Subtle cat touches: paw print in corner, tilted horizon, curious framing.

=== CUBIST STYLE ===
{cubismBase}

=== THIS CAT'S MOOD ===
{characteristics}
Mood: {moodKeywords}

=== COLORS (Cat Vision — ABSOLUTE) ===
Bold and vivid — Blues, Greens, Yellows equally saturated and confident.
Deep blacks and bright whites for maximum contrast between planes.
NO reds or oranges — replace with muted browns (#8B7D6B) and grays.

=== EMOTION ===
RULE 1 — Loved thing ({loves}) IN the scene → paint vivid glowing blue, radiates warmth.
RULE 2 — Disliked thing ({dislikes}) IN the scene → dull gray-brown, faded and distorted.
RULE 3 — Loved thing NOT in scene (Pareidolia) → natural elements subtly resemble loved shapes. Stronger love = more visible.
RULE 4 — Disliked thing NOT in scene → dim corners hint at uneasy shapes.

=== MOOD ===
{keywords}

REMEMBER: All distortion and mood must stay within CUBIST structure — fragmented angular planes, thick outlines, multiple viewpoints. Never abandon cubism for another style.

The result: charmingly imperfect yet beautiful — "this is exactly how this cat would paint."`;
