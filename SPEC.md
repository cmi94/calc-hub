# 다계산 계산기 스펙 정의서

> 이 문서는 각 계산기의 입력·출력·계산 로직·데이터 출처·테스트 케이스를 정의한다.
> Claude Code Desktop은 구현 시, QA는 검수 시 이 문서를 기준으로 삼는다.

> **범례**: 🔗 = 법령·요율 출처, TC = 테스트 케이스

---

## 공통 사항

### 연도 기준

2026년. 매년 1월 업데이트 체크. 변경 시 페이지 상단 "2026년 X월 기준" 표시.

### 2026년 4대보험 요율 (근로자 부담분)

| 항목 | 요율 | 비고 |
|---|---|---|
| 국민연금 | 4.5% | 월 소득 상한 617만원 |
| 건강보험 | 3.545% | |
| 장기요양보험 | 건강보험료의 12.95% | |
| 고용보험 | 0.9% | |

🔗 국민연금: https://www.nps.or.kr
🔗 건강보험: https://www.nhis.or.kr
🔗 고용보험: https://www.ei.go.kr

### 페이지 공통 구조

1. H1 제목 (연도 포함)
2. 계산기 UI (입력 폼 + 결과)
3. 결과 상세
4. "계산 방법" 설명 (500자+)
5. 예시 케이스 3~5개
6. FAQ 5~7개
7. 관련 계산기 추천 3~4개
8. 업데이트 일자
9. 면책 문구 (재미형은 "재미 목적이며 과학적 근거 없음" 추가)

### SEO 공통

- title: "{계산기명} - 다계산"
- description: 150자 내외, 연도 포함
- canonical, OG, JSON-LD (WebApplication 또는 FAQPage)

---

## Phase 1: MVP (CALC-01 ~ CALC-07)

### CALC-01: 연봉 실수령액 계산기

**경로**: `/salary` | **카테고리**: 급여

#### 입력

| 필드 | 타입 | 필수 | 기본값 | 범위 |
|---|---|---|---|---|
| annualSalary | number | Y | - | 1,000,000 ~ 1,000,000,000 |
| nonTaxableAmount | number | N | 200,000 | 0 ~ 연봉 |
| dependents | number | N | 1 | 1 ~ 20 |
| childrenUnder20 | number | N | 0 | 0 ~ dependents-1 |

#### 출력

monthlyGross, nationalPension, healthInsurance, longTermCare, employmentInsurance, incomeTax, localIncomeTax, totalDeductions, monthlyNet, annualNet

#### 로직

```
monthlyGross = annualSalary / 12
taxableMonthly = monthlyGross - nonTaxableAmount
nationalPension = min(taxableMonthly * 0.045, 6170000 * 0.045)
healthInsurance = taxableMonthly * 0.03545
longTermCare = healthInsurance * 0.1295
employmentInsurance = taxableMonthly * 0.009
incomeTax = 간이세액표 조회(taxableMonthly, dependents, childrenUnder20)
localIncomeTax = incomeTax * 0.1
totalDeductions = 위 합계
monthlyNet = monthlyGross - totalDeductions
```

🔗 국세청 간이세액표: https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2227&cntntsId=7667

#### TC

| TC | 연봉 | 비과세 | 부양 | 자녀 | 기대 월 실수령(±1만) |
|---|---|---|---|---|---|
| TC-01-1 | 30,000,000 | 200,000 | 1 | 0 | 약 2,240,000 |
| TC-01-2 | 50,000,000 | 200,000 | 1 | 0 | 약 3,560,000 |
| TC-01-3 | 50,000,000 | 200,000 | 3 | 1 | TC-01-2보다 높음 |
| TC-01-4 | 100,000,000 | 200,000 | 1 | 0 | 약 6,600,000 |
| TC-01-5 | 24,000,000 | 0 | 1 | 0 | 최저임금 수준 검증 |

---

### CALC-02: 퇴직금 계산기

**경로**: `/retirement` | **카테고리**: 급여

#### 입력

startDate(date), endDate(date), recentSalary3m(number), annualBonus(number, 0), unusedAnnualLeave(number, 0), dailyWageForLeave(number, 0)

#### 로직

```
totalDays = endDate - startDate
calendarDays3m = 최근3월 역일수
avgDailyWage = (recentSalary3m + annualBonus*3/12 + unusedAnnualLeave*dailyWageForLeave*3/12) / calendarDays3m
severancePay = avgDailyWage * 30 * (totalDays / 365)
```

🔗 고용노동부: https://www.moel.go.kr/retirementpayCal.do

#### TC

