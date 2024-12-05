// src/lib/gameQuestions.ts  (libフォルダに移動)
import { GameQuestion } from '@/types/game';

// src/lib/gameQuestions.ts
const PRIME_NUMBERS = {
  small: [2, 3, 5, 7, 11, 13, 17] as number[],
  medium: [7, 11, 13, 17, 19, 23] as number[],
  large: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37] as number[]
};

const getRandomElement = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const generateQuestion = (difficulty: 'easy' | 'medium' | 'hard'): GameQuestion => {
  const primeFactors: number[] = [];
  
  switch (difficulty) {
    case 'easy':
      for (let i = 0; i < 3; i++) {
        primeFactors.push(getRandomElement(PRIME_NUMBERS.small));
      }
      break;
      
    case 'medium':
      for (let i = 0; i < 3; i++) {
        primeFactors.push(getRandomElement(PRIME_NUMBERS.medium));
      }
      break;
      
    case 'hard':
      for (let i = 0; i < 4; i++) {
        primeFactors.push(getRandomElement(PRIME_NUMBERS.large));
      }
      break;
  }

  const number = primeFactors.reduce((acc, curr) => acc * curr, 1);

  return {
    number,
    difficulty,
    primeFactors
  };
};

export const getRandomQuestion = (difficulty?: 'easy' | 'medium' | 'hard'): GameQuestion => {
  const selectedDifficulty = difficulty || getRandomElement(['easy', 'medium', 'hard'] as const);
  return generateQuestion(selectedDifficulty);
};

export const checkAnswer = (question: GameQuestion, userFactors: number[]): boolean => {
  const sortedUserFactors = [...userFactors].sort((a, b) => a - b);
  const sortedCorrectFactors = [...question.primeFactors].sort((a, b) => a - b);
  
  if (sortedUserFactors.length !== sortedCorrectFactors.length) return false;
  return sortedUserFactors.every((factor, index) => factor === sortedCorrectFactors[index]);
};

export const getAvailablePrimes = (difficulty: 'easy' | 'medium' | 'hard'): number[] => {
  switch (difficulty) {
    case 'easy':
      return [...PRIME_NUMBERS.small];
    case 'medium':
      return [...PRIME_NUMBERS.medium];
    case 'hard':
      return [...PRIME_NUMBERS.large];
  }
};