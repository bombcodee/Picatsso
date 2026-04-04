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
    const prompt = buildImagePrompt(request.analysis);
    const style = getArtStyleForAnalysis(request.analysis);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = this.genAI.getGenerativeModel({
      model: config.gemini.imageModel,
      generationConfig: {
        responseModalities: ['image', 'text'],
      } as any,
    });

    const artworks: GeneratedArtwork[] = [];
    const count = config.generation.imageCount;

    for (let i = 0; i < count; i++) {
      const variation = i === 0
        ? prompt
        : `${prompt}\n\nCreate a different variation — change the composition, angle, or emphasis while keeping the same style and color palette. Variation ${i + 1}.`;

      const result = await model.generateContent(variation);
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
