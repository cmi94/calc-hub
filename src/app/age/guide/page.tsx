import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "만나이 계산 방법 가이드 2026 — 만나이·한국나이·연나이 차이",
  description:
    "만나이, 한국 나이(세는나이), 연나이의 차이와 계산 방법을 설명합니다. 2023년 만나이 통일법 이후 달라진 내용 포함.",
};

const FAQS = [
  {
    q: "만나이와 한국 나이는 얼마나 차이가 나나요?",
    a: "생일이 지나지 않은 경우 최대 2살, 생일이 지난 경우 1살 차이가 납니다. 예를 들어 1990년 12월생은 2026년 4월 기준 만나이 35세, 한국 나이 37세입니다.",
  },
  {
    q: "2023년 만나이 통일법이 뭔가요?",
    a: "2023년 6월 28일부터 법적·행정적 나이 기준이 만나이로 통일됐습니다. 이전에는 법령마다 세는나이, 연나이, 만나이가 혼용됐으나 이제는 만나이가 공식 기준입니다.",
  },
  {
    q: "연나이는 어디에 쓰이나요?",
    a: "병역법, 청소년보호법 등 일부 법령은 여전히 연나이(현재 연도 - 출생 연도)를 사용합니다. 예를 들어 청소년보호법상 청소년은 19세 미만으로, 생일과 무관하게 해당 연도에 19세가 되는 해까지 적용됩니다.",
  },
  {
    q: "2월 29일생은 나이를 어떻게 계산하나요?",
    a: "만나이 기준으로는 평년에 2월 28일 또는 3월 1일에 생일로 인정합니다. 이 계산기는 법제처 해석에 따라 평년에는 3월 1일을 기준으로 만나이가 증가하도록 처리합니다.",
  },
];

export default function AgeGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div>
          <Link href="/age" className="text-blue-600 text-sm hover:underline">
            ← 계산기로 돌아가기
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
            만나이 계산 방법 가이드 (2026년)
          </h1>
          <p className="text-sm text-gray-500">최종 업데이트: 2026년 4월 · 만나이 통일법 기준</p>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">나이 종류 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">구분</th>
                  <th className="text-left py-2 text-gray-600 font-medium">계산 방법</th>
                  <th className="text-left py-2 text-gray-600 font-medium">사용처</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 font-medium">만나이</td>
                  <td className="py-2 text-gray-700">현재 연도 - 출생 연도 (생일 전이면 -1)</td>
                  <td className="py-2 text-gray-500">법적·행정적 기준 (2023~)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">한국 나이</td>
                  <td className="py-2 text-gray-700">현재 연도 - 출생 연도 + 1</td>
                  <td className="py-2 text-gray-500">일상 대화</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">연나이</td>
                  <td className="py-2 text-gray-700">현재 연도 - 출생 연도</td>
                  <td className="py-2 text-gray-500">병역법, 청소년보호법</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">만나이 계산 예시</h2>
          <p className="text-sm text-gray-500">1990년 12월 31일생, 기준일 2026년 4월 23일</p>
          <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
            <p>생일(12월 31일)이 아직 지나지 않았으므로</p>
            <p className="font-mono">2026 - 1990 - 1 = <span className="font-bold text-blue-600">35세</span></p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">자주 묻는 질문</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <p className="font-medium text-gray-800">Q. {faq.q}</p>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/age"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            나이 바로 계산하기
          </Link>
        </div>
      </div>
    </main>
  );
}
