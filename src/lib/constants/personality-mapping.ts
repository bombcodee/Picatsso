import type { ArtStyle, Temperament } from '@/lib/types';

/** 성격 선택 태그 목록 */
export const PERSONALITY_TAGS = [
  '엉뚱한', '장난꾸러기', '사나운', '잔잔한', '도도한', '호기심 많은',
  '겁쟁이', '애교쟁이', '독립적인', '활발한', '느긋한', '예민한',
  '쓸쓸한', '외로운',
] as const;

/**
 * 기질 → 화풍 스타일 매핑 (C안 하이브리드)
 *
 * 전략: 큐비즘 공통 베이스는 프롬프트 템플릿에서 항상 적용.
 * 여기서는 성격별 "분위기 악센트"만 정의한다.
 * - name: 사용자에게 보여줄 라벨 (한국어)
 * - characteristics: UI 표시용 (한국어)
 * - characteristicsEn: 프롬프트용 (영어) — AI에 전달
 * - moodKeywords: 프롬프트용 (영어) — AI에 전달
 */
export const TEMPERAMENT_TO_ART_STYLE: Record<Temperament, ArtStyle> = {
  playful: {
    name: '장난꾸러기 화가',
    nameEn: 'The Playful Painter',
    picassoPeriod: '아프리카 미술 영향기',
    characteristics: '밝고 역동적인 에너지, 기하학적 장난기가 넘치는 구도',
    characteristicsEn: 'Bright dynamic energy with geometric playfulness, like Picasso\'s African period — Les Demoiselles d\'Avignon',
    moodKeywords: [
      'vibrant energy', 'geometric playfulness', 'dynamic composition',
      'bright and lively atmosphere', 'rhythmic brushstrokes', 'joyful movement',
    ],
    temperament: 'playful',
  },
  fierce: {
    name: '열정의 화가',
    nameEn: 'The Passionate Painter',
    picassoPeriod: '게르니카 시기',
    characteristics: '날카로운 각도와 강한 대비, 극적이고 압도적인 구도',
    characteristicsEn: 'Sharp aggressive angles with dramatic contrast, like Picasso\'s Guernica — raw emotional intensity',
    moodKeywords: [
      'dramatic contrast', 'aggressive angles', 'intense energy',
      'sharp geometric tension', 'powerful composition', 'raw emotional force',
    ],
    temperament: 'fierce',
  },
  calm: {
    name: '온화한 화가',
    nameEn: 'The Gentle Painter',
    picassoPeriod: '장밋빛 시기 (1904-1906)',
    characteristics: '부드러운 곡선과 따뜻한 톤, 여유롭고 평화로운 분위기',
    // [주석 사유] Rose Period는 큐비즘이 아님(큐비즘 이전 시기). 작품명이 AI를 큐비즘에서 이탈시킬 수 있어 제거.
    //   테스트 후 큐비즘과 공존 가능하면 복원 검토. 현재는 분위기만 텍스트로 표현.
    // 원본: 'Soft gentle curves with warm peaceful atmosphere, like Picasso\'s Rose Period'
    characteristicsEn: 'Soft gentle curves with warm peaceful atmosphere — tender and nurturing, like a sunlit afternoon nap',
    moodKeywords: [
      'gentle curves', 'warm serenity', 'soft flowing lines',
      'peaceful atmosphere', 'tender warmth', 'quiet harmony',
    ],
    temperament: 'calm',
  },
  curious: {
    name: '몽상가 화가',
    nameEn: 'The Dreamer Painter',
    picassoPeriod: '초현실주의 영향기',
    characteristics: '꿈과 현실이 뒤섞인 초현실적 세계',
    // [주석 사유] Figures by the Sea / Seated Bather는 초현실주의 작품(1930-31)으로 큐비즘이 아님.
    //   "melting organic forms", "soft curves morphing"은 큐비즘의 각진 면 분할과 직접 충돌.
    //   AI가 프롬프트 뒷부분을 더 강하게 따르므로, 여기서 초현실주의를 명시하면 큐비즘이 무시됨.
    //   테스트 후 결과 확인하고, 필요시 큐비즘과 양립 가능한 형태로 일부 복원 검토.
    // 원본 characteristicsEn: 'Dream and reality merged into surreal world — like Picasso\'s Figures by the Sea and Seated Bather'
    characteristicsEn: 'Cubist structure with surreal dreamlike atmosphere — familiar objects in impossible arrangements, reality feels unstable',
    // 원본 moodKeywords: ['Picasso surrealist style like Figures by the Sea and Seated Bather', 'melting organic bone-like forms', 'dream logic where objects float in impossible positions', 'soft curves morphing into grotesque shapes', 'hallucinatory atmosphere', 'reality dissolving into fantasy']
    moodKeywords: [
      'dreamlike distortion within cubist fragmented planes',
      'familiar objects placed in impossible positions',
      'multiple realities overlapping in the same frame',
      'unsettling yet fascinating atmosphere',
      'reality feels unstable and shifting',
      'curious wandering gaze exploring every corner',
    ],
    temperament: 'curious',
  },
  aloof: {
    name: '고고한 화가',
    nameEn: 'The Noble Painter',
    picassoPeriod: '신고전주의 시기',
    characteristics: '거대한 볼륨감과 조각적 형태, 차갑고 우아한 위엄',
    // [주석 사유] Neoclassical period(1918-1925)는 큐비즘이 아님(신고전주의). AI가 고전적 사실주의로 빠질 수 있어 제거.
    //   테스트 후 큐비즘과 공존 가능하면 복원 검토. 현재는 분위기만 텍스트로 표현.
    // 원본: 'Monumental sculptural forms with cold elegant dignity, like Picasso\'s Neoclassical period'
    characteristicsEn: 'Monumental sculptural forms with cold elegant dignity — towering, detached, looking down from above',
    moodKeywords: [
      'sculptural grandeur', 'cool elegance', 'monumental forms',
      'dignified composure', 'commanding presence', 'refined detachment',
    ],
    temperament: 'aloof',
  },
  chaotic: {
    name: '자유로운 화가',
    nameEn: 'The Free Spirit Painter',
    picassoPeriod: '분석적 큐비즘 시기',
    characteristics: '파편화된 면과 콜라주 느낌, 예측불가한 질감의 향연',
    characteristicsEn: 'Fragmented planes and collage feel with unpredictable textures, like Picasso\'s Analytical Cubism',
    moodKeywords: [
      'fragmented collage', 'textural chaos', 'unpredictable layering',
      'explosive composition', 'mixed-media feel', 'wild creative freedom',
    ],
    temperament: 'chaotic',
  },
  melancholy: {
    name: '감성파 화가',
    nameEn: 'The Melancholic Painter',
    picassoPeriod: '청색 시기 (1901-1904)',
    characteristics: '깊은 블루톤 분위기 속 길쭉한 형태, 고요하고 감성적인 세계',
    // [주석 사유] Blue Period(1901-1904)는 큐비즘이 아님(큐비즘 이전 시기). 사실적 인물화로 빠질 수 있어 제거.
    //   테스트 후 큐비즘과 공존 가능하면 복원 검토. 현재는 분위기만 텍스트로 표현.
    // 원본: 'Deep blue undertones with elongated forms and quiet contemplation, like Picasso\'s Blue Period'
    characteristicsEn: 'Deep blue undertones with elongated forms and quiet contemplation — lonely stillness, like staring out a rainy window',
    moodKeywords: [
      'contemplative blue undertones', 'elongated forms', 'quiet introspection',
      'dreamy atmospheric depth', 'gentle melancholic beauty', 'serene solitude',
    ],
    temperament: 'melancholy',
  },
};

/** 한국어 태그 → Temperament 매핑 (입력 태그를 기질로 변환) */
export const TAG_TO_TEMPERAMENT: Record<string, Temperament> = {
  '엉뚱한': 'chaotic',
  '장난꾸러기': 'playful',
  '활발한': 'playful',
  '사나운': 'fierce',
  '예민한': 'fierce',
  '잔잔한': 'calm',
  '느긋한': 'calm',
  '애교쟁이': 'calm',
  '도도한': 'aloof',
  '독립적인': 'aloof',
  '호기심 많은': 'curious',
  '겁쟁이': 'curious',
  '쓸쓸한': 'melancholy',
  '외로운': 'melancholy',
};
