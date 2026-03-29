"use client"

import { useState, useEffect } from "react"
import { Plus, BookOpen, Calendar, Smile, ChevronRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JournalEditor } from "@/components/journal/journal-editor"
import { useToast } from "@/hooks/use-toast"

interface JournalEntry {
  id: string
  title: string
  content: string
  mood: number
  date: string
}

const mockEntries: JournalEntry[] = [
  {
    id: "1",
    title: "A productive day at the library",
    content: "Spent most of the day studying for my upcoming exams. Felt focused and accomplished after finishing two chapters. The library was quiet and peaceful.",
    mood: 8,
    date: "March 27, 2026",
  },
  {
    id: "2",
    title: "Feeling overwhelmed",
    content: "Had a lot on my plate today. Three assignments due and a group project meeting that didn't go well. Need to practice some self-care tonight.",
    mood: 4,
    date: "March 26, 2026",
  },
  {
    id: "3",
    title: "Great coffee chat with a friend",
    content: "Met up with Sarah today and we talked for hours. It's so refreshing to have meaningful conversations. Grateful for good friendships.",
    mood: 9,
    date: "March 25, 2026",
  },
]

const getMoodEmoji = (mood: number) => {
  if (mood <= 2) return "😢"
  if (mood <= 4) return "😕"
  if (mood <= 6) return "😐"
  if (mood <= 8) return "😊"
  return "😄"
}

const getMoodColor = (mood: number) => {
  if (mood <= 2) return "bg-red-500/20 text-red-400"
  if (mood <= 4) return "bg-orange-500/20 text-orange-400"
  if (mood <= 6) return "bg-yellow-500/20 text-yellow-400"
  if (mood <= 8) return "bg-green-500/20 text-green-400"
  return "bg-cyan-500/20 text-cyan-400"
}

export default function JournalPage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  const handleSave = (entry: { title: string; content: string; mood: number }) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    }
    setEntries([newEntry, ...entries])
    setIsEditing(false)
    setShowSuccess(true)
    toast({
      title: "Journal entry saved",
      description: "Your thoughts have been safely recorded.",
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/20 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">My Journal</h1>
            </div>
            <p className="text-muted-foreground">A safe space for your thoughts and reflections</p>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan gap-2"
            >
              <Plus className="h-5 w-5" />
              New Entry
            </Button>
          )}
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <p className="text-green-400 font-medium">Journal entry saved successfully!</p>
          </div>
        )}

        {/* Editor or Entries */}
        {isEditing ? (
          <JournalEditor onSave={handleSave} onCancel={() => setIsEditing(false)} />
        ) : (
          <div className="space-y-4">
            {entries.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border border-border/50 bg-card/80">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No entries yet</h3>
                <p className="text-muted-foreground mb-6">Start journaling to track your thoughts and feelings</p>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Write Your First Entry
                </Button>
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-6 rounded-2xl border border-border/50 bg-card/80 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.01] transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${getMoodColor(entry.mood)}`}>
                      <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-foreground truncate">{entry.title}</h3>
                        <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{entry.content}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{entry.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Smile className="h-3 w-3" />
                          <span>Mood: {entry.mood}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tips Section */}
        {!isEditing && entries.length > 0 && (
          <div className="mt-12 p-6 rounded-2xl border border-border/50 bg-linear-to-r from-primary/10 to-accent/10">
            <h3 className="font-semibold text-foreground mb-2">Journaling Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Write freely without judgment - this is your safe space</li>
              <li>Try to journal at the same time each day for consistency</li>
              <li>Include both challenges and things you&apos;re grateful for</li>
              <li>Review past entries to see your growth over time</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
