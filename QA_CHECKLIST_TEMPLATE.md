# QA 체크리스트 템플릿

계산기 1종을 검수할 때 이 파일을 복사해서 사용한다.
모든 항목을 통과해야 "완료" 판정.

---

## 검수 대상

- **계산기 ID**: CALC-XX
- **계산기명**: 
- **검수일**: YYYY-MM-DD
- **구현 담당**: Claude Code Desktop
- **검수 담당**: 명인

---

## Layer 1: 자동 검증 (Vitest)

| # | 항목 | 결과 | 비고 |
|---|---|---|---|
| L1-1 | `pnpm test` 전체 통과 | Pass / Fail | |
| L1-2 | 해당 계산기 테스트 파일 존재 (`__tests__/calculators/{name}.test.ts`) | Pass / Fail | |
| L1-3 | SPEC.md의 모든 TC가 테스트 코드에 포함됨 | Pass / Fail | |
| L1-4 | 경계값 테스트 포함 (최소값, 최대값, 0, 음수) | Pass / Fail | |

---

## Layer 2: 스펙 대조

### 입력 필드 대조

| SPEC 필드 | 구현됨 | 타입 일치 | 기본값 일치 | 범위 검증 | 비고 |
|---|---|---|---|---|---|
| (SPEC에서 복사) | Pass / Fail | Pass / Fail | Pass / Fail | Pass / Fail | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

### 출력 항목 대조

| SPEC 출력 | 구현됨 | 계산 정확 | 표시 형식 | 비고 |
|---|---|---|---|---|
| (SPEC에서 복사) | Pass / Fail | Pass / Fail | Pass / Fail | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

### 계산 로직

| # | 항목 | 결과 | 비고 |
|---|---|---|---|
| L2-C1 | 계산 공식이 SPEC과 일치 | Pass / Fail | |
| L2-C2 | 정부 공식 자료 출처가 코드 주석에 명시됨 | Pass / Fail | |
| L2-C3 | 연도 기준(2026년)이 코드·UI에 표시됨 | Pass / Fail | |
| L2-C4 | 요율·세율 상수가 별도 constants 파일에 분리됨 | Pass / Fail | |

### 페이지 구조

| # | 항목 | 결과 | 비고 |
|---|---|---|---|
| L2-P1 | H1 제목 존재 (연도 포함) | Pass / Fail | |
| L2-P2 | 계산기 UI (입력 폼 + 결과 표시) | Pass / Fail | |
| L2-P3 | 결과 상세 (공제 항목 내역 등) | Pass / Fail | |
| L2-P4 | "계산 방법" 설명 (500자 이상) | Pass / Fail | |
| L2-P5 | 예시 케이스 3~5개 | Pass / Fail | |
| L2-P6 | FAQ 5~7개 | Pass / Fail | |
| L2-P7 | 관련 계산기 추천 (3~4개 링크) | Pass / Fail | |
| L2-P8 | 업데이트 일자 표시 | Pass / Fail | |

### 가이드 페이지 (`/{calculator}/guide`)

| # | 항목 | 결과 | 비고 |
|---|---|---|---|
| L2-G1 | 가이드 페이지 존재 | Pass / Fail | |
| L2-G2 | 고유 콘텐츠 500자 이상 | Pass / Fail | |
| L2-G3 | AI 초안 그대로가 아닌 검수·편집 완료 | Pass / Fail | |

### SEO

| # | 항목 | 결과 | 비고 |
|---|---|---|---|
| L2-S1 | title 태그 설정 ("{계산기명} - {사이트명}") | Pass / Fail | |
| L2-S2 | meta description 150자 내외 | Pass / Fail | |
| L2-S3 | OG 태그 (title, description, image) | Pass / Fail | |
| L2-S4 | canonical URL | Pass / Fail | |
| L2-S5 | JSON-LD 스키마 | Pass / Fail | |
| L2-S6 | sitemap에 포함 확인 | Pass / Fail | |
| L2-S7 | content/calculators.ts에 메타데이터 등록 | Pass / Fail | |

---

## Layer 3: E2E 브라우저 검증

### 기능 검증

| # | 항목 | 결과 | 비고 |
|---|---|---|---|
| L3-F1 | 정상 입력 → 정상 결과 출력 | Pass / Fail | |
| L3-F2 | 빈 값 제출 → 유효성 검증 메시지 표시 | Pass / Fail | |
| L3-F3 | 범위 초과 입력 → 적절한 에러 처리 | Pass / Fail | |
| L3-F4 | 숫자 입력 시 천 단위 구분 표시 | Pass / Fail | |
| L3-F5 | 결과값 숫자 포맷 (원 단위, 콤마) | Pass / Fail | |
| L3-F6 | 정부 계산기(비교 대상)와 결과 일치 확인 | Pass / Fail | 비교 대상 URL 기재 |

### 반응형·접근성

| # | 항목 | 결과 | 비고 |
|---|---|---|---|
| L3-R1 | 데스크톱 (1280px) 정상 표시 | Pass / Fail | |
| L3-R2 | 태블릿 (768px) 정상 표시 | Pass / Fail | |
| L3-R3 | 모바일 (375px) 정상 표시 | Pass / Fail | |
| L3-R4 | 숫자 입력 시 모바일 숫자 키패드 표시 | Pass / Fail | inputMode="numeric" |
| L3-R5 | 키보드만으로 조작 가능 | Pass / Fail | |

### 성능

| # | 항목 | 기준 | 측정값 | 결과 |
|---|---|---|---|---|
| L3-W1 | Lighthouse Performance | >= 90 | | Pass / Fail |
| L3-W2 | Lighthouse Accessibility | >= 90 | | Pass / Fail |
| L3-W3 | Lighthouse SEO | >= 90 | | Pass / Fail |
| L3-W4 | LCP | < 2.5s | | Pass / Fail |
| L3-W5 | CLS | < 0.1 | | Pass / Fail |

---

## 검수 결과 요약

| Layer | 총 항목 | Pass | Fail | 통과율 |
|---|---|---|---|---|
| Layer 1 (자동) | 4 | | | |
| Layer 2 (스펙 대조) | 가변 | | | |
| Layer 3 (E2E) | 15 | | | |
| **합계** | | | | |

### 최종 판정

- [ ] **Pass** — 모든 항목 통과
- [ ] **Conditional Pass** — 사소한 이슈 1~2건, 이슈 목록 기재 후 수정 진행
- [ ] **Fail** — 주요 이슈 존재, 수정 후 재검수 필요

### 발견된 이슈

| # | 항목 ID | 이슈 설명 | 심각도 | 조치 |
|---|---|---|---|---|
| 1 | | | 상/중/하 | |
| 2 | | | | |
| 3 | | | | |

### 검수자 노트

(자유 기술)
