import { NextRequest, NextResponse } from 'next/server';
import { GeminiImageGenerator } from '@/services/image/gemini-image-generator';
import { getArtStyleForAnalysis } from '@/services/image/prompt-builder';
import type { CatAnalysis } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { analysis: CatAnalysis; sceneDescription?: string };
    const { analysis, sceneDescription } = body;

    if (!analysis?.temperament) {
      return NextResponse.json(
        { error: '분석 결과가 올바르지 않습니다.' },
        { status: 400 },
      );
    }

    const style = getArtStyleForAnalysis(analysis);
    const generator = new GeminiImageGenerator();
    const artworks = await generator.generate({ analysis, style, sceneDescription });

    return NextResponse.json({ artworks });
  } catch (error) {
    console.error('[API] 이미지 생성 실패:', error);
    return NextResponse.json(
      { error: '아트워크 생성 중 문제가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 },
    );
  }
}
