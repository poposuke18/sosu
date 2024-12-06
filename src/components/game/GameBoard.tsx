"use client"

import { useState, useCallback } from 'react';
import { StatusBar } from './StatusBar';
import { NumberDisplay } from './NumberDisplay';
import { InputArea } from './InputArea';
import { GameOver } from './GameOver';
import { useAudio } from '@/components/AudioManager';
import { Button } from "@/components/ui/button";
import { INITIAL_LIVES, getTimeLimit } from '@/lib/gameConfig';
import { useGameTimer } from '@/hooks/useGameTimer';
import { 
  createStage, 
  processPlayerAction, 
  getAvailablePrimes,
  type GameStage 
} from '@/lib/gameLogic';

export const GameBoard = () => {
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [score, setScore] = useState(0);
  const [currentStage, setCurrentStage] = useState<GameStage>(createStage(1));
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const { playBGM, playEffect } = useAudio();

  const handleTimeUp = useCallback(() => {
    setIsTimeUp(true);
    playEffect('wrong');
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives > 0) {
        setTimeout(() => {
          setIsTimeUp(false);
          setCurrentStage(createStage(currentStage.stageNumber));
          setMessage('');
        }, 1500);
      }
      return newLives;
    });
    setMessage('タイムアップ！');
  }, [currentStage.stageNumber, playEffect]);

  const { timeLeft, startTimer, clearTimer } = useGameTimer({
    stageNumber: currentStage.stageNumber,
    isGameStarted: gameStarted,
    isTimeUp,
    isTransitioning,
    onTimeUp: handleTimeUp,
  });

  const handleGameStart = useCallback(() => {
    setGameStarted(true);
    setLives(INITIAL_LIVES);
    setIsTimeUp(false);
    playBGM();
  }, [playBGM]);

  const handleStageTransition = useCallback(() => {
    setIsTransitioning(true);
    clearTimer();
    playEffect('stageClear');
    setMessage('ステージクリア！');

    const nextStage = createStage(currentStage.stageNumber + 1);

    setTimeout(() => {
      setCurrentStage(nextStage);
      setIsTransitioning(false);
      setMessage('');
      setIsAnimating(false);
      setIsTimeUp(false);
      startTimer(getTimeLimit(nextStage.stageNumber));
    }, 800);
  }, [currentStage.stageNumber, playEffect, clearTimer, startTimer]);

  const handlePrimeSelect = useCallback((prime: number) => {
    if (isTransitioning || isTimeUp) return;

    const result = processPlayerAction(currentStage, prime);

    if (result.isValid) {
      setIsAnimating(true);
      playEffect('correct');
      
      const newHistory = [...currentStage.history, {
        number: currentStage.currentNumber,
        usedPrime: prime
      }];

      if (result.nextNumber === 1) {
        // 問題解決時のみステージ遷移とタイマーリセット
        setScore(prev => prev + currentStage.targetNumber);
        handleStageTransition();
      } else {
        // 途中経過の場合はタイマーはそのまま
        setCurrentStage(prev => ({
          ...prev,
          currentNumber: result.nextNumber,
          history: newHistory
        }));
        setMessage('正解！');
        setTimeout(() => {
          setMessage('');
          setIsAnimating(false);
        }, 400);
      }
    } else {
      playEffect('wrong');
      setLives(prev => prev - 1);
      setMessage('不正解！');
      
      setTimeout(() => {
        setMessage('');
        setIsAnimating(false);
      }, 1000);
    }
  }, [currentStage, isTransitioning, isTimeUp, playEffect, handleStageTransition]);


  const handleRetry = useCallback(() => {
    setLives(INITIAL_LIVES);
    setScore(0);
    setCurrentStage(createStage(1));
    setMessage('');
    setIsAnimating(false);
    setIsTransitioning(false);
    setIsTimeUp(false);
    handleGameStart();
  }, [handleGameStart]);

  if (!currentStage) {
    return <div className="flex min-h-screen items-center justify-center">
      <div className="text-2xl">Loading...</div>
    </div>;
  }

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-pink-800 p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Prime Factor Heroes</h1>
        <Button 
          onClick={handleGameStart}
          className="px-8 py-4 text-xl bg-purple-500 hover:bg-purple-600 text-white"
        >
          ゲームを始める
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-pink-800 p-4">
      <div className="text-4xl font-bold mb-4 text-white">
        Stage {currentStage.stageNumber}
      </div>

      <StatusBar 
        lives={lives}
        score={score}
        timeLeft={timeLeft}
      />

      <NumberDisplay 
        currentNumber={currentStage.currentNumber}
        isAnimating={isAnimating}
        message={message}
        history={currentStage.history}
        initialNumber={currentStage.targetNumber}
      />

      <InputArea 
        onPrimeSelect={handlePrimeSelect}
        currentNumber={currentStage.currentNumber}
        availablePrimes={getAvailablePrimes(currentStage.stageNumber)}
        disabled={isTransitioning || isTimeUp}
      />

      {(lives <= 0 || (isTimeUp && lives <= 0)) && (
        <GameOver 
          score={score}
          stage={currentStage.stageNumber}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
};