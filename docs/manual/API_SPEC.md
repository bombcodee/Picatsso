# Picatsso - API Specification (API 스펙)

> Next.js API Routes 엔드포인트 명세
> 사용 모델: gemini-2.5-flash (분석) / gemini-2.5-flash-image (이미지생성, 나노바나나)

---

## POST /api/analyze

고양이 성격 분석 요청

### Request
- **Content-Type:** `multipart/form-data`

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `images` | File[] | 선택 (권장) | 고양이 사진 1~3장 (JPEG/PNG/WebP, 최대 10MB) |
| `description` | string | 선택 | 고양이 성격/습관 설명 |
| `tags` | string (JSON) | 선택 | 성격 태그 배열 `'["장난꾸러기","도도한"]'` |
| `relationshipDescription` | string | 선택 | 집사와 평상시 모습 |
| `favoriteThings` | string | 선택 | 좋아하는 것 |
| `dislikedThings` | string | 선택 | 싫어하는 것 |

### Response (200)
```json
{
  "personalityType": "장난꾸러기 탐험가",
  "keywords": ["활발한", "호기심", "사교적", "장난꾸러기", "모험가"],
  "energyLevel": "high",
  "temperament": "playful",
  "artStyleSuggestion": "역동적인 표현주의 화풍이 어울립니다",
  "description": "이 고양이는 활발하고 호기심이 많은 성격으로...",
  "emotionalColorMap": {
    "loves": ["츄르", "집사의 무릎"],
    "likes": ["캣타워", "창밖 구경"],
    "neutral": ["소파"],
    "dislikes": ["목욕", "큰 소리"]
  },
  "ownerRelationship": "close",
  "ownerRelationshipDetail": "집사를 매우 따르며 항상 곁에 있으려 합니다"
}
```

---

## POST /api/generate

아트워크 이미지 생성 요청

### Request

두 가지 형식 지원:

**형식 A: 장면 사진 있을 때** — `multipart/form-data`

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `analysis` | string (JSON) | 필수 | CatAnalysis 객체를 JSON 문자열로 |
| `sceneDescription` | string | 선택 | 고양이가 보는 장면 설명 ("가족들 보는 중" 등) |
| `sceneImage` | File | 선택 | 장면 사진 (JPEG/PNG/WebP) |

**형식 B: 장면 사진 없을 때** — `application/json`

```json
{
  "analysis": { ... CatAnalysis 객체 ... },
  "sceneDescription": "창밖의 비 오는 거리를 바라보고 있어요"
}
```

### 내부 처리 흐름

```
장면 사진이 있으면:
  1.5차 AI: 장면 사진 → Gemini Flash로 고양이 시점 영어 묘사 생성
            사용자 텍스트("가족들 보는 중")를 참고하되 사진 우선
  2차 AI:   묘사 텍스트 + 장면 사진 원본 → Gemini Image에 전달
            (묘사=감정 규칙 적용 / 사진=구도 참조)

장면 사진이 없으면:
  사용자 텍스트만으로 2차 AI 직접 호출 (기존 방식)
```

### Response (200)
```json
{
  "artworks": [
    {
      "id": "artwork-1712345678-0",
      "imageBase64": "data:image/png;base64,...",
      "prompt": "You are painting AS a cat...",
      "style": {
        "name": "장난꾸러기 화가",
        "picassoPeriod": "아프리카 미술 영향기",
        "characteristics": "밝고 역동적인 에너지, 기하학적 장난기가 넘치는 구도",
        "moodKeywords": ["vibrant energy", "..."],
        "temperament": "playful"
      },
      "createdAt": "2026-04-09T12:00:00.000Z"
    }
  ]
}
```

---

## 공통 사항

- **인증:** MVP 미구현 (공개 API)
- **Rate Limit:** Gemini API 종량제 (Google Cloud 결제 설정 완료, $300 크레딧)
- **API 키:** 서버 사이드 전용 (`.env.local` → `GEMINI_API_KEY`)
- **이미지 생성 수:** 1회 요청 시 2개 생성
- **AI 호출 횟수:** 최대 3회 (1차 성격 분석 + 1.5차 장면 묘사 + 2차 이미지 생성 ×2)
- **프롬프트 특징:** 큐비즘 베이스 + 성격 악센트 (C안), 파레이돌리아 효과, 고양이 시점
- **장면 사진 분석:** 사용자가 간단한 텍스트만 써도 사진에서 상세 묘사 자동 생성

---

> 마지막 동기화: 2026-04-09
