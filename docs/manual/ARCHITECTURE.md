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
│   ├── globals.css                   # 글로벌 스타일 (Tailwind + 피카소 테마)
│   ├── layout.tsx                    # 루트 레이아웃 (SEO 메타데이터, 한국어)
│   ├── page.tsx                      # 메인 페이지 (싱글 플로우 6단계 전환)
│   └── favicon.ico
│
├── components/
│   ├── ui/                           # shadcn/ui 기본 컴포넌트
│   │   ├── badge.tsx, button.tsx, card.tsx
│   │   ├── dialog.tsx, input.tsx, tabs.tsx, textarea.tsx
│   ├── common/                       # 공통 UI
│   │   ├── LoadingSpinner.tsx        # 붓터치 로딩 애니메이션
│   │   ├── StepIndicator.tsx         # 플로우 단계 표시 (4단계)
│   │   ├── ErrorDisplay.tsx          # 에러 + 재시도
│   │   ├── AnalysisLoading.tsx       # 분석 중 로딩 (6단계 메시지)
│   │   └── GenerationLoading.tsx     # 생성 중 로딩 (5단계 메시지)
│   ├── layout/                       # 레이아웃
│   │   ├── Header.tsx                # 로고 + 뒤로가기 + CTA
│   │   └── Footer.tsx                # 푸터
│   └── features/                     # 기능별 컴포넌트 그룹
│       ├── landing/                  # 랜딩 페이지
│       │   ├── HeroSection.tsx       # 태그라인 + CTA + 배경 장식
│       │   ├── FeatureSection.tsx    # 3단계 작동 원리
│       │   └── CatVisionSection.tsx  # 인간 vs 고양이 색상 비교
│       ├── upload/                   # 입력 폼
│       │   ├── ImageUploader.tsx     # 고양이 사진 + 장면 사진 (2컬럼 통합)
│       │   ├── SceneInput.tsx        # 장면 텍스트 설명
│       │   ├── CatDescriptionForm.tsx # 고양이 설명
│       │   ├── PersonalityTagSelector.tsx # 성격 태그 다중선택
│       │   ├── RelationshipInput.tsx # 집사 관계 + 좋아하는것/싫어하는것
│       │   ├── InputQualityGauge.tsx # 입력 품질 게이지 (6단계)
│       │   └── CatInputForm.tsx      # 위 컴포넌트들 조합 + 제출
│       ├── analysis/                 # 분석 결과 표시
│       │   ├── AnalysisResult.tsx    # 성격유형 + 키워드 배지
│       │   ├── ArtStylePreview.tsx   # 매칭 화풍 + 피카소 시기
│       │   ├── EmotionColorPreview.tsx # 감정 색감 시각화 + 집사 관계
│       │   └── AnalysisPage.tsx      # 조합 + "그림 그리기" 버튼
│       ├── generation/               # (현재 미사용 — 서비스 레이어에서 처리)
│       └── result/                   # 결과 갤러리
│           ├── ArtworkCard.tsx       # 개별 이미지 카드 + 다운로드
│           ├── ArtworkGallery.tsx    # 2개 이미지 갤러리
│           ├── ResultActions.tsx     # 전체 다운로드 + 다시하기
│           └── ResultPage.tsx        # 조합
│
├── services/                         # 외부 API 어댑터 레이어
│   ├── ai/
│   │   ├── analyzer.ts               # CatAnalyzer 인터페이스 (계약)
│   │   ├── gemini-analyzer.ts        # Gemini 구현체 (gemini-2.5-flash)
│   │   └── index.ts                  # createAnalyzer() 팩토리
│   ├── image/
│   │   ├── generator.ts              # ImageGenerator 인터페이스 (계약)
│   │   ├── gemini-image-generator.ts # Gemini Image 구현체 (gemini-2.5-flash-image)
│   │   ├── prompt-builder.ts         # 분석결과+장면 → 프롬프트 조립 (파레이돌리아)
│   │   └── index.ts                  # createImageGenerator() 팩토리
│   └── storage/
│       ├── file-handler.ts           # base64 변환, 다운로드, 파일 검증
│       └── index.ts
│
├── hooks/                            # 커스텀 React 훅
│   ├── use-picatsso-store.ts         # Zustand 스토어 (입력/분석/생성/플로우)
│   ├── use-cat-analysis.ts           # /api/analyze 호출 훅
│   ├── use-image-generation.ts       # /api/generate 호출 훅 (sceneDescription 포함)
│   ├── use-download.ts               # base64 → 다운로드 훅
│   └── use-flow-history.ts           # URL 히스토리 ↔ 플로우 단계 연동
│
├── lib/
│   ├── config.ts                     # 환경변수 + 모델명 중앙 관리
│   ├── utils.ts                      # shadcn/ui 유틸리티
│   ├── types/
│   │   ├── cat.ts                    # CatInput(+sceneDescription), CatAnalysis
│   │   ├── art.ts                    # ArtStyle, GeneratedArtwork, ArtGenerationRequest(+sceneDescription)
│   │   └── index.ts
│   └── constants/
│       ├── cat-vision-palette.ts     # 고양이 시각 컬러 팔레트 + 감정 색감
│       ├── personality-mapping.ts    # 기질→화풍 매핑 6가지 + 성격 태그
│       ├── prompts.ts               # 분석 프롬프트(한국어) + 이미지 생성 프롬프트(영어+한국어 주석)
│       └── index.ts
│
└── styles/                           # 추가 스타일
```

---

## 어댑터 패턴 교체 가이드

| 교체 대상 | 수정 파일 | 영향 |
|-----------|----------|------|
| AI 분석 (Gemini→Claude) | `services/ai/` 내 구현체 1개 | 0 |
| 이미지 생성 (Gemini→DALL-E) | `services/image/` 내 구현체 1개 | 0 |
| 파일 스토리지 | `services/storage/` 내 1개 | 0 |

---

> 마지막 동기화: 2026-04-06
