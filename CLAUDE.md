# 다계스탄 (dagyesan.com) — Claude Code 지침

> 계산기 씬의 절대 체급

---

## 1. 프로젝트 개요

다계스탄은 한국형 생활 계산기 허브. 실용 계산기(급여·세무·부동산·금융) + 재미 계산기(운세·로또·궁합·MBTI)를 한 곳에 모은 Next.js 16 SSG 사이트. AdSense 광고 수익을 목표로 한다.

- 도메인: dagyesan.com
- 목표: 49종 계산기, Lighthouse 95+, AdSense 승인

---

## 2. 기술 스택 (변경 금지)

| 항목 | 선택 | 비고 |
|---|---|---|
| 프레임워크 | Next.js 16 (App Router) | SSG 우선, 필요 시 ISR |
| 언어 | TypeScript (strict mode) | `any` 금지 |
| 스타일 | Tailwind CSS 4 | 인라인 `style` 금지 |
| 컴포넌트 | shadcn/ui | 커스텀 시 shadcn 래핑 |
| 아이콘 | Lucide React | 추가 아이콘팩 금지 |
| 패키지 매니저 | pnpm | npm/yarn 금지 |
| 테스트 | Vitest | 계산 함수 100% 커버리지 |
| 배포 | Cloudflare Pages | `output: 'export'` |
| 분석 | GA4 + Search Console | |
| 수익 | AdSense | Phase 1 완료 후 |

---

## 3. 디렉토리 구조

