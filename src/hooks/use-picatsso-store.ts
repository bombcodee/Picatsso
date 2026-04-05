import { create } from 'zustand';
import type { CatAnalysis, GeneratedArtwork } from '@/lib/types';

/** 플로우 단계 */
export type FlowStep =
  | 0  // 랜딩
  | 1  // 입력
  | 2  // 분석 중
  | 3  // 분석 결과
  | 4  // 생성 중
  | 5; // 최종 결과

/** 입력 슬라이스 */
interface InputSlice {
  images: File[];
  description: string;
  tags: string[];
  relationshipDescription: string;
  favoriteThings: string;
  dislikedThings: string;
  sceneDescription: string;
  sceneImage: File | null;
  setImages: (images: File[]) => void;
  setDescription: (description: string) => void;
  setTags: (tags: string[]) => void;
  setRelationshipDescription: (text: string) => void;
  setFavoriteThings: (text: string) => void;
  setDislikedThings: (text: string) => void;
  setSceneDescription: (text: string) => void;
  setSceneImage: (file: File | null) => void;
  resetInput: () => void;
}

/** 분석 슬라이스 */
interface AnalysisSlice {
  analysis: CatAnalysis | null;
  analysisLoading: boolean;
  analysisError: string | null;
  setAnalysis: (analysis: CatAnalysis) => void;
  setAnalysisLoading: (loading: boolean) => void;
  setAnalysisError: (error: string | null) => void;
  clearAnalysis: () => void;
}

/** 생성 슬라이스 */
interface GenerationSlice {
  artworks: GeneratedArtwork[];
  generationLoading: boolean;
  generationError: string | null;
  setArtworks: (artworks: GeneratedArtwork[]) => void;
  setGenerationLoading: (loading: boolean) => void;
  setGenerationError: (error: string | null) => void;
  clearArtworks: () => void;
}

/** 플로우 슬라이스 */
interface FlowSlice {
  currentStep: FlowStep;
  goToStep: (step: FlowStep) => void;
  resetFlow: () => void;
}

/** 전체 스토어 타입 */
export type PicatssoStore = InputSlice & AnalysisSlice & GenerationSlice & FlowSlice;

const initialInputState = {
  images: [] as File[],
  description: '',
  tags: [] as string[],
  relationshipDescription: '',
  favoriteThings: '',
  dislikedThings: '',
  sceneDescription: '',
  sceneImage: null as File | null,
};

export const usePicatssoStore = create<PicatssoStore>((set) => ({
  // ── 입력 슬라이스 ──
  ...initialInputState,
  setImages: (images) => set({ images }),
  setDescription: (description) => set({ description }),
  setTags: (tags) => set({ tags }),
  setRelationshipDescription: (relationshipDescription) => set({ relationshipDescription }),
  setFavoriteThings: (favoriteThings) => set({ favoriteThings }),
  setDislikedThings: (dislikedThings) => set({ dislikedThings }),
  setSceneDescription: (sceneDescription) => set({ sceneDescription }),
  setSceneImage: (sceneImage) => set({ sceneImage }),
  resetInput: () => set(initialInputState),

  // ── 분석 슬라이스 ──
  analysis: null,
  analysisLoading: false,
  analysisError: null,
  setAnalysis: (analysis) => set({ analysis, analysisError: null }),
  setAnalysisLoading: (analysisLoading) => set({ analysisLoading }),
  setAnalysisError: (analysisError) => set({ analysisError, analysisLoading: false }),
  clearAnalysis: () => set({ analysis: null, analysisError: null }),

  // ── 생성 슬라이스 ──
  artworks: [],
  generationLoading: false,
  generationError: null,
  setArtworks: (artworks) => set({ artworks, generationError: null }),
  setGenerationLoading: (generationLoading) => set({ generationLoading }),
  setGenerationError: (generationError) => set({ generationError, generationLoading: false }),
  clearArtworks: () => set({ artworks: [], generationError: null }),

  // ── 플로우 슬라이스 ──
  currentStep: 0,
  goToStep: (currentStep) => set({ currentStep }),
  resetFlow: () => set({
    ...initialInputState,
    analysis: null,
    analysisLoading: false,
    analysisError: null,
    artworks: [],
    generationLoading: false,
    generationError: null,
    currentStep: 0,
  }),
}));
