"use client"

import { useApp } from "@/contexts/app-context"
import { FileText, User, Clock, AlertCircle } from "lucide-react"
import { getStudentById, formatRelativeTime } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function CounsellorNotes() {
  const { notes } = useApp()

  // Get recent notes for the counsellor (c1 is demo counsellor)
  const recentNotes = notes
    .filter(n => n.counsellorId === "c1")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 glass overflow-hidden">
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <FileText className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Recent Notes</h2>
              <p className="text-xs text-muted-foreground">{notes.length} total notes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {recentNotes.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No notes yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentNotes.map((note) => {
              const student = getStudentById(note.studentId)

              return (
                <div
                  key={note.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-200",
                    note.isUrgent
                      ? "border-red-500/30 bg-red-500/5"
                      : "border-border/50 bg-secondary/30 hover:bg-secondary/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {note.isUrgent && (
                      <div className="p-1.5 rounded-lg bg-red-500/20 shrink-0">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {student?.alias || "Unknown"}
                        </span>
                        {note.isUrgent && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-300">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {note.content}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex flex-wrap gap-1">
                          {note.tags.slice(0, 3).map(tag => (
                            <span 
                              key={tag} 
                              className="text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(note.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
