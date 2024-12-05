// src/components/game/InputArea.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getAvailablePrimes } from "@/lib/gameQuestions"
import { PrimeCard } from "./PrimeCard"

interface InputAreaProps {
  currentNumber: number;
  difficulty: 'easy' | 'medium' | 'hard';
  onAnswer: (selectedFactors: number[]) => void;
}

export const InputArea = ({ difficulty, onAnswer }: InputAreaProps) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const availablePrimes = getAvailablePrimes(difficulty);

  const handlePrimeClick = (prime: number) => {
    setSelectedNumbers([...selectedNumbers, prime]);
  };

  const handleClear = () => {
    setSelectedNumbers([]);
  };

  const handleCheck = () => {
    if (selectedNumbers.length > 0) {
      onAnswer(selectedNumbers);
      handleClear();
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2 min-h-[2rem] justify-center mb-4">
            {selectedNumbers.map((num, index) => (
              <span key={index} className="text-2xl animate-fade-in">
                {num}{index < selectedNumbers.length - 1 ? " × " : ""}
              </span>
            ))}
          </div>
          {selectedNumbers.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleClear}
              size="sm"
              className="w-full mb-4"
            >
              クリア
            </Button>
          )}
          <div className="grid grid-cols-4 gap-2">
            {availablePrimes.map((prime) => (
              <PrimeCard
                key={prime}
                number={prime}
                isSelected={selectedNumbers.includes(prime)}
                onClick={() => handlePrimeClick(prime)}
                disabled={selectedNumbers.includes(prime)}
              />
            ))}
          </div>
          <Button
            onClick={handleCheck}
            className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500"
            size="lg"
            disabled={selectedNumbers.length === 0}
          >
            チェック！
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};