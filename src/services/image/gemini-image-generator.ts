import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ImageGenerator } from './generator';
import type { ArtGenerationRequest, GeneratedArtwork } from '@/lib/types';
import { buildImagePrompt, getArtStyleForAnalysis } from './prompt-builder';
import { config } from '@/lib/config';
import { withRetry } from '@/services/utils/retry';

/** Gemini Image API를 사용한 이미지 생성 구현체 */
export class GeminiImageGenerator implements ImageGenerator {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey?: string) {
    this.genAI = new GoogleGenerativeAI(apiKey ?? config.gemini.apiKey);
  }

  async generate(request: ArtGenerationRequest): Promise<GeneratedArtwork[]> {
    const prompt = buildImagePrompt(request.analysis, request.sceneDescription);
    const style = getArtStyleForAnalysis(request.analysis);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = this.genAI.getGenerativeModel({
      model: config.gemini.imageModel,
      generationConfig: {
        responseModalities: ['image', 'text'],
      } as any,
    });

    /**
     * 장면 사진은 이미지 생성 AI에 직접 전달하지 않음.
     * 이유: 사진을 넘기면 AI가 프롬프트(큐비즘/색각)를 무시하고 사진을 그대로 복제함.
     * 사진 정보는 1.5차 AI가 텍스트 묘사로 변환해서 프롬프트에 이미 반영되어 있음.
     */
    const artworks: GeneratedArtwork[] = [];
    const count = config.generation.imageCount;

    for (let i = 0; i < count; i++) {
      const variation = i === 0
        ? prompt
        : `${prompt}\n\nCreate a different variation — change the composition, angle, or emphasis while keeping the same style and color palette. Variation ${i + 1}.`;

      const result = await withRetry(() => model.generateContent(variation));
      const response = result.response;

      const imageData = this.extractImageFromResponse(response);

      if (imageData) {
        artworks.push({
          id: `artwork-${Date.now()}-${i}`,
          imageBase64: imageData,
          prompt: variation,
          style,
          createdAt: new Date().toISOString(),
        });
      }
    }

    return artworks;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private extractImageFromResponse(response: any): string | null {
    const candidates = response.candidates;
    if (!candidates?.[0]?.content?.parts) return null;

    for (const part of candidates[0].content.parts) {
      if (part.inlineData?.mimeType?.startsWith('image/')) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    return null;
  }
}
