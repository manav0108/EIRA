"use client"

import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, Plus, Play } from "lucide-react"
import { formatSessionTime, isSessionSoon, getCounsellorById } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface StudentUpcomingSessionsProps {
  onBookSession: () => void
}

export function StudentUpcomingSessions({ onBookSession }: StudentUpcomingSessionsProps) {
  const { sessions, startSession } = useApp()

  // Get upcoming sessions for the student (s1 is the demo student)
  const upcomingSessions = sessions
    .filter(s => s.studentId === "s1" && s.status === "scheduled")
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 3)

  const handleJoinSession = (sessionId: string) => {
    startSession(sessionId)
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 glass overflow-hidden">
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Upcoming Sessions</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBookSession}
            className="text-primary hover:text-primary/80"
          >
            <Plus className="h-4 w-4 mr-1" />
            Book
          </Button>
        </div>
      </div>

      <div className="p-4">
        {upcomingSessions.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No upcoming sessions</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={onBookSession}
            >
              Book Your First Session
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingSessions.map((session) => {
              const counsellor = getCounsellorById(session.counsellorId)
              const isSoon = isSessionSoon(session.scheduledAt)
              const sessionDate = new Date(session.scheduledAt)
              
              return (
                <div
                  key={session.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-200",
                    isSoon
                      ? "border-primary/50 bg-primary/10 ring-1 ring-primary/30"
                      : "border-border/50 bg-secondary/30 hover:bg-secondary/50"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {isSoon && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full animate-pulse">
                            Starting soon
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-foreground truncate">
                        {session.topic || "Wellness Session"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        with {counsellor?.name || "Counsellor"}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {formatSessionTime(session.scheduledAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Video className="h-3.5 w-3.5" />
                          {session.type}
                        </span>
                      </div>
                    </div>

                    {isSoon && (
                      <Button
                        size="sm"
                        onClick={() => handleJoinSession(session.id)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Join
                      </Button>
                    )}
                  </div>

                  {!isSoon && (
                    <p className="text-xs text-muted-foreground mt-3">
                      {sessionDate.toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
