# Picatsso MVP 개발 플랜 (v2)

> PRD.md, ROADMAP.md, CONVENTIONS.md, PROMPT_ENGINEERING.md 기반 최신 반영

## Context
- 현재 상태: 코드 0줄. docs만 존재. Git 초기화 + GitHub 푸시 완료.
- PRD 확정 사항: Gemini API 통합(분석+생성), MVP에 감정 색감 시스템 포함, DB 없음(stateless)
- 기술 스택: Next.js App Router + TypeScript + Tailwind + shadcn/ui + Zustand + Gemini API + Vercel

## MVP 기능 범위 (PRD 섹션 8 기준)
1. 랜딩 페이지 (아티스틱/피카소 무드)
2. 고양이 정보 입력 (사진 1~3장 + 설명 + 성격 태그 + 집사-고양이 관계)
3. AI 성격 분석 (Gemini → 성격유형 + 키워드 + 화풍매핑 + 감정색감맵)
4. 아트워크 생성 (Gemini Image → 피카소풍 + 고양이 시각 색감 + 감정 색감)
5. 결과물 미리보기 + 다운로드
6. 반응형 (모바일 대응)

## 사용자 플로우 (PRD 섹션 4)
```
랜딩 → 입력폼 → [분석중] → 분석결과 → [생성중] → 결과(2~3개) → 다운로드
```

---

## M0: 프로젝트 초기화 (0.5일)

