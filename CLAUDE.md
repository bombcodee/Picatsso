# Picatsso - Claude Code 프로젝트 지침

## 필수 참조 문서
아래 docs/ 폴더의 모든 문서를 반드시 확인하고 작업에 반영할 것:

- `docs/PRD.md` — 제품 요구사항 정의서 (기능, 타겟, 플로우)
- `docs/ROADMAP.md` — 개발 로드맵 및 진행 상황 (PDCA 기반)
- `docs/CONVENTIONS.md` — 코딩 규칙 및 모듈화 원칙
- `docs/BACKLOG.md` — 개발 백로그 (작업 이력)
- `docs/TEST_SCENARIOS.md` — 테스트 시나리오
- `docs/BUG_REPORTS.md` — 버그 리포트
- `docs/references/REFERENCES.md` — 기술 참고자료 (API 스펙, 가격, 리서치 결과)
- `docs/references/cat_color_vision.md` — 고양이 색각 과학 레퍼런스
- `docs/PROMPT_ENGINEERING.md` — 프롬프트 파이프라인 (핵심 경쟁력)
- `docs/MEMORY.md` — 세션 연속성 메모리 (진행 상황 요약)

## 언어
- 모든 요청 응답 및 문서 작성은 **한국어**로 진행

## 문서 관리 흐름

```
ROADMAP 아이디어 백로그        ← 브레인스토밍, 자유롭게 아이디어 기록
       │
       ▼  (토의 후 채택 확정)
       │
PRD 기능 스펙에 반영            ← "이건 만든다" 확정, 스펙 작성
       │
       ▼  (확정된 스펙 기반)
       │
ROADMAP Phase에 태스크 배치     ← "언제 만든다" 실행 계획
```

| 문서 | 역할 | 성격 |
|------|------|------|
| `PRD.md` | **What & Why** — 제품 정의서 | 확정된 스펙, 채택된 기능만 기록 |
| `ROADMAP.md` | **When & How** — 실행 로드맵 + 아이디어 백로그 | 살아있는 문서, 자주 업데이트 |

- 아이디어는 ROADMAP 백로그에 먼저 기록
- 채택 확정 시 PRD에 스펙 추가 → ROADMAP Phase에 태스크 배치
- PRD는 아이디어가 채택될 때마다 점점 자라나는 제품 설계도
- **⚠️ 사용자 승인 없이 PRD 수정 금지** — 아이디어가 "이거 하자"로 확정될 때만 PRD에 반영

## 작업 규칙
1. 코드 작성 전 `docs/CONVENTIONS.md`의 모듈화 원칙을 준수
2. 작업 완료 시 `docs/BACKLOG.md`에 이력 기록
3. 버그 발견 시 `docs/BUG_REPORTS.md`에 기록
4. "메모리에 저장해줘" 요청 시 `docs/MEMORY.md`에 현재까지 진행 상황 요약 작성
5. "이어서 하자" 요청 시 `docs/MEMORY.md` 읽고 → 남은 플랜 제시 → 확인 후 진행
6. 모든 외부 API는 어댑터 패턴으로 감싸서 교체 가능하게 구현
7. 사용자 허가 없이 개발 착수 금지
8. 모든 작업 완료 후, 사용자의 원래 요청 내용과 실제 처리한 내용을 요약해서 보여줄 것 (요청 → 처리 결과 형식)
