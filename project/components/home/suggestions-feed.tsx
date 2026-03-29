"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Lightbulb, AlertCircle, Zap, BookOpen } from "lucide-react"

interface Suggestion {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  glowColor: string
}

const suggestions: Suggestion[] = [
  {
    id: "journal-missed",
    title: "You skipped journaling yesterday",
    description: "Journaling helps process emotions. Just 5 minutes can make a difference.",
    icon: <BookOpen className="h-6 w-6" />,
    color: "from-blue-500/20 to-cyan-500/20",
    glowColor: "glow-cyan"
  },
  {
    id: "reset-session",
    title: "Try a 5-min reset before sleep",
    description: "A short meditation can improve sleep quality and reduce nighttime anxiety.",
    icon: <Zap className="h-6 w-6" />,
    color: "from-purple-500/20 to-pink-500/20",
    glowColor: "glow-teal"
  },
  {
    id: "stress-notice",
    title: "Your stress levels are trending up",
    description: "Based on recent check-ins, consider scheduling a focus session or breathing break.",
    icon: <AlertCircle className="h-6 w-6" />,
    color: "from-orange-500/20 to-red-500/20",
    glowColor: "glow-cyan"
  },
  {
    id: "ai-suggestion",
    title: "Based on your mood pattern, try this",
    description: "Progressive muscle relaxation could help with your current stress levels.",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "from-yellow-500/20 to-orange-500/20",
    glowColor: "glow-teal"
  },
]

export function SuggestionsFeed() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("suggestions-scroll")
    if (container) {
      const scrollAmount = 360 // width of card + gap
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  const toggleDismiss = (id: string) => {
    const newDismissed = new Set(dismissedIds)
    if (newDismissed.has(id)) {
      newDismissed.delete(id)
    } else {
      newDismissed.add(id)
    }
    setDismissedIds(newDismissed)
  }

  const visibleSuggestions = suggestions.filter(s => !dismissedIds.has(s.id))

  if (visibleSuggestions.length === 0) return null

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Suggestions For You</h2>
          <p className="text-muted-foreground">Personalized recommendations based on your patterns and current state</p>
        </div>

        <div className="relative">
          {/* Scroll Container */}
          <div
            id="suggestions-scroll"
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {visibleSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={cn(
                  "flex-shrink-0 w-80 group relative overflow-hidden rounded-xl border border-primary/20 p-6",
                  "bg-gradient-to-br backdrop-blur-sm transition-all duration-300",
                  suggestion.color,
                  "hover:border-primary/50 hover:shadow-lg",
                  suggestion.glowColor
                )}
              >
                {/* Hover accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className="p-3 rounded-lg bg-white/10 backdrop-blur w-fit mb-4 text-primary group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    {suggestion.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {suggestion.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                    {suggestion.description}
                  </p>

                  {/* Footer actions */}
                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <button className="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors">
                      Learn More
                    </button>
                    <button
                      onClick={() => toggleDismiss(suggestion.id)}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-white/10 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10",
              "p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all",
              "hidden sm:flex items-center justify-center"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10",
              "p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all",
              "hidden sm:flex items-center justify-center"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {visibleSuggestions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">All caught up! Check back later for new suggestions.</p>
          </div>
        )}
      </div>
    </section>
  )
}