| # | 태스크 | 생성 파일 |
|---|--------|----------|
| 0-1 | `npx create-next-app@latest` (App Router, TS, Tailwind, ESLint) | `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `src/app/` |
| 0-2 | `npx shadcn@latest init` + 컴포넌트 설치 (Button, Input, Textarea, Badge, Card, Dialog, Tabs) | `components.json`, `src/components/ui/*` |
| 0-3 | `npm install zustand @google/generative-ai` | `package.json` 업데이트 |
| 0-4 | CONVENTIONS.md 기반 폴더 구조 생성 | `src/components/{common,layout,features/*}`, `src/services/{ai,image,storage}`, `src/hooks/`, `src/lib/{constants,types,utils}`, `src/styles/` |
| 0-5 | 환경변수 + config | `.env.local`, `.env.example`, `src/lib/config.ts` |

---

## M1: 타입 / 상수 / 서비스 레이어 (1일)

### 1-1. TypeScript 타입 [M]
- `src/lib/types/cat.ts`
  - `CatInput` — 이미지 File[], 설명, 태그, 관계 정보, 좋아하는것/싫어하는것
  - `CatAnalysis` — 성격유형, 키워드[], 에너지레벨, 기질(Temperament), 화풍제안, 감정색감맵(EmotionalColorMap), 집사관계(OwnerRelationship)
  - `Temperament` — `'playful' | 'calm' | 'fierce' | 'curious' | 'aloof' | 'chaotic'`
  - `EmotionalColorMap` — `{ loves: string[], likes: string[], neutral: string[], dislikes: string[] }`
  - `OwnerRelationship` — `'close' | 'neutral' | 'distant' | 'complicated'`
- `src/lib/types/art.ts`
  - `ArtStyle` — 스타일명, 피카소시기, 특징, 프롬프트키워드
  - `GeneratedArtwork` — base64 이미지, 프롬프트, 메타데이터
  - `ArtGenerationRequest` — 분석결과 + 스타일 + 팔레트
- `src/lib/types/index.ts` — 배럴 export

### 1-2. 상수 [M]
- `src/lib/constants/cat-vision-palette.ts` — PROMPT_ENGINEERING.md의 CAT_VISION_PALETTE + EMOTION_COLOR_MAP
- `src/lib/constants/personality-mapping.ts` — PRD 화풍 매핑 테이블 6가지 + PERSONALITY_TAGS
- `src/lib/constants/prompts.ts` — PROMPT_ENGINEERING.md의 분석 프롬프트(Step1) + 이미지 생성 템플릿(Step3)
- `src/lib/constants/index.ts`

### 1-3. AI 분석 서비스 (어댑터 패턴) [L] ★
- `src/services/ai/analyzer.ts` — `CatAnalyzer` 인터페이스 (`analyze(input) → CatAnalysis`)
- `src/services/ai/gemini-analyzer.ts` — Gemini 구현체
  - 이미지 base64 + 텍스트 → Gemini 비전 모델 호출
  - ANALYSIS_SYSTEM_PROMPT 사용
  - `response_mime_type: "application/json"` 으로 안정적 JSON 응답
  - 감정색감맵 + 집사관계 분석 포함
- `src/services/ai/index.ts` — `createAnalyzer()` 팩토리

### 1-4. 이미지 생성 서비스 (어댑터 패턴) [L] ★
- `src/services/image/generator.ts` — `ImageGenerator` 인터페이스 (`generate(request) → GeneratedArtwork[]`)
- `src/services/image/prompt-builder.ts` — 분석결과 → 최종 프롬프트 조립
  - 성격 → 화풍 매핑 (TEMPERAMENT_TO_ART_STYLE 참조)
  - 감정 색감 시스템 반영 (좋아하는 대상 = 파란색 지시어)
  - 고양이 시각 컬러 팔레트 주입
- `src/services/image/gemini-image-generator.ts` — Gemini Image 구현체
  - `gemini-2.5-flash-image` 모델 (무료 티어)
  - 2~3회 호출로 시안 생성
- `src/services/image/index.ts` — `createImageGenerator()` 팩토리

### 1-5. 파일 처리 [S]
- `src/services/storage/file-handler.ts` — fileToBase64, downloadImage, validateImageFile

### 1-6. API Routes [M]
- `src/app/api/analyze/route.ts` — POST: FormData → AI 분석 → JSON
- `src/app/api/generate/route.ts` — POST: CatAnalysis → 이미지 생성 → base64[]
- API 키는 서버 사이드에서만 사용 (보안)

---

## M2: 상태 관리 + 훅 (0.5일)

### 2-1. Zustand 스토어 [M]
- `src/hooks/use-picatsso-store.ts`
  - 입력 슬라이스: catInput, set/reset 함수들
  - 분석 슬라이스: analysis, loading, error
  - 생성 슬라이스: artworks[], loading, error
  - 플로우 슬라이스: currentStep (0=랜딩 1=입력 2=분석중 3=분석결과 4=생성중 5=결과)

### 2-2. API 호출 훅 [M]
- `src/hooks/use-cat-analysis.ts` — /api/analyze 호출 + 로딩/에러 + 스토어 업데이트
- `src/hooks/use-image-generation.ts` — /api/generate 호출 + 로딩/에러 + 스토어 업데이트

### 2-3. 다운로드 훅 [S]
- `src/hooks/use-download.ts` — base64 → Blob → 다운로드 트리거

---

## M3: UI 컴포넌트 (2~3일)

### 3-1. 글로벌 스타일 + 테마 [S]
- `src/styles/globals.css` — 피카소 테마 CSS 변수, 아티스틱 배경
- `tailwind.config.ts` 확장 — 커스텀 컬러(cat-vision-*), 폰트, 애니메이션
- `src/app/layout.tsx` — 폰트 로드, 메타데이터

### 3-2. 레이아웃 [S]
- `src/components/layout/Header.tsx` — Picatsso 로고 + CTA
- `src/components/layout/Footer.tsx`

### 3-3. 공통 UI [S]
- `src/components/common/LoadingSpinner.tsx` — 피카소풍 로딩 (단계별 메시지)
- `src/components/common/StepIndicator.tsx` — 플로우 진행 표시
- `src/components/common/ErrorDisplay.tsx` — 에러 + 재시도

### 3-4. 랜딩 페이지 [L]
- `src/components/features/landing/HeroSection.tsx` — 태그라인 + CTA + 인터랙티브 요소
- `src/components/features/landing/FeatureSection.tsx` — 서비스 작동원리 3단계
- `src/components/features/landing/CatVisionSection.tsx` — 고양이 시각 설명 (인간 vs 고양이)

### 3-5. 입력 폼 [L]
- `src/components/features/upload/ImageUploader.tsx` — 드래그앤드롭 + 미리보기 (1~3장)
- `src/components/features/upload/CatDescriptionForm.tsx` — 텍스트 입력
- `src/components/features/upload/PersonalityTagSelector.tsx` — 성격 태그 다중선택 (Badge)
- `src/components/features/upload/RelationshipInput.tsx` — 집사-고양이 관계 + 좋아하는것/싫어하는것
- `src/components/features/upload/CatInputForm.tsx` — 위 4개 조합 + 제출 버튼

### 3-6. 분석 결과 [M]
- `src/components/features/analysis/AnalysisResult.tsx` — 성격유형 + 키워드 배지
- `src/components/features/analysis/ArtStylePreview.tsx` — 매칭 화풍 + 피카소 시기
- `src/components/features/analysis/EmotionColorPreview.tsx` — 감정 색감 시각화 ★재미요소
  - 좋아하는것 → 파란색 원, 싫어하는것 → 회색 원
  - "고양이 눈에 집사는 이렇게 보여요!" 스토리텔링
- `src/components/features/analysis/AnalysisPage.tsx` — 조합 + "그림 그리기" 버튼

### 3-7. 결과 페이지 [M]
- `src/components/features/result/ArtworkGallery.tsx` — 2~3개 이미지 갤러리
- `src/components/features/result/ArtworkCard.tsx` — 개별 카드 + 다운로드 버튼
- `src/components/features/result/ResultActions.tsx` — 처음부터 다시하기 + 일괄 다운로드
- `src/components/features/result/ResultPage.tsx` — 조합

---

## M4: 페이지 통합 + 플로우 (1일)

### 4-1. 메인 페이지 [M]
- `src/app/page.tsx` — currentStep에 따라 섹션 전환
  - 0:랜딩 → 1:입력 → 2:분석중 → 3:분석결과 → 4:생성중 → 5:결과

### 4-2. 플로우 연결 [M]
- `src/hooks/use-flow-controller.ts` — 폼제출→분석→결과표시→생성→최종결과 자동 연결

### 4-3. 반응형 최적화 [M]
- 모든 컴포넌트 모바일/태블릿/데스크톱 대응

### 4-4. 로딩 강화 [S]
- `src/components/common/AnalysisLoading.tsx` — "고양이 마음을 읽는 중..."
- `src/components/common/GenerationLoading.tsx` — "붓을 들고 있는 중..."

---

## M5: 마무리 + 배포 (0.5~1일)

| # | 태스크 |
|---|--------|
| 5-1 | SEO 메타태그 + OG 이미지 (`src/app/layout.tsx`) |
| 5-2 | 에러 페이지 (`src/app/error.tsx`, `src/app/not-found.tsx`) |
| 5-3 | 성능 최적화 (next/image, dynamic import) |
| 5-4 | Vercel 배포 + 환경변수 설정 |
| 5-5 | 전체 플로우 수동 테스트 + 프롬프트 튜닝 |

---

## 크리티컬 패스
```
0-1 → 1-1 → 1-2 → 1-3/1-4(병렬) → 1-6 → 2-1 → 2-2 → 3-5 → 4-1 → 4-2 → 5-5
```

## 병렬 가능 구간
| 그룹 | 태스크 | 선행 조건 |
|------|--------|----------|
| A | 1-3 + 1-4 + 1-5 | 1-1, 1-2 완료 후 |
| B | 3-1 + 2-1 | 1-1 완료 후 |
| C | 3-4 + 3-5 + 3-6 + 3-7 | 3-1~3-3 + 2-1 완료 후 |

## 리스크 대응
| 리스크 | 대응 |
|--------|------|
| Gemini JSON 응답 불안정 | `response_mime_type: "application/json"` + 재시도 |
| 이미지 품질 기대 이하 | prompt-builder.ts 반복 튜닝 |
| Vercel 타임아웃 (10초) | 스트리밍 응답 또는 생성 횟수 조절 |
| 무료 500장/일 초과 | localStorage 기반 일일 제한 |

## 검증
1. M1 후: curl로 API Routes 직접 호출 테스트
2. M3 후: 브라우저에서 개별 컴포넌트 확인
3. M4 후: 전체 E2E 플로우 수동 테스트
4. M5 후: Vercel 프리뷰 URL에서 모바일/데스크톱 테스트

## 총 일정: 약 6~7일
| M0 | M1 | M2 | M3 | M4 | M5 |
|----|----|----|----|----|---|
| 0.5일 | 1일 | 0.5일 | 2~3일 | 1일 | 0.5~1일 |
