import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiImageGenerator } from '@/services/image/gemini-image-generator';
import { getArtStyleForAnalysis } from '@/services/image/prompt-builder';
import { SCENE_ANALYSIS_PROMPT } from '@/lib/constants';
import { config } from '@/lib/config';
import type { CatAnalysis } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    /** FormData(장면 사진 있음) / JSON(장면 사진 없음) 두 형식 모두 지원 */
    const contentType = request.headers.get('content-type') ?? '';
    let analysis: CatAnalysis;
    let sceneDescription: string | undefined;
    let sceneImageBase64: string | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      analysis = JSON.parse(formData.get('analysis') as string);
      sceneDescription = formData.get('sceneDescription') as string ?? '';

      const sceneFile = formData.get('sceneImage') as File | null;
      if (sceneFile) {
        const buffer = await sceneFile.arrayBuffer();
        sceneImageBase64 = `data:${sceneFile.type};base64,${Buffer.from(buffer).toString('base64')}`;
      }
    } else {
      const body = await request.json() as { analysis: CatAnalysis; sceneDescription?: string };
      analysis = body.analysis;
      sceneDescription = body.sceneDescription;
    }

    if (!analysis?.temperament) {
      return NextResponse.json(
        { error: '분석 결과가 올바르지 않습니다.' },
        { status: 400 },
      );
    }

    /**
     * 1.5차 AI: 장면 사진이 있으면 고양이 시점으로 묘사 생성
     * 사용자의 짧은 텍스트("가족들 보는 중") + 사진 분석 = 구체적인 영어 장면 묘사
     */
    let enrichedSceneDescription = sceneDescription;
    if (sceneImageBase64) {
      const aiDescription = await analyzeScenePhoto(sceneImageBase64, sceneDescription ?? '');
      if (aiDescription) {
        enrichedSceneDescription = aiDescription;
      }
    }

    const style = getArtStyleForAnalysis(analysis);
    const generator = new GeminiImageGenerator();
    const artworks = await generator.generate({
      analysis,
      style,
      sceneDescription: enrichedSceneDescription,
      sceneImageBase64: sceneImageBase64 ?? undefined,
    });

    return NextResponse.json({ artworks });
  } catch (error) {
    console.error('[API] 이미지 생성 실패:', error);
    return NextResponse.json(
      { error: '아트워크 생성 중 문제가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 },
    );
  }
}

/**
 * 장면 사진 AI 분석 (1.5차)
 * 사진을 Gemini Flash로 분석하여 고양이 시점의 영어 장면 묘사를 생성한다.
 * 사용자의 짧은 텍스트 설명을 참고하되, 사진에서 보이는 것을 우선으로 묘사.
 */
async function analyzeScenePhoto(imageBase64: string, userDescription: string): Promise<string | null> {
  try {
    const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
    const model = genAI.getGenerativeModel({ model: config.gemini.analysisModel });

    const [meta, data] = imageBase64.includes(',')
      ? imageBase64.split(',')
      : ['data:image/jpeg;base64', imageBase64];
    const mimeType = meta.match(/data:(.*?);/)?.[1] ?? 'image/jpeg';

    const prompt = SCENE_ANALYSIS_PROMPT.replace('{userDescription}', userDescription || 'No additional description provided.');

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: data ?? imageBase64, mimeType } },
    ]);

    const text = result.response.text().trim();
    return text || null;
  } catch (error) {
    console.error('[API] 장면 사진 분석 실패 — 사용자 텍스트로 폴백:', error);
    return null;
  }
}
