// src/lib/data/mbtiChangeAnalysis.ts
// MBTI 변화 분석 데이터

export type AxisChange = {
  from: string;
  to: string;
  analysis: string;
  tips: string[];
};

export type MbtiChangeResult = {
  oldType: string;
  newType: string;
  changedAxes: AxisChange[];
  overallAnalysis: string;
  growthAreas: string[];
};

// 8가지 축 변화 분석
export const AXIS_CHANGES: AxisChange[] = [
  {
    from: 'I',
    to: 'E',
    analysis: '내면에서 외부로 에너지 방향이 바뀌었습니다. 사람과의 교류가 늘어났음을 의미합니다.',
    tips: [
      '새로운 에너지에 압도되지 않도록 혼자만의 충전 시간도 꼭 챙기세요.',
      '사교적 활동이 늘었지만 깊이 있는 관계를 잃지 않도록 주의하세요.',
    ],
  },
  {
    from: 'E',
    to: 'I',
    analysis: '사람들과의 교류에서 내면 성찰로 에너지 방향이 전환되었습니다.',
    tips: [
      '고독이 외로움이 아닌 성장의 시간임을 기억하세요.',
      '중요한 사람들과의 연결은 꾸준히 유지하는 것이 좋습니다.',
    ],
  },
  {
    from: 'N',
    to: 'S',
    analysis: '추상적 가능성보다 현실적 사실에 집중하게 되었습니다. 실용성이 높아졌습니다.',
    tips: [
      '세부 사항에 집중하면서도 큰 그림을 놓치지 않도록 균형을 맞추세요.',
      '직관을 완전히 버리지 말고 현실과 조화롭게 활용해보세요.',
    ],
  },
  {
    from: 'S',
    to: 'N',
    analysis: '구체적 현실에서 가능성과 패턴으로 관심이 확장되었습니다.',
    tips: [
      '미래 가능성을 탐구하되 현재의 실용적 필요도 챙기세요.',
      '아이디어를 실행 가능한 계획으로 발전시키는 연습을 하세요.',
    ],
  },
  {
    from: 'T',
    to: 'F',
    analysis: '논리와 분석에서 감정과 가치 중심으로 사고방식이 변화했습니다.',
    tips: [
      '감정을 충분히 느끼되 중요한 결정에서는 논리도 함께 활용하세요.',
      '타인의 감정에 공감하는 능력을 더욱 발전시킬 수 있는 기회입니다.',
    ],
  },
  {
    from: 'F',
    to: 'T',
    analysis: '감정 중심에서 논리적이고 객관적인 판단으로 성장했습니다.',
    tips: [
      '논리적 판단력을 키우면서도 인간적 따뜻함을 잃지 마세요.',
      '감정적 공감과 논리적 분석을 상황에 따라 유연하게 활용하세요.',
    ],
  },
  {
    from: 'J',
    to: 'P',
    analysis: '계획과 구조 중심에서 유연하고 자발적인 방식으로 변화했습니다.',
    tips: [
      '유연성을 즐기되 중요한 목표는 놓치지 않도록 최소한의 계획을 세우세요.',
      '열린 태도가 새로운 기회를 만들어줄 것입니다.',
    ],
  },
  {
    from: 'P',
    to: 'J',
    analysis: '자유로운 탐색에서 체계적인 실행력으로 성장했습니다.',
    tips: [
      '계획을 세우되 완벽주의에 갇히지 않도록 유연성도 유지하세요.',
      '일관성 있는 실행이 큰 결실을 맺는 원동력이 됩니다.',
    ],
  },
];

export function analyzeMbtiChange(oldType: string, newType: string): MbtiChangeResult {
  if (oldType.length !== 4 || newType.length !== 4) {
    return {
      oldType,
      newType,
      changedAxes: [],
      overallAnalysis: '유효하지 않은 MBTI 유형입니다.',
      growthAreas: [],
    };
  }

  const axes = ['EI', 'NS', 'TF', 'JP'];
  const oldChars = oldType.toUpperCase().split('');
  const newChars = newType.toUpperCase().split('');

  const changedAxes: AxisChange[] = [];

  axes.forEach((axis, index) => {
    const oldChar = oldChars[index];
    const newChar = newChars[index];
    if (oldChar !== newChar) {
      const found = AXIS_CHANGES.find(
        (ac) => ac.from === oldChar && ac.to === newChar
      );
      if (found) changedAxes.push(found);
    }
  });

  if (changedAxes.length === 0) {
    return {
      oldType: oldType.toUpperCase(),
      newType: newType.toUpperCase(),
      changedAxes: [],
      overallAnalysis: `${oldType.toUpperCase()}에서 변화가 없습니다. 당신의 성격은 일관되게 안정적입니다.`,
      growthAreas: ['현재의 강점을 더욱 발전시켜보세요.'],
    };
  }

  const changeCount = changedAxes.length;
  let overallAnalysis = '';
  if (changeCount === 1) {
    overallAnalysis = `${oldType.toUpperCase()}에서 ${newType.toUpperCase()}으로의 변화는 자연스러운 성장의 흔적입니다. 한 가지 측면에서 균형을 찾고 있습니다.`;
  } else if (changeCount === 2) {
    overallAnalysis = `${oldType.toUpperCase()}에서 ${newType.toUpperCase()}으로의 변화는 삶의 중요한 전환점을 겪었음을 나타냅니다. 두 가지 축에서 의미 있는 성장이 이루어졌습니다.`;
  } else if (changeCount === 3) {
    overallAnalysis = `${oldType.toUpperCase()}에서 ${newType.toUpperCase()}으로의 변화는 큰 삶의 변화를 경험했음을 의미합니다. 환경이나 가치관에 상당한 변화가 있었습니다.`;
  } else {
    overallAnalysis = `${oldType.toUpperCase()}에서 ${newType.toUpperCase()}으로의 완전한 변화는 매우 드문 일입니다. 깊은 자기 성찰과 환경 변화가 당신을 새롭게 만들었습니다.`;
  }

  const growthAreas: string[] = [];
  changedAxes.forEach((axis) => {
    growthAreas.push(`${axis.from}→${axis.to} 전환: ${axis.tips[0]}`);
  });
  if (growthAreas.length < 2) {
    growthAreas.push('새로운 자신을 받아들이고 강점으로 발전시켜보세요.');
  }

  return {
    oldType: oldType.toUpperCase(),
    newType: newType.toUpperCase(),
    changedAxes,
    overallAnalysis,
    growthAreas,
  };
}
