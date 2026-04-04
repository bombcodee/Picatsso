# Picatsso - References (참고자료)

> 프로젝트에 필요한 외부 기술 정보, API 스펙, 가격, 리서치 결과를 정리합니다.

---

## 1. Nano Banana (나노바나나) = Google Gemini 이미지 생성

### 정체
Nano Banana는 독립 서비스가 아니라 **Google Gemini의 이미지 생성 모델 코드네임**이다.
- `nano-banana.com` 같은 사이트는 Gemini API를 감싼 서드파티 래퍼
- 공식 연동은 **Gemini API**를 직접 사용

### 모델 종류

| 코드네임 | 모델 ID | 특징 | 용도 |
|---------|---------|------|------|
| Nano Banana | `gemini-2.5-flash-image` | 고속, 저비용 | 고볼륨, 저지연 |
| Nano Banana 2 | `gemini-3.1-flash-image-preview` | 속도+품질 밸런스 | 프로덕션 추천 |
| Nano Banana Pro | `gemini-3-pro-image-preview` | 최고 품질 | 프로급 에셋 |

### API 연동 방법

**엔드포인트:**
```
POST https://generativelanguage.googleapis.com/v1beta/models/{model-id}:generateContent
```

**인증:** Google AI Studio에서 API 키 발급 → `x-goog-api-key` 헤더

**Node.js SDK:**
```bash
npm install @google/generative-ai
```

**지원 기능:**
- 텍스트→이미지 생성
- 이미지 편집 (인페인팅, 아웃페인팅, 스타일 트랜스퍼)
- 멀티턴 대화형 편집
- 참조 이미지 최대 14장
- 해상도: 512px ~ 4K
- 종횡비: 1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9 등

**공식 문서:** https://ai.google.dev/gemini-api/docs/image-generation

### 가격

#### 무료 티어
| 모델 | 무료 여부 | 일일 한도 |
|------|----------|----------|
| Nano Banana (2.5 Flash) | ✅ 무료 | ~500장/일 (1K 해상도) |
| Nano Banana 2 (3.1 Flash) | ❌ 유료만 | — |
| Nano Banana Pro (3 Pro) | 매우 제한적 | ~2장/일 |

- 무료 티어는 신용카드 불필요
- 쿼터는 매일 태평양 시간 자정 리셋
- **MVP 개발/테스트에 무료 티어 충분**

#### 유료 가격 (이미지 1장당)
| 모델 | 512px | 1K (1024px) | 2K | 4K |
|------|-------|-------------|----|----|
| Nano Banana | — | $0.039 | — | — |
| Nano Banana 2 | $0.045 | $0.067 | $0.101 | $0.151 |
| Nano Banana Pro | — | $0.134 | $0.134 | $0.24 |

- Batch API 사용 시 50% 할인
- 이미지 입력 비용: ~$0.0011/장 (560 토큰)

#### 서드파티 래퍼 (더 저렴한 대안)
- PiAPI: Nano Banana Pro ~$0.105/장 (공식 대비 ~22% 절약)
- 기타 서비스: 최대 50-79% 절약 주장

### Rate Limits
- **무료:** ~250,000 TPM (분당 토큰), 약 500장/일
- **유료:** 티어별 증가 (Tier 1 → Tier 3)

### Picatsso 적용 전략
- **개발/테스트:** Nano Banana 무료 티어 (~500장/일)
- **프로덕션:** Nano Banana 2 ($0.067/장, 1K) → 사용자 1회 생성 시 2~3장 = $0.13~$0.20
- **SDK:** `@google/generative-ai` npm 패키지 (Next.js 호환)

---

## 2. AI 분석 API 비교 (고양이 성격 분석용)

### 통합 전략: Gemini 우선
- 고양이 분석(텍스트)도 Gemini가 처리 가능
- 이미지 생성도 Gemini → **하나의 API 키로 두 기능 모두 커버**
- 어댑터 패턴으로 Claude/GPT 교체 가능하게 설계

### API별 가격 비교

| 서비스 | 입력 (1M 토큰) | 출력 (1M 토큰) | 이미지 입력 | 비고 |
|--------|---------------|---------------|------------|------|
| Gemini 2.5 Flash | $0.15 | $0.60 | 지원 | 무료 티어 있음 |
| Claude Sonnet 4.6 | $3.00 | $15.00 | 지원 | 품질 우수 |
| GPT-4o mini | $0.15 | $0.60 | 지원 | 저비용 |
| GPT-4o | $2.50 | $10.00 | 지원 | 고품질 |

**결론:** MVP에서는 Gemini로 통합 (분석+생성), 분석 품질이 부족하면 Claude/GPT로 교체

---

## 3. 대안 이미지 생성 API

Nano Banana(Gemini)가 부적합할 경우의 대안:

| 서비스 | 가격/장 | 무료 티어 | 특징 |
|--------|--------|----------|------|
| Imagen 4 (Google) | $0.02~$0.06 | 없음 | 같은 Gemini API, 비대화형 |
| DALL-E 3 (OpenAI) | $0.04~$0.12 | 크레딧만 | 좋은 품질, 잘 문서화 |
| Stable Diffusion | $0.002~$0.006 | 25 크레딧 | 최저가, 셀프 호스팅 가능 |
| Flux (Black Forest) | $0.003~$0.05 | 제한적 | Replicate/fal.ai 경유 |

---

## 4. 기술 스택 선정 근거

### 최종 확정 스택