| TC | 입사일 | 퇴사일 | 3월급여 | 기대(±1만) |
|---|---|---|---|---|
| TC-02-1 | 2024-01-01 | 2026-01-01 | 9,000,000 | 약 6,000,000 |
| TC-02-2 | 2023-01-01 | 2026-01-01 | 12,000,000 | 약 9,300,000 |
| TC-02-3 | 2025-06-01 | 2026-01-01 | 6,000,000 | 1년 미만 경고 |

---

### CALC-03: 주휴수당 계산기

**경로**: `/weekly-holiday-pay` | **카테고리**: 급여

#### 입력

hourlyWage(number, 기본 10320), weeklyHours(number, 1~40)

#### 로직

```
if weeklyHours < 15: 미해당
weeklyHolidayHours = (weeklyHours / 40) * 8
weeklyHolidayPay = weeklyHolidayHours * hourlyWage
```

🔗 근로기준법 제55조, 2026년 최저시급 10,320원

#### TC

| TC | 시급 | 주시간 | 기대 |
|---|---|---|---|
| TC-03-1 | 10,320 | 40 | 82,560 |
| TC-03-2 | 10,320 | 20 | 41,280 |
| TC-03-3 | 10,320 | 14 | 0 (미해당) |

---

### CALC-04: 부동산 취득세 계산기

**경로**: `/property-acquisition-tax` | **카테고리**: 부동산

#### 입력

propertyPrice, propertyType(주택/토지/건물/상가), area(㎡), houseCount(1/2/3+/법인), isAdjustedArea(boolean)

#### 로직 (주택)

```
1주택 비조정: 6억↓ 1%, 6~9억 1~3%, 9억↑ 3%
2주택 조정: 8%, 3주택+ 조정: 12%, 법인: 12%
지방교육세 = 취득세 * 0.1
농특세 = 85㎡ 초과 시 취득세 * 0.2
```

🔗 지방세법 제11조, 위택스: https://www.wetax.go.kr

#### TC

| TC | 가격 | 주택수 | 조정 | 기대 세율 |
|---|---|---|---|---|
| TC-04-1 | 5억 | 1 | N | 1% |
| TC-04-2 | 8억 | 1 | N | 약 2.33% |
| TC-04-3 | 5억 | 2 | Y | 8% |
| TC-04-4 | 5억 | 3+ | Y | 12% |

---

### CALC-05: 주택담보대출 이자 계산기

**경로**: `/mortgage` | **카테고리**: 금융

#### 입력

loanAmount, annualRate(%), loanTermMonths, repaymentType(원리금균등/원금균등/만기일시), gracePeriodMonths

#### TC

| TC | 원금 | 금리 | 기간 | 방식 | 기대(±100) |
|---|---|---|---|---|---|
| TC-05-1 | 3억 | 4.0 | 360 | 원리금균등 | 월 약 1,432,000 |
| TC-05-2 | 3억 | 4.0 | 360 | 원금균등 | 첫달 약 1,833,000 |
| TC-05-3 | 2억 | 3.5 | 240 | 만기일시 | 월 약 583,000 |

---

### CALC-06: 전세대출 이자 계산기

**경로**: `/jeonse-loan` | **카테고리**: 금융

#### 입력

loanAmount, annualRate(%), loanTermMonths(기본 24)

#### TC

| TC | 대출금 | 금리 | 기대 월이자 |
|---|---|---|---|
| TC-06-1 | 2억 | 3.5 | 583,333 |
| TC-06-2 | 3억 | 4.0 | 1,000,000 |

---

### CALC-07: 종합소득세 간편 계산기

**경로**: `/income-tax` | **카테고리**: 세무

#### 입력

totalIncome, deductions

#### 로직 (누진세율)

```
~14,000,000: 6%  |  ~50,000,000: 15%-1,260,000  |  ~88,000,000: 24%-5,760,000
~150,000,000: 35%-15,440,000  |  ~300,000,000: 38%-19,940,000
~500,000,000: 40%-25,940,000  |  ~1,000,000,000: 42%-35,940,000  |  초과: 45%-65,940,000
지방소득세 = 산출세액 * 0.1
```

🔗 소득세법 제55조

#### TC

| TC | 소득 | 공제 | 기대 산출세액(±1,000) |
|---|---|---|---|
| TC-07-1 | 30,000,000 | 5,000,000 | 약 2,490,000 |
| TC-07-2 | 60,000,000 | 10,000,000 | 약 6,240,000 |
| TC-07-3 | 14,000,000 | 0 | 840,000 |

---

## Phase 2 (CALC-08 ~ CALC-16)

