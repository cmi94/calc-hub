# 한국형 생활 계산기 허브 — 실행 계획

## 1. 프로젝트 개요

- 목표: 6개월 내 월 10만 PV, AdSense 월 수익 15~30만원
- 핵심 차별화: 기존 상위 사이트의 낡은 UX를 빠른 SSG + 깔끔한 UI로 대체
- 투자 가능 시간: 주말 4~5시간
- 총 초기 비용: 연 약 2만원(도메인)

## 2. 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Cloudflare Pages 무료 플랜 (상업적 이용 허용, 무제한 대역폭)
- Cloudflare Registrar (도메인)
- GitHub Private Repo
- GA4 + Search Console + AdSense
- Vitest (계산 함수 단위 테스트)
- pnpm (패키지 매니저)

### 왜 Vercel이 아닌 Cloudflare Pages인가

Vercel Hobby 플랜은 비상업적·개인 용도로만 사용 가능하며, AdSense 수익을 목표로 하는 사이트는 상업적 프로젝트에 해당해 사용 불가. Cloudflare Pages 무료 플랜은 상업적 이용을 허용하고, 대역폭 무제한이며, 도메인(Cloudflare Registrar)과 한 곳에서 관리 가능.

### 왜 Next.js 15가 아닌 16인가

2026년 4월 기준 Next.js 최신 안정 버전은 16.2.x. Next.js 15는 레거시이며 보안 패치만 백포트되는 상태. 신규 프로젝트는 16으로 시작하는 것이 표준.

## 3. 도메인 후보

- gyesanki.com
- modu-calc.com
- calckr.com
- gyesan.kr
- nalcalc.com
- (W1에서 가용성 확인 후 최종 확정)
- 구매처: Cloudflare Registrar

## 4. MVP 계산기 7종 (W1~W6)

1. 연봉 실수령액 계산기
2. 퇴직금 계산기
3. 주휴수당 계산기
4. 중고차 취득세 계산기
5. 주택담보대출 이자 계산기
6. 전세대출 이자 계산기
7. 종합소득세 간편 계산기

## 5. 6개월 확장 카테고리

- 세무: 양도/증여/상속/부가세/원천세
- 금융: 적금·예금 복리, 신용대출, 자동차할부, 환율
- 부동산: 취득세, 재산세, 종부세, 청약 가점, 중개수수료
- 근로: 실업급여, 연차수당, 연장근로수당, 시급
- 건강/생활: BMI, 기초대사량, 칼로리
- 교육: 학자금대출, 내신, 수능 등급
- 기타: 나이, D-day, 단위변환
- 목표: 6개월 내 25~30종

## 6. 페이지 구조

- `/` 홈
- `/{calculator}` 계산기
- `/{calculator}/guide` 가이드 글
- `/category/{category}` 카테고리 랜딩
- `/blog/{slug}` 심화 글
- `/about` `/privacy` `/terms` `/contact`

각 계산기 페이지 구성: H1 → 계산기 UI → 결과 요약 → 계산 방법 → 예시 케이스 3~5 → FAQ 5~7 → 관련 계산기 추천

## 7. AI 콘텐츠 파이프라인

| 산출물 | AI | 사람 검수 |
|---|---|---|
| 계산 함수 TS | Claude Code Desktop | 세율·공식 정확성 |
| UI 컴포넌트 | Claude Code Desktop | 모바일 레이아웃 |
| 설명·FAQ·예시 | Claude.ai 웹 프로젝트 | 팩트체크, 문체 |
| 메타·OG | Claude + SVG | 브랜드 일관성 |
| 블로그 | Claude 초안 → 사람 편집 | E-E-A-T, 법령 최신성 |

## 8. 도구 역할 분담

| 도구 | 역할 |
|---|---|
| Claude Code Desktop (Code 탭) | 코드 작성, 파일 생성, 테스트 실행, Git 커밋, 빌드 확인 |
| Claude.ai 웹 (프로젝트 대화) | 기획, 설명글·FAQ 초안, 숏폼 스크립트, 전략 논의 |
| VS Code | Claude Code Desktop 작업물 검토, 수동 편집 |
| 브라우저 | Search Console, GA4, AdSense 관리, Cloudflare 대시보드 |

## 9. 12주 로드맵