| 카테고리 | 선택 | 핵심 근거 |
|---------|------|-----------|
| 프레임워크 | Next.js (App Router) | SSR/SEO 내장, 생태계 1위, Vercel 네이티브, AI SDK 퍼스트 파티 지원 |
| 스타일링 | Tailwind CSS | 솔로 개발 속도 최강, shadcn/ui 활용, 피카소 테마 커스텀 용이 |
| 상태관리 | Zustand | 1.1KB 경량, 슬라이스 패턴 = 모듈 분리 자연스러움 |
| 백엔드/DB | Supabase (MVP 후 도입) | PostgreSQL, 무료 500MB DB + 1GB 스토리지 + 50K MAU |
| 호스팅 | Vercel | Next.js 제작사, 이미지 최적화, OG 동적 생성, Hobby 무료 |

### 비용 시뮬레이션

| 단계 | Vercel | Supabase | Gemini (이미지) | AI 분석 | 합계 |
|------|--------|----------|----------------|---------|------|
| MVP (개발) | $0 | $0 (미사용) | $0 (무료 티어) | $0 (무료 티어) | **$0** |
| 초기 운영 | $0 (Hobby) | $0 (Free) | ~$2/일 | ~$1/일 | **~$90/월** |
| 성장기 | $20 (Pro) | $25 (Pro) | ~$3.4/일 | ~$3/일 | **~$237/월** |

### 탈락된 대안들 및 이유

| 카테고리 | 대안 | 탈락 이유 |
|---------|------|-----------|
| 프레임워크 | SvelteKit | 생태계 1/10, AI/SaaS SDK 지원 부족 |
| 프레임워크 | Nuxt.js | AI 도구 퍼스트 파티 지원 React 대비 약함 |
| 스타일링 | Panda CSS | 신생 (2023), 커뮤니티 리소스 부족 |
| 스타일링 | Styled Components | RSC 호환 문제, 런타임 CSS 오버헤드 |
| DB | Firebase | NoSQL → 관계형 쿼리 약함, 벤더 록인, 비용 예측 어려움 |
| 호스팅 | Cloudflare Pages | Next.js App Router 완벽 지원 안 됨, 호환성 이슈 |
| 상태관리 | Redux Toolkit | 솔로 개발자+중소 앱에 과잉, 보일러플레이트 과다 |

---

## 5. 고양이 시각 과학 (Cat Color Vision)

### 출처
- zezelife.com "고양이는 색깔을 보나요? 그렇다면 고양이는 어떤 색을 가장 좋아할까요?"
- 로컬 파일: `docs/cat_color.html`, `docs/cat_color_files/`

### 핵심 정리

#### 고양이 눈의 구조
- **이색형 색각 (Dichromatic vision):** 원뿔 세포(cone) 2종류만 보유
- 인간은 삼색형 (빨강/녹색/파란색 원뿔 3개), 고양이는 2개만
- 간상세포(rod)가 인간보다 많아 **야간 시력 6~8배 우수**
- 동작 감지 능력 뛰어남

#### 고양이가 보는 색상
| 인간이 보는 색 | 고양이가 보는 색 | 인식 강도 |
|--------------|----------------|----------|
| 파란색 | **파란색 (선명)** | ★★★★★ 가장 잘 보임 |
| 녹색 | **녹색 (약간 흐림)** | ★★★★ |
| 노란색 | **노란색 (인식 가능)** | ★★★ |
| 빨간색 | 회색/갈색으로 보임 | ★ |
| 주황색 | 회색/갈색으로 보임 | ★ |

#### 고양이의 색상 선호
- **가장 좋아하는 색:** 파란색 (가장 선명하게 보이므로)
- **잘 인식하는 색:** 파란색 > 녹색 > 노란색
- **잘 안 보이는 색:** 빨간색, 주황색 (회색/갈색으로 인식)
- **불편할 수 있는 색:** 지나치게 밝거나 화려한 색 (시각적 스트레스)

#### 추가 인사이트
- 고양이의 세계는 전체적으로 **채도가 낮고 파스텔톤**에 가까움
- 인간이 HD로 보는 것을 고양이는 "약간 흐릿하고 덜 상세한 버전"으로 봄
- 색상 외에도 **질감, 움직임, 냄새**가 고양이의 관심을 결정하는 중요 요소
- 조명 조건에 따라 색상 인식이 달라짐

### Picatsso 컬러 팔레트 적용 방향

```
고양이 시각 기반 컬러 팔레트 (Picatsso 전용)

주요 색상 (고양이가 잘 보는 색):
- 파란색 계열: #4A90D9, #2E5FA1, #6BB3E0, #1E3A5F
- 녹색 계열: #7BAE7F, #4A7C59, #A8C9A0 (약간 탁한)
- 노란색 계열: #D4C36A, #B8A93E, #E8D98A

보조 색상 (고양이에게 흐릿하게 보이는 색 → 무채색/갈색으로 변환):
- 빨간색 → #8B7D6B (탁한 갈색)
- 주황색 → #9E8E7E (흐린 베이지)
- 핑크 → #A09090 (회갈색)

배경/뉴트럴:
- #D0CFC8 (따뜻한 회색)
- #B8BCC0 (차가운 회색)
- #E5E0D5 (크림)
```

> ⏳ 사용자가 추가 참고 이미지(catcolor1,2,3)를 제공하면 팔레트 보정 예정

---

## 6. 참고 링크 모음

| 항목 | URL |
|------|-----|
| Gemini API 이미지 생성 문서 | https://ai.google.dev/gemini-api/docs/image-generation |
| Gemini API 가격 | https://ai.google.dev/gemini-api/docs/pricing |
| Gemini API Rate Limits | https://ai.google.dev/gemini-api/docs/rate-limits |
| Google AI Studio (API 키 발급) | https://aistudio.google.com/apikey |
| 고양이 색각 참고 기사 | https://www.zezelife.com/ko/do-cats-see-colors-what-colors-do-cats-like-most/ |