```
dagyesan/
├── CLAUDE.md
├── SPEC.md
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
│
├── public/
│   ├── icons/          ← 카테고리 아이콘 SVG
│   ├── og/             ← OG 이미지
│   └── robots.txt
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                             ← RootLayout (GNB + Footer + 모바일탭바)
│   │   ├── page.tsx                               ← 홈
│   │   ├── sitemap.ts                             ← 동적 사이트맵
│   │   │
│   │   ├── category/
│   │   │   └── [slug]/page.tsx                    ← 카테고리 페이지 (서브필터 탭 포함)
│   │   │
│   │   ├── (calculators)/                         ← 라우트 그룹 (레이아웃 공유)
│   │   │   ├── salary/page.tsx                    ← CALC-01
│   │   │   ├── retirement/page.tsx                ← CALC-02
│   │   │   ├── weekly-holiday-pay/page.tsx        ← CALC-03
│   │   │   ├── property-acquisition-tax/page.tsx  ← CALC-04
│   │   │   ├── mortgage/page.tsx                  ← CALC-05
│   │   │   ├── jeonse-loan/page.tsx               ← CALC-06
│   │   │   ├── income-tax/page.tsx                ← CALC-07
│   │   │   ├── unemployment-benefit/page.tsx      ← CALC-08
│   │   │   ├── housing-subscription-score/page.tsx← CALC-09
│   │   │   ├── gift-tax/page.tsx                  ← CALC-10
│   │   │   ├── brokerage-fee/page.tsx             ← CALC-11
│   │   │   ├── age/page.tsx                       ← CALC-12
│   │   │   ├── hourly-wage/page.tsx               ← CALC-13
│   │   │   ├── daily-fortune/page.tsx             ← CALC-14
│   │   │   ├── lotto/page.tsx                     ← CALC-15
│   │   │   ├── lotto/probability/page.tsx         ← CALC-16
│   │   │   ├── capital-gains-tax/page.tsx         ← CALC-17
│   │   │   ├── year-end-tax/page.tsx              ← CALC-18
│   │   │   ├── inheritance-tax/page.tsx           ← CALC-19
│   │   │   ├── car-tax/page.tsx                   ← CALC-20
│   │   │   ├── electricity-bill/page.tsx          ← CALC-21
│   │   │   ├── bmi/page.tsx                       ← CALC-22
│   │   │   ├── dday/page.tsx                      ← CALC-23
│   │   │   ├── registration-cost/page.tsx         ← CALC-24
│   │   │   ├── car-installment/page.tsx           ← CALC-25
│   │   │   ├── due-date/page.tsx                  ← CALC-26
│   │   │   ├── military-discharge/page.tsx        ← CALC-27
│   │   │   ├── area-converter/page.tsx            ← CALC-28
│   │   │   ├── fuel-economy/page.tsx              ← CALC-29
│   │   │   ├── bac/page.tsx                       ← CALC-30
│   │   │   ├── name-compatibility/page.tsx        ← CALC-31
│   │   │   ├── random-menu/page.tsx               ← CALC-32
│   │   │   ├── mbti-compatibility/page.tsx        ← CALC-33
│   │   │   ├── couple-anniversary/page.tsx        ← CALC-34
│   │   │   ├── zodiac-compatibility/page.tsx      ← CALC-35
│   │   │   ├── tojeong/page.tsx                   ← CALC-36
│   │   │   ├── tarot-daily/page.tsx               ← CALC-37
│   │   │   ├── name-strokes/page.tsx              ← CALC-38
│   │   │   ├── past-life/page.tsx                 ← CALC-39
│   │   │   ├── saju/page.tsx                      ← CALC-40
│   │   │   ├── zodiac-animal-compatibility/page.tsx← CALC-41
│   │   │   ├── life-remaining/page.tsx            ← CALC-42
│   │   │   ├── horoscope-daily/page.tsx           ← CALC-43
│   │   │   ├── zodiac-personality/page.tsx        ← CALC-44
│   │   │   ├── mbti-career/page.tsx               ← CALC-45
│   │   │   ├── mbti-balance/page.tsx              ← CALC-46
│   │   │   ├── mbti-change/page.tsx               ← CALC-47
│   │   │   ├── naming-score/page.tsx              ← CALC-48
│   │   │   └── face-age/page.tsx                  ← CALC-49
│   │   │
│   │   ├── about/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   │
│   ├── components/
│   │   ├── ui/                  ← shadcn/ui 컴포넌트
│   │   ├── layout/
│   │   │   ├── GNB.tsx          ← 글로벌 네비게이션 (메가메뉴)
│   │   │   ├── MobileNav.tsx    ← 모바일 사이드 메뉴 (Sheet)
│   │   │   ├── MobileTabBar.tsx ← 모바일 하단 탭바 (4탭)
│   │   │   ├── Footer.tsx
│   │   │   └── SearchDialog.tsx ← 통합 검색 (Cmd+K)
│   │   ├── home/
│   │   │   ├── HeroSearch.tsx
│   │   │   ├── DailyPicks.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   ├── PopularCalcs.tsx
│   │   │   ├── NewCalcs.tsx
│   │   │   └── CalcTrackSection.tsx
│   │   ├── calculator/
│   │   │   ├── CalculatorLayout.tsx ← 공통 레이아웃 (H1+결과+설명+FAQ+추천)
│   │   │   ├── InputForm.tsx
│   │   │   ├── ResultCard.tsx
│   │   │   ├── CrossLink.tsx
│   │   │   ├── FAQSection.tsx       ← JSON-LD 포함
│   │   │   ├── MethodExplain.tsx
│   │   │   ├── ExampleCases.tsx
│   │   │   ├── ShareButton.tsx      ← 카카오/트위터/링크복사
│   │   │   └── Disclaimer.tsx
│   │   ├── cards/
│   │   │   ├── CalcCard.tsx
│   │   │   └── Badge.tsx
│   │   └── fun/
│   │       ├── TarotFlipCard.tsx
│   │       ├── LottoBall.tsx
│   │       ├── FiveElementChart.tsx
│   │       ├── RadarChart.tsx
│   │       ├── LifeProgressBar.tsx
│   │       └── BalanceGameCard.tsx
│   │
│   ├── lib/
│   │   ├── calculators/         ← 순수 계산 함수 (UI 의존 없음)
│   │   │   ├── salary.ts        ← CALC-01
│   │   │   ├── severance.ts     ← CALC-02
│   │   │   ├── weeklyHolidayPay.ts ← CALC-03
│   │   │   ├── propertyAcquisitionTax.ts ← CALC-04
│   │   │   ├── mortgage.ts      ← CALC-05
│   │   │   ├── jeonseeLoan.ts   ← CALC-06
│   │   │   ├── incomeTax.ts     ← CALC-07
│   │   │   ├── unemploymentBenefit.ts ← CALC-08
│   │   │   ├── housingSubscriptionScore.ts ← CALC-09
│   │   │   ├── giftTax.ts       ← CALC-10
│   │   │   ├── brokerageFee.ts  ← CALC-11
│   │   │   ├── age.ts           ← CALC-12
│   │   │   ├── hourlyWage.ts    ← CALC-13
│   │   │   ├── dailyFortune.ts  ← CALC-14
│   │   │   ├── lotto.ts         ← CALC-15, 16
│   │   │   ├── capitalGainsTax.ts ← CALC-17
│   │   │   ├── yearEndTax.ts    ← CALC-18
│   │   │   ├── inheritanceTax.ts ← CALC-19
│   │   │   ├── carTax.ts        ← CALC-20
│   │   │   ├── electricityBill.ts ← CALC-21
│   │   │   ├── bmi.ts           ← CALC-22
│   │   │   ├── dday.ts          ← CALC-23
│   │   │   ├── compatibility.ts ← CALC-31
│   │   │   ├── randomMenu.ts    ← CALC-32
│   │   │   ├── zodiacCompat.ts  ← CALC-35
│   │   │   ├── tojeong.ts       ← CALC-36
│   │   │   ├── tarot.ts         ← CALC-37
│   │   │   ├── nameStrokes.ts   ← CALC-38, 48
│   │   │   ├── pastLife.ts      ← CALC-39
│   │   │   ├── saju.ts          ← CALC-40
│   │   │   ├── animalCompat.ts  ← CALC-41
│   │   │   ├── lifeRemaining.ts ← CALC-42
│   │   │   ├── horoscope.ts     ← CALC-43
│   │   │   ├── zodiacPersonality.ts ← CALC-44
│   │   │   ├── mbtiCareer.ts    ← CALC-45
│   │   │   ├── mbtiBalance.ts   ← CALC-46
│   │   │   └── mbtiChange.ts    ← CALC-47
│   │   │
│   │   ├── data/                ← 정적 데이터 (계산에 사용되는 테이블)
│   │   │   ├── simpleTaxTable.ts
│   │   │   ├── unemploymentMatrix.ts
│   │   │   ├── giftTaxRates.ts
│   │   │   ├── brokerageRates.ts
│   │   │   ├── zodiacData.ts
│   │   │   ├── tojeongTable.ts
│   │   │   ├── lunarCalendar.ts
│   │   │   ├── tarotDeck.ts
│   │   │   ├── strokeTable.ts
│   │   │   ├── pastLifePool.ts
│   │   │   ├── sajuTable.ts
│   │   │   ├── animalZodiac.ts
│   │   │   ├── horoscopeMessages.ts
│   │   │   ├── mbtiCareerData.ts
│   │   │   ├── mbtiBalanceQuestions.ts
│   │   │   ├── mbtiChangeAnalysis.ts
│   │   │   ├── fortuneMessages.ts
│   │   │   └── categories.ts    ← 계산기 레지스트리 (Single Source of Truth)
│   │   │
│   │   ├── utils/
│   │   │   ├── hash.ts          ← 결정적 해시 (재미 계산기용)
│   │   │   ├── format.ts        ← 숫자/날짜/통화 포맷
│   │   │   ├── hangul.ts        ← 한글 자모 분해/초성 추출
│   │   │   ├── lunar.ts         ← 양력↔음력 변환
│   │   │   ├── seo.ts           ← generateMetadata 헬퍼
│   │   │   └── share.ts         ← SNS 공유 유틸
│   │   │
│   │   └── hooks/
│   │       ├── useFavorites.ts
│   │       ├── useRecentCalcs.ts
│   │       └── useSearchDialog.ts
│   │
│   └── styles/
│       └── globals.css
│
└── tests/
    ├── calculators/             ← Vitest 유닛 테스트
    └── data/                   ← 데이터 무결성 테스트
```

