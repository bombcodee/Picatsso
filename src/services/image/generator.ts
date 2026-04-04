import type { ArtGenerationRequest, GeneratedArtwork } from '@/lib/types';

/** 이미지 생성 서비스 인터페이스 (어댑터 패턴) */
export interface ImageGenerator {
  generate(request: ArtGenerationRequest): Promise<GeneratedArtwork[]>;
}
