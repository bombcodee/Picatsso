/** 환경변수 중앙 관리 */
export const config = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY ?? '',
    analysisModel: 'gemini-2.5-flash-preview-04-17',
    imageModel: 'gemini-2.0-flash-exp',
  },
  upload: {
    maxFiles: 3,
    maxFileSizeMB: 10,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
  generation: {
    imageCount: 2,
    imageSize: '1024x1024',
  },
} as const;
