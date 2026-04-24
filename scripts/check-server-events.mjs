/**
 * Server Component 이벤트 핸들러 스캐너
 *
 * Next.js App Router의 Server Component(="use client" 없는 .tsx)에
 * onMouseEnter 같은 이벤트 핸들러를 넣으면 next build 시 직렬화 에러가 발생합니다.
 * TypeScript는 이를 타입 레벨에서 잡지 못하므로, 빌드 전에 별도로 검사합니다.
 *
 * 사용:  node scripts/check-server-events.mjs
 * CI:    pnpm lint 스크립트에 포함
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname, relative } from "path";
import { fileURLToPath } from "url";

const __dir = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dir, "..");

// JSX 이벤트 핸들러 prop 패턴 (on + 대문자로 시작)
const EVENT_HANDLER_RE =
  /\bon(Mouse|Click|Key|Change|Focus|Blur|Submit|Input|Scroll|Touch|Drag|Drop|Pointer|Wheel|Context|Double|Transition|Animation)\w*\s*=\s*\{/;

// 파일 맨 앞 500자 안에 "use client" 선언이 있으면 클라이언트 컴포넌트로 판단
const CLIENT_DIRECTIVE_RE = /^[\s\S]{0,500}"use client"/;

function* walkTsx(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      // node_modules, .next, out 제외
      if (["node_modules", ".next", "out", ".claude"].includes(entry)) continue;
      yield* walkTsx(full);
    } else if (extname(full) === ".tsx") {
      yield full;
    }
  }
}

const violations = [];

for (const file of walkTsx(join(ROOT, "src", "app"))) {
  const content = readFileSync(file, "utf-8");

  // "use client" 선언 있으면 스킵
  if (CLIENT_DIRECTIVE_RE.test(content)) continue;

  const lines = content.split("\n");
  lines.forEach((line, i) => {
    // 주석 라인 스킵
    if (line.trimStart().startsWith("//") || line.trimStart().startsWith("*")) return;
    if (EVENT_HANDLER_RE.test(line)) {
      violations.push({
        file: relative(ROOT, file),
        line: i + 1,
        code: line.trim(),
      });
    }
  });
}

if (violations.length > 0) {
  console.error("\n❌ Server Component 이벤트 핸들러 감지\n");
  console.error(
    "   Server Component는 함수(이벤트 핸들러)를 직렬화할 수 없어 next build에서 에러가 발생합니다.\n"
  );
  violations.forEach(({ file, line, code }) => {
    console.error(`   ${file}:${line}`);
    console.error(`   ${code}\n`);
  });
  console.error("해결 방법:");
  console.error('  1. 파일 상단에 "use client" 추가');
  console.error(
    "  2. 이벤트 핸들러를 CSS hover(.calc-card-hover 등)로 교체하고 Server Component 유지\n"
  );
  process.exit(1);
}

console.log("✓ Server Component 이벤트 핸들러 검사 통과");
