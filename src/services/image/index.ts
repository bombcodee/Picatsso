export type { ImageGenerator } from './generator';
export { GeminiImageGenerator } from './gemini-image-generator';
export { buildImagePrompt, getArtStyleForAnalysis } from './prompt-builder';

/** 이미지 생성 서비스 팩토리 — 구현체를 교체하려면 여기만 수정 */
export function createImageGenerator() {
  return new (require('./gemini-image-generator').GeminiImageGenerator)();
}
