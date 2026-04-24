"use client";

import { useState } from "react";

export default function ContactPage() {
  const [type, setType] = useState("오류신고");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ background: "var(--ds-bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "56px 24px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🥊</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "var(--ds-ink)", letterSpacing: "-0.03em", marginBottom: 8 }}>메시지 전송 완료!</div>
          <div style={{ fontSize: 15, color: "var(--ds-muted-2)" }}>확인 후 순차적으로 답변드립니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--ds-bg)", minHeight: "100vh", padding: "56px 24px 80px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{
          fontSize: 11, fontWeight: 800, color: "var(--ds-muted)",
          letterSpacing: "0.12em", fontFamily: "var(--ff-en)", marginBottom: 10,
        }}>CONTACT</div>

        <h1 style={{
          fontSize: "clamp(28px,4vw,42px)", fontWeight: 900,
          letterSpacing: "-0.04em", margin: "0 0 8px", color: "var(--ds-ink)", lineHeight: 1.1,
        }}>
          새 선수 추천하기
        </h1>
        <p style={{ fontSize: 15, color: "var(--ds-muted-2)", marginBottom: 36, lineHeight: 1.6 }}>
          오류 제보, 새 계산기 추천, 기타 문의를 보내주세요.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ds-muted)", letterSpacing: ".04em", display: "block", marginBottom: 6 }}>이름</label>
              <input
                type="text"
                placeholder="홍길동"
                required
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 10,
                  border: "1.5px solid var(--ds-line)", background: "var(--ds-bg-card)",
                  color: "var(--ds-ink)", fontSize: 14, outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ds-muted)", letterSpacing: ".04em", display: "block", marginBottom: 6 }}>이메일</label>
              <input
                type="email"
                placeholder="hello@example.com"
                required
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 10,
                  border: "1.5px solid var(--ds-line)", background: "var(--ds-bg-card)",
                  color: "var(--ds-ink)", fontSize: 14, outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ds-muted)", letterSpacing: ".04em", display: "block", marginBottom: 6 }}>문의 유형</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["오류신고", "새선수", "기타"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  style={{
                    padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                    border: `1.5px solid ${type === t ? "var(--ds-orange)" : "var(--ds-line)"}`,
                    background: type === t ? "var(--ds-orange)" : "var(--ds-bg-card)",
                    color: type === t ? "#fff" : "var(--ds-muted)",
                    cursor: "pointer", transition: "all .12s",
                  }}
                >{t}</button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ds-muted)", letterSpacing: ".04em", display: "block", marginBottom: 6 }}>내용</label>
            <textarea
              required
              rows={5}
              placeholder="자세히 설명해주세요."
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 10,
                border: "1.5px solid var(--ds-line)", background: "var(--ds-bg-card)",
                color: "var(--ds-ink)", fontSize: 14, outline: "none",
                resize: "vertical", boxSizing: "border-box", fontFamily: "inherit",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 800,
              background: "var(--ds-orange)", color: "#fff", border: "none",
              cursor: "pointer", letterSpacing: "-0.01em", transition: "opacity .12s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            전송하기
          </button>
        </form>
      </div>
    </div>
  );
}
