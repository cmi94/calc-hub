import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 — 계산허브",
  description: "계산허브 이용약관",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">이용약관</h1>
        <p className="text-sm text-gray-500">최종 업데이트: 2026년 4월</p>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6 text-gray-700 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">1. 서비스 목적</h2>
            <p>계산허브는 한국인의 생활 계산을 돕기 위한 참고용 계산기 서비스를 무료로 제공합니다.</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">2. 면책 조항</h2>
            <p>
              이 사이트의 계산 결과는 참고용입니다. 법령 개정, 세율 변경, 개인 상황에 따라 실제 금액이 다를 수 있습니다.
              계산 결과를 근거로 한 금융·세무 의사결정에 대한 책임은 이용자에게 있으며, 서비스 제공자는 이에 대한 법적 책임을 지지 않습니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">3. 금지 행위</h2>
            <p>서비스를 상업적 목적으로 무단 복제하거나, 자동화 도구를 이용한 과도한 요청을 금지합니다.</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">4. 약관 변경</h2>
            <p>약관은 사전 고지 없이 변경될 수 있습니다. 변경 후 서비스 이용 시 변경된 약관에 동의한 것으로 간주합니다.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
