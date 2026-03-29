"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export function StudentWellnessScore() {
  // Mock wellness score - in a real app this would be calculated from various factors
  const wellnessScore = 72
  const previousScore = 68
  const trend = wellnessScore - previousScore

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-primary"
    if (score >= 40) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreGlow = (score: number) => {
    if (score >= 80) return "from-green-500/20 to-green-500/5"
    if (score >= 60) return "from-primary/20 to-primary/5"
    if (score >= 40) return "from-yellow-500/20 to-yellow-500/5"
    return "from-red-500/20 to-red-500/5"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "You're doing great!"
    if (score >= 60) return "You're on track"
    if (score >= 40) return "Room for improvement"
    return "Let's work on this together"
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 glass overflow-hidden">
      <div className={cn("p-6 bg-gradient-to-br", getScoreGlow(wellnessScore))}>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Wellness Score</p>
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-32 h-32 -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-white/10"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(wellnessScore / 100) * 352} 352`}
                strokeLinecap="round"
                className={getScoreColor(wellnessScore)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-4xl font-bold", getScoreColor(wellnessScore))}>
                {wellnessScore}
              </span>
              <span className="text-xs text-muted-foreground">/ 100</span>
            </div>
          </div>

          <p className={cn("font-medium mt-4", getScoreColor(wellnessScore))}>
            {getScoreMessage(wellnessScore)}
          </p>

          {/* Trend indicator */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {trend > 0 ? (
              <>
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-sm text-green-400">+{trend} from last week</span>
              </>
            ) : trend < 0 ? (
              <>
                <TrendingDown className="h-4 w-4 text-red-400" />
                <span className="text-sm text-red-400">{trend} from last week</span>
              </>
            ) : (
              <>
                <Minus className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Same as last week</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="p-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground mb-3">Score factors</p>
        <div className="space-y-2">
          {[
            { label: "Mood consistency", value: 75 },
            { label: "Habit completion", value: 80 },
            { label: "Session attendance", value: 60 },
            { label: "Journal activity", value: 70 },
          ].map((factor) => (
            <div key={factor.label} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground flex-1">{factor.label}</span>
              <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${factor.value}%` }}
                />
              </div>
              <span className="text-xs text-foreground w-8 text-right">{factor.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
