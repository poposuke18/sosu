// src/hooks/useGameTimer.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import { getTimeLimit } from '@/lib/gameConfig';

interface UseGameTimerProps {
  stageNumber: number;
  isGameStarted: boolean;
  isTimeUp: boolean;
  isTransitioning: boolean;
  onTimeUp: () => void;
}

export const useGameTimer = ({
  stageNumber,
  isGameStarted,
  isTimeUp,
  isTransitioning,
  onTimeUp,
}: UseGameTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback((initialTime: number) => {
    clearTimer();
    setTimeLeft(initialTime);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer, onTimeUp]);

  // タイマーの初期化と管理
  useEffect(() => {
    if (isGameStarted && !isTimeUp && !isTransitioning) {
      startTimer(getTimeLimit(stageNumber));
    }

    return clearTimer;
  }, [isGameStarted, isTimeUp, isTransitioning, stageNumber, startTimer, clearTimer]);

  return {
    timeLeft,
    startTimer,
    clearTimer,
  };
};