// src/components/game/NumberDisplay.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface NumberDisplayProps {
  initialNumber: number;
  currentNumber: number;
  isAnimating: boolean;
  message: string;
  history: {
    number: number;
    usedPrime: number;
  }[];
}

export const NumberDisplay = ({
  currentNumber,
  isAnimating,
  message,
  history
}: NumberDisplayProps) => {
  return (
    <Card className="w-full max-w-md mb-8">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="text-sm text-gray-500">
            Target Number
          </div>
          <div className={cn(
            "text-6xl font-bold transition-all duration-300",
            isAnimating ? "scale-110 text-purple-500" : "text-purple-800"
          )}>
            {currentNumber}
          </div>
          
          {history.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-gray-500 mb-2">History</div>
              <div className="space-y-2">
                {history.map((step, index) => (
                  <div key={index} className="text-sm">
                    {step.number} ÷ {step.usedPrime} = {step.number / step.usedPrime}
                  </div>
                ))}
              </div>
            </div>
          )}

          {message && (
            <div className={cn(
              "text-xl font-bold mt-4 transition-opacity duration-300",
              message.includes('ステージクリア') ? 'text-green-500' : 
              message.includes('不正解') ? 'text-red-500' : 
              'text-purple-500'
            )}>
              {message}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};