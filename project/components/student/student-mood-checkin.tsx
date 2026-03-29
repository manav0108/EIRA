"use client"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { cn } from "@/lib/utils"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { MoodType } from "@/lib/mock-data"

const moods: { id: MoodType; label: string; emoji: string; color: string }[] = [
  { id: "stressed", label: "Stressed", emoji: "😰", color: "from-orange-500/20 to-red-500/20 border-orange-500/50" },
  { id: "anxiety", label: "Anxiety", emoji: "😟", color: "from-yellow-500/20 to-orange-500/20 border-yellow-500/50" },
  { id: "sad", label: "Sad", emoji: "😢", color: "from-blue-500/20 to-indigo-500/20 border-blue-500/50" },
  { id: "displaced", label: "Displaced", emoji: "😕", color: "from-purple-500/20 to-pink-500/20 border-purple-500/50" },
  { id: "angry", label: "Angry", emoji: "😠", color: "from-red-500/20 to-orange-500/20 border-red-500/50" },
  { id: "okayish", label: "Okay-ish", emoji: "😐", color: "from-gray-500/20 to-slate-500/20 border-gray-500/50" },
  { id: "happy", label: "Happy", emoji: "😊", color: "from-green-500/20 to-emerald-500/20 border-green-500/50" },
  { id: "excited", label: "Excited", emoji: "🤩", color: "from-cyan-500/20 to-teal-500/20 border-primary/50" },
]

export function StudentMoodCheckin() {
  const { submitMood, currentStudentMood } = useApp()
  const { toast } = useToast()
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(currentStudentMood)
  const [isSubmitted, setIsSubmitted] = useState(!!currentStudentMood)

  const handleMoodSelect = (moodId: MoodType) => {
    if (isSubmitted) return
    setSelectedMood(moodId)
  }

  const handleSubmit = () => {
    if (!selectedMood) return
    submitMood(selectedMood)
    setIsSubmitted(true)
    toast({
      title: "Mood recorded",
      description: "Thanks for checking in! Your mood has been saved.",
    })
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 glass p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">How are you feeling today?</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isSubmitted 
              ? "You've already checked in today. Great job staying mindful!" 
              : "Select your current mood to get personalized support"}
          </p>
        </div>
        {isSubmitted && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
            <Check className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-green-300">Checked in</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id)}
            disabled={isSubmitted}
            className={cn(
              "relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200",
              "bg-gradient-to-br",
              mood.color,
              selectedMood === mood.id
                ? "ring-2 ring-primary/50 scale-105"
                : isSubmitted 
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 hover:border-primary/30"
            )}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className={cn(
              "text-xs font-medium",
              selectedMood === mood.id ? "text-foreground" : "text-muted-foreground"
            )}>
              {mood.label}
            </span>
            {selectedMood === mood.id && (
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary glow-cyan" />
            )}
          </button>
        ))}
      </div>

      {!isSubmitted && selectedMood && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            You selected: <span className="text-primary font-medium">{moods.find(m => m.id === selectedMood)?.label}</span>
          </p>
          <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan">
            <Sparkles className="h-4 w-4 mr-2" />
            Submit Check-in
          </Button>
        </div>
      )}
    </div>
  )
}
