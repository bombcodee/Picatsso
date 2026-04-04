import type { CatAnalysis, ArtStyle } from '@/lib/types';
import { IMAGE_GENERATION_TEMPLATE, TEMPERAMENT_TO_ART_STYLE } from '@/lib/constants';

/** 분석 결과 → 이미지 생성 프롬프트 조립 */
export function buildImagePrompt(analysis: CatAnalysis): string {
  const style: ArtStyle = TEMPERAMENT_TO_ART_STYLE[analysis.temperament];

  let prompt = IMAGE_GENERATION_TEMPLATE;

  prompt = prompt.replace(/{picassoPeriod}/g, style.picassoPeriod);
  prompt = prompt.replace(/{personalityType}/g, analysis.personalityType);
  prompt = prompt.replace(/{artStyleName}/g, style.name);
  prompt = prompt.replace(/{characteristics}/g, style.characteristics);
  prompt = prompt.replace(/{promptKeywords}/g, style.promptKeywords.join(', '));
  prompt = prompt.replace(/{keywords}/g, analysis.keywords.join(', '));
  prompt = prompt.replace(/{temperament}/g, analysis.temperament);
  prompt = prompt.replace(/{loves}/g, analysis.emotionalColorMap.loves.join(', ') || 'treats, toys');
  prompt = prompt.replace(/{dislikes}/g, analysis.emotionalColorMap.dislikes.join(', ') || 'bath, loud noise');

  return prompt;
}

/** 분석 결과에서 매칭 ArtStyle 가져오기 */
export function getArtStyleForAnalysis(analysis: CatAnalysis): ArtStyle {
  return TEMPERAMENT_TO_ART_STYLE[analysis.temperament];
}
