// src/lib/utils/hash.ts
// 결정적 해시 유틸 (재미 계산기용 — 동일 입력 → 항상 동일 출력)

/**
 * djb2 알고리즘 기반 안정적 해시
 * 동일 문자열 입력 시 항상 동일한 양의 정수 반환
 * @example simpleHash("hello") → 항상 같은 값
 */
export function simpleHash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    // hash * 33 + charCode (비트 연산으로 최적화)
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    // 32비트 정수로 유지
    hash = hash & hash;
  }
  // 음수 방지: 부호 없는 32비트 정수로 변환
  return hash >>> 0;
}

/**
 * 배열에서 seed 기반으로 결정적으로 항목 하나를 선택
 * @example hashSelect(['A', 'B', 'C'], '홍길동') → 항상 같은 항목
 */
export function hashSelect<T>(arr: T[], seed: string): T {
  if (arr.length === 0) throw new Error('hashSelect: 빈 배열');
  const index = simpleHash(seed) % arr.length;
  return arr[index];
}

/**
 * seed 기반으로 [min, max] 범위의 정수 반환 (양 끝 포함)
 * @example hashRange(1, 45, '홍길동') → 1~45 사이 항상 같은 값
 */
export function hashRange(min: number, max: number, seed: string): number {
  if (min > max) throw new Error('hashRange: min이 max보다 큼');
  const range = max - min + 1;
  return min + (simpleHash(seed) % range);
}

/**
 * seed 기반으로 배열을 결정적으로 셔플
 * 동일 seed에서는 항상 동일한 순서를 반환 (Fisher-Yates 변형)
 * @example hashShuffle([1,2,3,4,5], '홍길동') → 항상 같은 순서
 */
export function hashShuffle<T>(arr: T[], seed: string): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    // 각 위치마다 고유한 seed 파생
    const j = simpleHash(`${seed}:${i}`) % (i + 1);
    // 스왑
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}
