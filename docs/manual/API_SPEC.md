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
- **Content-Type:** `application/json`

```json
{
  "analysis": { ... CatAnalysis 객체 ... },
  "sceneDescription": "창밖의 비 오는 거리를 바라보고 있어요"
}
```

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `analysis` | CatAnalysis | 필수 | /api/analyze의 응답 결과 |
| `sceneDescription` | string | 선택 | 고양이가 보고 있는 장면 설명 (없으면 기본 장면 적용) |

### Response (200)
```json
{
  "artworks": [
    {
      "id": "artwork-1712345678-0",
      "imageBase64": "data:image/png;base64,...",
      "prompt": "You are painting AS a cat...",
      "style": {
        "name": "다이내믹 표현주의",
        "picassoPeriod": "아프리카 미술 영향기",
        "characteristics": "역동적 붓터치, 밝은 톤, 움직임",
        "promptKeywords": ["dynamic expressionism", "..."],
        "temperament": "playful"
      },
      "createdAt": "2026-04-06T12:00:00.000Z"
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
- **프롬프트 특징:** 고양이 시점 ("고양이가 그린 그림"), 파레이돌리아 효과

---

> 마지막 동기화: 2026-04-06
