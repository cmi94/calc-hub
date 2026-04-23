import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "부동산 중개수수료 계산 방법 가이드 2026 — 요율표·한도액",
  description: "매매·전세·월세 중개수수료 요율표, 한도액, 계산 예시를 안내합니다.",
};

export default function BrokerageFeeGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/brokerage-fee" className="text-blue-600 text-sm hover:underline">← 계산기로 돌아가기</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">부동산 중개수수료 가이드 (2026년)</h1>
          <p className="text-sm text-gray-500">공인중개사법 시행규칙 별표 1 기준 · 2021년 10월 개정</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">매매 요율표</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-600 font-medium">거래금액</th>
                <th className="text-right py-2 text-gray-600 font-medium">상한 요율</th>
                <th className="text-right py-2 text-gray-600 font-medium">한도액</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["5천만원 미만", "0.6%", "25만원"],
                  ["5천만 ~ 2억 미만", "0.5%", "80만원"],
                  ["2억 ~ 6억 미만", "0.4%", "없음"],
                  ["6억 ~ 9억 미만", "0.5%", "없음"],
                  ["9억 이상", "0.9%", "없음 (협의)"],
                ].map(([range, rate, limit]) => (
                  <tr key={range}>
                    <td className="py-2 text-gray-800">{range}</td>
                    <td className="text-right font-medium">{rate}</td>
                    <td className="text-right text-gray-500">{limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">임대차(전세·월세) 요율표</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200">
                <th className="text-left py-2 text-gray-600 font-medium">거래금액</th>
                <th className="text-right py-2 text-gray-600 font-medium">상한 요율</th>
                <th className="text-right py-2 text-gray-600 font-medium">한도액</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["5천만원 미만", "0.5%", "20만원"],
                  ["5천만 ~ 1억 미만", "0.4%", "30만원"],
                  ["1억 ~ 3억 미만", "0.3%", "없음"],
                  ["3억 ~ 6억 미만", "0.4%", "없음"],
                  ["6억 이상", "0.8%", "없음 (협의)"],
                ].map(([range, rate, limit]) => (
                  <tr key={range}>
                    <td className="py-2 text-gray-800">{range}</td>
                    <td className="text-right font-medium">{rate}</td>
                    <td className="text-right text-gray-500">{limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">월세 환산가 = 보증금 + 월세 × 100</p>
        </section>

        <div className="text-center">
          <Link href="/brokerage-fee" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            중개수수료 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