### CALC-08: 실업급여 | `/unemployment-benefit` | 급여

구직급여일액 = 평균임금 * 0.6, 상한 66,000원, 소정급여일수 매트릭스 (나이×피보험기간)
🔗 고용보험법 제50조, https://www.ei.go.kr

### CALC-09: 청약 가점 | `/housing-subscription-score` | 부동산

무주택기간(최대32) + 부양가족(최대35) + 청약통장(최대17) = 최대 84점
🔗 주택공급에 관한 규칙 제28조

### CALC-10: 증여세 | `/gift-tax` | 세무

관계별 공제(배우자6억, 직계존비속5천만 등) + 누진세율 5단계
🔗 상속세 및 증여세법 제26조, 제53조

### CALC-11: 부동산 중개수수료 | `/brokerage-fee` | 부동산

매매/임대차별 상한요율표, 월세 환산(보증금+월세*100)
🔗 공인중개사법 시행규칙 별표

### CALC-12: 나이 계산기 | `/age` | 생활

만나이 + 한국나이(연나이) + 다음 생일까지 일수

### CALC-13: 시급 계산기 | `/hourly-wage` | 급여

시급→일급/주급/월급/연봉 환산, 주휴수당 포함/미포함, 최저임금 판정
2026년 최저시급 10,320원, 209시간 기준

### CALC-14: 오늘의 한마디 | `/daily-fortune` | 재미

**프레이밍**: "재미로 보는 오늘의 한마디" + 면책 문구 필수

#### 입력

birthDate(date, 필수). referenceDate는 오늘 자동.

#### 출력

luckyScore(1~100), message(응원 메시지), luckyNumbers(3개), luckyColor

#### 로직

```
seed = hash(birthDate + today)  // 결정적 랜덤
luckyScore = (seed % 100) + 1
messageIndex = seed % MESSAGE_POOL_SIZE  // 200~300개 사전 정의
```

#### 특수 요구사항

- SNS 공유 기능 (결과를 OG 이미지로)
- 홈 화면 미니 카드 위젯
- 자정 기준 결과 변경

#### TC

| TC | 검증 |
|---|---|
| TC-14-1 | luckyScore 1~100, message 비어있지 않음 |
| TC-14-2 | 동일 입력 → 동일 결과 (결정적) |
| TC-14-3 | 다른 날짜 → 다른 결과 |

---

### CALC-15: 로또 번호 생성기 | `/lotto` | 재미

#### 입력

setCount(1~10, 기본5), fixedNumbers(0~5개), excludeNumbers

#### 로직

1~45에서 exclude 제거 → fixed 포함 → 나머지 랜덤 → 오름차순 정렬

#### 특수 요구사항

- 번호 공 컬러 (1~10 노랑, 11~20 파랑, 21~30 빨강, 31~40 회색, 41~45 초록)
- 고정/제외 번호 설정
- "다시 뽑기" 버튼

#### TC

| TC | 검증 |
|---|---|
| TC-15-1 | 6개, 1~45, 중복 없음, 오름차순 |
| TC-15-2 | 고정 [3,17] → 결과에 포함 |
| TC-15-3 | 제외 [1~5] → 결과에 미포함 |

---

### CALC-16: 로또 확률 계산기 | `/lotto/probability` | 재미

C(45,6) = 8,145,060 조합 기반 등수별 확률 + 기댓값 계산
🔗 동행복권: https://www.dhlottery.co.kr

---

## Phase 3 이후 — 개요

Phase 진입 시 상세 스펙 추가.

| ID | 계산기 | 핵심 요약 |
|---|---|---|
| CALC-17 | 양도소득세 | 양도가-취득가-경비-장기보유특별공제 → 누진세율 |
| CALC-18 | 연말정산 환급액 | 총급여→근로소득금액→과세표준→세액공제 |
| CALC-19 | 상속세 | 상속재산-공제 → 누진세율 |
| CALC-20 | 자동차세 | 배기량*cc당세액, 차령 경감 |
| CALC-21 | 전기요금 | 가정용 누진 3단계 |
| CALC-22 | BMI | 체중/신장² |
| CALC-23 | D-day/날짜 | 두 날짜 사이 일수 |
| CALC-31 | 궁합 (이름) | 한글 자모 분해 → 획수 점수 (재미용) |
| CALC-32 | 랜덤 메뉴 추천 | 카테고리별 랜덤 + 재추천 |
| CALC-33 | MBTI 궁합 | 16유형 조합 매트릭스 (재미용) |
| CALC-34 | 커플 기념일 | 100일/200일/365일/1000일 자동 계산 |
