"use client"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Sparkles, ChevronRight, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

const baseSuggestions = [
  {
    id: "1",
    title: "Try a 5-minute breathing exercise",
    description: "Deep breathing can help reduce stress and improve focus",
    category: "mindfulness",
    action: "Start Exercise",
  },
  {
    id: "2",
    title: "Write about 3 things you're grateful for",
    description: "Gratitude journaling can boost positive emotions",
    category: "journal",
    action: "Open Journal",
  },
  {
    id: "3",
    title: "Take a short walk outside",
    description: "Physical activity and nature can improve mood",
    category: "activity",
    action: "Log Activity",
  },
]

const moodBasedSuggestions: Record<string, typeof baseSuggestions> = {
  stressed: [
    { id: "s1", title: "Progressive muscle relaxation", description: "Release tension from your body systematically", category: "mindfulness", action: "Start" },
    { id: "s2", title: "Brain dump your worries", description: "Write everything on your mind to clear mental clutter", category: "journal", action: "Write" },
  ],
  anxiety: [
    { id: "a1", title: "4-7-8 breathing technique", description: "Calm your nervous system with this powerful technique", category: "mindfulness", action: "Start" },
    { id: "a2", title: "Ground yourself with 5-4-3-2-1", description: "Use your senses to return to the present moment", category: "mindfulness", action: "Try Now" },
  ],
  sad: [
    { id: "d1", title: "Reach out to a friend", description: "Social connection can help lift your spirits", category: "social", action: "Connect" },
    { id: "d2", title: "Listen to uplifting music", description: "Music can positively influence your mood", category: "activity", action: "Open Playlist" },
  ],
  happy: [
    { id: "h1", title: "Capture this moment", description: "Journal about what's making you feel good", category: "journal", action: "Write" },
    { id: "h2", title: "Share your positivity", description: "Send an encouraging message to someone", category: "social", action: "Share" },
  ],
}

export function StudentAISuggestions() {
  const { currentStudentMood } = useApp()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const suggestions = currentStudentMood && moodBasedSuggestions[currentStudentMood]
    ? moodBasedSuggestions[currentStudentMood]
    : baseSuggestions.slice(0, 2)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 glass overflow-hidden">
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">AI Suggestions</h2>
              <p className="text-xs text-muted-foreground">
                {currentStudentMood 
                  ? `Based on your ${currentStudentMood} mood`
                  : "Personalized for you"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-muted-foreground hover:text-primary"
          >
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {suggestion.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {suggestion.action}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
