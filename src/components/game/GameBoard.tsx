// src/components/game/GameBoard.tsx
"use client"

import { useState, useCallback, useEffect } from 'react';
import { StatusBar } from './StatusBar';
import { NumberDisplay } from './NumberDisplay';
import { InputArea } from './InputArea';
import { GameOver } from './GameOver';
import { 
  createStage, 
  processPlayerAction, 
  getAvailablePrimes,
  type GameStage 
} from '@/lib/gameLogic';

export const GameBoard = () => {
  const [playerHealth, setPlayerHealth] = useState(1000);
  const [score, setScore] = useState(0);
  const [currentStage, setCurrentStage] = useState<GameStage | null>(null);
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // 初期化
  useEffect(() => {
    setCurrentStage(createStage(1));
  }, []);

  // メッセージクリアのタイマー
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage('');
      setIsAnimating(false);
    }, message.includes('ステージクリア') ? 1500 : 800);

    return () => clearTimeout(timer);
  }, [message]);

  const handlePrimeSelect = useCallback((prime: number) => {
    if (!currentStage) return;

    const result = processPlayerAction(currentStage, prime);

    if (result.isValid) {
      setIsAnimating(true);
      const newHistory = [...currentStage.history, {
        number: currentStage.currentNumber,
        usedPrime: prime
      }];

      if (result.nextNumber === 1) {
        // ステージクリア
        setScore(prev => prev + currentStage.targetNumber);
        setMessage('ステージクリア！');
        setCurrentStage(prev => prev ? createStage(prev.stageNumber + 1) : null);
      } else {
        // 正しい素因数分解
        setCurrentStage(prev => prev ? {
          ...prev,
          currentNumber: result.nextNumber,
          history: newHistory
        } : null);
        setMessage('正解！');
      }
    } else {
      // 間違った素因数選択
      setPlayerHealth(prev => Math.max(0, prev - result.damage));
      setMessage(`不正解... ${result.damage}ダメージ！`);
    }
  }, [currentStage]);

  const handleRetry = useCallback(() => {
    setPlayerHealth(1000);
    setScore(0);
    setCurrentStage(createStage(1));
    setMessage('');
    setIsAnimating(false);
  }, []);

  // 初期ローディング
  if (!currentStage) {
    return <div className="flex min-h-screen items-center justify-center">
      <div className="text-2xl">Loading...</div>
    </div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-pink-800 p-4">
      <div className="text-4xl font-bold mb-4 text-white">
        Stage {currentStage.stageNumber}
      </div>

      <StatusBar 
        health={playerHealth} 
        score={score} 
        maxHealth={1000}
      />

      <NumberDisplay 
        currentNumber={currentStage.currentNumber}
        isAnimating={isAnimating}
        message={message}
        history={currentStage.history} initialNumber={0}      />

      <InputArea 
        onPrimeSelect={handlePrimeSelect}
        currentNumber={currentStage.currentNumber}
        availablePrimes={getAvailablePrimes(currentStage.stageNumber)}
      />

      {playerHealth <= 0 && (
        <GameOver 
          score={score} 
          stage={currentStage.stageNumber}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
};