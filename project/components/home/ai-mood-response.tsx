"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface AIMoodResponseProps {
  mood: string | null
  onDismiss?: () => void
}

const moodResponses: Record<string, { message: string; suggestion: string; color: string }> = {
  stressed: {
    message: "You seem overwhelmed. Let's take a moment together.",
    suggestion: "Try a 2-minute breathing exercise to calm your nervous system.",
    color: "from-orange-500/20 to-red-500/20"
  },
  anxiety: {
    message: "Anxiety is telling you something. Let's listen to it.",
    suggestion: "A grounding technique might help. Try the 5-4-3-2-1 method.",
    color: "from-yellow-500/20 to-orange-500/20"
  },
  sad: {
    message: "It's okay to feel this way. You're not alone.",
    suggestion: "Writing your thoughts might help you process these feelings.",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  displaced: {
    message: "Feeling out of place? Let's reconnect with what matters.",
    suggestion: "A gratitude practice might shift your perspective right now.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  angry: {
    message: "That anger is valid. Let's channel it constructively.",
    suggestion: "Physical movement or journaling can help release these emotions.",
    color: "from-red-500/20 to-orange-500/20"
  },
  okayish: {
    message: "You're managing. That takes strength.",
    suggestion: "Keep momentum by setting one small, achievable goal today.",
    color: "from-gray-500/20 to-slate-500/20"
  },
  happy: {
    message: "That's wonderful! Let's nurture this energy.",
    suggestion: "Share this positivity with someone else—it amplifies the impact.",
    color: "from-green-500/20 to-emerald-500/20"
  },
  excited: {
    message: "Great energy! Let's keep the momentum!",
    suggestion: "Channel this excitement into something meaningful today.",
    color: "from-cyan-500/20 to-teal-500/20"
  },
}

export function AIMoodResponse({ mood, onDismiss }: AIMoodResponseProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (mood) {
      setIsVisible(true)
    }
  }, [mood])

  if (!mood || !isVisible) return null

  const response = moodResponses[mood]
  if (!response) return null

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  return (
    <div
      className={cn(
        "mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500",
        "mx-auto max-w-2xl px-4"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-primary/30 p-6 sm:p-8",
          "bg-gradient-to-br backdrop-blur-sm",
          response.color,
          "shadow-lg glow-teal transition-all duration-300"
        )}
      >
        {/* Accent corner */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 rounded-full blur-3xl -z-0" />
        
        <div className="relative z-10">
          {/* Header with AI badge */}
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20 backdrop-blur">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">EIRA AI Support</p>
              <p className="text-xs text-muted-foreground">Personalized for you</p>
            </div>
          </div>

          {/* Message */}
          <p className="text-base sm:text-lg font-semibold text-foreground mb-4 leading-relaxed">
            {response.message}
          </p>

          {/* Suggestion */}
          <div className="relative bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide font-medium">💡 Suggestion</p>
            <p className="text-base text-foreground/90 leading-relaxed">
              {response.suggestion}
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => window.location.href = '/chat'}
              className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-medium transition-colors"
            >
              Chat with AI
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-foreground font-medium transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
