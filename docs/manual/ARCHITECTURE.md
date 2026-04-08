# Picatsso - Architecture (아키텍처)

> 전체 파일 구조, 폴더 의미, 모듈 관계, 어댑터 패턴 교체 가이드
> 시각화 버전: `docs/manual/visual-guide.html` 참고

---

## 폴더 구조 — 각 폴더가 하는 일

### src/ 하위 폴더

| 폴더 | 한마디 | 상세 설명 |
|------|--------|----------|
| `app/` | **페이지 + API 서버** | Next.js App Router. URL 경로와 1:1 매핑됨. `page.tsx`=화면, `api/`=서버 엔드포인트 |
| `app/api/` | **서버 API** | 브라우저에서 `fetch('/api/analyze')` 하면 여기 `route.ts`가 실행됨. Gemini API 키 등 민감 정보는 여기서만 사용 |
| `components/` | **화면에 보이는 것들** | 버튼, 카드, 입력 폼, 결과 갤러리 등 UI 컴포넌트 모음 |
| `components/ui/` | **기본 UI 부품** | shadcn/ui 라이브러리 컴포넌트 (버튼, 입력, 카드 등). 직접 수정하지 않음 |
| `components/common/` | **공통 UI** | 로딩 스피너, 에러 표시 등 여러 화면에서 재사용하는 컴포넌트 |
| `components/layout/` | **레이아웃** | 헤더, 푸터 — 모든 페이지에 공통으로 보이는 껍데기 |
| `components/features/` | **기능별 UI 그룹** | 랜딩/입력/분석/결과 등 화면 단위로 묶은 컴포넌트. 폴더명=화면명 |
| `services/` | **외부 API 연결** | Gemini API 등 외부 서비스를 호출하는 코드. **어댑터 패턴** 적용 — 인터페이스(계약)와 구현체가 분리됨 |
| `hooks/` | **프론트엔드 로직** | React 커스텀 훅. 화면(컴포넌트)과 서버(API) 사이의 중간 다리. 상태 관리, API 호출, 브라우저 히스토리 등 |
| `lib/` | **설정 + 타입 + 상수** | 순수한 데이터 정의. UI나 API 호출 코드 없음. 프로젝트 전역에서 사용하는 타입, 상수, 설정 |
| `lib/types/` | **TypeScript 타입** | CatAnalysis, ArtStyle 등 데이터 구조 정의 |
| `lib/constants/` | **상수값** | 프롬프트 텍스트, 색상 팔레트, 성격→화풍 매핑 등 변하지 않는 값 |

### docs/ 하위 폴더

| 폴더/파일 | 역할 |
|-----------|------|
| `docs/` | 프로젝트 문서 루트 |
| `docs/manual/` | 기술 매뉴얼 — 아키텍처, 데이터 흐름, API 스펙, 설정 가이드, 시각화 가이드 |
| `docs/prompt-management/` | 프롬프트 관련 문서 — 토의 기록, 화가 레퍼런스, 프롬프트 설계 |
| `docs/references/` | 외부 참고자료 — API 스펙, 고양이 색각 과학 논문 등 |

---

## 전체 파일 트리 (현재 구현 기준)

