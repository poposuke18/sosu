// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ゲーム用のユーティリティ関数
export const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

export const generateNumber = (level: number = 1): number => {
  const numbers = {
    1: [12, 16, 18, 24, 28],    // 簡単
    2: [36, 48, 64, 72, 96],    // 普通
    3: [100, 144, 196, 225, 256] // 難しい
  }
  const levelNumbers = numbers[level as keyof typeof numbers] || numbers[1];
  return levelNumbers[Math.floor(Math.random() * levelNumbers.length)];
}