import type { CatAnalysis, Temperament } from './cat';

/** 피카소 기반 화풍 스타일 정보 */
export interface ArtStyle {
  name: string;
  picassoPeriod: string;
  characteristics: string;
  promptKeywords: string[];
  temperament: Temperament;
}

/** 생성된 아트워크 */
export interface GeneratedArtwork {
  id: string;
  imageBase64: string;
  prompt: string;
  style: ArtStyle;
  createdAt: string;
}

/** 이미지 생성 요청 */
export interface ArtGenerationRequest {
  analysis: CatAnalysis;
  style: ArtStyle;
  sceneDescription?: string;
}
