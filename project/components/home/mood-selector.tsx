"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { AIMoodResponse } from "./ai-mood-response"

const moods = [
  { id: "stressed", label: "Stressed", emoji: "😰", color: "from-orange-500/20 to-red-500/20", borderColor: "border-orange-500/50" },
  { id: "anxiety", label: "Anxiety", emoji: "😟", color: "from-yellow-500/20 to-orange-500/20", borderColor: "border-yellow-500/50" },
  { id: "sad", label: "Sad", emoji: "😢", color: "from-blue-500/20 to-indigo-500/20", borderColor: "border-blue-500/50" },
  { id: "displaced", label: "Displaced", emoji: "😕", color: "from-purple-500/20 to-pink-500/20", borderColor: "border-purple-500/50" },
  { id: "angry", label: "Angry", emoji: "😠", color: "from-red-500/20 to-orange-500/20", borderColor: "border-red-500/50" },
  { id: "okayish", label: "Okay-ish", emoji: "😐", color: "from-gray-500/20 to-slate-500/20", borderColor: "border-gray-500/50" },
  { id: "happy", label: "Happy", emoji: "😊", color: "from-green-500/20 to-emerald-500/20", borderColor: "border-green-500/50" },
  { id: "excited", label: "Excited", emoji: "🤩", color: "from-cyan-500/20 to-teal-500/20", borderColor: "border-primary/50" },
]

export function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [showResponse, setShowResponse] = useState(false)

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How are you feeling today?</h2>
          <p className="mt-2 text-muted-foreground">Select your current mood to get personalized support</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => {
                setSelectedMood(mood.id)
                setShowResponse(true)
              }}
              className={cn(
                "relative flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-200",
                "bg-gradient-to-br hover:scale-105",
                mood.color,
                selectedMood === mood.id
                  ? `${mood.borderColor} border-2 ring-2 ring-primary/20`
                  : "border-border/50 hover:border-primary/30"
              )}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className={cn(
                "text-sm font-medium",
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

        {showResponse && selectedMood && (
          <AIMoodResponse 
            mood={selectedMood}
            onDismiss={() => {
              setShowResponse(false)
              setSelectedMood(null)
            }}
          />
        )}
      </div>
    </section>
  )
}
