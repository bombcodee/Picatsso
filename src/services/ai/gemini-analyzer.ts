import { GoogleGenerativeAI } from '@google/generative-ai';
import type { CatAnalyzer } from './analyzer';
import type { CatAnalysis } from '@/lib/types';
import { ANALYSIS_SYSTEM_PROMPT } from '@/lib/constants';
import { config } from '@/lib/config';

/** Gemini API를 사용한 고양이 성격 분석 구현체 */
export class GeminiAnalyzer implements CatAnalyzer {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey?: string) {
    this.genAI = new GoogleGenerativeAI(apiKey ?? config.gemini.apiKey);
  }

  async analyze(input: {
    imageBase64List: string[];
    description: string;
    tags: string[];
    relationshipDescription: string;
    favoriteThings: string;
    dislikedThings: string;
  }): Promise<CatAnalysis> {
    const model = this.genAI.getGenerativeModel({
      model: config.gemini.analysisModel,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const imageParts = input.imageBase64List.map((base64) => {
      const [meta, data] = base64.includes(',')
        ? base64.split(',')
        : ['data:image/jpeg;base64', base64];
      const mimeType = meta.match(/data:(.*?);/)?.[1] ?? 'image/jpeg';
      return { inlineData: { data: data ?? base64, mimeType } };
    });

    const userMessage = this.buildUserMessage(input);

    const result = await model.generateContent([
      ANALYSIS_SYSTEM_PROMPT,
      ...imageParts,
      userMessage,
    ]);

    const text = result.response.text();
    return this.parseResponse(text);
  }

  private buildUserMessage(input: {
    description: string;
    tags: string[];
    relationshipDescription: string;
    favoriteThings: string;
    dislikedThings: string;
  }): string {
    return `[집사 제공 정보]
- 설명: ${input.description}
- 선택 태그: ${input.tags.join(', ')}

[집사와의 관계]
- 평상시 모습: ${input.relationshipDescription}
- 좋아하는 것: ${input.favoriteThings}
- 싫어하는 것: ${input.dislikedThings}`;
  }

  private parseResponse(text: string): CatAnalysis {
    const parsed = JSON.parse(text);

    return {
      personalityType: parsed.personalityType ?? '미스터리 고양이',
      keywords: parsed.keywords ?? [],
      energyLevel: parsed.energyLevel ?? 'medium',
      temperament: parsed.temperament ?? 'curious',
      artStyleSuggestion: parsed.artStyleSuggestion ?? '',
      description: parsed.description ?? '',
      emotionalColorMap: {
        loves: parsed.emotionalColorMap?.loves ?? [],
        likes: parsed.emotionalColorMap?.likes ?? [],
        neutral: parsed.emotionalColorMap?.neutral ?? [],
        dislikes: parsed.emotionalColorMap?.dislikes ?? [],
      },
      ownerRelationship: parsed.ownerRelationship ?? 'neutral',
      ownerRelationshipDetail: parsed.ownerRelationshipDetail ?? '',
    };
  }
}
