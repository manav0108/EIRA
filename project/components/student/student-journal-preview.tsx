"use client"

import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus, ChevronRight } from "lucide-react"
import { formatRelativeTime } from "@/lib/mock-data"

const moodEmojis: Record<string, string> = {
  stressed: "😰",
  anxiety: "😟",
  sad: "😢",
  displaced: "😕",
  angry: "😠",
  okayish: "😐",
  happy: "😊",
  excited: "🤩",
}

export function StudentJournalPreview() {
  const { journalEntries } = useApp()

  // Get recent entries for the student
  const recentEntries = journalEntries.slice(0, 3)

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 glass overflow-hidden">
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <BookOpen className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">My Journal</h2>
              <p className="text-xs text-muted-foreground">{journalEntries.length} entries</p>
            </div>
          </div>
          <Link href="/journal">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Entry
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-4">
        {recentEntries.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No journal entries yet</p>
            <Link href="/journal">
              <Button variant="outline" size="sm" className="mt-4">
                Write Your First Entry
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{moodEmojis[entry.mood] || "📝"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {entry.title}
                      </h3>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatRelativeTime(entry.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {entry.content}
                    </p>
                    {entry.aiSummary && (
                      <p className="text-xs text-primary/70 mt-2 italic">
                        AI: {entry.aiSummary.slice(0, 60)}...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {recentEntries.length > 0 && (
          <Link href="/journal">
            <Button
              variant="ghost"
              className="w-full mt-4 text-muted-foreground hover:text-primary"
            >
              View All Entries
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
