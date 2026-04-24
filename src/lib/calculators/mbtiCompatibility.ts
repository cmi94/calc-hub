// src/lib/calculators/mbtiCompatibility.ts
// MBTI 궁합 계산기 (CALC-33)

const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
] as const;

type MbtiType = typeof MBTI_TYPES[number];

// 16×16 궁합 점수 매트릭스
// 보완 쌍 (golden pair): INTJ-ENFP, INTP-ENFJ, ENTJ-INFP, ENTP-INFJ = 90-95
// ISTJ-ESFP, ISFJ-ESTP, ESTJ-ISFP, ESFJ-ISTP = 85-90 (실용 보완)
// 동일 유형: 70 (자기 반영)
// 같은 NF 또는 NT 그룹: 78-82
// 같은 SJ 또는 SP 그룹: 76-80
// 서로 반대 기능: 45-55

const MBTI_SCORES: Record<string, Record<string, number>> = {
  INTJ: { INTJ: 70, INTP: 82, ENTJ: 80, ENTP: 78, INFJ: 78, INFP: 72, ENFJ: 76, ENFP: 92, ISTJ: 65, ISFJ: 55, ESTJ: 60, ESFJ: 50, ISTP: 68, ISFP: 52, ESTP: 55, ESFP: 48 },
  INTP: { INTJ: 82, INTP: 70, ENTJ: 78, ENTP: 82, INFJ: 75, INFP: 74, ENFJ: 88, ENFP: 80, ISTJ: 60, ISFJ: 52, ESTJ: 55, ESFJ: 48, ISTP: 72, ISFP: 55, ESTP: 58, ESFP: 50 },
  ENTJ: { INTJ: 80, INTP: 78, ENTJ: 70, ENTP: 80, INFJ: 75, INFP: 90, ENFJ: 75, ENFP: 78, ISTJ: 68, ISFJ: 55, ESTJ: 72, ESFJ: 58, ISTP: 65, ISFP: 55, ESTP: 62, ESFP: 52 },
  ENTP: { INTJ: 78, INTP: 82, ENTJ: 80, ENTP: 70, INFJ: 90, INFP: 76, ENFJ: 78, ENFP: 78, ISTJ: 55, ISFJ: 52, ESTJ: 58, ESFJ: 50, ISTP: 68, ISFP: 55, ESTP: 62, ESFP: 55 },
  INFJ: { INTJ: 78, INTP: 75, ENTJ: 75, ENTP: 90, INFJ: 70, INFP: 82, ENFJ: 82, ENFP: 80, ISTJ: 58, ISFJ: 62, ESTJ: 52, ESFJ: 60, ISTP: 55, ISFP: 65, ESTP: 48, ESFP: 55 },
  INFP: { INTJ: 72, INTP: 74, ENTJ: 90, ENTP: 76, INFJ: 82, INFP: 70, ENFJ: 80, ENFP: 82, ISTJ: 52, ISFJ: 65, ESTJ: 50, ESFJ: 62, ISTP: 52, ISFP: 72, ESTP: 48, ESFP: 58 },
  ENFJ: { INTJ: 76, INTP: 88, ENTJ: 75, ENTP: 78, INFJ: 82, INFP: 80, ENFJ: 70, ENFP: 80, ISTJ: 62, ISFJ: 68, ESTJ: 60, ESFJ: 72, ISTP: 55, ISFP: 65, ESTP: 55, ESFP: 65 },
  ENFP: { INTJ: 92, INTP: 80, ENTJ: 78, ENTP: 78, INFJ: 80, INFP: 82, ENFJ: 80, ENFP: 70, ISTJ: 58, ISFJ: 62, ESTJ: 55, ESFJ: 65, ISTP: 60, ISFP: 68, ESTP: 60, ESFP: 68 },
  ISTJ: { INTJ: 65, INTP: 60, ENTJ: 68, ENTP: 55, INFJ: 58, INFP: 52, ENFJ: 62, ENFP: 58, ISTJ: 72, ISFJ: 78, ESTJ: 80, ESFJ: 75, ISTP: 76, ISFP: 65, ESTP: 72, ESFP: 88 },
  ISFJ: { INTJ: 55, INTP: 52, ENTJ: 55, ENTP: 52, INFJ: 62, INFP: 65, ENFJ: 68, ENFP: 62, ISTJ: 78, ISFJ: 72, ESTJ: 75, ESFJ: 80, ISTP: 62, ISFP: 72, ESTP: 88, ESFP: 78 },
  ESTJ: { INTJ: 60, INTP: 55, ENTJ: 72, ENTP: 58, INFJ: 52, INFP: 50, ENFJ: 60, ENFP: 55, ISTJ: 80, ISFJ: 75, ESTJ: 70, ESFJ: 78, ISTP: 75, ISFP: 88, ESTP: 78, ESFP: 65 },
  ESFJ: { INTJ: 50, INTP: 48, ENTJ: 58, ENTP: 50, INFJ: 60, INFP: 62, ENFJ: 72, ENFP: 65, ISTJ: 75, ISFJ: 80, ESTJ: 78, ESFJ: 70, ISTP: 88, ISFP: 78, ESTP: 70, ESFP: 75 },
  ISTP: { INTJ: 68, INTP: 72, ENTJ: 65, ENTP: 68, INFJ: 55, INFP: 52, ENFJ: 55, ENFP: 60, ISTJ: 76, ISFJ: 62, ESTJ: 75, ESFJ: 88, ISTP: 70, ISFP: 76, ESTP: 80, ESFP: 72 },
  ISFP: { INTJ: 52, INTP: 55, ENTJ: 55, ENTP: 55, INFJ: 65, INFP: 72, ENFJ: 65, ENFP: 68, ISTJ: 65, ISFJ: 72, ESTJ: 88, ESFJ: 78, ISTP: 76, ISFP: 70, ESTP: 75, ESFP: 80 },
  ESTP: { INTJ: 55, INTP: 58, ENTJ: 62, ENTP: 62, INFJ: 48, INFP: 48, ENFJ: 55, ENFP: 60, ISTJ: 72, ISFJ: 88, ESTJ: 78, ESFJ: 70, ISTP: 80, ISFP: 75, ESTP: 70, ESFP: 78 },
  ESFP: { INTJ: 48, INTP: 50, ENTJ: 52, ENTP: 55, INFJ: 55, INFP: 58, ENFJ: 65, ENFP: 68, ISTJ: 88, ISFJ: 78, ESTJ: 65, ESFJ: 75, ISTP: 72, ISFP: 80, ESTP: 78, ESFP: 70 },
};

