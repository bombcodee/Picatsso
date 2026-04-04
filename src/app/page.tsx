'use client';

import { usePicatssoStore } from '@/hooks/use-picatsso-store';
import { Header, Footer } from '@/components/layout';
import { StepIndicator } from '@/components/common';
import { HeroSection, FeatureSection, CatVisionSection } from '@/components/features/landing';
import { CatInputForm } from '@/components/features/upload';
import { AnalysisPage } from '@/components/features/analysis';
import { ResultPage } from '@/components/features/result';
import { AnalysisLoading } from '@/components/common/AnalysisLoading';
import { GenerationLoading } from '@/components/common/GenerationLoading';

export default function Home() {
  const currentStep = usePicatssoStore((s) => s.currentStep);

  return (
    <>
      <Header />
      <StepIndicator currentStep={currentStep} />

      <main className="flex-1 px-4 py-8">
        {/* Step 0: 랜딩 */}
        {currentStep === 0 && (
          <div className="step-enter">
            <HeroSection />
            <FeatureSection />
            <CatVisionSection />
          </div>
        )}

        {/* Step 1: 입력 */}
        {currentStep === 1 && <CatInputForm />}

        {/* Step 2: 분석 중 */}
        {currentStep === 2 && <AnalysisLoading />}

        {/* Step 3: 분석 결과 */}
        {currentStep === 3 && <AnalysisPage />}

        {/* Step 4: 생성 중 */}
        {currentStep === 4 && <GenerationLoading />}

        {/* Step 5: 최종 결과 */}
        {currentStep === 5 && <ResultPage />}
      </main>

      <Footer />
    </>
  );
}
