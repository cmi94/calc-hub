# 다계스탄 (dagyesan.com) — Claude Code 지침

> 계산기 씬의 절대 체급

## 프로젝트 개요

다계스탄은 한국형 생활 계산기 허브. 실용 계산기(급여·세무·부동산·금융) + 재미 계산기(오늘의 운·로또·궁합)를 한 곳에 모은 Next.js 16 SSG 사이트. AdSense 광고 수익을 목표로 한다.

## 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Cloudflare Pages (배포) + GitHub Private Repo
- Vitest (계산 함수 단위 테스트)
- pnpm (패키지 매니저)

## 디렉토리 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈
│   ├── [calculator]/       # 동적 계산기 페이지
│   │   ├── page.tsx
│   │   └── guide/page.tsx
│   ├── category/[slug]/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── about/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트
│   ├── calculators/        # 계산기 UI 컴포넌트
│   ├── layout/             # Header, Footer, Navigation
│   └── common/             # 공용 컴포넌트 (SEO, AdSlot 등)
├── lib/
│   ├── calculators/        # 계산 로직 순수 함수 (UI 무관)
│   ├── constants/          # 세율표, 보험요율 등 상수
│   └── utils.ts
├── content/
│   ├── calculators.ts      # 계산기 메타데이터
│   └── categories.ts       # 카테고리 정의
├── styles/
│   └── globals.css
└── __tests__/
    └── calculators/        # Vitest 테스트 — lib/calculators/ 와 1:1 대응
```

## 핵심 명령어

```bash
pnpm dev              # 개발 서버
pnpm build            # 프로덕션 빌드
pnpm test             # Vitest 전체 실행
pnpm test:watch       # Vitest 워치 모드
pnpm lint             # ESLint
pnpm format           # Prettier
```

## 작업 원칙

### 반드시 지킬 것

- 코드 변경 전 작업 내용을 요약하고 승인 확인을 받는다
- 계산 로직(lib/calculators/)에는 반드시 Vitest 테스트를 함께 작성한다
- 세율·공식은 정부 공식 자료 URL을 주석으로 명시한다
- 새 계산기 추가 시 체크리스트:
  1. lib/calculators/{name}.ts — 계산 함수
  2. __tests__/calculators/{name}.test.ts — 단위 테스트
  3. components/calculators/{Name}Calculator.tsx — UI
  4. app/{name}/page.tsx — 페이지
  5. app/{name}/guide/page.tsx — 가이드 글
  6. content/calculators.ts에 메타데이터 추가
  7. sitemap 자동 반영 확인

### 금지 사항

- 승인 없이 기존 코드를 수정·리팩토링하지 않는다
- 요청하지 않은 파일을 생성하지 않는다
- 근거 없이 세율·공식·숫자를 기재하지 않는다
- node_modules, .next, .env 파일을 커밋하지 않는다

### 코드 스타일

- TypeScript strict 모드
- 컴포넌트는 함수형 + React hooks
- CSS는 Tailwind 유틸리티 클래스 우선
- 파일 네이밍: 컴포넌트 PascalCase, 유틸·함수 camelCase
- 한국어 주석 허용, 변수·함수명은 영문

## 참고 문서

- PLAN.md — 전체 실행 계획
- SPEC.md — 계산기별 스펙 + 테스트 케이스 (Single Source of Truth)
- QA_CHECKLIST_TEMPLATE.md — 검수 체크리스트 템플릿
- QA_LOG.md — 검수 결과 누적 기록

## 검증 방법

변경사항 커밋 전 아래 모두 통과:

```bash
pnpm lint && pnpm test && pnpm build
```
