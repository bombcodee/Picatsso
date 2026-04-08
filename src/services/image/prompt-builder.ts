import type { CatAnalysis, ArtStyle } from '@/lib/types';
import {
  IMAGE_GENERATION_TEMPLATE,
  CUBISM_BASE_BLOCK,
  CAT_PICASSO_CONNECTION,
  TEMPERAMENT_TO_ART_STYLE,
} from '@/lib/constants';

/**
 * 분석 결과 + 장면 설명 → 이미지 생성 프롬프트 조립
 *
 * 프롬프트 조립 구조 (레고 블록식):
 *   IMAGE_GENERATION_TEMPLATE (조립 틀 = 플레이스홀더가 있는 템플릿 문자열)
 *     ├── {cubismBase}           ← CUBISM_BASE_BLOCK 상수 (피카소 큐비즘 공통 화법)
 *     ├── {catPicassoConnection} ← CAT_PICASSO_CONNECTION 상수 (고양이 시각 과학 × 큐비즘 연결)
 *     ├── {characteristics}      ← 성격별 분위기 설명 (personality-mapping.ts)
 *     ├── {moodKeywords}         ← 성격별 에너지 키워드 (personality-mapping.ts)
 *     ├── {loves} / {dislikes}   ← 감정 색감용 (AI 분석 결과)
 *     └── {sceneDescription} 등  ← 사용자 입력값
 */
export function buildImagePrompt(analysis: CatAnalysis, sceneDescription?: string): string {
  const style: ArtStyle = TEMPERAMENT_TO_ART_STYLE[analysis.temperament];

  let prompt = IMAGE_GENERATION_TEMPLATE;

  /** 장면 설명 — 없으면 기본 장면 사용 */
  const scene = sceneDescription?.trim()
    || '집 안 거실에서 창밖을 바라보고 있다. 따뜻한 햇살이 들어오는 오후.';

  /** 1) 독립 상수 블록 삽입 — 모든 그림에 공통 적용 */
  prompt = prompt.replace(/{cubismBase}/g, CUBISM_BASE_BLOCK);
  prompt = prompt.replace(/{catPicassoConnection}/g, CAT_PICASSO_CONNECTION);

  /** 2) 장면 + 성격 정보 — 각 고양이마다 다른 값 */
  prompt = prompt.replace(/{sceneDescription}/g, scene);
  prompt = prompt.replace(/{personalityType}/g, analysis.personalityType);
  prompt = prompt.replace(/{artistLabel}/g, style.name);
  prompt = prompt.replace(/{characteristics}/g, style.characteristics);
  prompt = prompt.replace(/{moodKeywords}/g, style.moodKeywords.join(', '));
  prompt = prompt.replace(/{keywords}/g, analysis.keywords.join(', '));
  prompt = prompt.replace(/{temperament}/g, analysis.temperament);

  /** 3) 감정 표현 — 좋아하는/싫어하는 대상 (파레이돌리아 + 직접 강조에 사용) */
  prompt = prompt.replace(/{loves}/g, analysis.emotionalColorMap.loves.join(', ') || 'treats, toys');
  prompt = prompt.replace(/{dislikes}/g, analysis.emotionalColorMap.dislikes.join(', ') || 'bath, loud noise');

  return prompt;
}

/** 분석 결과에서 매칭 ArtStyle 가져오기 */
export function getArtStyleForAnalysis(analysis: CatAnalysis): ArtStyle {
  return TEMPERAMENT_TO_ART_STYLE[analysis.temperament];
}
