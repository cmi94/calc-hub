import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 — 계산허브",
  description: "계산허브 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">개인정보처리방침</h1>
        <p className="text-sm text-gray-500">최종 업데이트: 2026년 4월</p>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6 text-gray-700 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">1. 수집하는 개인정보</h2>
            <p>
              계산허브는 서비스 이용 과정에서 별도의 회원가입이나 개인정보를 수집하지 않습니다.
              다만 Google Analytics 4를 통해 방문자 통계(IP 익명화 처리)를 수집합니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">2. 쿠키 및 광고</h2>
            <p>
              Google AdSense를 통해 맞춤형 광고가 제공될 수 있습니다. Google은 쿠키를 사용하여 사용자의 이전 방문을 기반으로 광고를 게재합니다.
              쿠키 사용을 거부하려면 브라우저 설정에서 쿠키를 비활성화하거나 Google 광고 설정 페이지를 이용하세요.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">3. 제3자 제공</h2>
            <p>수집된 정보는 법령에 따른 경우를 제외하고 제3자에게 제공하지 않습니다.</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">4. 문의</h2>
            <p>개인정보 관련 문의는 <a href="/contact" className="text-blue-600 hover:underline">연락처 페이지</a>를 이용해주세요.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
