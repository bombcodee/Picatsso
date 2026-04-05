/** 고양이 성격 기질 유형 */
export type Temperament =
  | 'playful'   // 장난꾸러기
  | 'calm'      // 잔잔한/포근한
  | 'fierce'    // 사나운/싸움꾼
  | 'curious'   // 호기심 많은
  | 'aloof'     // 도도한
  | 'chaotic';  // 엉뚱한

/** 집사-고양이 관계 유형 */
export type OwnerRelationship =
  | 'close'        // 친밀
  | 'neutral'      // 보통
  | 'distant'      // 거리감
  | 'complicated'; // 복잡한 관계

/** 에너지 레벨 */
export type EnergyLevel = 'high' | 'medium' | 'low';

/** 감정 색감 맵 — 고양이가 좋아하는/싫어하는 대상 분류 */
export interface EmotionalColorMap {
  loves: string[];    // 매우 좋아함 → 선명한 파란색
  likes: string[];    // 좋아함 → 녹색/청록
  neutral: string[];  // 보통 → 노란색
  dislikes: string[]; // 싫어함 → 회색/갈색
}

/** 사용자가 입력하는 고양이 정보 */
export interface CatInput {
  images: File[];
  description: string;
  tags: string[];
  relationshipDescription: string;
  favoriteThings: string;
  dislikedThings: string;
  /** 고양이가 보는 장면 — 결과물 이미지의 주제가 됨 */
  sceneDescription: string;
  /** 고양이가 보는 장면 사진 (선택) */
  sceneImage: File | null;
}

/** AI가 분석한 고양이 성격 결과 */
export interface CatAnalysis {
  personalityType: string;
  keywords: string[];
  energyLevel: EnergyLevel;
  temperament: Temperament;
  artStyleSuggestion: string;
  description: string;
  emotionalColorMap: EmotionalColorMap;
  ownerRelationship: OwnerRelationship;
  ownerRelationshipDetail: string;
}
