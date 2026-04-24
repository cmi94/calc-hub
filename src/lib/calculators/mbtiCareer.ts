// src/lib/calculators/mbtiCareer.ts
// MBTI 직업 궁합 계산기 (CALC-45)

import { MBTI_CAREER_DATA } from '@/lib/data/mbtiCareerData';

export type MbtiCareerInput = {
  mbtiType: string;
};

export type MbtiCareerResult = {
  type: string;
  typeName: string;
  description: string;
  recommendedCareers: string[];
  notRecommendedCareers: string[];
  famousPeople: string[];
  workStyle: string;
  strengths: string[];
};

export function getMbtiCareer(input: MbtiCareerInput): MbtiCareerResult {
  const type = input.mbtiType.toUpperCase();
  const entry = MBTI_CAREER_DATA.find((d) => d.type === type);

  if (!entry) {
    return {
      type,
      typeName: '알 수 없음',
      description: '해당 MBTI 유형을 찾을 수 없습니다.',
      recommendedCareers: [],
      notRecommendedCareers: [],
      famousPeople: [],
      workStyle: '',
      strengths: [],
    };
  }

  return {
    type: entry.type,
    typeName: entry.typeName,
    description: entry.description,
    recommendedCareers: entry.recommendedCareers,
    notRecommendedCareers: entry.notRecommendedCareers,
    famousPeople: entry.famousPeople,
    workStyle: entry.workStyle,
    strengths: entry.strengths,
  };
}
