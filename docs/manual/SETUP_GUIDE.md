# Picatsso - Setup Guide (환경 설정 가이드)

> 로컬 개발 환경 설정부터 배포까지

---

## 사전 요구사항

- **Node.js** 18.x 이상
- **npm** 9.x 이상
- **Git**
- **Gemini API 키** ([Google AI Studio](https://aistudio.google.com/apikey)에서 무료 발급)

---

## 1. 프로젝트 클론 및 설치

```bash
git clone https://github.com/bombcodee/Picatsso.git
cd Picatsso
npm install
```

---

## 2. 환경변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열고 Gemini API 키를 입력:

```
GEMINI_API_KEY=your_actual_api_key_here
```

### API 키 발급 방법
1. [Google AI Studio](https://aistudio.google.com/apikey) 접속
2. Google 계정으로 로그인
3. "Create API Key" 클릭
4. 생성된 키를 `.env.local`에 붙여넣기

---

## 3. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

---

## 4. 빌드 및 프로덕션 테스트

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 모드 실행
npm run start
```

---

## 5. Vercel 배포

```bash
# Vercel CLI 설치 (최초 1회)
npm i -g vercel

# 배포
vercel
```

또는 GitHub 연동으로 자동 배포:
1. [Vercel 대시보드](https://vercel.com)에서 프로젝트 import
2. 환경변수에 `GEMINI_API_KEY` 추가
3. `git push`마다 자동 배포

---

## 주요 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 (핫 리로드) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 |
| `npm run lint` | ESLint 코드 검사 |

---

## 트러블슈팅

### "GEMINI_API_KEY is not set"
→ `.env.local` 파일이 있는지, 키가 올바른지 확인

### 빌드 시 타입 에러
→ `npm run build`로 전체 타입 체크. 에러 메시지의 파일 위치 확인

### Vercel 타임아웃
→ 이미지 생성이 10초를 초과할 수 있음. `config.generation.imageCount`를 줄여서 테스트

---

> 마지막 동기화: 2026-04-05 (M1 완료 시점)
