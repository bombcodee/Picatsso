import type { CatAnalysis, Temperament } from './cat';

/** 피카소 기반 화풍 스타일 정보 (C안 하이브리드: 큐비즘 베이스 + 성격 악센트) */
export interface ArtStyle {
  /** 사용자에게 보여줄 라벨 (예: "장난꾸러기 화가") */
  name: string;
  /** 피카소 시기 참조 (프롬프트 내부용, UI 표시 아님) */
  picassoPeriod: string;
  /** 성격별 분위기 설명 (한국어) */
  characteristics: string;
  /** 성격별 분위기·에너지 키워드 (영어, 프롬프트용) */
  moodKeywords: string[];
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
  /** 장면 사진 base64 — 이미지 생성 AI에 구도 참조용으로 전달 */
  sceneImageBase64?: string;
}
