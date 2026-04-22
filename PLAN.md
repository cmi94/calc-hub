# 다계산 (dagyesan.com) — 실행 계획

> 세상의 모든 계산기를 모아

## 1. 프로젝트 개요

- 브랜드: **다계산** (dagyesan.com)
- 태그라인: "세상의 모든 계산기를 모아"
- 도메인: dagyesan.com (구매 완료)
- 목표: 6개월 내 월 3~10만 PV, AdSense 월 수익 5~30만원
- 핵심 차별화: 실용 계산기 + 재미 계산기를 한 곳에. 깔끔한 UX, 빠른 SSG
- 투자 가능 시간: 주말 4~5시간
- 총 초기 비용: 연 약 1.5만원(도메인)

## 2. 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Cloudflare Pages 무료 플랜 (상업적 이용 허용, 무제한 대역폭)
- Cloudflare Registrar (도메인 — 구매 완료)
- GitHub Private Repo
- GA4 + Search Console + AdSense
- Vitest (계산 함수 단위 테스트)
- pnpm (패키지 매니저)

## 3. 경쟁사 분석

| 사이트 | 포지셔닝 | 다계산 차별화 |
|---|---|---|
| calc.kr | 한국인 계산기 모음 | 계산기 수·카테고리 압도, 재미 콘텐츠 |
| calcmoa.kr | 계산모아 종합 계산기 | 재미 카테고리(운세·로또·궁합), 숏폼 연계 |
| k-calc.com | 한국인 초간편 계산기 | 포괄적 카테고리 + 재방문 유도 |
| calculate.co.kr | 근로 계산기 | 생활·재미·부동산·금융까지 포괄 |

핵심 공백: 실용 + 재미를 결합한 허브형 사이트가 없음

## 4. 카테고리 구조

```
/                         홈 (인기 계산기 + 오늘의 한마디)
/category/salary          급여·근로
/category/tax             세무
/category/property        부동산
/category/finance         금융·대출
/category/life            생활·건강
/category/fun             재미·운세
```

## 5. 전체 계산기 목록 — 34종

### 축 1: 수익 엔진 (고RPM)

| ID | 계산기 | 카테고리 | Phase |
|---|---|---|---|
| CALC-01 | 연봉 실수령액 | 급여 | 1 |
| CALC-02 | 퇴직금 | 급여 | 1 |
| CALC-03 | 주휴수당 | 급여 | 1 |
| CALC-04 | 부동산 취득세 | 부동산 | 1 |
| CALC-05 | 주택담보대출 이자 | 금융 | 1 |
| CALC-06 | 전세대출 이자 | 금융 | 1 |
| CALC-07 | 종합소득세 | 세무 | 1 |
| CALC-08 | 실업급여 | 급여 | 2 |
| CALC-10 | 증여세 | 세무 | 2 |
| CALC-11 | 부동산 중개수수료 | 부동산 | 2 |
| CALC-17 | 양도소득세 | 세무 | 3 |
| CALC-18 | 연말정산 환급액 | 세무 | 3 |
| CALC-19 | 상속세 | 세무 | 3 |
| CALC-24 | 등기비용 | 부동산 | 4 |
| CALC-25 | 자동차 할부 | 금융 | 4 |

### 축 2: 트래픽 엔진 (검색량 높음)

| ID | 계산기 | 카테고리 | Phase |
|---|---|---|---|
| CALC-09 | 청약 가점 | 부동산 | 2 |
| CALC-12 | 나이 계산기 | 생활 | 2 |
| CALC-13 | 시급 계산기 | 급여 | 2 |
| CALC-20 | 자동차세 | 생활 | 3 |
| CALC-21 | 전기요금 (누진세) | 생활 | 3 |
| CALC-22 | BMI / 적정 체중 | 건강 | 3 |
| CALC-23 | D-day / 날짜 계산기 | 생활 | 3 |
| CALC-26 | 임신 출산예정일 | 건강 | 4 |
| CALC-27 | 군 전역일 | 생활 | 4 |
| CALC-28 | 평수↔제곱미터 변환 | 부동산 | 4 |
| CALC-29 | 연비 계산기 | 생활 | 4 |
| CALC-30 | 음주 측정(BAC 추정) | 생활 | 4 |

