import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 — 다계스탄",
  description: "다계스탄은 한국인의 생활에 필요한 계산기를 한 곳에 모은 서비스입니다.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "var(--ds-bg)", minHeight: "100vh", padding: "56px 24px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{
          fontSize: 11, fontWeight: 800, color: "var(--ds-muted)",
          letterSpacing: "0.12em", fontFamily: "var(--ff-en)", marginBottom: 10,
        }}>ABOUT</div>

        <h1 style={{
          fontSize: "clamp(32px,5vw,48px)", fontWeight: 900,
          letterSpacing: "-0.045em", margin: "0 0 24px", color: "var(--ds-ink)", lineHeight: 1.05,
        }}>
          계산기가 싸우는 나라,<br />
          <span style={{ color: "var(--ds-orange)" }}>다계스탄</span>입니다.
        </h1>

        <p style={{ fontSize: 17, color: "var(--ds-muted-2)", lineHeight: 1.65, marginBottom: 20 }}>
          매일 포털에 &ldquo;연봉 실수령액&rdquo;, &ldquo;퇴직금 계산&rdquo;, &ldquo;BMI&rdquo; 같은 질문이 수천 번 오갑니다.
          흩어진 계산기들을 한 링 위에 세우고, 실제로 쓰이는 순서대로 랭킹을 매긴 곳이 다계스탄이에요.
        </p>
        <p style={{ fontSize: 17, color: "var(--ds-muted-2)", lineHeight: 1.65, marginBottom: 40 }}>
          24종의 계산기가 6개 체급에서 매주 순위 경쟁을 합니다. 챔피언은 정기적으로 바뀌고,
          새로운 선수는 계속 합류합니다. 당신이 오늘 필요한 계산, 링 위에 있을 확률 매우 높음.
        </p>

        {/* Principles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12, marginBottom: 48 }}>
          {[
            { title: "공정한 심판", desc: "공식·법령 최신 기준 2026 세율 반영. 근거 출처는 계산기별로 명시." },
            { title: "군더더기 0",  desc: "필수 입력만, 결과 즉시. 클릭 3번 안에 답이 나와야 한다는 원칙." },
            { title: "모바일 퍼스트", desc: "버스에서 한 손으로도 돌아가도록. 터치 타겟 44px 이상." },
            { title: "오픈 레저",   desc: "개인정보를 서버로 보내지 않습니다. 모든 계산은 브라우저 안에서." },
          ].map((p, i) => (
            <div key={i} style={{
              padding: 20, background: "var(--ds-bg-card)",
              border: "1px solid var(--ds-line)", borderRadius: 14,
            }}>
              <div style={{
                fontSize: 11, fontWeight: 800, color: "var(--ds-orange)",
                letterSpacing: ".08em", marginBottom: 8, fontFamily: "var(--ff-en)",
              }}>RULE · 0{i + 1}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--ds-ink)", letterSpacing: "-0.02em", marginBottom: 6 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 13, color: "var(--ds-muted-2)", lineHeight: 1.55 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          padding: 28, background: "var(--ds-navy)", borderRadius: 18, color: "#fff",
          display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20,
        }}>
          {[
            { value: "24종", label: "등록된 파이터" },
            { value: "6체급", label: "디비전" },
            { value: "2026", label: "시즌" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.03em", fontFamily: "var(--ff-en)" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: 32, padding: 20, background: "var(--ds-bg-sub)",
          border: "1px solid var(--ds-line)", borderRadius: 14,
          fontSize: 13, color: "var(--ds-muted)", lineHeight: 1.6,
        }}>
          ⚠️ 계산 결과는 참고용입니다. 실제 세금·보험료·대출 조건은 개인 상황과 법령 개정에 따라 다를 수 있습니다.
          중요한 금융·세무 결정은 전문가와 상담하세요.
        </div>
      </div>
    </div>
  );
}