---

## 4. 전체 계산기 레지스트리 (49종)

`src/lib/data/categories.ts` 에 등록. Single Source of Truth.

### 카테고리 컬러 토큰

```typescript
const CATEGORY_COLORS = {
  salary:   { main: 'blue-600',    bg: 'blue-50',    border: 'blue-200'    },
  tax:      { main: 'emerald-600', bg: 'emerald-50', border: 'emerald-200' },
  property: { main: 'amber-600',   bg: 'amber-50',   border: 'amber-200'   },
  finance:  { main: 'violet-600',  bg: 'violet-50',  border: 'violet-200'  },
  life:     { main: 'cyan-600',    bg: 'cyan-50',    border: 'cyan-200'    },
  fun:      { main: 'pink-600',    bg: 'pink-50',    border: 'pink-200'    },
} as const
```

### 계산기 목록 (49종)

| ID | slug | 이름 | 카테고리 | Phase |
|---|---|---|---|---|
| CALC-01 | salary | 연봉 실수령액 계산기 | salary | 1 |
| CALC-02 | retirement | 퇴직금 계산기 | salary | 1 |
| CALC-03 | weekly-holiday-pay | 주휴수당 계산기 | salary | 1 |
| CALC-04 | property-acquisition-tax | 부동산 취득세 계산기 | property | 1 |
| CALC-05 | mortgage | 주택담보대출 이자 계산기 | finance | 1 |
| CALC-06 | jeonse-loan | 전세대출 이자 계산기 | finance | 1 |
| CALC-07 | income-tax | 종합소득세 계산기 | tax | 1 |
| CALC-08 | unemployment-benefit | 실업급여 계산기 | salary | 2 |
| CALC-09 | housing-subscription-score | 청약 가점 계산기 | property | 2 |
| CALC-10 | gift-tax | 증여세 계산기 | tax | 2 |
| CALC-11 | brokerage-fee | 부동산 중개수수료 계산기 | property | 2 |
| CALC-12 | age | 나이 계산기 | life | 2 |
| CALC-13 | hourly-wage | 시급 계산기 | salary | 2 |
| CALC-14 | daily-fortune | 오늘의 한마디 | fun/fortune | 2 |
| CALC-15 | lotto | 로또 번호 생성기 | fun/lotto | 2 |
| CALC-16 | lotto/probability | 로또 확률 계산기 | fun/lotto | 2 |
| CALC-17 | capital-gains-tax | 양도소득세 계산기 | tax | 3 |
| CALC-18 | year-end-tax | 연말정산 환급액 계산기 | tax | 3 |
| CALC-19 | inheritance-tax | 상속세 계산기 | tax | 3 |
| CALC-20 | car-tax | 자동차세 계산기 | life | 3 |
| CALC-21 | electricity-bill | 전기요금 계산기 | life | 3 |
| CALC-22 | bmi | BMI 계산기 | life | 3 |
| CALC-23 | dday | D-day 계산기 | life | 3 |
| CALC-24 | registration-cost | 등기비용 계산기 | property | 4 |
| CALC-25 | car-installment | 자동차 할부 계산기 | finance | 4 |
| CALC-26 | due-date | 출산예정일 계산기 | life | 4 |
| CALC-27 | military-discharge | 전역일 계산기 | life | 4 |
| CALC-28 | area-converter | 평수 변환기 | property | 4 |
| CALC-29 | fuel-economy | 연비 계산기 | life | 4 |
| CALC-30 | bac | 음주 측정 계산기 | life | 4 |
| CALC-31 | name-compatibility | 이름 궁합 계산기 | fun/compatibility | 3 |
| CALC-32 | random-menu | 랜덤 메뉴 추천 | fun/etc | 3 |
| CALC-33 | mbti-compatibility | MBTI 궁합 계산기 | fun/mbti | 4 |
| CALC-34 | couple-anniversary | 커플 기념일 계산기 | fun/etc | 4 |
| CALC-35 | zodiac-compatibility | 별자리 궁합 계산기 | fun/compatibility | 2 |
| CALC-36 | tojeong | 토정비결 | fun/fortune | 3 |
| CALC-37 | tarot-daily | 오늘의 타로 | fun/fortune | 3 |
| CALC-38 | name-strokes | 이름 획수 풀이 | fun/name | 3 |
| CALC-39 | past-life | 전생 직업 계산기 | fun/etc | 2 |
| CALC-40 | saju | 사주 오행 분석기 | fun/fortune | 3 |
| CALC-41 | zodiac-animal-compatibility | 띠별 궁합 계산기 | fun/compatibility | 2 |
| CALC-42 | life-remaining | 인생 남은 시간 계산기 | fun/etc | 2 |
| CALC-43 | horoscope-daily | 오늘의 별자리 운세 | fun/fortune | 3 |
| CALC-44 | zodiac-personality | 별자리 성격 분석 | fun/fortune | 3 |
| CALC-45 | mbti-career | MBTI 직업 궁합 | fun/mbti | 3 |
| CALC-46 | mbti-balance | MBTI 밸런스 게임 | fun/mbti | 4 |
| CALC-47 | mbti-change | MBTI 변화 추적기 | fun/mbti | 4 |
| CALC-48 | naming-score | 작명 점수 계산기 | fun/name | 3 |
| CALC-49 | face-age | 관상/얼굴 나이 | fun/etc | 4 |

