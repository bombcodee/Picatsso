# Picatsso - Session Memory

> 마일스톤 완료 시 자동 업데이트 + "메모리에 저장해줘" 요청 시에도 업데이트

---

## 마지막 업데이트: 2026-04-08

## 현재 상태: MVP 배포 완료. 프롬프트 전략 확정 (C안 하이브리드). 키워드 재설계 착수 직전.

### 완료된 작업
- ✅ ~~Phase 0: 기획/설계 전체~~
- ✅ ~~M0~M4: 프로젝트 초기화 → 서비스 레이어 → 상태관리 → UI → 페이지 통합~~
- ✅ ~~Gemini API 결제 설정 ($300 무료 크레딧 90일)~~
- ✅ ~~모델 확정: gemini-2.5-flash (분석) + gemini-2.5-flash-image (이미지=나노바나나)~~
- ✅ ~~고양이 시점 프롬프트 ("고양이가 화가라면 이 장면을 이렇게 그릴 거야!")~~
- ✅ ~~파레이돌리아 효과 + 감정 표현 4규칙 (실제 존재 시 강조 / 미존재 시 파레이돌리아)~~
- ✅ ~~사진 업로드 영역 통합 (고양이+장면 나란히 2컬럼)~~
- ✅ ~~SceneInput + 장면 필드 전체 파이프라인 연결~~
- ✅ ~~입력 품질 게이지 6단계~~
- ✅ ~~URL 히스토리 연동 뒤로가기~~
- ✅ ~~Vercel 배포 (https://picatsso.vercel.app/) + API 키 설정~~
- ✅ ~~README + 매뉴얼 4개 + CLAUDE.md 등급 체계/협업 흐름~~
- ✅ ~~문서 전체 최신화 (8개 문서 코드 대비 정합성 동기화)~~
- ✅ ~~프롬프트 관리 전용 폴더 구축 (discussion-log.html + artist-reference.html)~~
- ✅ ~~CONVENTIONS에 문서 HTML 모듈화 규칙 추가~~

### 토의 완료 — 프롬프트 전략 확정 (2026-04-08)
- ✅ **C안 하이브리드 채택** — 큐비즘 공통 베이스 + 성격별 분위기 악센트
  - 모든 그림: 굵은 윤곽선 + 면 분할 + 다중 시점 (=누가 봐도 피카소)
  - 성격별: 분위기·에너지·색감 악센트로만 차별화 (시기 고정 X)
- ✅ **청색 시기 → "블루톤 분위기 악센트"** — 전체 파랑 ❌, 다채로운 색 유지 + 블루 그림자/분위기
  - melancholy 기질 추가, 프롬프트는 "dreamy, contemplative mood with deep blue undertones" 방향
- ✅ **키워드 방향 전환** — 미술사 기법 중심 → 분위기·에너지 중심
  - 라벨도 "아프리카 미술 시기" → "장난꾸러기 화가 🎨" 방향
- ✅ **모듈화 확인** — 프롬프트 상수 단위로 독립 교체 가능 구조 유지

### 다음에 이어서 할 내용
1. 키워드 재설계안 작성 → personality-mapping.ts + prompts.ts 코드 적용
2. 디자인 리뉴얼 (피카소 무드 강화 — frontend-design 활용)
3. 에러 페이지 (error.tsx, not-found.tsx)
4. 성능 최적화

### 주요 결정 사항
- 모듈화 원칙: 레고 블록식, 어댑터 패턴 필수 (HTML 문서 포함)
- AI: Gemini 통합 (gemini-2.5-flash + gemini-2.5-flash-image)
- 프롬프트 언어: 영어 (이미지 품질) + 한국어 주석 (관리용)
- 컨셉: "고양이가 화가라면 이 장면을 이렇게 그릴 거야!"
- 감정 표현: 4규칙 (실제 존재 시 강조 + 미존재 시 파레이돌리아)
- 프롬프트 관리 흐름: 토의 → discussion-log.html → artist-reference.html → PROMPT_ENGINEERING.md → prompts.ts
- **화풍 전략: C안 하이브리드 (큐비즘 공통 베이스 + 성격별 분위기 악센트)**
- **청색 시기: 전체 파랑 X → 블루톤 분위기 악센트 (다채로운 색 유지)**
- 커밋 전 문서 정합성 검증 필수
- CSS 분리 기준: 3파일 이상 or 200줄 or 3파일 중복 시 (승인 후)

### 프로젝트 핵심 파일 위치
- 실제 프롬프트: `src/lib/constants/prompts.ts`
- 화풍 매핑: `src/lib/constants/personality-mapping.ts`
- 설정(모델명): `src/lib/config.ts`
- 프롬프트 관리: `docs/prompt-management/`
- 배포: https://picatsso.vercel.app/
- GitHub: https://github.com/bombcodee/Picatsso
