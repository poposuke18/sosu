// src/components/game/SelectedPrimes.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SelectedPrimesProps {
  numbers: number[]
  onClear: () => void
}

export const SelectedPrimes = ({ numbers, onClear }: SelectedPrimesProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col items-center gap-4 p-4">
        <div className="flex gap-2 flex-wrap justify-center min-h-[2rem]">
          {numbers.map((num, index) => (
            <span
              key={index}
              className="text-2xl animate-fade-in"
            >
              {num}{index < numbers.length - 1 ? " × " : ""}
            </span>
          ))}
        </div>
        {numbers.length > 0 && (
          <Button 
            variant="outline" 
            onClick={onClear}
            size="sm"
            className="hover-scale"
          >
            クリア
          </Button>
        )}
      </CardContent>
    </Card>
  )
}