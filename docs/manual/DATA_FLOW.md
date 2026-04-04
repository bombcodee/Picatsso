# Picatsso - Data Flow (데이터 흐름도)

> 사용자 입력부터 최종 결과물까지의 데이터 흐름

---

## 전체 플로우

```
사용자 (브라우저)                    서버 (Next.js API Routes)             외부 API (Gemini)
─────────────────                  ─────────────────────────            ──────────────────

1. 고양이 정보 입력
   ├── 사진 1~3장 (File[])
   ├── 텍스트 설명
   ├── 성격 태그 선택
   └── 집사-고양이 관계
         │
         │  FormData (POST)
         ▼
                                   2. /api/analyze
                                      ├── FormData 파싱
                                      ├── 이미지 → base64 변환
                                      └── GeminiAnalyzer.analyze()
                                              │
                                              │  이미지(base64) + 프롬프트
                                              ▼
                                                                          3. Gemini Vision API
                                                                             ├── 사진 분석
                                                                             ├── 텍스트 이해
                                                                             └── JSON 응답 생성
                                              │
                                              │  CatAnalysis (JSON)
                                              ▼
                                   4. JSON 응답 반환
         │
         │  CatAnalysis
         ▼
5. 분석 결과 화면 표시
   ├── 성격 유형 + 키워드
   ├── 매칭 화풍 미리보기
   └── 감정 색감 맵 시각화
         │
         │  "그림 그리기" 버튼 클릭
         │  JSON (POST)
         ▼
                                   6. /api/generate
                                      ├── CatAnalysis 수신
                                      ├── ArtStyle 매핑
                                      ├── promptBuilder로 프롬프트 조립
                                      │   ├── 화풍 키워드 삽입
                                      │   ├── 감정 색감 반영
                                      │   └── 고양이 시각 팔레트 적용
                                      └── GeminiImageGenerator.generate()
                                              │
                                              │  프롬프트 텍스트
                                              ▼
                                                                          7. Gemini Image API
                                                                             ├── 프롬프트 해석
                                                                             └── 이미지 생성 (x2)
                                              │
                                              │  base64 이미지 데이터
                                              ▼
                                   8. GeneratedArtwork[] 응답
         │
         │  GeneratedArtwork[]
         ▼
9. 결과 화면 표시
   ├── 아트워크 갤러리 (2개)
   ├── 다운로드 버튼
   └── 다시하기 버튼
```

---

## 데이터 타입 흐름

```
CatInput (사용자 입력)
    │
    │  /api/analyze
    ▼
CatAnalysis (AI 분석 결과)
    │
    │  + TEMPERAMENT_TO_ART_STYLE 매핑
    ▼
ArtGenerationRequest (분석 + 스타일)
    │
    │  + promptBuilder → 프롬프트 조립
    │  /api/generate
    ▼
GeneratedArtwork[] (생성된 이미지들)
    │
    │  브라우저에서 표시 + 다운로드
    ▼
사용자에게 전달
```

---

## 감정 색감 시스템 데이터 흐름

```
집사 입력                    AI 분석                     프롬프트 반영
─────────                   ─────────                   ──────────────

"츄르 좋아해요"         →   loves: ["츄르"]          →   "츄르 = vivid blue (#4A90D9)"
"캣타워 좋아해"         →   likes: ["캣타워"]        →   "캣타워 = green (#7BAE7F)"
"목욕 싫어해요"         →   dislikes: ["목욕"]       →   "목욕 = muted gray (#8B7D6B)"
"집사랑 친해요"         →   ownerRelationship:       →   "집사 = vivid blue"
                            "close"
```

---

## 상태 관리 흐름 (Zustand 스토어)

```
usePicatssoStore
├── 입력 슬라이스
│   └── catInput → setImages/setDescription/setTags/setRelationship
│
├── 분석 슬라이스
│   └── analysis / analysisLoading / analysisError
│
├── 생성 슬라이스
│   └── artworks[] / generationLoading / generationError
│
└── 플로우 슬라이스
    └── currentStep (0→1→2→3→4→5)
        0: 랜딩
        1: 입력
        2: 분석 중 (로딩)
        3: 분석 결과
        4: 생성 중 (로딩)
        5: 최종 결과
```

---

> 마지막 동기화: 2026-04-05 (M1 완료 시점)