```
src/
├── app/                              # Next.js App Router (페이지 + API)
│   ├── api/
│   │   ├── analyze/route.ts          # POST /api/analyze — 고양이 성격 분석 API
│   │   └── generate/route.ts         # POST /api/generate — 아트워크 생성 API
│   ├── globals.css                   # 글로벌 스타일 (Tailwind + 피카소 테마)
│   ├── layout.tsx                    # 루트 레이아웃 (SEO 메타데이터, 한국어)
│   ├── page.tsx                      # 메인 페이지 (싱글 플로우 6단계 전환)
│   └── favicon.ico
│
├── components/                       # 화면 UI 컴포넌트
│   ├── ui/                           # shadcn/ui 기본 컴포넌트 (수정 X)
│   │   └── badge, button, card, dialog, input, tabs, textarea
│   ├── common/                       # 여러 화면에서 재사용하는 공통 UI
│   │   ├── LoadingSpinner.tsx        # 붓터치 로딩 애니메이션
│   │   ├── StepIndicator.tsx         # 플로우 단계 표시 (4단계)
│   │   ├── ErrorDisplay.tsx          # 에러 + 재시도 버튼
│   │   ├── AnalysisLoading.tsx       # 분석 중 로딩 (6단계 메시지)
│   │   └── GenerationLoading.tsx     # 생성 중 로딩 (5단계 메시지)
│   ├── layout/                       # 페이지 껍데기
│   │   ├── Header.tsx                # 로고 + 뒤로가기 + CTA
│   │   └── Footer.tsx                # 푸터
│   └── features/                     # 기능별 컴포넌트 그룹 (폴더명=화면명)
│       ├── landing/                  # 0단계: 랜딩 페이지
│       │   ├── HeroSection.tsx       # 태그라인 + CTA + 배경 장식
│       │   ├── FeatureSection.tsx    # 3단계 작동 원리
│       │   └── CatVisionSection.tsx  # 인간 vs 고양이 색상 비교
│       ├── upload/                   # 1단계: 입력 폼
│       │   ├── ImageUploader.tsx     # 고양이 사진 + 장면 사진 (2컬럼)
│       │   ├── SceneInput.tsx        # 장면 텍스트 설명
│       │   ├── CatDescriptionForm.tsx # 고양이 설명 텍스트
│       │   ├── PersonalityTagSelector.tsx # 성격 태그 다중선택
│       │   ├── RelationshipInput.tsx # 집사 관계 + 좋아하는/싫어하는 것
│       │   ├── InputQualityGauge.tsx # 입력 품질 게이지 (6단계 게이미피케이션)
│       │   └── CatInputForm.tsx      # 위 컴포넌트들을 조합 + 제출 버튼
│       ├── analysis/                 # 3단계: 분석 결과
│       │   ├── AnalysisResult.tsx    # 성격유형 + 키워드 배지
│       │   ├── ArtStylePreview.tsx   # 매칭 화풍 라벨 + 분위기 설명
│       │   ├── EmotionColorPreview.tsx # 감정 색감 시각화 + 집사 관계
│       │   └── AnalysisPage.tsx      # 위 조합 + "그림 그리기" 버튼
│       └── result/                   # 5단계: 결과 갤러리
│           ├── ArtworkCard.tsx       # 개별 이미지 카드 + 다운로드
│           ├── ArtworkGallery.tsx    # 2개 이미지 갤러리 레이아웃
│           ├── ResultActions.tsx     # 전체 다운로드 + 처음부터 다시
│           └── ResultPage.tsx        # 위 조합
│
├── services/                         # 외부 API 어댑터 레이어
│   ├── ai/                           # 성격 분석 서비스
│   │   ├── analyzer.ts               # CatAnalyzer 인터페이스 (계약서)
│   │   ├── gemini-analyzer.ts        # Gemini 구현체 (gemini-2.5-flash)
│   │   └── index.ts                  # 팩토리 함수
│   ├── image/                        # 이미지 생성 서비스
│   │   ├── generator.ts              # ImageGenerator 인터페이스 (계약서)
│   │   ├── gemini-image-generator.ts # Gemini Image 구현체 (gemini-2.5-flash-image)
│   │   ├── prompt-builder.ts         # 프롬프트 조립 — 레시피 재료들을 합쳐서 최종 프롬프트 완성
│   │   └── index.ts                  # 팩토리 함수
│   └── storage/                      # 파일 처리
│       ├── file-handler.ts           # base64 변환, 다운로드, 파일 검증
│       └── index.ts
│
├── hooks/                            # 프론트엔드 로직 (컴포넌트 ↔ 서버 중간 다리)
│   ├── use-picatsso-store.ts         # Zustand 스토어 — 전체 앱 상태 관리 (입력/분석/생성/플로우)
│   ├── use-cat-analysis.ts           # 1차 AI 호출: 입력값 → /api/analyze → 분석 결과
│   ├── use-image-generation.ts       # 2차 AI 호출: 분석결과+장면 → /api/generate → 이미지
│   ├── use-download.ts               # 이미지 다운로드 (단일/일괄)
│   └── use-flow-history.ts           # URL 해시 ↔ 플로우 단계 연동 (뒤로가기 지원)
│
├── lib/                              # 설정 + 타입 + 상수 (순수 데이터, 로직 없음)
│   ├── config.ts                     # 환경변수, 모델명, 업로드 제한 — 중앙 설정
│   ├── utils.ts                      # shadcn/ui 유틸리티 (cn 함수)
│   ├── types/                        # TypeScript 타입 정의
│   │   ├── cat.ts                    # Temperament, CatInput, CatAnalysis, EmotionalColorMap
│   │   ├── art.ts                    # ArtStyle, GeneratedArtwork, ArtGenerationRequest
│   │   └── index.ts
│   └── constants/                    # 상수값 — 프로젝트의 "설정 파일" 역할
│       ├── prompts.ts               # 프롬프트 상수 4개:
│       │                             #   ANALYSIS_SYSTEM_PROMPT (분석용, 한국어)
│       │                             #   CUBISM_BASE_BLOCK (큐비즘 공통 화법)
│       │                             #   CAT_PICASSO_CONNECTION (고양이 시각 과학 연결)
│       │                             #   IMAGE_GENERATION_TEMPLATE (이미지 생성 틀)
│       ├── personality-mapping.ts    # 7개 기질 → 화풍 매핑 (C안 하이브리드)
│       │                             #   TEMPERAMENT_TO_ART_STYLE, TAG_TO_TEMPERAMENT
│       ├── cat-vision-palette.ts     # 고양이 이색형 시각 색상표 + 감정별 색감
│       └── index.ts                  # 전체 re-export
│
docs/                                 # 프로젝트 문서
├── PRD.md                            # 제품 요구사항 정의서 (What & Why)
├── ROADMAP.md                        # 개발 로드맵 + 아이디어 (When & How)
├── CONVENTIONS.md                    # 코딩 규칙, 모듈화 원칙, HTML 분리 기준
├── BACKLOG.md                        # 작업 이력 (날짜, ID, 상태)
├── MEMORY.md                         # 세션 연속성 메모리 (마일스톤별 업데이트)
├── TEST_SCENARIOS.md                 # 테스트 시나리오
├── BUG_REPORTS.md                    # 버그 리포트
├── MVP_PLAN.md                       # MVP 개발 계획서
├── manual/                           # 기술 매뉴얼
│   ├── ARCHITECTURE.md               # 아키텍처 + 폴더 의미 + 어댑터 가이드 (이 파일)
│   ├── visual-guide.html             # 시각화 매뉴얼 (프로세스 흐름도, 모듈 관계)
│   ├── DATA_FLOW.md                  # 데이터 흐름도
│   ├── API_SPEC.md                   # API 엔드포인트 상세 스펙
│   └── SETUP_GUIDE.md               # 환경 설정 가이드 (설치, .env, 배포)
├── prompt-management/                # 프롬프트 관리 전용
│   ├── PROMPT_ENGINEERING.md         # 프롬프트 설계 문서 (파이프라인, 매핑 테이블)
│   ├── discussion-log.html           # 프롬프트 토의 기록 + 결정 사항
│   └── artist-reference.html         # 화가별 시기/기법/키워드 레퍼런스
└── references/                       # 외부 참고자료
    ├── REFERENCES.md                 # API 스펙, 가격, 기술 정보 종합
    └── cat_color_vision.md           # 고양이 색각 과학 레퍼런스
```