---

## 5. 디자인 시스템

### 5.1 CalcCard 컴포넌트 스펙

```
┌──────────────────────────┐
│ [카테고리색 bg]           │
│    [Lucide 아이콘 24px]   │
│                          │
│ 계산기 이름               │  ← font-semibold text-base
│ 한줄 설명                 │  ← text-sm text-muted-foreground
│                          │
│ [NEW] 또는 [🔥인기]       │  ← 우측 하단 뱃지
└──────────────────────────┘
```

- hover: `shadow-md + scale-[1.02]` transition
- 모바일: 2열 그리드 (gap-3)
- 데스크톱: 3~4열 그리드 (gap-4)

### 5.2 뱃지 정의

| 뱃지 | 조건 | 스타일 |
|---|---|---|
| NEW | 출시 14일 이내 | `bg-green-100 text-green-700 text-xs` |
| 🔥 인기 | `badge: 'popular'` 수동 지정 | `bg-orange-100 text-orange-700 text-xs` |
| 📅 매일 | `revisitType: 'daily'` | `bg-purple-100 text-purple-700 text-xs` |

### 5.3 다크모드

- Tailwind `dark:` 클래스 사용
- `<html>`에 `class="dark"` 토글 (localStorage 저장)
- 모든 컴포넌트에 `dark:` variant 필수

