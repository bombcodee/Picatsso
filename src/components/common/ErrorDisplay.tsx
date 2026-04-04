'use client';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 step-enter">
      <div className="text-4xl">😿</div>
      <p className="text-destructive text-center max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-[#4A90D9] hover:bg-[#2E5FA1] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
        >
          다시 시도하기
        </button>
      )}
    </div>
  );
}
