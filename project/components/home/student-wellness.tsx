"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, Clock, Target, BookMarked, Zap } from "lucide-react"

interface StudentWellnessState {
  examStressEnabled: boolean
  focusSessionActive: boolean
  burnoutLevel: "low" | "medium" | "high"
}

export function StudentWellness() {
  const [state, setState] = useState<StudentWellnessState>({
    examStressEnabled: false,
    focusSessionActive: false,
    burnoutLevel: "low"
  })

  const [focusTimeRemaining, setFocusTimeRemaining] = useState(25) // 25 min session

  const toggleExamMode = () => {
    setState(prev => ({ ...prev, examStressEnabled: !prev.examStressEnabled }))
  }

  const startFocusSession = () => {
    setState(prev => ({ ...prev, focusSessionActive: true }))
  }

  const burnoutColors = {
    low: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    medium: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
    high: "from-red-500/20 to-orange-500/20 border-red-500/30"
  }

  const burnoutBadgeColor = {
    low: "bg-green-500/20 text-green-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    high: "bg-red-500/20 text-red-400"
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Student Wellness Hub</h2>
          <p className="text-muted-foreground">Tools designed specifically for your academic and mental health needs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exam Stress Mode */}
          <div className={cn(
            "relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300",
            "bg-gradient-to-br backdrop-blur-sm",
            state.examStressEnabled
              ? "border-primary/50 from-primary/10 to-accent/5 shadow-md glow-cyan"
              : "border-border/50 bg-secondary/30 hover:border-primary/30"
          )}>
            <div className="absolute top-0 right-0 h-40 w-40 bg-primary/10 rounded-full blur-3xl -z-0" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-1">
                    <Target className="h-5 w-5 text-primary" />
                    Exam Stress Mode
                  </h3>
                  <p className="text-sm text-muted-foreground">Activate during exam season for focused support</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-black/20 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-3">Status: {state.examStressEnabled ? "Active" : "Inactive"}</p>
                  <ul className="text-sm text-foreground/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      <span>Priority: Focus sessions and stress management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      <span>Reminders: Breaks and self-care prompts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      <span>Resources: Exam anxiety guides and tips</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={toggleExamMode}
                  className={cn(
                    "w-full py-2 rounded-lg font-medium transition-all duration-300",
                    state.examStressEnabled
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-primary/20 text-primary hover:bg-primary/30"
                  )}
                >
                  {state.examStressEnabled ? "Disable Exam Mode" : "Enable Exam Mode"}
                </button>
              </div>
            </div>
          </div>

          {/* Focus Booster Session */}
          <div className={cn(
            "relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300",
            "bg-gradient-to-br backdrop-blur-sm",
            state.focusSessionActive
              ? "border-accent/50 from-accent/10 to-primary/5 shadow-md glow-teal"
              : "border-border/50 bg-secondary/30 hover:border-accent/30"
          )}>
            <div className="absolute top-0 right-0 h-40 w-40 bg-accent/10 rounded-full blur-3xl -z-0" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-1">
                    <Clock className="h-5 w-5 text-accent" />
                    Focus Booster
                  </h3>
                  <p className="text-sm text-muted-foreground">Pomodoro-style focus sessions</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Timer Display */}
                <div className="p-6 rounded-lg bg-black/20 border border-accent/20 text-center">
                  {state.focusSessionActive ? (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Time Remaining</p>
                      <p className="text-5xl font-bold text-accent mb-2">{focusTimeRemaining}:00</p>
                      <p className="text-xs text-muted-foreground">Focus mode active</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Standard Session</p>
                      <p className="text-4xl font-bold text-foreground">25 min</p>
                      <p className="text-xs text-muted-foreground mt-2">+ 5 min break</p>
                    </>
                  )}
                </div>

                <button
                  onClick={startFocusSession}
                  disabled={state.focusSessionActive}
                  className={cn(
                    "w-full py-2 rounded-lg font-medium transition-all duration-300",
                    state.focusSessionActive
                      ? "bg-accent/20 text-accent cursor-not-allowed"
                      : "bg-accent/20 text-accent hover:bg-accent/30"
                  )}
                >
                  {state.focusSessionActive ? "Session in Progress..." : "Start Focus Session"}
                </button>
              </div>
            </div>
          </div>

          {/* Burnout Indicator */}
          <div className={cn(
            "relative overflow-hidden rounded-xl border-2 p-6",
            "bg-gradient-to-br backdrop-blur-sm",
            burnoutColors[state.burnoutLevel]
          )}>
            <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full blur-3xl -z-0" />
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5" />
                Burnout Indicator
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Level</span>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide",
                    burnoutBadgeColor[state.burnoutLevel]
                  )}>
                    {state.burnoutLevel}
                  </span>
                </div>

                {/* Status Messages */}
                <div className="p-4 rounded-lg bg-black/20 border border-white/10">
                  <p className="text-sm text-foreground leading-relaxed">
                    {state.burnoutLevel === "low" && "You're managing well! Keep maintaining healthy habits."}
                    {state.burnoutLevel === "medium" && "You're showing signs of stress. Consider taking a break and reaching out for support."}
                    {state.burnoutLevel === "high" && "You're experiencing burnout. Please prioritize self-care and consider talking to someone."}
                  </p>
                </div>

                <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 font-medium transition-colors text-sm">
                  Get Support Resources
                </button>
              </div>
            </div>
          </div>

          {/* Study Break Reminder */}
          <div className="relative overflow-hidden rounded-xl border-2 border-primary/20 p-6 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
            <div className="absolute top-0 right-0 h-40 w-40 bg-primary/10 rounded-full blur-3xl -z-0" />
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-primary" />
                Study Break Reminder
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-black/20 border border-primary/20">
                  <p className="text-sm font-semibold text-foreground mb-2">⏰ Next Recommended Break</p>
                  <p className="text-2xl font-bold text-primary mb-2">In 18 minutes</p>
                  <p className="text-xs text-muted-foreground">Take a 5-minute walk or stretch to recharge</p>
                </div>

                <button className="w-full py-2 rounded-lg bg-primary/20 hover:bg-primary/30 font-medium transition-colors text-sm text-primary">
                  Start a Break Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
