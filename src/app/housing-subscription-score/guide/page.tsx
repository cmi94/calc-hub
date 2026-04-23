import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "청약 가점 계산 방법 가이드 2026 — 점수표·배점 기준",
  description: "청약 가점 3가지 항목의 배점표, 계산 방법, 가점 높이는 전략을 안내합니다.",
};

export default function HousingSubscriptionScoreGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/housing-subscription-score" className="text-blue-600 text-sm hover:underline">← 계산기로 돌아가기</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">청약 가점 계산 방법 가이드 (2026년)</h1>
          <p className="text-sm text-gray-500">주택공급에 관한 규칙 제28조 기준</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">항목별 배점</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-600 font-medium">항목</th>
                <th className="text-right py-2 text-gray-600 font-medium">최대 점수</th>
                <th className="text-right py-2 text-gray-600 font-medium">기준</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="py-2">무주택기간</td><td className="text-right font-medium">32점</td><td className="text-right text-gray-500">15년 이상</td></tr>
                <tr><td className="py-2">부양가족 수</td><td className="text-right font-medium">35점</td><td className="text-right text-gray-500">6명 이상</td></tr>
                <tr><td className="py-2">청약통장 가입기간</td><td className="text-right font-medium">17점</td><td className="text-right text-gray-500">15년 이상</td></tr>
                <tr className="font-semibold"><td className="py-2">합계</td><td className="text-right text-blue-600">84점</td><td className="text-right"></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">무주택기간 점수표</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[["1년 미만","2점"],["1년","4점"],["2년","6점"],["3년","8점"],["4년","10점"],["5년","12점"],["6년","14점"],["7년","16점"],["8년","18점"],["9년","20점"],["10년","22점"],["11년","24점"],["12년","26점"],["13년","28점"],["14년","30점"],["15년 이상","32점"]].map(([period, score]) => (
              <div key={period} className="flex justify-between bg-gray-50 rounded px-3 py-1.5">
                <span className="text-gray-600">{period}</span>
                <span className="font-medium">{score}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link href="/housing-subscription-score" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            청약 가점 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