---

## 레이어 구조 — 누가 누구를 부르나

```
[사용자 브라우저]
     │
     ▼
┌─ components/ ─────────────────────┐  화면에 보이는 것
│  features/ → common/ → ui/        │
│  layout/ (Header, Footer)         │
└───────────┬───────────────────────┘
            │ 이벤트 (클릭, 제출)
            ▼
┌─ hooks/ ──────────────────────────┐  프론트 로직 (중간 다리)
│  use-picatsso-store (상태 저장소)   │
│  use-cat-analysis (1차 AI 호출)    │
│  use-image-generation (2차 AI 호출)│
└───────────┬───────────────────────┘
            │ fetch('/api/...')
            ▼
┌─ app/api/ ────────────────────────┐  서버 API (Next.js)
│  analyze/route.ts                 │
│  generate/route.ts                │
└───────────┬───────────────────────┘
            │
            ▼
┌─ services/ ───────────────────────┐  외부 API 어댑터
│  ai/gemini-analyzer.ts            │
│  image/gemini-image-generator.ts  │
│  image/prompt-builder.ts          │
└───────────┬───────────────────────┘
            │
            ▼
┌─ lib/ ────────────────────────────┐  순수 데이터 (설정, 타입, 상수)
│  constants/prompts.ts             │
│  constants/personality-mapping.ts │
│  constants/cat-vision-palette.ts  │
│  types/cat.ts, art.ts             │
│  config.ts                        │
└───────────────────────────────────┘
```

**규칙: 위에서 아래로만 호출.** `lib/`는 누구도 호출하지 않고 데이터만 제공. `services/`는 `components/`를 모름.

---

## 어댑터 패턴 교체 가이드

| 교체 대상 | 수정 파일 | 다른 파일 영향 |
|-----------|----------|--------------|
| AI 분석 (Gemini→Claude) | `services/ai/` 내 구현체 1개 교체 | 0 |
| 이미지 생성 (Gemini→DALL-E) | `services/image/` 내 구현체 1개 교체 | 0 |
| 파일 스토리지 | `services/storage/` 내 1개 교체 | 0 |
| 큐비즘 베이스 → 다른 화법 | `constants/prompts.ts`의 `CUBISM_BASE_BLOCK` 1개 | 0 |
| 성격별 키워드 튜닝 | `constants/personality-mapping.ts` 1개 | 0 |
| 색각 팔레트 조정 | `constants/cat-vision-palette.ts` 1개 | 0 |
| 피카소 → 고흐 화가 변경 | 매핑 + 프롬프트 베이스 | 서비스 코드 변경 없음 |

---

> 마지막 동기화: 2026-04-08
