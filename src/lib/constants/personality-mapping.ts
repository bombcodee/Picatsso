import type { ArtStyle, Temperament } from '@/lib/types';

/** 성격 선택 태그 목록 */
export const PERSONALITY_TAGS = [
  '엉뚱한', '장난꾸러기', '사나운', '잔잔한', '도도한', '호기심 많은',
  '겁쟁이', '애교쟁이', '독립적인', '활발한', '느긋한', '예민한',
] as const;

/** 기질 → 화풍 스타일 매핑 (PRD 3.3 기준) */
export const TEMPERAMENT_TO_ART_STYLE: Record<Temperament, ArtStyle> = {
  chaotic: {
    name: '입체파 (큐비즘)',
    picassoPeriod: '분석적 큐비즘 시기',
    characteristics: '왜곡된 형태, 다중 시점, 파편화',
    promptKeywords: ['cubism', 'fragmented forms', 'multiple perspectives', 'geometric abstraction', 'analytical cubism'],
    temperament: 'chaotic',
  },
  playful: {
    name: '다이내믹 표현주의',
    picassoPeriod: '아프리카 미술 영향기',
    characteristics: '역동적 붓터치, 밝은 톤, 움직임',
    promptKeywords: ['dynamic expressionism', 'energetic brushstrokes', 'bright tones', 'movement', 'African art period'],
    temperament: 'playful',
  },
  fierce: {
    name: '강렬한 야수파',
    picassoPeriod: '게르니카 시기',
    characteristics: '굵은 선, 강한 대비, 날카로운 형태',
    promptKeywords: ['fauvism', 'bold lines', 'strong contrast', 'sharp angular forms', 'Guernica style'],
    temperament: 'fierce',
  },
  calm: {
    name: '부드러운 장밋빛',
    picassoPeriod: '장밋빛 시기 (1904-1906)',
    characteristics: '온화한 곡선, 따뜻한 톤, 포근함',
    promptKeywords: ['Rose Period', 'soft curves', 'warm tones', 'gentle', 'tender atmosphere'],
    temperament: 'calm',
  },
  aloof: {
    name: '클래식 초상화풍',
    picassoPeriod: '신고전주의 시기',
    characteristics: '정제된 구도, 우아한 선, 격식',
    promptKeywords: ['neoclassicism', 'refined composition', 'elegant lines', 'formal portrait', 'dignified'],
    temperament: 'aloof',
  },
  curious: {
    name: '초현실주의 혼합',
    picassoPeriod: '초현실주의 영향기',
    characteristics: '몽환적, 다양한 오브제, 꿈 같은',
    promptKeywords: ['surrealism', 'dreamlike', 'varied objects', 'whimsical', 'fantastical elements'],
    temperament: 'curious',
  },
};

/** 한국어 태그 → Temperament 매핑 (입력 태그를 기질로 변환) */
export const TAG_TO_TEMPERAMENT: Record<string, Temperament> = {
  '엉뚱한': 'chaotic',
  '장난꾸러기': 'playful',
  '활발한': 'playful',
  '사나운': 'fierce',
  '잔잔한': 'calm',
  '느긋한': 'calm',
  '애교쟁이': 'calm',
  '도도한': 'aloof',
  '독립적인': 'aloof',
  '호기심 많은': 'curious',
  '겁쟁이': 'curious',
  '예민한': 'fierce',
};
