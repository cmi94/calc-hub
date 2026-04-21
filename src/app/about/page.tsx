import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 — 계산허브",
  description: "계산허브는 한국인의 생활에 필요한 각종 계산기를 무료로 제공하는 서비스입니다.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">계산허브 소개</h1>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">서비스 소개</h2>
          <p className="text-gray-700 leading-relaxed">
            계산허브는 연봉 실수령액, 퇴직금, 주휴수당, 세금, 대출 이자 등 한국인의 실생활에 필요한 계산기를 빠르고 정확하게 제공합니다.
            모든 계산기는 정부 공식 자료를 기반으로 구현되며, 모바일에서도 편리하게 사용할 수 있도록 설계되었습니다.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">주의사항</h2>
          <p className="text-gray-700 leading-relaxed">
            이 사이트의 계산 결과는 참고용입니다. 실제 세금·보험료·대출 조건은 개인 상황, 법령 개정, 금융기관 정책에 따라 다를 수 있습니다.
            중요한 금융·세무 결정은 반드시 전문가(세무사, 공인중개사, 금융기관)와 상담하시기 바랍니다.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">문의</h2>
          <p className="text-gray-700">오류 제보나 개선 제안은 <a href="/contact" className="text-blue-600 hover:underline">연락처 페이지</a>를 이용해주세요.</p>
        </section>
      </div>
    </main>
  );
}
