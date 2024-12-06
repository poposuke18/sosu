// src/lib/gameLogic.ts
import { PRIME_NUMBERS } from './gameQuestions';

export interface GameStage {
  stageNumber: number;
  targetNumber: number;
  currentNumber: number;
  history: {
    number: number;
    usedPrime: number;
  }[];
  cleared: boolean;
}

// ステージ設定の定義
interface StageConfig {
  primePool: number[];  // 使用可能な素数のプール
  factorCount: number;  // 使用する素数の数
}

const getStageConfig = (stageNumber: number): StageConfig => {
  switch(true) {
    case stageNumber <= 3:  // 初期ステージ
      return {
        primePool: PRIME_NUMBERS.small,
        factorCount: 2
      };
    case stageNumber <= 6:  // 発展ステージ1
      return {
        primePool: PRIME_NUMBERS.small,
        factorCount: 3
      };
    case stageNumber <= 9:  // 発展ステージ2
      return {
        primePool: PRIME_NUMBERS.medium,
        factorCount: 3
      };
    case stageNumber <= 12:  // 発展ステージ3
      return {
        primePool: PRIME_NUMBERS.medium,
        factorCount: 4
      };
    case stageNumber <= 15:  // チャレンジステージ
      return {
        primePool: PRIME_NUMBERS.large,
        factorCount: 4
      };
    default:  // 最終ステージ
      return {
        primePool: PRIME_NUMBERS.large,
        factorCount: 5
      };
  }
};

// ランダムな素数を指定された数だけ選択
const selectRandomPrimes = (primePool: number[], count: number): number[] => {
    if (count >= primePool.length) {
      return [...primePool].sort(() => Math.random() - 0.5);
    }
    
    const result = new Set<number>();
    while (result.size < count) {
      const randomIndex = Math.floor(Math.random() * primePool.length);
      result.add(primePool[randomIndex]);
    }
    return Array.from(result);
  };

// ステージの目標数を生成
export const generateStageNumber = (stageNumber: number): number => {
  const config = getStageConfig(stageNumber);
  const selectedPrimes = selectRandomPrimes(config.primePool, config.factorCount);
  
  // 選択された素数を掛け合わせて目標数を生成
  return selectedPrimes.reduce((acc, curr) => acc * curr, 1);
};

// 数が素数で割り切れるかチェック
export const isDivisibleByPrime = (number: number, prime: number): boolean => {
  return number % prime === 0;
};

// ステージ情報を作成
export const createStage = (stageNumber: number): GameStage => {
  const targetNumber = generateStageNumber(stageNumber);
  return {
    stageNumber,
    targetNumber,
    currentNumber: targetNumber,
    history: [],
    cleared: false
  };
};

// プレイヤーの行動を処理
export const processPlayerAction = (
  stage: GameStage,
  selectedPrime: number
): { 
  isValid: boolean;
  nextNumber: number;
  damage: number;
} => {
  if (isDivisibleByPrime(stage.currentNumber, selectedPrime)) {
    return {
      isValid: true,
      nextNumber: stage.currentNumber / selectedPrime,
      damage: 0
    };
  }

  return {
    isValid: false,
    nextNumber: stage.currentNumber,
    damage: stage.currentNumber
  };
};

// 現在のステージで使用可能な素数のプールを取得
export const getAvailablePrimes = (stageNumber: number): number[] => {
  return getStageConfig(stageNumber).primePool;
};