### 5.4 애니메이션

| 대상 | 효과 | 구현 |
|---|---|---|
| CalcCard | hover scale + shadow | Tailwind `hover:scale-[1.02] hover:shadow-md` |
| 타로 카드 | 3D 뒤집기 | CSS `perspective + rotateY(180deg)` |
| 로또 공 | 바운스 등장 | CSS `@keyframes bounce` 순차 delay |
| 페이지 진입 | fade-in-up | CSS `@keyframes fadeInUp` |
| 밸런스 게임 | 카드 스와이프 | CSS `translateX + opacity` |

---

## 6. UI 구현 상세

### 6.1 GNB (components/layout/GNB.tsx)

**Desktop (≥ 1024px):**
```
┌──────────────────────────────────────────────────────┐
│ [로고: 다계스탄] [전체 계산기 ▼] [🔍]   [💫 오늘의 운세] │
└──────────────────────────────────────────────────────┘
```
- "전체 계산기" 호버/클릭 → 메가메뉴 드롭다운 (6개 카테고리 컬럼)
- 🔍 클릭 → SearchDialog 열기 (Cmd+K 단축키)

**Mobile (< 1024px):**
```
┌──────────────────────────────────────────────────────┐
│ [☰ 햄버거]  [로고: 다계스탄]  [🔍]  [💫]              │
└──────────────────────────────────────────────────────┘
```
- ☰ → Sheet (shadcn) 좌측 슬라이드

