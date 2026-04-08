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
 * - name: 사용자에게 보여줄 라벨 (미술사 용어 X, 성격 기반 O)
 * - picassoPeriod: 프롬프트 내부 참조용 (UI 비노출)
 * - moodKeywords: 분위기·에너지 중심 (미술사 기법 X)
 */
export const TEMPERAMENT_TO_ART_STYLE: Record<Temperament, ArtStyle> = {
  playful: {
    name: '장난꾸러기 화가',
    picassoPeriod: '아프리카 미술 영향기',
    characteristics: '밝고 역동적인 에너지, 기하학적 장난기가 넘치는 구도',
    /** 분위기 키워드: 생동감 넘치는 에너지 / 기하학적 장난기 / 역동적 구도 / 밝고 활기찬 분위기 / 리듬감 있는 붓터치 / 즐거운 움직임 */
    moodKeywords: [
      'vibrant energy', 'geometric playfulness', 'dynamic composition',
      'bright and lively atmosphere', 'rhythmic brushstrokes', 'joyful movement',
    ],
    temperament: 'playful',
  },
  fierce: {
    name: '열정의 화가',
    picassoPeriod: '게르니카 시기',
    characteristics: '날카로운 각도와 강한 대비, 극적이고 압도적인 구도',
    /** 분위기 키워드: 극적인 대비 / 공격적인 각도 / 강렬한 에너지 / 날카로운 기하학적 긴장감 / 압도적 구도 / 날것의 감정적 힘 */
    moodKeywords: [
      'dramatic contrast', 'aggressive angles', 'intense energy',
      'sharp geometric tension', 'powerful composition', 'raw emotional force',
    ],
    temperament: 'fierce',
  },
  calm: {
    name: '온화한 화가',
    picassoPeriod: '장밋빛 시기 (1904-1906)',
    characteristics: '부드러운 곡선과 따뜻한 톤, 여유롭고 평화로운 분위기',
    /** 분위기 키워드: 부드러운 곡선 / 따뜻한 평온 / 유연하게 흐르는 선 / 평화로운 분위기 / 다정한 온기 / 고요한 조화 */
    moodKeywords: [
      'gentle curves', 'warm serenity', 'soft flowing lines',
      'peaceful atmosphere', 'tender warmth', 'quiet harmony',
    ],
    temperament: 'calm',
  },
  curious: {
    name: '몽상가 화가',
    picassoPeriod: '초현실주의 영향기',
    characteristics: '왜곡된 형태와 몽환적 분위기, 여러 초점이 공존하는 꿈같은 세계',
    /** 분위기 키워드: 꿈같은 왜곡 / 여러 초점 공존 / 기발한 경이로움 / 환상적 분위기 / 초현실적 호기심 / 겹겹이 깊어지는 시야 */
    moodKeywords: [
      'dreamlike distortion', 'multiple focal points', 'whimsical wonder',
      'fantastical atmosphere', 'surreal curiosity', 'layered depth of field',
    ],
    temperament: 'curious',
  },
  aloof: {
    name: '고고한 화가',
    picassoPeriod: '신고전주의 시기',
    characteristics: '거대한 볼륨감과 조각적 형태, 차갑고 우아한 위엄',
    /** 분위기 키워드: 조각적 웅장함 / 차가운 우아함 / 기념비적 형태 / 위엄있는 침착함 / 압도하는 존재감 / 세련된 초연함 */
    moodKeywords: [
      'sculptural grandeur', 'cool elegance', 'monumental forms',
      'dignified composure', 'commanding presence', 'refined detachment',
    ],
    temperament: 'aloof',
  },
  chaotic: {
    name: '자유로운 화가',
    picassoPeriod: '분석적 큐비즘 시기',
    characteristics: '파편화된 면과 콜라주 느낌, 예측불가한 질감의 향연',
    /** 분위기 키워드: 파편화된 콜라주 / 질감의 혼돈 / 예측불가한 겹침 / 폭발적 구도 / 혼합매체 느낌 / 거친 창작 자유 */
    moodKeywords: [
      'fragmented collage', 'textural chaos', 'unpredictable layering',
      'explosive composition', 'mixed-media feel', 'wild creative freedom',
    ],
    temperament: 'chaotic',
  },
  melancholy: {
    name: '감성파 화가',
    picassoPeriod: '청색 시기 (1901-1904)',
    characteristics: '깊은 블루톤 분위기 속 길쭉한 형태, 고요하고 감성적인 세계',
    /** 분위기 키워드: 사색적인 블루 톤 / 길쭉한 형태 / 고요한 내면 성찰 / 몽환적 깊이감 / 부드러운 우수의 아름다움 / 고요한 고독 */
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
