# Picatsso - Coding Conventions & Principles

## 핵심 원칙: 로봇 조립식 모듈화

> 모든 코드는 "레고 블록"처럼 설계한다.  
> 해당 부분만 교체하면 다른 부분에 충돌 없이 동작해야 한다.

---

## 1. 모듈화 규칙

### 1.1 컴포넌트 독립성
- 각 컴포넌트는 자신의 역할만 수행한다 (Single Responsibility)
- 컴포넌트 간 직접 참조 금지 → 반드시 props/인터페이스를 통해 통신
- 한 컴포넌트를 삭제해도 다른 컴포넌트에 에러가 발생하지 않아야 한다

### 1.2 레이어 분리
```
src/
├── components/     # UI 컴포넌트 (표현 담당)
│   ├── common/     # 공통 UI (Button, Modal, Input 등)
│   ├── layout/     # 레이아웃 (Header, Footer, Nav 등)
│   └── features/   # 기능별 컴포넌트 그룹
│       ├── upload/       # 고양이 정보 입력 관련
│       ├── analysis/     # AI 분석 관련
│       ├── generation/   # 이미지 생성 관련
│       └── result/       # 결과물 표시 관련
├── services/       # 외부 API 통신 (비즈니스 로직과 분리)
│   ├── ai/         # AI 분석 서비스 (Claude/GPT/Gemini 교체 가능)
│   ├── image/      # 이미지 생성 서비스 (Nano Banana 교체 가능)
│   └── storage/    # 파일 저장 서비스
├── hooks/          # 커스텀 훅 (상태 로직 재사용)
├── lib/            # 유틸리티, 설정, 상수
│   ├── constants/  # 상수값 (컬러팔레트, 성격매핑 등)
│   ├── types/      # TypeScript 타입 정의
│   └── utils/      # 순수 유틸리티 함수
├── app/            # Next.js App Router 페이지
└── styles/         # 글로벌 스타일, 테마
```

### 1.3 서비스 어댑터 패턴
외부 API는 반드시 어댑터(Adapter) 패턴으로 감싼다.

```typescript
// ❌ 잘못된 예: 컴포넌트에서 직접 API 호출
const result = await fetch('https://api.anthropic.com/...');

// ✅ 올바른 예: 서비스 레이어를 통해 호출
// services/ai/analyzer.ts - 인터페이스 정의
interface CatAnalyzer {
  analyze(input: CatInput): Promise<CatAnalysis>;
}

// services/ai/claude-analyzer.ts - Claude 구현
class ClaudeAnalyzer implements CatAnalyzer { ... }

// services/ai/gpt-analyzer.ts - GPT 구현 (교체용)
class GptAnalyzer implements CatAnalyzer { ... }
```

→ AI 엔진을 바꾸고 싶으면 구현체만 교체하면 됨

### 1.4 Config 중앙 관리
- 환경변수, API 키, 기능 플래그 등은 `lib/config.ts`에서 일괄 관리
- 하드코딩된 값 금지 → 반드시 constants 파일에서 import

---

## 2. 네이밍 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 파일 | PascalCase | `CatUploader.tsx` |
| 훅 파일 | camelCase, use 접두어 | `useCatAnalysis.ts` |
| 서비스 파일 | kebab-case | `claude-analyzer.ts` |
| 타입 파일 | kebab-case | `cat-types.ts` |
| 상수 파일 | kebab-case | `color-palette.ts` |
| CSS 클래스 | Tailwind 유틸리티 우선 | — |
| 변수/함수 | camelCase | `analyzeResult` |
| 타입/인터페이스 | PascalCase | `CatAnalysis` |
| 상수 | UPPER_SNAKE_CASE | `MAX_UPLOAD_SIZE` |

---

## 3. 파일 규칙

- 한 파일은 하나의 주요 export만 가진다
- 파일 길이 200줄 초과 시 분리 검토
- index.ts로 모듈 단위 re-export (배럴 패턴)
- 순환 참조(circular dependency) 절대 금지

---

## 4. 상태 관리 규칙

- 글로벌 상태는 최소화 (정말 필요한 것만)
- 서버 상태: React Query / SWR 등 캐싱 라이브러리
- 로컬 UI 상태: useState / useReducer
- 공유 상태가 필요하면: Context 또는 Zustand (경량 store)

---

## 5. API/서비스 교체 규칙

외부 서비스를 교체할 때 수정해야 하는 파일은 **최대 1~2개**여야 한다.

| 교체 대상 | 수정 파일 | 영향 범위 |
|-----------|-----------|-----------|
| AI 분석 엔진 | `services/ai/` 내 구현체 1개 | 0 (인터페이스 동일) |
| 이미지 생성 API | `services/image/` 내 구현체 1개 | 0 |
| DB/스토리지 | `services/storage/` 내 구현체 1개 | 0 |
| 인증 시스템 | `services/auth/` 내 구현체 1개 | 0 |

---

## 6. 문서 HTML 규칙 (docs 내 HTML 파일)

- 모듈화 원칙은 HTML 문서에도 동일하게 적용
- 각 HTML은 독립적으로 동작 (단독으로 브라우저에서 열 수 있어야 함)
- CSS는 파일 내 `<style>` 태그로 시작, 아래 조건 시 공통 CSS 파일로 분리:
  - HTML 파일이 **3개 이상**이 되거나
  - CSS가 **200줄**을 넘거나
  - **동일한 CSS 변수/스타일이 3개 이상 파일에서 중복**될 때
- 분리 시 사용자 승인 후 진행

---

## 7. 커밋 & 브랜치 규칙

### 커밋 메시지
```
[type] 간결한 설명

- 상세 내용 (선택)
```

**type:** `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`

### 브랜치
- `main` — 배포 가능 상태
- `dev` — 개발 통합
- `feat/기능명` — 기능 개발
- `fix/버그명` — 버그 수정
