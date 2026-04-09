import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ImageGenerator } from './generator';
import type { ArtGenerationRequest, GeneratedArtwork } from '@/lib/types';
import { buildImagePrompt, getArtStyleForAnalysis } from './prompt-builder';
import { config } from '@/lib/config';

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

    /** 장면 사진이 있으면 이미지 생성 AI에 구도 참조용으로 전달 */
    const sceneImagePart = this.buildSceneImagePart(request.sceneImageBase64);

    const artworks: GeneratedArtwork[] = [];
    const count = config.generation.imageCount;

    for (let i = 0; i < count; i++) {
      const variation = i === 0
        ? prompt
        : `${prompt}\n\nCreate a different variation — change the composition, angle, or emphasis while keeping the same style and color palette. Variation ${i + 1}.`;

      /** 프롬프트 + (선택) 장면 사진을 함께 전달 */
      const contentParts: (string | { inlineData: { data: string; mimeType: string } })[] = [variation];
      if (sceneImagePart) {
        contentParts.push(sceneImagePart);
      }

      const result = await model.generateContent(contentParts);
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

  /** 장면 사진 base64 → Gemini inlineData 형식으로 변환 */
  private buildSceneImagePart(sceneImageBase64?: string): { inlineData: { data: string; mimeType: string } } | null {
    if (!sceneImageBase64) return null;

    const [meta, data] = sceneImageBase64.includes(',')
      ? sceneImageBase64.split(',')
      : ['data:image/jpeg;base64', sceneImageBase64];
    const mimeType = meta.match(/data:(.*?);/)?.[1] ?? 'image/jpeg';

    return { inlineData: { data: data ?? sceneImageBase64, mimeType } };
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
