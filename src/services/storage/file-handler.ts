import { config } from '@/lib/config';

/** File → base64 문자열 변환 (Gemini API 전달용) */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** base64 이미지 → 브라우저 다운로드 트리거 */
export function downloadImage(base64: string, filename: string): void {
  const link = document.createElement('a');
  link.href = base64;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/** 이미지 파일 유효성 검증 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const { maxFileSizeMB, acceptedTypes } = config.upload;

  if (!(acceptedTypes as readonly string[]).includes(file.type)) {
    return { valid: false, error: `지원하지 않는 파일 형식입니다. (${acceptedTypes.join(', ')})` };
  }

  if (file.size > maxFileSizeMB * 1024 * 1024) {
    return { valid: false, error: `파일 크기가 ${maxFileSizeMB}MB를 초과합니다.` };
  }

  return { valid: true };
}