### 6.2 SearchDialog (components/layout/SearchDialog.tsx)

- shadcn Command (cmdk 기반)
- 기능: 한글 초성 검색 (`ㅇㅂ` → 연봉 실수령액), 최근 사용 상단 표시, 방향키 + Enter 탐색
- 트리거: 검색 아이콘 또는 Cmd+K / Ctrl+K

### 6.3 홈페이지 (app/page.tsx) — 위→아래 순서

1. HeroSearch: 중앙 정렬 검색바 + 태그라인
2. DailyPicks: 매일 변경 콘텐츠 3종 (오늘의 한마디, 타로, 별자리운세) 카드
3. CategoryGrid: 6개 대카테고리 아이콘 + 계산기 수 뱃지 (2×3 그리드)
4. PopularCalcs: 인기 계산기 TOP 5 (가로 스크롤)
5. NewCalcs: 최근 추가 계산기 (NEW 뱃지)
6. CalcTrackSection: 실용 / 재미 2트랙 그리드
7. Footer

### 6.4 카테고리 페이지 (app/category/[slug]/page.tsx)

- 카테고리 헤더 (아이콘 + 이름 + 총 N종)
- 서브 카테고리 필터 탭 (`fun` 카테고리만 해당)
- 정렬: 인기순(기본) / 최신순 / 이름순

### 6.5 계산기 상세 페이지 공통 레이아웃 (CalculatorLayout.tsx)

1. 브레드크럼 (홈 > 카테고리 > 계산기명)
2. H1 (연도 포함: "2026 연봉 실수령액 계산기")
3. 기준일 표시 ("2026년 4월 기준")
4. [계산기 UI 슬롯]
5. ShareButton (카카오/트위터/링크복사)
6. CrossLink "이것도 해보세요" (같은 서브카테고리 우선 3~4개)
7. MethodExplain (계산 방법 500자+)
8. ExampleCases (예시 3~5개)
9. FAQSection (FAQ 5~7개, JSON-LD FAQPage 자동 생성)
10. 하단 인기 계산기 캐러셀
11. Disclaimer (isFun이면 추가 문구)
12. 업데이트 일자

### 6.6 모바일 하단 탭바 (MobileTabBar.tsx)

```
[🏠 홈]  [🔍 검색]  [💫 운세]  [⭐ 즐겨찾기]
```

- `< 1024px`에서만 표시, `fixed bottom-0`
- `body`에 `pb-16` (탭바 높이만큼 하단 패딩)

---

## 7. SEO 규칙

### generateMetadata 패턴

```typescript
export function generateMetadata(): Metadata {
  return {
    title: '연봉 실수령액 계산기 - 다계스탄',
    description: '2026년 기준 연봉 실수령액을 계산해보세요. 4대보험, 소득세를 자동으로 계산하여 실제 월급을 확인할 수 있습니다.',
    alternates: { canonical: 'https://dagyesan.com/salary' },
    openGraph: {
      title: '연봉 실수령액 계산기 - 다계스탄',
      description: '...',
      url: 'https://dagyesan.com/salary',
      siteName: '다계스탄',
      type: 'website',
    },
  }
}
```

### JSON-LD

- 계산기 페이지: `WebApplication` 스키마
- FAQ 있는 페이지: `FAQPage` 스키마 추가
- 홈: `WebSite + SearchAction` 스키마

### sitemap.ts

모든 계산기 + 카테고리 페이지 동적 생성. `lastmod`는 빌드 시점.

