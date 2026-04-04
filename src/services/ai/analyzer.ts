import type { CatAnalysis } from '@/lib/types';

/** AI 고양이 분석 서비스 인터페이스 (어댑터 패턴) */
export interface CatAnalyzer {
  analyze(input: {
    imageBase64List: string[];
    description: string;
    tags: string[];
    relationshipDescription: string;
    favoriteThings: string;
    dislikedThings: string;
  }): Promise<CatAnalysis>;
}