export type MbtiCompatInput = {
  type1: string;
  type2: string;
};

export type MbtiCompatResult = {
  score: number;
  grade: '최고의 궁합' | '좋은 궁합' | '보통' | '노력 필요' | '어려운 궁합';
  relationshipType: string;
  description: string;
  strengths: string[];
  challenges: string[];
};

function getGrade(score: number): MbtiCompatResult['grade'] {
  if (score >= 88) return '최고의 궁합';
  if (score >= 75) return '좋은 궁합';
  if (score >= 62) return '보통';
  if (score >= 50) return '노력 필요';
  return '어려운 궁합';
}

function getRelationshipType(type1: string, type2: string): string {
  const t1 = type1.toUpperCase();
  const t2 = type2.toUpperCase();
  if (t1 === t2) return '거울 관계';

  const complementaryPairs = [
    ['INTJ', 'ENFP'], ['INTP', 'ENFJ'], ['ENTJ', 'INFP'], ['ENTP', 'INFJ'],
    ['ISTJ', 'ESFP'], ['ISFJ', 'ESTP'], ['ESTJ', 'ISFP'], ['ESFJ', 'ISTP'],
  ];
  for (const pair of complementaryPairs) {
    if ((pair[0] === t1 && pair[1] === t2) || (pair[0] === t2 && pair[1] === t1)) {
      return '보완 관계';
    }
  }

  const sameGroup = (a: string, b: string, letters: string[]) =>
    letters.every((l) => a.includes(l) === b.includes(l));

  if (sameGroup(t1, t2, ['N', 'F'])) return '공감 관계';
  if (sameGroup(t1, t2, ['N', 'T'])) return '지적 관계';
  if (sameGroup(t1, t2, ['S', 'J'])) return '안정 관계';
  if (sameGroup(t1, t2, ['S', 'P'])) return '자유 관계';

  const score = MBTI_SCORES[t1]?.[t2] ?? 55;
  if (score >= 75) return '성장 관계';
  return '도전 관계';
}

const GRADE_DESCRIPTIONS: Record<MbtiCompatResult['grade'], string> = {
  '최고의 궁합': '서로가 서로의 부족함을 채워주는 완벽한 보완 관계입니다.',
  '좋은 궁합': '많은 부분에서 잘 통하며 함께 성장할 수 있는 관계입니다.',
  '보통': '서로를 이해하면 충분히 좋은 관계를 만들어갈 수 있습니다.',
  '노력 필요': '차이가 있지만 노력과 이해로 의미 있는 관계가 됩니다.',
  '어려운 궁합': '많은 차이가 있지만 서로를 통해 새로운 시각을 얻을 수 있습니다.',
};

const GRADE_STRENGTHS: Record<MbtiCompatResult['grade'], string[]> = {
  '최고의 궁합': ['서로의 약점을 자연스럽게 보완', '깊은 이해와 화학적 끌림'],
  '좋은 궁합': ['공통된 가치관과 목표', '서로에 대한 높은 이해도'],
  '보통': ['다양한 관점을 나눌 수 있음', '서로에게 새로운 자극'],
  '노력 필요': ['서로에게서 배울 점이 많음', '다름이 성장의 원동력'],
  '어려운 궁합': ['완전히 다른 시각으로 세상을 볼 수 있음', '서로에게 도전과 자극을 줌'],
};

const GRADE_CHALLENGES: Record<MbtiCompatResult['grade'], string[]> = {
  '최고의 궁합': ['서로의 차이로 인한 사소한 오해', '기대가 높아 실망할 수 있음'],
  '좋은 궁합': ['가끔 다른 의사소통 방식', '기대치 조율 필요'],
  '보통': ['의사소통 방식의 차이', '가끔 서로를 이해하기 어려운 순간'],
  '노력 필요': ['잦은 오해와 갈등 가능성', '서로의 방식 존중이 중요'],
  '어려운 궁합': ['자주 갈등이 생길 수 있음', '서로를 이해하는 데 많은 시간 필요'],
};

export function calculateMbtiCompat(input: MbtiCompatInput): MbtiCompatResult {
  const t1 = input.type1.toUpperCase();
  const t2 = input.type2.toUpperCase();

  const isValidType = (t: string): t is MbtiType => (MBTI_TYPES as readonly string[]).includes(t);

  if (!isValidType(t1) || !isValidType(t2)) {
    return {
      score: 50,
      grade: '보통',
      relationshipType: '일반 관계',
      description: '유효하지 않은 MBTI 유형입니다.',
      strengths: [],
      challenges: [],
    };
  }

  const score = MBTI_SCORES[t1]?.[t2] ?? 50;
  const grade = getGrade(score);
  const relationshipType = getRelationshipType(t1, t2);

  return {
    score,
    grade,
    relationshipType,
    description: GRADE_DESCRIPTIONS[grade],
    strengths: GRADE_STRENGTHS[grade],
    challenges: GRADE_CHALLENGES[grade],
  };
}
