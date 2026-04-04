# Picatsso - Session Memory

> 이 파일은 세션 간 연속성을 위한 진행 상황 기록입니다.
> "메모리에 저장해줘" 요청 시 업데이트됩니다.

---

## 마지막 업데이트: 2026-04-05

## 현재 상태: Phase 0 완료 → Phase 1 MVP 개발 플랜 승인 대기

### 완료된 작업
- [x] PRD 작성 + 정합성 검토/수정 (Gemini 통합, 기술스택 확정 반영)
- [x] 로드맵 작성 + 아이디어 백로그 9개 추가 (사용자가 직접 정리)
- [x] 코딩 컨벤션 문서 (모듈화 원칙, 어댑터 패턴, 폴더 구조)
- [x] CLAUDE.md 문서 관리 흐름 확립 (아이디어→PRD→ROADMAP)
- [x] 기술 스택 확정: Next.js + Tailwind + shadcn/ui + Zustand + Gemini API + Vercel
- [x] Nano Banana = Gemini Image API 코드네임 확인 + 가격/무료티어 정리
- [x] 고양이 시각 리서치 반영 (zezelife.com 기사 기반)
- [x] 프롬프트 엔지니어링 파이프라인 초안 (분석→화풍매핑→이미지생성)
- [x] 감정 색감 시스템 기획 (MVP 포함, 좋아하는것=파란색)
- [x] MVP 개발 플랜 작성 (M0~M5, 5개 마일스톤, 약 6~7일)

### 진행 중인 작업
- [ ] MVP 개발 플랜 최종 승인 + 착수
- [ ] 초기 커밋 + GitHub 푸시

### 다음에 이어서 할 내용
1. MVP 개발 플랜 리뷰 및 최종 승인
2. M0: 프로젝트 초기화 (Next.js + Tailwind + shadcn/ui)
3. M1: 타입/상수/서비스 레이어 구축
4. 이후 M2→M3→M4→M5 순차 진행

### 주요 결정 사항
- 모듈화 원칙: 레고 블록식, 어댑터 패턴 필수
- AI 통합: Gemini로 분석+생성 모두 처리 (1 API 키), Claude/GPT는 어댑터로 교체 가능
- MVP 범위: 랜딩 + 입력 + 분석 + 생성 + 다운로드 + 감정색감 시스템
- MVP에서 DB 없음 (stateless), 추후 Supabase 도입
- 수익화: Phase 3에서 진행
- 디자인 톤: 아티스틱, 피카소 무드
- 문서 흐름: 아이디어 → ROADMAP 백로그 → 채택 시 PRD 반영 → ROADMAP Phase 배치
- 개발 진행: 반드시 사용자 허가 후 착수
