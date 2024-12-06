// src/lib/gameConfig.ts
export const INITIAL_LIVES = 3;

// ステージごとの制限時間（秒）
export const getTimeLimit = (stageNumber: number): number => {
  switch(true) {
    case stageNumber <= 3:  // 
      return 10;  // 
    case stageNumber <= 6:  // 
      return 15;  // 
    case stageNumber <= 9:  // 
      return 45;  // 
    case stageNumber <= 12: 
      return 60; // 
    case stageNumber <= 15: 
      return 80; 
    default:            
      return 100; 
  }
};