| 주차 | 작업 |
|---|---|
| W1 | 도메인 구매, GitHub 레포 생성, Next.js 16 스캐폴딩, Cloudflare Pages 연결, 디자인 시스템 |
| W2 | 계산기 #1 연봉 실수령액 + 가이드 |
| W3 | 계산기 #2 퇴직금 + #3 주휴수당 |
| W4 | 계산기 #4 중고차 취득세 + #5 주택담보대출 |
| W5 | 계산기 #6 전세대출 + #7 종합소득세 + 필수 페이지 + GA4/Search Console |
| W6 | AdSense 승인 신청, Lighthouse 95+, sitemap |
| W7 | 계산기 #8~9 + 숏폼 계정 3개 개설(YouTube/Instagram/TikTok) |
| W8 | 계산기 #10~11 + 파일럿 숏폼 4편(연봉·주휴수당 우선) |
| W9 | 계산기 #12~13 + 숏폼 주 3편 페이스 |
| W10 | 계산기 #14~15 + 블로그 심화 3편 + 히트 영상 템플릿화 |
| W11 | 계산기 #16~18 |
| W12 | 계산기 #19~20 + 3개월 회고 + 숏폼 ROI 리뷰 |

## 10. KPI

| 지표 | 3개월 | 6개월 |
|---|---|---|
| 인덱싱 페이지 | 30+ | 60+ |
| 월 PV | 5,000 | 100,000 |
| 상위 10위 키워드 | — | 10개+ |
| AdSense 월 수익 | 1~3만원 | 15~30만원 |
| Core Web Vitals | Good | Good |

## 11. 수익화 전략

- 초기: AdSense 단독
- 6개월 후: AdSense + Kakao AdFit 병행 검토
- 1년 이후: 트래픽에 따라 Ezoic/Mediavine 전환 고려
- Mediavine은 월 세션 50,000, AdThrive는 월 PV 100,000 이상 필요

## 12. 마케팅 전략

- 유료 광고 집행 안 함(구조적 적자)
- 백링크 구매 안 함
- SEO: 무료 도구(Search Console·GA4·Keyword Planner·Bing) 중심
- 필요 시 Keywords Everywhere 1회성 구매(약 2만원)
- 숏폼: W8부터 시작, 주 3편(월 12편) 표준형, YouTube/Instagram/TikTok 크로스포스팅
- 숏폼 우선 주제: 연봉 실수령액, 주휴수당, 청약 가점

## 13. 숏폼 제작 파이프라인

1. Claude로 15·30·60초 스크립트 3안 생성
2. Claude로 샷리스트
3. 음성: ElevenLabs/Typecast 또는 본인 목소리
4. 편집: CapCut 템플릿 3~4개 돌려쓰기
5. 자막·키워드 추출: Claude
6. 썸네일·제목·해시태그: Claude가 5안씩 A/B

## 14. 리스크 및 대응

| 리스크 | 대응 |
|---|---|
| 계산 오류 | Vitest 단위 테스트 + 정부 자료 기반 케이스 |
| AdSense 승인 거절 | 20페이지 확보 후 신청, 거절 시 피드백 반영 재신청 |
| 법령·세율 변경 | 연초·연중 체크리스트, 업데이트 일자 표시 |
| 경쟁 사이트 | UX·속도·모바일·설명 품질로 승부, 페이지 고유 콘텐츠 500자+ |
| AI 콘텐츠 품질 | 본인 경험·검수 포함, Claude 초안 그대로 게시 금지 |
| 숏폼 시간 잠식 | W1~W7은 제외, 표준형 주 3편 고정 |
| Cloudflare Pages 빌드 제한 | 무료 월 500회 빌드, 일 배포 2~3회 기준으로 충분 |

## 15. 세금·정산

- 지급: USD SWIFT, 최소 $100, 월 1회
- 전신환 수수료: 건당 1~2만원
- 연 수익 300만원 초과 시 종합소득세 신고
- 연 수익 수천만원 단계에서 사업자 등록·간이과세 검토
- 초기 6~12개월은 세무 이슈 거의 없음

## 16. 다음 단계 선택지

- (a) W1 상세 설계: 도메인 가용성 확인 + Next.js 스캐폴딩
- (b) 키워드 검증: MVP 7종 실제 검색량·경쟁도 조사
- (c) Claude Code Desktop 워크플로 표준화: 계산기 1개 만드는 표준 프롬프트·파일 구조
- (d) 광고 배치 설계: 계산기 페이지 내 광고 슬롯 플랜