### 축 3: 재방문·공유 엔진 (재미)

| ID | 계산기 | 카테고리 | Phase | 재방문성 |
|---|---|---|---|---|
| CALC-14 | 오늘의 한마디 (행운 점수) | 재미 | 2 | 매일 |
| CALC-15 | 로또 번호 생성기 | 재미 | 2 | 매주 |
| CALC-16 | 로또 확률 계산기 | 재미 | 2 | 중 |
| CALC-31 | 궁합 계산기 (이름) | 재미 | 3 | 중 (공유 폭발) |
| CALC-32 | 랜덤 메뉴 추천 | 재미 | 3 | 매일 |
| CALC-33 | MBTI 궁합 | 재미 | 4 | 중 |
| CALC-34 | 커플 기념일 계산기 | 재미 | 4 | 중 |

## 6. Phase별 일정

- **Phase 1 (W1~W6)**: CALC-01~07, MVP 7종, AdSense 승인 기반
- **Phase 2 (W7~W10)**: CALC-08~16, 실용 6종 + 재미 3종
- **Phase 3 (W11~W16)**: CALC-17~23, CALC-31~32
- **Phase 4 (W17~)**: CALC-24~30, CALC-33~34, 확장

## 7. 품질 보증 (QA)

- **Layer 1**: Vitest 자동 테스트 (SPEC.md 기반)
- **Layer 2**: 스펙 대조 체크리스트 (수동)
- **Layer 3**: E2E 브라우저 검증 (Lighthouse 90+)
- 완료 판정: L1~L3 전 통과

## 8. 12주 로드맵

| 주차 | 작업 |
|---|---|
| W1 | ~~도메인 구매~~ ✅, GitHub/Cloudflare 세팅, Next.js 16 스캐폴딩, 디자인 시스템 |
| W2 | CALC-01 연봉 실수령액 + 가이드 + QA |
| W3 | CALC-02 퇴직금 + CALC-03 주휴수당 + QA |
| W4 | CALC-04 부동산 취득세 + CALC-05 주담대 + QA |
| W5 | CALC-06 전세대출 + CALC-07 종소세 + 필수 페이지 + GA4/SC + QA |
| W6 | AdSense 승인 신청, Lighthouse 95+, sitemap, Phase 1 전체 QA |
| W7 | CALC-08 실업급여 + CALC-09 청약 가점 + 숏폼 계정 개설 + QA |
| W8 | CALC-14 오늘의 한마디 + CALC-15/16 로또 허브 + 파일럿 숏폼 + QA |
| W9 | CALC-10 증여세 + CALC-11 중개수수료 + 숏폼 주 3편 + QA |
| W10 | CALC-12 나이 + CALC-13 시급 + Phase 2 전체 QA + 블로그 3편 |
| W11 | CALC-17 양도소득세 + CALC-31 궁합 + QA |
| W12 | CALC-18~19 + CALC-32 메뉴추천 + 3개월 회고 |

## 9. 마케팅·수익화

- 유료 광고 없음, SEO + 숏폼 유기적 유입
- 숏폼 킬러 소재: 연봉 실수령액, 주휴수당, 로또 확률, 오늘의 운
- 수익: AdSense → 6개월 후 Kakao AdFit 병행 → 1년 후 프리미엄 네트워크

## 10. 참고 문서

| 파일 | 용도 |
|---|---|
| SPEC.md | 계산기별 스펙 + 테스트 케이스 |
| QA_CHECKLIST_TEMPLATE.md | 검수 체크리스트 템플릿 |
| QA_LOG.md | 검수 결과 누적 기록 |
| CLAUDE.md | Claude Code Desktop 지침 |
| SETUP_GUIDE.md | 셋업 절차 |
