'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { useCatAnalysis } from '@/hooks/use-cat-analysis';
import { ImageUploader } from './ImageUploader';
import { CatDescriptionForm } from './CatDescriptionForm';
import { PersonalityTagSelector } from './PersonalityTagSelector';
import { RelationshipInput } from './RelationshipInput';

export function CatInputForm() {
  const { images, description, analysisError } = usePicatssoStore();
  const { analyze } = useCatAnalysis();

  const canSubmit = images.length > 0 || description.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    analyze();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 step-enter">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">고양이 정보 입력</h2>
        <p className="text-muted-foreground">
          고양이에 대해 알려주세요. 더 자세할수록 더 멋진 그림이 나와요!
        </p>
      </div>

      <div className="space-y-6 bg-white rounded-2xl p-6 shadow-sm border">
        <ImageUploader />
        <hr className="border-border" />
        <CatDescriptionForm />
        <hr className="border-border" />
        <PersonalityTagSelector />
        <hr className="border-border" />
        <RelationshipInput />
      </div>

      {analysisError && (
        <p className="text-destructive text-sm text-center">{analysisError}</p>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={!canSubmit}
          className="bg-[#4A90D9] hover:bg-[#2E5FA1] disabled:bg-muted disabled:text-muted-foreground text-white px-10 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          🎨 분석 시작하기
        </button>
        {!canSubmit && (
          <p className="mt-2 text-xs text-muted-foreground">
            사진 또는 설명을 최소 하나 입력해주세요
          </p>
        )}
      </div>
    </form>
  );
}
