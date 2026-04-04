# Picatsso

**"당신의 고양이가 직접 그린 그림"**

반려묘의 성격을 AI로 분석하고, 고양이가 실제로 보는 색감으로 피카소 스타일의 예술 작품을 생성하는 웹 서비스입니다.

<!-- TODO: 서비스 스크린샷 추가 -->

---

## 핵심 컨셉

- 집사가 고양이 사진과 설명을 입력하면
- AI가 성격을 분석하고 (장난꾸러기? 도도한? 엉뚱한?)
- 성격에 맞는 피카소 화풍을 매칭하여
- **고양이가 실제로 보는 색감**(이색형 색각 기반)으로 아트워크를 생성합니다

고양이가 좋아하는 것은 **파란색**(가장 선명하게 보는 색)으로, 싫어하는 것은 **회색/갈색**으로 표현되는 감정 색감 시스템이 핵심 재미 요소입니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router, TypeScript) |
| 스타일링 | Tailwind CSS v4 + shadcn/ui |
| 상태관리 | Zustand |
| AI 분석 | Google Gemini API (텍스트/비전) |
| 이미지 생성 | Google Gemini Image API (Nano Banana) |
| 호스팅 | Vercel |

---

## 퀵스타트

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.example .env.local
# .env.local에 GEMINI_API_KEY 입력

# 3. 개발 서버 실행
npm run dev
```

http://localhost:3000 에서 확인

---

## 프로젝트 구조

```
Picatsso/
├── src/
│   ├── app/                  # Next.js 페이지 + API Routes
│   ├── components/           # UI 컴포넌트
│   │   ├── ui/               # shadcn/ui 기본 컴포넌트
│   │   ├── common/           # 공통 UI (로딩, 에러 등)
│   │   ├── layout/           # 레이아웃 (Header, Footer)
│   │   └── features/         # 기능별 컴포넌트
│   ├── services/             # 외부 API 어댑터 (교체 가능)
│   │   ├── ai/               # 고양이 성격 분석
│   │   ├── image/            # 이미지 생성
│   │   └── storage/          # 파일 처리
│   ├── hooks/                # 커스텀 React 훅
│   └── lib/                  # 타입, 상수, 유틸리티
├── docs/                     # 프로젝트 문서
│   ├── manual/               # 개발자 매뉴얼
│   └── references/           # 기술 참고자료
└── public/                   # 정적 파일
```

> 상세 구조는 [docs/manual/ARCHITECTURE.md](docs/manual/ARCHITECTURE.md) 참조

---

## 문서

| 문서 | 설명 |
|------|------|
| [PRD](docs/PRD.md) | 제품 요구사항 정의서 |
| [ROADMAP](docs/ROADMAP.md) | 개발 로드맵 + 아이디어 백로그 |
| [ARCHITECTURE](docs/manual/ARCHITECTURE.md) | 아키텍처 + 파일 구조 상세 |
| [DATA_FLOW](docs/manual/DATA_FLOW.md) | 데이터 흐름도 |
| [API_SPEC](docs/manual/API_SPEC.md) | API 엔드포인트 스펙 |
| [SETUP_GUIDE](docs/manual/SETUP_GUIDE.md) | 환경 설정 가이드 |
| [CONVENTIONS](docs/CONVENTIONS.md) | 코딩 컨벤션 + 모듈화 원칙 |

---

## 라이선스

<!-- TODO: 라이선스 결정 후 추가 -->
