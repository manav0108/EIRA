"use client"

import { useState } from "react"
import { X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface JournalEditorProps {
  onSave: (entry: { title: string; content: string; mood: number }) => void
  onCancel: () => void
}

export function JournalEditor({ onSave, onCancel }: JournalEditorProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState([5])

  const getMoodLabel = (value: number) => {
    if (value <= 2) return "Very Low"
    if (value <= 4) return "Low"
    if (value <= 6) return "Neutral"
    if (value <= 8) return "Good"
    return "Excellent"
  }

  const getMoodColor = (value: number) => {
    if (value <= 2) return "text-red-400"
    if (value <= 4) return "text-orange-400"
    if (value <= 6) return "text-yellow-400"
    if (value <= 8) return "text-green-400"
    return "text-cyan-400"
  }

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave({ title, content, mood: mood[0] })
    }
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
        <h2 className="text-xl font-semibold text-foreground">New Journal Entry</h2>
        <p className="text-sm text-muted-foreground mt-1">Express your thoughts and feelings</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's on your mind today?"
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Your Thoughts</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write freely about your day, feelings, or anything you want to express..."
            rows={8}
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        {/* Mood Rating */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-4">
            Mood Rating: <span className={getMoodColor(mood[0])}>{mood[0]}/10 - {getMoodLabel(mood[0])}</span>
          </label>
          <Slider
            value={mood}
            onValueChange={setMood}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Very Low</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            <Save className="h-4 w-4" />
            Save Entry
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="border-border hover:bg-secondary gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
