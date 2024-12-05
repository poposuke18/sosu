// src/types/game.ts
export interface GameQuestion {
    number: number;
    difficulty: 'easy' | 'medium' | 'hard';
    primeFactors: number[];
  }
  
  export interface InputAreaProps {
    onAnswer: (selectedFactors: number[]) => void;
    currentNumber: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }