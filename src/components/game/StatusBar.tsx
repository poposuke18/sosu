"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Star, Clock } from 'lucide-react'
import { cn } from "@/lib/utils"

interface StatusBarProps {
  lives: number;
  score: number;
  timeLeft: number;
}

export const StatusBar = ({ lives, score, timeLeft }: StatusBarProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm w-full max-w-md mb-4">
      <CardContent className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <Heart className={cn(
            "transition-colors",
            lives === 1 ? "text-red-500 animate-pulse" : "text-red-500"
          )} />
          <span className="text-xl">×{lives}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className={cn(
            "transition-colors",
            timeLeft <= 10 ? "text-yellow-500 animate-pulse" : "text-yellow-500"
          )} />
          <span className="text-xl">{formatTime(timeLeft)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Star className="text-yellow-500" />
          <span className="text-xl">{score}</span>
        </div>
      </CardContent>
    </Card>
  );
};