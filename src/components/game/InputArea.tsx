// src/components/game/InputArea.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { PrimeCard } from "./PrimeCard"

interface InputAreaProps {
  onPrimeSelect: (prime: number) => void;
  currentNumber: number;
  availablePrimes: number[];
}

export const InputArea = ({ onPrimeSelect, availablePrimes }: InputAreaProps) => {
  return (
    <div className="space-y-4 w-full max-w-md">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-2">
            {availablePrimes.map((prime) => (
              <PrimeCard
                key={prime}
                number={prime}
                isSelected={false}
                onClick={() => onPrimeSelect(prime)}
                disabled={false}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};