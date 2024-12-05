// src/components/game/PrimeCard.tsx

"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PrimeCardProps {
  number: number
  isSelected: boolean
  onClick: () => void
  disabled?: boolean
}

export const PrimeCard = ({
  number,
  isSelected,
  onClick,
  disabled = false
}: PrimeCardProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-16 h-16 text-2xl font-bold rounded-lg transition-all duration-200 hover-scale",
        isSelected
          ? "bg-purple-500 text-white animate-pop"
          : "bg-white text-purple-700 hover:bg-purple-100",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {number}
    </Button>
  )
}