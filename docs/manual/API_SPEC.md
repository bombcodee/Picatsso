# Picatsso - API Specification (API 스펙)

> Next.js API Routes 엔드포인트 명세

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

### Error Response (500)

```json
{
  "error": "고양이 분석 중 문제가 발생했습니다. 다시 시도해주세요."
}
```

---

## POST /api/generate

아트워크 이미지 생성 요청

### Request

- **Content-Type:** `application/json`

```json
{
  "analysis": {
    "personalityType": "장난꾸러기 탐험가",
    "keywords": ["활발한", "호기심", "사교적"],
    "energyLevel": "high",
    "temperament": "playful",
    "artStyleSuggestion": "...",
    "description": "...",
    "emotionalColorMap": {
      "loves": ["츄르"],
      "likes": ["캣타워"],
      "neutral": ["소파"],
      "dislikes": ["목욕"]
    },
    "ownerRelationship": "close",
    "ownerRelationshipDetail": "..."
  }
}
```

### Response (200)

```json
{
  "artworks": [
    {
      "id": "artwork-1712345678-0",
      "imageBase64": "data:image/png;base64,iVBORw0KGgo...",
      "prompt": "Create an artistic painting in the style of...",
      "style": {
        "name": "다이내믹 표현주의",
        "picassoPeriod": "아프리카 미술 영향기",
        "characteristics": "역동적 붓터치, 밝은 톤, 움직임",
        "promptKeywords": ["dynamic expressionism", "..."],
        "temperament": "playful"
      },
      "createdAt": "2026-04-05T12:00:00.000Z"
    },
    {
      "id": "artwork-1712345678-1",
      "imageBase64": "data:image/png;base64,..."
    }
  ]
}
```

### Error Response (400)

```json
{
  "error": "분석 결과가 올바르지 않습니다."
}
```

### Error Response (500)

```json
{
  "error": "아트워크 생성 중 문제가 발생했습니다. 다시 시도해주세요."
}
```

---

## 공통 사항

- **인증:** MVP에서는 미구현 (공개 API)
- **Rate Limit:** MVP에서는 미구현 (Gemini 무료 티어 ~500장/일에 의존)
- **API 키:** 서버 사이드에서만 사용 (`.env.local`의 `GEMINI_API_KEY`)
- **타임아웃:** Vercel Hobby 플랜 기준 10초. 이미지 생성 시 주의 필요

---

> 마지막 동기화: 2026-04-05 (M1 완료 시점)
