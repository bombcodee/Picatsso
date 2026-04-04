# Picatsso - Architecture (아키텍처)

> 전체 파일 구조, 모듈 관계, 어댑터 패턴 교체 가이드

---

## 전체 파일 트리 (현재 구현 기준)

```
src/
├── app/                              # Next.js App Router
│   ├── api/
│   │   ├── analyze/route.ts          # POST /api/analyze — 고양이 성격 분석
│   │   └── generate/route.ts         # POST /api/generate — 아트워크 생성
│   ├── globals.css                   # 글로벌 스타일 (Tailwind)
│   ├── layout.tsx                    # 루트 레이아웃
│   ├── page.tsx                      # 메인 페이지
│   └── favicon.ico
│
├── components/
│   ├── ui/                           # shadcn/ui 기본 컴포넌트
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── tabs.tsx
│   │   └── textarea.tsx
│   ├── common/                       # 공통 UI
│   │   ├── LoadingSpinner.tsx        # 붓터치 로딩 애니메이션
│   │   ├── StepIndicator.tsx         # 플로우 단계 표시
│   │   ├── ErrorDisplay.tsx          # 에러 + 재시도
│   │   ├── AnalysisLoading.tsx       # 분석 중 로딩
│   │   └── GenerationLoading.tsx     # 생성 중 로딩
│   ├── layout/                       # 레이아웃
│   │   ├── Header.tsx                # 로고 + 뒤로가기 + CTA
│   │   └── Footer.tsx                # 푸터
│   └── features/                     # 기능별 컴포넌트 그룹
│       ├── landing/                  # 랜딩 (Hero, Feature, CatVision)
│       ├── upload/                   # 입력 (이미지, 설명, 태그, 관계, 게이지)
│       ├── analysis/                 # 분석 결과 (성격, 화풍, 감정색감)
│       ├── generation/               # 이미지 생성 (현재 미사용)
│       └── result/                   # 결과 (갤러리, 카드, 다운로드)
│
├── services/                         # 외부 API 어댑터 레이어
│   ├── ai/
│   │   ├── analyzer.ts               # CatAnalyzer 인터페이스 (계약)
│   │   ├── gemini-analyzer.ts        # Gemini 구현체
│   │   └── index.ts                  # createAnalyzer() 팩토리 + 배럴
│   ├── image/
│   │   ├── generator.ts              # ImageGenerator 인터페이스 (계약)
│   │   ├── gemini-image-generator.ts # Gemini Image 구현체
│   │   ├── prompt-builder.ts         # 분석결과 → 프롬프트 조립
│   │   └── index.ts                  # createImageGenerator() 팩토리 + 배럴
│   └── storage/
│       ├── file-handler.ts           # base64 변환, 다운로드, 파일 검증
│       └── index.ts                  # 배럴
│
├── hooks/                            # 커스텀 React 훅
│   ├── use-picatsso-store.ts         # Zustand 스토어 (입력/분석/생성/플로우)
│   ├── use-cat-analysis.ts           # /api/analyze 호출 훅
│   ├── use-image-generation.ts       # /api/generate 호출 훅
│   ├── use-download.ts               # base64 → 다운로드 훅
│   └── use-flow-history.ts           # URL 히스토리 ↔ 플로우 단계 연동
│
├── lib/
│   ├── config.ts                     # 환경변수 중앙 관리
│   ├── utils.ts                      # shadcn/ui 유틸리티 (cn 함수)
│   ├── types/
│   │   ├── cat.ts                    # CatInput, CatAnalysis, Temperament 등
│   │   ├── art.ts                    # ArtStyle, GeneratedArtwork 등
│   │   └── index.ts                  # 배럴
│   └── constants/
│       ├── cat-vision-palette.ts     # 고양이 시각 컬러 팔레트 + 감정 색감
│       ├── personality-mapping.ts    # 기질→화풍 매핑 + 성격 태그
│       ├── prompts.ts               # AI 분석 프롬프트 + 이미지 생성 템플릿
│       └── index.ts                  # 배럴
│
└── styles/                           # 추가 스타일 (M3에서 사용)
```

---

## 레이어 아키텍처

```
┌─────────────────────────────────────────┐
│  app/ (페이지 + API Routes)              │  ← 사용자 요청 수신
├─────────────────────────────────────────┤
│  components/ (UI 표현)                   │  ← 화면 렌더링
├─────────────────────────────────────────┤
│  hooks/ (상태 + 로직)                     │  ← 상태 관리 + API 호출
├─────────────────────────────────────────┤
│  services/ (외부 API 어댑터)              │  ← 비즈니스 로직 + API 통신
├─────────────────────────────────────────┤
│  lib/ (타입 + 상수 + 유틸)                │  ← 공통 기반
└─────────────────────────────────────────┘
```

**의존 방향:** 위 → 아래 (단방향). 아래 레이어는 위를 모름.

---

## 모듈 관계도

```
                    ┌──────────┐
                    │ page.tsx │
                    └─────┬────┘
                          │ uses
              ┌───────────┼───────────┐
              ▼           ▼           ▼
        ┌──────────┐ ┌────────┐ ┌──────────┐
        │ features/│ │ hooks/ │ │ layout/  │
        │ 컴포넌트  │ │ 스토어  │ │ Header등 │
        └─────┬────┘ └───┬────┘ └──────────┘
              │           │
              │     ┌─────┴──────┐
              │     ▼            ▼
              │ /api/analyze  /api/generate
              │     │            │
              │     ▼            ▼
              │ ┌────────┐ ┌───────────┐
              │ │ ai/    │ │ image/    │
              │ │ 분석    │ │ 생성      │
              │ └───┬────┘ └─────┬─────┘
              │     │            │
              └─────┴────────────┘
                    │
              ┌─────▼─────┐
              │ lib/      │
              │ types     │
              │ constants │
              │ config    │
              └───────────┘
```

---

## 어댑터 패턴 교체 가이드

### AI 분석 엔진 교체 (예: Gemini → Claude)

1. `src/services/ai/claude-analyzer.ts` 생성 — `CatAnalyzer` 인터페이스 구현
2. `src/services/ai/index.ts`의 `createAnalyzer()`에서 반환 클래스 변경
3. **끝.** 다른 파일 수정 없음

### 이미지 생성 엔진 교체 (예: Gemini → DALL-E)

1. `src/services/image/dalle-generator.ts` 생성 — `ImageGenerator` 인터페이스 구현
2. `src/services/image/index.ts`의 `createImageGenerator()`에서 반환 클래스 변경
3. **끝.** prompt-builder.ts는 공유 가능하거나 새 빌더 작성

### 교체 시 영향 범위

| 교체 대상 | 수정 파일 | 영향 | 테스트 |
|-----------|----------|------|--------|
| AI 분석 | `services/ai/` 내 1~2개 | 0 | /api/analyze 호출 |
| 이미지 생성 | `services/image/` 내 1~2개 | 0 | /api/generate 호출 |
| 파일 스토리지 | `services/storage/` 내 1개 | 0 | 업로드/다운로드 |

---

> 이 문서는 코드 변경 시 자동으로 업데이트됩니다.
> 마지막 동기화: 2026-04-05 (M4 완료 + 테스트 피드백 반영 시점)
