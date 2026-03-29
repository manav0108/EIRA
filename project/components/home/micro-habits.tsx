"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Check, Wind, BookOpen, Heart, StretchVertical } from "lucide-react"

interface Habit {
  id: string
  name: string
  duration: string
  icon: React.ReactNode
  completed: boolean
}

export function MicroHabits() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "breathing", name: "Breathing", duration: "2 min", icon: <Wind className="h-5 w-5" />, completed: false },
    { id: "journal", name: "Quick Journal", duration: "3 min", icon: <BookOpen className="h-5 w-5" />, completed: false },
    { id: "gratitude", name: "Gratitude Note", duration: "2 min", icon: <Heart className="h-5 w-5" />, completed: false },
    { id: "stretch", name: "Stretch", duration: "3 min", icon: <StretchVertical className="h-5 w-5" />, completed: false },
  ])

  const [streak, setStreak] = useState(3) // Mock streak

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h))
  }

  const completedCount = habits.filter(h => h.completed).length
  const completionPercentage = (completedCount / habits.length) * 100

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Daily Micro Habits</h2>
          <p className="text-muted-foreground">Small actions, big impact. Complete today's habits to build momentum.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Habits Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {habits.map((habit) => (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={cn(
                  "group relative overflow-hidden rounded-xl border-2 p-5 transition-all duration-300",
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
                      "mt-1 p-2 rounded-lg transition-all duration-300",
                      habit.completed
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/10 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                    )}>
                      {habit.completed ? <Check className="h-5 w-5" /> : habit.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {habit.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{habit.duration}</p>
                    </div>
                  </div>
                  
                  {habit.completed && (
                    <div className="h-3 w-3 rounded-full bg-primary glow-cyan mt-1 animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Stats Card */}
          <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 glass">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Today's Progress</p>
              <div className="text-4xl font-bold text-primary mb-2">
                {completedCount}/{habits.length}
              </div>
              <p className="text-xs text-muted-foreground">{Math.round(completionPercentage)}% Complete</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-8">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 glow-cyan"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            {/* Streak */}
            <div className="text-center p-4 rounded-lg bg-black/20 border border-accent/20">
              <p className="text-xs text-muted-foreground mb-1">🔥 Current Streak</p>
              <p className="text-3xl font-bold text-accent">{streak} days</p>
              <p className="text-xs text-muted-foreground mt-1">Keep it going!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
