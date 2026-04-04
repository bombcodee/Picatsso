'use client';

import type { FlowStep } from '@/hooks/use-picatsso-store';

const STEPS = [
  { step: 1 as FlowStep, label: '입력' },
  { step: 2 as FlowStep, label: '분석' },
  { step: 4 as FlowStep, label: '생성' },
  { step: 5 as FlowStep, label: '결과' },
];

interface StepIndicatorProps {
  currentStep: FlowStep;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  if (currentStep === 0) return null;

  const getStepStatus = (step: FlowStep) => {
    if (currentStep >= step) return 'active';
    return 'pending';
  };

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {STEPS.map(({ step, label }, index) => {
        const status = getStepStatus(step);
        return (
          <div key={step} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  status === 'active'
                    ? 'bg-[#4A90D9] text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              <span className={`text-xs ${
                status === 'active' ? 'text-[#4A90D9] font-medium' : 'text-muted-foreground'
              }`}>
                {label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className={`w-8 h-0.5 mb-5 ${
                status === 'active' ? 'bg-[#4A90D9]' : 'bg-muted'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
