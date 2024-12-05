"use client"


import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GameOverProps {
  score: number;
  onRetry: () => void;
}

export const GameOver = ({ score, onRetry }: GameOverProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">ゲームオーバー</h2>
        </CardHeader>
        <CardContent>
          <div className="text-xl text-center">スコア: {score}</div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button 
            onClick={onRetry}
            size="lg" 
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            もう一度プレイ
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};