import { NextRequest, NextResponse } from 'next/server';
import { GeminiAnalyzer } from '@/services/ai/gemini-analyzer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const description = formData.get('description') as string ?? '';
    const tags = JSON.parse(formData.get('tags') as string ?? '[]') as string[];
    const relationshipDescription = formData.get('relationshipDescription') as string ?? '';
    const favoriteThings = formData.get('favoriteThings') as string ?? '';
    const dislikedThings = formData.get('dislikedThings') as string ?? '';

    // 이미지 파일들 → base64 변환
    const imageBase64List: string[] = [];
    const imageFiles = formData.getAll('images') as File[];

    for (const file of imageFiles) {
      const buffer = await file.arrayBuffer();
      const base64 = `data:${file.type};base64,${Buffer.from(buffer).toString('base64')}`;
      imageBase64List.push(base64);
    }

    const analyzer = new GeminiAnalyzer();
    const analysis = await analyzer.analyze({
      imageBase64List,
      description,
      tags,
      relationshipDescription,
      favoriteThings,
      dislikedThings,
    });

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('[API] 분석 실패:', error);
    return NextResponse.json(
      { error: '고양이 분석 중 문제가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 },
    );
  }
}
