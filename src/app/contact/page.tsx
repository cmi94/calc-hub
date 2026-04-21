import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "연락처 — 계산허브",
  description: "계산허브 오류 제보 및 문의",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">연락처</h1>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 text-gray-700 text-sm leading-relaxed">
          <p>계산기 오류 제보, 세율·공식 업데이트 제안, 기타 문의는 아래로 연락해주세요.</p>
          <p>
            이메일:{" "}
            <a href="mailto:contact@calc-hub.com" className="text-blue-600 hover:underline">
              contact@calc-hub.com
            </a>
          </p>
          <p className="text-gray-500">
            확인 후 순차적으로 답변드립니다. 세율 및 법령 변경 사항 제보를 특히 환영합니다.
          </p>
        </div>
      </div>
    </main>
  );
}
