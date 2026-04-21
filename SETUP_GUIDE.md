# Claude Code Desktop 셋업 가이드

이 문서는 Claude Desktop 앱의 Code 탭에서 계산기 허브 프로젝트를 시작하기 위한 단계별 안내다.

---

## 사전 준비 사항

### 1. 필수 소프트웨어 설치 확인

아래 항목이 Windows 환경에 설치되어 있어야 한다.

| 소프트웨어 | 확인 명령 (PowerShell) | 필요 버전 | 설치 방법 |
|---|---|---|---|
| Node.js | `node -v` | 20.x 이상 | https://nodejs.org (LTS) |
| pnpm | `pnpm -v` | 9.x 이상 | `npm install -g pnpm` |
| Git | `git -v` | 2.x 이상 | https://git-scm.com |
| Claude Desktop 앱 | 앱 실행 후 Code 탭 확인 | 최신 | https://claude.ai/download |

### 2. Claude 구독 확인

Claude Code Desktop은 Pro 또는 Max 플랜에서 사용 가능하다. 현재 구독이 활성화되어 있는지 확인한다.

### 3. 계정 준비

| 서비스 | URL | 용도 |
|---|---|---|
| GitHub | https://github.com | 코드 저장소 |
| Cloudflare | https://dash.cloudflare.com | 도메인 + 배포 |
| Google Search Console | https://search.google.com/search-console | SEO |
| Google Analytics | https://analytics.google.com | 트래픽 분석 |
| Google AdSense | https://www.google.com/adsense | 광고 수익 (W6에서 신청) |

---

## 셋업 절차

### Step 1: GitHub 레포지토리 생성

1. GitHub에서 **Private** 레포지토리를 생성한다
   - 이름 예시: `calc-hub` 또는 도메인명과 동일하게
   - README, .gitignore(Node), LICENSE 추가
2. 로컬에 클론한다

```powershell
cd D:\sideproject
git clone https://github.com/{username}/{repo-name}.git
cd {repo-name}
```

### Step 2: 프로젝트 파일 배치

이 셋업에서 제공하는 파일들을 레포지토리 루트에 배치한다.

```
{repo-name}/
├── CLAUDE.md              ← Claude Code Desktop이 자동으로 읽는 지침
├── .gitignore
└── README.md
```

CLAUDE.md는 반드시 **레포지토리 루트**에 있어야 한다. Claude Code Desktop은 세션 시작 시 작업 디렉토리의 CLAUDE.md를 자동으로 로드한다.

### Step 3: Claude Code Desktop에서 세션 시작

1. **Claude Desktop 앱**을 실행한다
2. 상단의 **Code 탭**을 클릭한다
3. **+ New session**을 클릭한다
4. 작업 디렉토리(Working directory)로 Step 1에서 클론한 폴더를 선택한다
   - 예: `D:\sideproject\calc-hub`
5. Claude Code가 CLAUDE.md를 자동으로 인식하고 프로젝트 컨텍스트를 로드한다

### Step 4: Next.js 16 프로젝트 초기화

Claude Code Desktop 세션에서 아래와 같이 요청한다:

```
Next.js 16 App Router + TypeScript + Tailwind CSS + pnpm으로 프로젝트를 초기화해줘.
shadcn/ui도 설치하고, Vitest 설정까지 포함해줘.
CLAUDE.md의 디렉토리 구조를 따라서 만들어줘.
```

Claude Code가 다음을 수행할 것이다:
- `pnpm create next-app` 실행
- Tailwind CSS 설정
- shadcn/ui 초기화
- Vitest 설치 및 설정
- 디렉토리 구조 생성

**주의**: 실행 전 Claude Code가 계획을 보여줄 것이다. 내용을 확인하고 승인한다.

### Step 5: Cloudflare Pages 연결

1. https://dash.cloudflare.com 접속
2. Workers & Pages → Create → Pages → Connect to Git
3. GitHub 레포지토리를 연결한다
4. 빌드 설정:
   - Framework preset: **Next.js (Static Export)**
   - Build command: `pnpm build`
   - Build output directory: `out`
   - Environment variables: `NODE_VERSION` = `20`
5. Save and Deploy

**중요**: Next.js를 Cloudflare Pages에서 정적으로 배포하려면 `next.config.ts`에 아래 설정이 필요하다:

```typescript
// next.config.ts
const nextConfig = {
  output: 'export',  // 정적 HTML 내보내기
  images: {
    unoptimized: true,  // Cloudflare Pages는 Next.js Image Optimization 미지원
  },
}
export default nextConfig
```

이 설정은 Step 4에서 Claude Code에게 함께 요청하면 된다.

### Step 6: 도메인 연결 (W1에서 진행)

1. Cloudflare Registrar에서 도메인 구매
2. Cloudflare Pages → Custom domains → 도메인 추가
3. DNS가 자동으로 설정됨 (같은 Cloudflare 내이므로)

---

## Claude Code Desktop 사용 팁

### 세션 관리

- **Cmd+N** (Mac) / **Ctrl+N** (Windows): 새 세션
- 사이드바에서 이전 세션 필터링·재개 가능
- Git worktree로 세션별 격리 — 한 세션에서 계산기 A를 만들면서 다른 세션에서 계산기 B 작업 가능

### Side Chat

- **Ctrl+;** 로 사이드 채팅 열기
- 메인 작업 중 질문이 있을 때 사용 (메인 컨텍스트에 영향 안 줌)
- 예: "이 세율이 2026년 기준 맞아?" 같은 확인 용도

### 통합 터미널

- Views 메뉴에서 Terminal 열기
- `pnpm test`, `pnpm dev` 등을 Claude 작업과 병행 실행 가능

### Diff 뷰어

- Claude가 파일을 수정하면 Diff 패널에서 변경사항 확인 가능
- 승인 전 반드시 Diff를 검토한다

### Preview 패널

- `pnpm dev` 실행 후 Preview 패널에서 결과 확인
- HTML, PDF 파일도 미리보기 가능

---

## 매주 작업 루틴 (주말 4~5시간)

```
1시간차: Claude.ai 웹 프로젝트 대화에서 이번 주 계산기 기획·세율 조사
   ↓
2~3시간차: Claude Code Desktop에서 계산기 구현 + 테스트
   ↓
4시간차: 가이드 글 작성 (Claude.ai 초안 → 본인 검수·편집)
   ↓
5시간차: Git 커밋·푸시 → Cloudflare 자동 배포 → 브라우저에서 확인
```

---

## 검증 체크리스트

프로젝트 초기 설정 후 아래를 모두 확인한다:

- [ ] `node -v` → 20.x 이상
- [ ] `pnpm -v` → 9.x 이상
- [ ] `git -v` → 2.x 이상
- [ ] Claude Desktop 앱 Code 탭 접근 가능
- [ ] GitHub Private 레포 생성 완료
- [ ] 레포 루트에 CLAUDE.md 존재
- [ ] Claude Code Desktop에서 세션 시작 시 CLAUDE.md 인식 확인
- [ ] `pnpm dev` 로 localhost 개발 서버 정상 구동
- [ ] `pnpm build` 로 정적 빌드 성공 (`out/` 디렉토리 생성)
- [ ] `pnpm test` 로 Vitest 정상 실행
- [ ] Cloudflare Pages 연결 완료, 자동 배포 성공
- [ ] 커스텀 도메인 연결 (W1에서 진행, 초기에는 *.pages.dev 사용)
