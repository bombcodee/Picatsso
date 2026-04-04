'use client';

import { useCallback } from 'react';

/** 이미지 다운로드 훅 */
export function useDownload() {
  const downloadSingle = useCallback((base64: string, filename?: string) => {
    const name = filename ?? `picatsso_${Date.now()}.png`;
    const link = document.createElement('a');
    link.href = base64;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const downloadAll = useCallback((images: { imageBase64: string; id: string }[]) => {
    images.forEach((img, index) => {
      setTimeout(() => {
        downloadSingle(img.imageBase64, `picatsso_${index + 1}_${Date.now()}.png`);
      }, index * 500); // 브라우저 다운로드 충돌 방지
    });
  }, [downloadSingle]);

  return { downloadSingle, downloadAll };
}