---

## 8. 테스트 규칙

### 계산 함수 테스트 (필수)

- `lib/calculators/*.ts` → `tests/calculators/*.test.ts` 1:1 매칭
- SPEC.md의 TC를 그대로 테스트 케이스로 작성
- 허용 오차: 스펙에 명시된 범위 (±1만원, ±100원 등)
- 재미 계산기: 결정적 해시 검증 (동일 입력 → 동일 출력)

### 데이터 무결성 테스트 (필수)

- `tests/data/*.test.ts`
- 모든 매트릭스: 빈 셀 없음, 범위 내, 대칭(궁합류)
- 모든 메시지 풀: 빈 문자열 없음, 중복 없음

### 핵심 데이터 파일 검증 기준

| 파일 | 항목 수 | 핵심 검증 |
|---|---|---|
| zodiacData.ts | 12궁 + 12×12 매트릭스 | 매트릭스 대칭, 모든 셀 1~100 |
| tojeongTable.ts | 192괘 | 빈 해석 없음, 월별 12개 |
| tarotDeck.ts | 78장 × 정/역 | 78장 완전, 모든 해석 비어있지 않음 |
| strokeTable.ts | 한글 → 획수 + 81수리 | 상용 성씨 50개 검증 |
| sajuTable.ts | 만세력 (1950~2050) | 만세력 앱 대조 20일 |
| pastLifePool.ts | 직업 100+, 시대 20+, 나라 30+ | 빈 스토리 없음 |
| animalZodiac.ts | 12×12 궁합 | 전통 규칙 대조 |
| horoscopeMessages.ts | 12궁 × 카테고리 × 200+ | 빈 메시지 없음 |
| mbtiCareerData.ts | 16유형 × (추천5+비추천3+유명인3) | 16유형 완전 |
| fortuneMessages.ts | 응원 메시지 300개 | 중복 없음, 모두 긍정적 톤 |

### 테스트 실행

```bash
pnpm test            # 전체
pnpm test:calc       # 계산 함수만
pnpm test:data       # 데이터 무결성만
```

---

## 9. Phase별 구현 순서

### Phase 1 (W1~W6): MVP + 기반

| 주차 | 작업 |
|---|---|
| W1 | Next.js 스캐폴딩 + 디자인 시스템 + GNB + 홈 (빈 카드) |
| W2 | CALC-01 연봉 실수령액 (전체 플로우 완성: 폼→계산→결과→FAQ→크로스링크) |
| W3 | CALC-02 퇴직금 + CALC-03 주휴수당 |
| W4 | CALC-04 취득세 + CALC-05 주담대 |
| W5 | CALC-06 전세대출 + CALC-07 종소세 + about/privacy/terms |
| W6 | 홈 완성 + 전체 QA + Lighthouse 95+ + GA4/SC + AdSense 신청 |

### Phase 2 (W7~W10): 확장 + 재미 시작

| 주차 | 작업 |
|---|---|
| W7 | CALC-08 실업급여 + CALC-09 청약 가점 |
| W8 | CALC-14 오늘의 한마디 + CALC-15/16 로또 + CALC-35 별자리 궁합 + CALC-39 전생 직업 |
| W9 | CALC-10 증여세 + CALC-11 중개수수료 + CALC-41 띠별 궁합 + CALC-42 인생 남은 시간 |
| W10 | CALC-12 나이 + CALC-13 시급 + UI 개선 Phase A + Phase 2 전체 QA |

### Phase 3 (W11~W16): 본격 확장

| 주차 | 작업 |
|---|---|
| W11 | CALC-17 양도소득세 + CALC-31 이름궁합 + CALC-36 토정비결 + CALC-37 타로 |
| W12 | CALC-18 연말정산 + CALC-19 상속세 + CALC-38 이름 획수 + CALC-48 작명 점수 |
| W13 | CALC-20 자동차세 + CALC-21 전기요금 + CALC-43 별자리 운세 + CALC-44 별자리 성격 |
| W14 | CALC-22 BMI + CALC-23 D-day + CALC-45 MBTI 직업궁합 + CALC-32 랜덤 메뉴 |
| W15 | UI 개선 Phase B (카테고리 페이지 서브필터·카드 리디자인·다크모드) |
| W16 | Phase 3 전체 QA + 3개월 회고 |

