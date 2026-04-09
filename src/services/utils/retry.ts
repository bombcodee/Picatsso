/**
 * 자동 재시도 유틸리티 — 503/429 에러 시 자동 재시도
 *
 * Gemini API가 과부하(503) 또는 rate limit(429) 시 2~3초 후 자동 재시도.
 * Reddit 사용자 보고: "5번 중 1번은 503" → 재시도 3회면 대부분 성공.
 */

/** 재시도 가능한 에러인지 판단 */
function isRetryableError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes('503') ||
    message.includes('429') ||
    message.includes('overloaded') ||
    message.includes('high demand') ||
    message.includes('UNAVAILABLE') ||
    message.includes('Too Many Requests');
}

/**
 * 자동 재시도로 함수 실행
 * @param fn 실행할 비동기 함수
 * @param maxRetries 최대 재시도 횟수 (기본 3)
 * @param delayMs 재시도 간 대기 시간 (기본 3000ms, 매 시도마다 1.5배 증가)
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 3000,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries && isRetryableError(error)) {
        const wait = delayMs * Math.pow(1.5, attempt);
        console.warn(`[Retry] ${attempt + 1}/${maxRetries} 실패, ${Math.round(wait / 1000)}초 후 재시도...`);
        await new Promise((resolve) => setTimeout(resolve, wait));
      } else {
        throw error;
      }
    }
  }

  throw lastError;
}
