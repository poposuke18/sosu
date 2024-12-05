// src/components/game/NumberDisplay.tsx

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface NumberDisplayProps {
  number: number
  isAnimating: boolean
  message: string
}

export const NumberDisplay = ({ number, isAnimating, message }: NumberDisplayProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="text-center p-8">
        <div
          className={cn(
            "text-6xl font-bold text-purple-800 transition-transform duration-300",
            isAnimating && "animate-pop"
          )}
        >
          {number}
        </div>
        {message && (
          <div
            className={cn(
              "text-xl font-bold mt-4 animate-fade-in",
              message === '正解！' ? 'text-green-500' : 'text-red-500'
            )}
          >
            {message}
          </div>
        )}
      </CardContent>
    </Card>
  )
}