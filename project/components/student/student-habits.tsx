"use client"

import { useApp } from "@/contexts/app-context"
import { cn } from "@/lib/utils"
import { Check, Wind, BookOpen, Heart, StretchVertical, Flame } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const iconMap: Record<string, React.ElementType> = {
  Wind,
  BookOpen,
  Heart,
  StretchVertical,
}

export function StudentHabits() {
  const { currentStudentHabits, currentStudentStreak, completeHabit } = useApp()
  const { toast } = useToast()

  const handleToggleHabit = (habitId: string, habitName: string, wasCompleted: boolean) => {
    completeHabit(habitId)
    if (!wasCompleted) {
      toast({
        title: "Habit completed!",
        description: `Great job completing "${habitName}"`,
      })
    }
  }

  const completedCount = currentStudentHabits.filter(h => h.completed).length
  const completionPercentage = (completedCount / currentStudentHabits.length) * 100

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 glass overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Daily Micro Habits</h2>
            <p className="text-sm text-muted-foreground mt-1">Small actions, big impact</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-warm/10 border border-warm/20">
            <Flame className="h-5 w-5 text-warm" />
            <span className="text-lg font-bold text-warm">{currentStudentStreak}</span>
            <span className="text-xs text-muted-foreground">days</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentStudentHabits.map((habit) => {
            const Icon = iconMap[habit.icon] || Wind
            return (
              <button
                key={habit.id}
                onClick={() => handleToggleHabit(habit.id, habit.name, habit.completed)}
                className={cn(
                  "group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300",
                  "text-left",
                  habit.completed
                    ? "border-primary/50 bg-primary/10 shadow-md glow-cyan"
                    : "border-border/50 bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={cn(
                      "mt-0.5 p-2 rounded-lg transition-all duration-300",
                      habit.completed
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/10 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                    )}>
                      {habit.completed ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {habit.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{habit.duration}</p>
                    </div>
                  </div>
                  
                  {habit.completed && (
                    <div className="h-3 w-3 rounded-full bg-primary glow-cyan animate-pulse" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Today's Progress</span>
            <span className="text-sm font-medium text-foreground">{completedCount}/{currentStudentHabits.length}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 glow-cyan"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
