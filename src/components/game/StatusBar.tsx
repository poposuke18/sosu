"use client"


import { Card, CardContent } from "@/components/ui/card"
import { Heart, Star } from 'lucide-react'
import { cn } from "@/lib/utils"

interface StatusBarProps {
  health: number;
  score: number;
}

export const StatusBar = ({ health, score }: StatusBarProps) => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardContent className="flex gap-8 p-4">
        <div className="flex items-center gap-2">
          <Heart className={cn(
            "transition-colors",
            health < 30 ? "text-red-500 animate-pulse" : "text-red-500"
          )} />
          <span className="text-xl">{health}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="text-yellow-500" />
          <span className="text-xl">{score}</span>
        </div>
      </CardContent>
    </Card>
  );
};