### Phase 4 (W17~): 완성

| 주차 | 작업 |
|---|---|
| W17 | CALC-33 MBTI 궁합 + CALC-46 MBTI 밸런스 게임 |
| W18 | CALC-34 커플 기념일 + CALC-47 MBTI 변화 추적 |
| W19 | CALC-24 등기비용 + CALC-25 자동차 할부 + UI 개선 Phase C (모바일 탭바) |
| W20 | CALC-26 출산예정일 + CALC-27 전역일 + CALC-28 평수변환 + CALC-49 관상/얼굴나이 |
| W21 | CALC-29 연비 + CALC-30 음주 측정 + Phase 4 전체 QA |

---

## 10. 구현 규칙

### 코딩 컨벤션

- 모든 계산 로직은 `lib/calculators/`에 순수 함수로 분리. UI 의존 금지.
- 컴포넌트는 서버 컴포넌트 기본. `'use client'`는 인터랙션 필요 시에만.
- 숫자 표시는 `format.ts`의 `formatNumber()`로 통일 (천단위 콤마).
- 날짜는 `date-fns` 사용. `moment` 금지.
- 모든 입력은 클라이언트 사이드 유효성 검증 (`zod` + `react-hook-form`).
- `any` 타입 사용 금지. `unknown` 사용 후 타입 가드.
- `console.log` 커밋 금지.

### 성능 규칙

- 모든 페이지 Lighthouse Performance ≥ 90.
- 이미지: `next/image` + WebP + lazy loading.
- 번들: 계산기별 `dynamic import` (필요 시).
- 폰트: Pretendard (`next/font/local`) subset.

### Git 규칙

- 브랜치: `feat/CALC-XX-계산기명` 또는 `feat/ui-개선항목`
- 커밋: `feat(CALC-01): 연봉 실수령액 계산 로직 구현`
- PR 단위: 계산기 1~2개 또는 UI 개선 1항목

### 금지 사항

- 승인 없이 기존 코드를 수정·리팩토링하지 않는다
- 요청하지 않은 파일을 생성하지 않는다
- 근거 없이 세율·공식·숫자를 기재하지 않는다
- `node_modules`, `.next`, `.env` 파일을 커밋하지 않는다

---

## 11. 새 계산기 추가 체크리스트

```
□ SPEC.md 해당 섹션 정독
□ lib/calculators/{name}.ts 순수 함수 작성
□ tests/calculators/{name}.test.ts TC 전부 통과
□ app/(calculators)/{slug}/page.tsx 페이지 생성
□ CalculatorLayout 래핑 (H1, 기준일, FAQ, 크로스링크, 면책)
□ generateMetadata 작성 (title, description, canonical, OG)
□ JSON-LD 삽입 (WebApplication + FAQPage)
□ lib/data/categories.ts CALCULATORS 배열에 등록
□ 크로스링크 대상 계산기 3~4개 지정
□ FAQ 5~7개 작성
□ 계산 방법 설명 500자+ 작성
□ 예시 케이스 3~5개 작성
□ isFun === true면 면책 문구 추가
□ 모바일/데스크톱 반응형 확인
□ Lighthouse 90+ 확인
```

---

## 12. 참고 문서

| 파일 | 용도 |
|---|---|
| SPEC.md | 계산기별 스펙 + 테스트 케이스 (Single Source of Truth) |
| QA_CHECKLIST_TEMPLATE.md | 검수 체크리스트 템플릿 |
| QA_LOG.md | 검수 결과 누적 기록 |

## 13. 검증 방법

변경사항 커밋 전 아래 모두 통과:

```bash
pnpm lint && pnpm test && pnpm build
```
