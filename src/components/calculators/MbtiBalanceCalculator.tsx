"use client";

import { useState } from "react";
import { analyzeMbtiBalance, BALANCE_QUESTIONS, type MbtiBalanceAnswer } from "@/lib/calculators/mbtiBalance";

export default function MbtiBalanceCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<MbtiBalanceAnswer[]>([]);
  const [result, setResult] = useState<ReturnType<typeof analyzeMbtiBalance> | null>(null);

  const totalSteps = BALANCE_QUESTIONS.length;
  const currentQuestion = BALANCE_QUESTIONS[currentStep];
  const progressPct = Math.round((currentStep / totalSteps) * 100);

  function handleAnswer(choice: "A" | "B") {
    const newAnswers: MbtiBalanceAnswer[] = [
      ...answers,
      { questionId: currentQuestion.id, choice },
    ];
    setAnswers(newAnswers);

    if (currentStep + 1 >= totalSteps) {
      setResult(analyzeMbtiBalance(newAnswers));
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  function handleReset() {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  }

  if (result) {
    return (
      <div className="w-full max-w-lg mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl p-5 text-center text-white">
            <p className="text-sm text-violet-200 mb-1">당신의 예측 MBTI</p>
            <p className="text-4xl font-bold">{result.predictedType}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">성향 점수</p>
            {(
              [
                { key: "EI" as const, left: "E (외향)", right: "I (내향)" },
                { key: "NS" as const, left: "N (직관)", right: "S (감각)" },
                { key: "TF" as const, left: "T (사고)", right: "F (감정)" },
                { key: "JP" as const, left: "J (판단)", right: "P (인식)" },
              ] as const
            ).map(({ key, left, right }) => {
              const raw = result.dimensionScores[key];
              const leftScore = Math.round((raw + 100) / 2);
              const rightScore = 100 - leftScore;
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{left}</span>
                    <span>{right}</span>
                  </div>
                  <div className="relative w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="absolute top-0 left-0 h-3 bg-violet-500 rounded-full transition-all"
                      style={{ width: `${leftScore}%` }}
                    />
                    <div className="absolute top-0 left-1/2 w-px h-3 bg-white" />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{leftScore}%</span>
                    <span>{rightScore}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
            <p className="text-xs font-semibold text-violet-700 mb-1">분석</p>
            <p className="text-sm text-violet-800 leading-relaxed">{result.analysis}</p>
          </div>

          <button
            onClick={handleReset}
            className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            다시 하기
          </button>
        </div>
        <p className="text-xs text-center text-gray-400">밸런스 게임 결과는 재미 목적입니다. 과학적 MBTI 검사가 아닙니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{currentStep + 1} / {totalSteps}</span>
            <span>{progressPct}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-violet-500 h-2 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="py-4">
          <p className="text-base font-semibold text-gray-800 text-center leading-relaxed min-h-16">
            {currentQuestion.question}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => handleAnswer("A")}
            className="w-full bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-800 font-medium py-4 px-5 rounded-xl text-sm text-left transition-colors"
          >
            <span className="font-bold text-violet-600 mr-2">A</span>
            {currentQuestion.optionA}
          </button>
          <button
            onClick={() => handleAnswer("B")}
            className="w-full bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-800 font-medium py-4 px-5 rounded-xl text-sm text-left transition-colors"
          >
            <span className="font-bold text-pink-600 mr-2">B</span>
            {currentQuestion.optionB}
          </button>
        </div>

        {currentStep > 0 && (
          <button
            onClick={() => {
              setCurrentStep((s) => s - 1);
              setAnswers((a) => a.slice(0, -1));
            }}
            className="w-full text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
          >
            이전으로
          </button>
        )}
      </div>
    </div>
  );
}
