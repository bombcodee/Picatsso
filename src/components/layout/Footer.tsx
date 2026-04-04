export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        <p className="mb-2">
          <span className="picatsso-title font-semibold">Picatsso</span>
          {' '}— 당신의 고양이가 직접 그린 그림
        </p>
        <p className="text-xs">
          고양이 시각 과학에 기반한 AI 아트 생성 서비스
        </p>
      </div>
    </footer>
  );
}
