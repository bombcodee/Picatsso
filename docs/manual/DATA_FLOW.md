# Picatsso - Data Flow (데이터 흐름도)

> 사용자 입력부터 최종 결과물까지의 데이터 흐름

---

## 전체 플로우

```
사용자 (브라우저)                    서버 (API Routes)                외부 API (Gemini)
─────────────────                  ─────────────────                ──────────────────

1. 고양이 정보 입력
   ├── 고양이 사진 1~3장 (특성 분석용)
   ├── 장면 사진 (선택, 그림의 주제)
   ├── 장면 설명 텍스트
   ├── 고양이 설명 텍스트
   ├── 성격 태그 선택
   ├── 집사-고양이 관계
   └── 좋아하는것 / 싫어하는것
         │
         │  FormData (POST)
         ▼
                                   2. /api/analyze
                                      ├── FormData 파싱
                                      ├── 이미지 → base64 변환
                                      └── GeminiAnalyzer.analyze()
                                              │
                                              ▼
                                                                    3. Gemini 2.5 Flash
                                                                       (텍스트/비전)
                                                                       → JSON 응답
                                              │
                                              ▼
                                   4. CatAnalysis JSON 반환
         │
         ▼
5. 분석 결과 화면 표시
   ├── 성격 유형 + 키워드
   ├── 매칭 화풍 (피카소 시기)
   ├── 감정 색감 맵 시각화
   └── 집사 관계 표시
         │
         │  "그림 그리기" 클릭
         │  JSON (POST) { analysis, sceneDescription }
         ▼
                                   6. /api/generate
                                      ├── CatAnalysis + sceneDescription + sceneImage 수신
                                      │
                                      ├── [1.5차] 장면 사진이 있으면:
                                      │   └── Gemini Flash로 장면 사진 분석
                                      │       → 고양이 시점 영어 묘사 생성
                                      │       → 사용자 텍스트("가족들 보는 중") 보강
                                      │                                     Gemini 2.5 Flash
                                      │                                     (텍스트/비전)
                                      │
                                      ├── promptBuilder로 프롬프트 조립
                                      │   ├── 큐비즘 공통 베이스 (CUBISM_BASE_BLOCK)
                                      │   ├── 고양이×피카소 연결 (CAT_PICASSO_CONNECTION)
                                      │   ├── 성격 → 분위기 악센트 (moodKeywords)
                                      │   ├── 고양이 시각 색감
                                      │   └── 파레이돌리아 효과 (감정 표현 4규칙)
                                      │
                                      └── GeminiImageGenerator.generate()
                                          └── 프롬프트 + 장면 사진(구도 참조) 전달
                                              │
                                              ▼
                                                                    7. Gemini 2.5 Flash Image
                                                                       (나노바나나)
                                                                       → base64 이미지 x2
                                              │
                                              ▼
                                   8. GeneratedArtwork[] 응답
         │
         ▼
9. 결과 화면 표시
   ├── 아트워크 갤러리 (2개)
   ├── 다운로드 버튼
   └── 다시하기 버튼
```

---

## 프롬프트 조립 흐름 (핵심)

```
CatAnalysis (분석 결과)
    │
    ├── temperament → TEMPERAMENT_TO_ART_STYLE → 분위기 악센트 결정
    ├── keywords → 분위기 키워드
    ├── emotionalColorMap.loves → 파레이돌리아 대상 / 실제 있으면 강조
    ├── emotionalColorMap.dislikes → 흐릿한 구석 암시 / 실제 있으면 회색
    │
    + enrichedSceneDescription (장면 묘사)
    │   └── 장면 사진이 있으면: AI가 사진 분석 → 영어 묘사 자동 생성
    │       장면 사진이 없으면: 사용자 텍스트 그대로 사용
    │
    ▼
buildImagePrompt() — 레고 블록 조립
    │
    ├── CUBISM_BASE_BLOCK (공통 큐비즘 화법)
    ├── CAT_PICASSO_CONNECTION (고양이 시각 과학 연결)
    ├── moodKeywords (성격별 분위기 악센트)
    │
    ▼
"이 고양이가 화가로서 이 장면을 그린다면?"
    ├── 장면만 그림 (설명/취향의 물체 추가 금지)
    ├── 고양이 낮은 시점 (ground level)
    ├── 큐비즘 베이스 (굵은 윤곽선, 면 분할, 다중 시점)
    ├── 성격이 붓터치/구도/에너지에 반영 (분위기 악센트)
    ├── 고양이 시각 색감 (파란/녹/노란, 빨강 금지)
    └── 파레이돌리아: 좋아하는 것 형태가 자연물에 은근히 닮음
```

---

## Zustand 스토어 구조

```
usePicatssoStore
├── 입력 슬라이스
│   ├── images: File[]              (고양이 사진)
│   ├── sceneImage: File | null     (장면 사진)
│   ├── sceneDescription: string    (장면 설명)
│   ├── description: string         (고양이 설명)
│   ├── tags: string[]              (성격 태그)
│   ├── relationshipDescription     (집사 관계)
│   ├── favoriteThings              (좋아하는 것)
│   └── dislikedThings              (싫어하는 것)
│
├── 분석 슬라이스
│   └── analysis / analysisLoading / analysisError
│
├── 생성 슬라이스
│   └── artworks[] / generationLoading / generationError
│
└── 플로우 슬라이스
    └── currentStep (0→1→2→3→4→5)
        0: 랜딩  1: 입력  2: 분석중  3: 분석결과  4: 생성중  5: 결과
```

---

> 마지막 동기화: 2026-04-09
