// src/lib/calculators/faceAge.ts
// 관상/얼굴 나이 계산기 (CALC-49) — 재미용 계산기

import { simpleHash } from '@/lib/utils/hash';

export type FaceAgeInput = {
  birthDate: string;
  name: string;
};

export type FaceAgeResult = {
  apparentAge: number;
  actualAge: number;
  ageDifference: number;
  faceType: string;
  charmPoint: string;
  improvementTip: string;
  futureAt60: string;
};

const FACE_TYPES = ['동안형', '성숙형', '지적형', '활기형', '우아형', '귀여운형'];

const CHARM_POINTS = [
  '맑고 투명한 피부가 나이를 가려줍니다.',
  '선명한 눈빛이 생기 있는 인상을 만들어줍니다.',
  '부드러운 미소가 상대방의 마음을 열어줍니다.',
  '균형 잡힌 이목구비가 호감형 인상을 줍니다.',
  '자연스러운 표정 근육이 나이보다 젊어 보이게 합니다.',
  '생기 있는 눈꺼풀이 활력 있는 인상을 만듭니다.',
  '매력적인 미소 근육이 얼굴을 밝게 만들어줍니다.',
  '탄력 있는 피부가 동안의 비결입니다.',
  '선명하고 또렷한 콧대가 세련된 인상을 줍니다.',
  '인상 좋은 눈썹 라인이 친근한 느낌을 줍니다.',
];

const IMPROVEMENT_TIPS = [
  '충분한 수면이 피부 재생을 도와 더 젊어 보이게 합니다.',
  '자외선 차단제를 꾸준히 사용하면 피부 노화를 늦출 수 있습니다.',
  '미소 짓는 표정 근육 운동이 얼굴을 더 생기 있게 만들어줍니다.',
  '수분 섭취를 늘리면 피부 탄력이 향상됩니다.',
  '얼굴 마사지로 혈액순환을 활성화해보세요.',
  '긍정적인 마음이 인상을 밝게 바꿔줍니다.',
  '규칙적인 운동이 피부에 생기를 더해줍니다.',
  '영양 균형 잡힌 식단이 피부 건강에 직결됩니다.',
  '스트레스 관리가 얼굴 주름을 줄여줍니다.',
  '충분한 수분 섭취와 보습이 탄력을 유지해줍니다.',
];

const FUTURE_AT_60 = [
  '60세에도 지금의 맑은 눈빛을 간직하며 우아하게 나이 들어가실 것입니다.',
  '60세에 더욱 깊어진 지혜와 품위가 배어나는 모습일 것입니다.',
  '60세에도 지금처럼 활기차고 생기 있는 모습을 유지하실 것입니다.',
  '60세에 세월이 새긴 아름다운 이야기가 얼굴에 담겨있을 것입니다.',
  '60세에도 지금의 따뜻한 미소로 주변을 밝혀주실 것입니다.',
  '60세에 더욱 성숙하고 존경받는 인상으로 빛나실 것입니다.',
  '60세에도 당신만의 독특한 매력이 더욱 깊어져 있을 것입니다.',
  '60세에 인생의 깊이가 담긴 눈빛으로 사람들을 이끄실 것입니다.',
];

export function analyzeFaceAge(input: FaceAgeInput): FaceAgeResult {
  const today = new Date();
  const birth = new Date(input.birthDate);
  const actualAge = Math.floor(
    (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );

  const seed = input.birthDate + input.name;
  const baseHash = simpleHash(seed);

  // 나이 차이: -8 ~ +8 범위 (+ = 동안, - = 노안)
  const ageDiff = (baseHash % 17) - 8; // -8 ~ +8
  const apparentAge = Math.max(1, actualAge - ageDiff);
  const ageDifference = actualAge - apparentAge; // 양수 = 동안

  const faceType = FACE_TYPES[baseHash % FACE_TYPES.length];
  const charmPoint = CHARM_POINTS[simpleHash(seed + 'charm') % CHARM_POINTS.length];
  const improvementTip = IMPROVEMENT_TIPS[simpleHash(seed + 'tip') % IMPROVEMENT_TIPS.length];
  const futureAt60 = FUTURE_AT_60[simpleHash(seed + 'future') % FUTURE_AT_60.length];

  return {
    apparentAge,
    actualAge,
    ageDifference,
    faceType,
    charmPoint,
    improvementTip,
    futureAt60,
  };
}
