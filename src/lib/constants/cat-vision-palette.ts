/** 고양이 시각 기반 컬러 팔레트 (Picatsso 전용) */
export const CAT_VISION_PALETTE = {
  /** 고양이가 선명하게 보는 색 */
  primary: {
    blue: ['#4A90D9', '#2E5FA1', '#6BB3E0', '#1E3A5F'],
    green: ['#7BAE7F', '#4A7C59', '#A8C9A0'],
    yellow: ['#D4C36A', '#B8A93E', '#E8D98A'],
  },
  /** 고양이에게 흐릿하게 보이는 색 (변환된 값) */
  muted: {
    redAsBrown: '#8B7D6B',
    orangeAsBeige: '#9E8E7E',
    pinkAsGray: '#A09090',
  },
  /** 배경/뉴트럴 */
  neutral: {
    warmGray: '#D0CFC8',
    coolGray: '#B8BCC0',
    cream: '#E5E0D5',
  },
} as const;

/** 감정 → 색감 매핑 (고양이의 감정이 색으로 표현됨) */
export const EMOTION_COLOR_MAP = {
  loves: { color: '#4A90D9', label: '매우 좋아함', description: '선명한 파란색' },
  likes: { color: '#7BAE7F', label: '좋아함', description: '밝은 녹색/청록' },
  neutral: { color: '#D4C36A', label: '보통', description: '노란색/중간톤' },
  dislikes: { color: '#8B7D6B', label: '싫어함', description: '탁한 회색/갈색' },
} as const;
