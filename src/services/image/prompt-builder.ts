import type { CatAnalysis, ArtStyle } from '@/lib/types';
import {
  IMAGE_GENERATION_TEMPLATE,
  CUBISM_BASE_BLOCK,
  TEMPERAMENT_TO_ART_STYLE,
} from '@/lib/constants';

/**
 * 분석 결과 + 장면 설명 → 이미지 생성 프롬프트 조립
 *
 * 프롬프트 조립 구조 (레고 블록식):
 *   IMAGE_GENERATION_TEMPLATE (조립 틀 = 플레이스홀더가 있는 템플릿 문자열)
 *     ├── {cubismBase}           ← CUBISM_BASE_BLOCK 상수 (큐비즘 + 고양이 과학 통합)
 *     ├── {characteristics}      ← 성격별 분위기 설명 영어 (characteristicsEn)
 *     ├── {moodKeywords}         ← 성격별 에너지 키워드 (personality-mapping.ts)
 *     ├── {loves} / {dislikes}   ← 감정 색감용 (AI 분석 결과)
 *     └── {sceneDescription} 등  ← 사용자 입력값
 *
 * 언어 규칙: AI에 전달되는 모든 값은 영어. 한국어는 UI 표시용만.
 */
export function buildImagePrompt(analysis: CatAnalysis, sceneDescription?: string): string {
  const style: ArtStyle = TEMPERAMENT_TO_ART_STYLE[analysis.temperament];

  let prompt = IMAGE_GENERATION_TEMPLATE;

  /** 장면 설명 — 없으면 기본 장면 사용 */
  const scene = sceneDescription?.trim()
    || 'A cozy living room, looking out through the window. Warm afternoon sunlight streaming in.';

  /** 1) 큐비즘 베이스 블록 삽입 (CAT_PICASSO_CONNECTION은 여기에 통합됨) */
  prompt = prompt.replace(/{cubismBase}/g, CUBISM_BASE_BLOCK);

  /** 2) 장면 + 성격 정보 — 각 고양이마다 다른 값 */
  prompt = prompt.replace(/{sceneDescription}/g, scene);
  prompt = prompt.replace(/{personalityType}/g, analysis.personalityTypeEn || analysis.personalityType);
  prompt = prompt.replace(/{artistLabel}/g, style.nameEn);
  prompt = prompt.replace(/{characteristics}/g, style.characteristicsEn);
  prompt = prompt.replace(/{moodKeywords}/g, style.moodKeywords.join(', '));
  prompt = prompt.replace(/{keywords}/g, (analysis.keywordsEn?.length ? analysis.keywordsEn : analysis.keywords).join(', '));
  prompt = prompt.replace(/{temperament}/g, analysis.temperament);

  /** 3) 감정 표현 — 영어 필드 우선, 없으면 한국어 폴백 */
  const lovesEn = analysis.emotionalColorMapEn?.loves?.length ? analysis.emotionalColorMapEn.loves : analysis.emotionalColorMap.loves;
  const dislikesEn = analysis.emotionalColorMapEn?.dislikes?.length ? analysis.emotionalColorMapEn.dislikes : analysis.emotionalColorMap.dislikes;
  prompt = prompt.replace(/{loves}/g, lovesEn.join(', ') || 'treats, toys');
  prompt = prompt.replace(/{dislikes}/g, dislikesEn.join(', ') || 'bath, loud noise');

  return prompt;
}

/** 분석 결과에서 매칭 ArtStyle 가져오기 */
export function getArtStyleForAnalysis(analysis: CatAnalysis): ArtStyle {
  return TEMPERAMENT_TO_ART_STYLE[analysis.temperament];
}
