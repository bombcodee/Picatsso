'use client';

import { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  messages: string[];
  intervalMs?: number;
}

export function LoadingSpinner({ messages, intervalMs = 3000 }: LoadingSpinnerProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [messages.length, intervalMs]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 step-enter">
      {/* 붓터치 로딩 바 */}
      <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#4A90D9] via-[#7BAE7F] to-[#D4C36A] brush-loading rounded-full" />
      </div>

      {/* 회전 팔레트 */}
      <div className="flex gap-2">
        {['#4A90D9', '#2E5FA1', '#7BAE7F', '#D4C36A', '#8B7D6B'].map((color, i) => (
          <div
            key={color}
            className="w-3 h-3 rounded-full animate-bounce"
            style={{
              backgroundColor: color,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* 단계별 메시지 */}
      <p className="text-lg text-muted-foreground animate-pulse">
        {messages[messageIndex]}
      </p>
    </div>
  );
}
