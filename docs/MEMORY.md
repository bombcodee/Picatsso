# Picatsso - Session Memory

> 마일스톤 완료 시 자동 업데이트 + "메모리에 저장해줘" 요청 시에도 업데이트

---

## 마지막 업데이트: 2026-05-07

## 현재 상태: B안 확정 + 큐비즘 이탈 방지 작업 완료. 프롬프트 튜닝 테스트 진행 중.

### 완료된 작업
- ✅ ~~Phase 0: 기획/설계 전체~~
- ✅ ~~M0~M4: 프로젝트 초기화 → 서비스 레이어 → 상태관리 → UI → 페이지 통합~~
- ✅ ~~Gemini API 결제 설정 ($300 무료 크레딧 90일)~~
- ✅ ~~모델 확정: gemini-2.5-flash-lite (분석) + gemini-2.5-flash-image (이미지=나노바나나)~~
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

### 코드 적용 완료 (2026-04-08~09)
- ✅ **C안 프롬프트 코드 적용** — CUBISM_BASE_BLOCK, CAT_PICASSO_CONNECTION 독립 상수
- ✅ **7개 기질 키워드 재설계** — moodKeywords (분위기·에너지 중심), melancholy 추가
- ✅ **시각화 매뉴얼** — docs/manual/visual-guide.html (프로세스 흐름도, 프롬프트 조립)
- ✅ **ARCHITECTURE.md 전면 보강** — 폴더 의미, 레이어 구조, 파일 역할
- ✅ **장면 사진 AI 분석 (1.5차)** — 사진 업로드 시 자동 영어 묘사 생성 + 이미지 생성 AI에 구도 참조 전달

### 프롬프트 튜닝 테스트 완료 (2026-04-09~05-07)
- ✅ **B안 확정** — 긍정 지시만 (금지 없음), 투박하고 피카소스러운 결과
  - A안: 과격/무서움 → 탈락 | C안: 세련하지만 서투른 느낌 부족 → 탈락
  - CUBISM_BASE_BLOCK = CUBISM_VERSION_B 고정, A/C는 코드에 참고용으로 잔존
- ✅ **큐비즘 이탈 방지** (2026-05-07)
  - 비큐비즘 작품명 제거: Rose Period, Figures by the Sea, Neoclassical, Blue Period
  - curious의 moodKeywords 전면 교체 (초현실주의 → 큐비즘 양립 키워드)
  - 프롬프트 말미에 REMEMBER 큐비즘 앵커 추가 (AI가 뒤쪽을 더 강하게 따르므로)
  - 원본은 주석으로 보존 (테스트 후 복원 검토용)
- ✅ **색감 채도 풀기 완료** — desaturated 제거, bold & vivid로 변경
- ✅ **Gemini 503 대응** — withRetry() 자동 재시도 + 분석 모델 lite 변경
- ✅ **작업물 라이브러리** — /history 페이지 + IndexedDB 자동 저장
- ❌ **원근법이 아직 안 없어짐** — "no perspective" 텍스트가 안 먹힘

### 다음에 이어서 할 내용
1. 원근법 제거 프롬프트 개선 (중세 회화 방식 시도)
2. 미사용 A/C 버전 코드 정리 검토
3. 디자인 리뉴얼 (피카소 무드 강화 — frontend-design 활용)
4. 에러 페이지 (error.tsx, not-found.tsx)
5. 성능 최적화

### 주요 결정 사항
- 모듈화 원칙: 레고 블록식, 어댑터 패턴 필수 (HTML 문서 포함)
- AI: Gemini 통합 (gemini-2.5-flash-lite 분석 + gemini-2.5-flash-image 이미지)
- 큐비즘 우선: 프롬프트에 비큐비즘 작품명 금지 (AI가 이탈함), 분위기만 텍스트로 표현
- 503 대응: 자동 재시도 3회 + 폴백 모델(lite) 전환
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
