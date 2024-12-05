// src/components/game/GameBoard.tsx

"use client"

import { useState, useEffect, useCallback } from 'react';
import { StatusBar } from './StatusBar';
import { NumberDisplay } from './NumberDisplay';
import { InputArea } from './InputArea';
import { GameOver } from './GameOver';
import { getRandomQuestion, checkAnswer } from '@/lib/gameQuestions';
import type { GameQuestion } from '@/types/game';

export const GameBoard = () => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const generateNewQuestion = useCallback(() => {
    let difficulty: 'easy' | 'medium' | 'hard';
    if (score < 300) difficulty = 'easy';
    else if (score < 700) difficulty = 'medium';
    else difficulty = 'hard';

    setCurrentQuestion(getRandomQuestion(difficulty));
  }, [score]);

  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  const handleAnswer = (selectedFactors: number[]) => {
    if (!currentQuestion) return;

    if (checkAnswer(currentQuestion, selectedFactors)) {
      setIsAnimating(true);
      setMessage('正解！');
      const scoreIncrement = 
        currentQuestion.difficulty === 'hard' ? 150 :
        currentQuestion.difficulty === 'medium' ? 100 : 50;
      setScore(score + scoreIncrement);
      
      setTimeout(() => {
        setIsAnimating(false);
        generateNewQuestion();
        setMessage('');
      }, 1500);
    } else {
      const damage = 
        currentQuestion.difficulty === 'hard' ? 15 :
        currentQuestion.difficulty === 'medium' ? 10 : 5;
      setPlayerHealth(Math.max(0, playerHealth - damage));
      setMessage('不正解...');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-purple-600">
        Prime Factor Heroes
      </h1>

      <StatusBar health={playerHealth} score={score} />

      {currentQuestion && (
        <>
          <div className="mb-8">
            <NumberDisplay 
              number={currentQuestion.number} 
              isAnimating={isAnimating}
              message={message} 
            />
          </div>

          <InputArea 
            onAnswer={handleAnswer}
            currentNumber={currentQuestion.number}
            difficulty={currentQuestion.difficulty}
          />
        </>
      )}

      {playerHealth <= 0 && (
        <GameOver score={score} onRetry={() => {
          setPlayerHealth(100);
          setScore(0);
          generateNewQuestion();
        }} />
      )}
    </div>
  );
};