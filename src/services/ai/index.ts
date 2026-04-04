export type { CatAnalyzer } from './analyzer';
export { GeminiAnalyzer } from './gemini-analyzer';

/** AI 분석 서비스 팩토리 — 구현체를 교체하려면 여기만 수정 */
export function createAnalyzer() {
  return new (require('./gemini-analyzer').GeminiAnalyzer)();
}
