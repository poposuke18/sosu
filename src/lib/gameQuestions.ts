// src/lib/gameQuestions.ts
// 素数のリストと基本的なユーティリティを管理
export const PRIME_NUMBERS = {
  small: [2, 3, 5, 7, 11, 13, 17] as number[],
  medium: [7, 11, 13, 17, 19, 23] as number[],
  large: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37] as number[]
};

// ステージに応じて利用可能な素数を取得
export const getAvailablePrimes = (stageNumber: number): number[] => {
  if (stageNumber <= 5) {
    return PRIME_NUMBERS.small;
  } else if (stageNumber <= 10) {
    return PRIME_NUMBERS.medium;
  } else {
    return PRIME_NUMBERS.large;
  }
};