"use client"

import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, Play, User, CheckCircle } from "lucide-react"
import { formatSessionTime, isSessionSoon, getStudentById, getPrivacyBadge, getRiskBadge } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface CounsellorTodaySessionsProps {
  onSelectStudent: (id: string) => void
}

export function CounsellorTodaySessions({ onSelectStudent }: CounsellorTodaySessionsProps) {
  const { sessions, startSession } = useApp()
  const { toast } = useToast()

  // Get today's sessions for the counsellor (c1 is demo counsellor)
  const todaysSessions = sessions
    .filter(s => {
      const sessionDate = new Date(s.scheduledAt)
      const today = new Date()
      return s.counsellorId === "c1" && sessionDate.toDateString() === today.toDateString()
    })
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())

  const handleStartSession = (sessionId: string) => {
    startSession(sessionId)
    toast({
      title: "Session started",
      description: "Connecting to video session...",
    })
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 glass overflow-hidden">
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Today&apos;s Sessions</h2>
              <p className="text-xs text-muted-foreground">{todaysSessions.length} scheduled</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {todaysSessions.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No sessions scheduled for today</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysSessions.map((session) => {
              const student = getStudentById(session.studentId)
              const isSoon = isSessionSoon(session.scheduledAt)
              const isCompleted = session.status === "completed"
              const privacyBadge = student ? getPrivacyBadge(student.privacyStatus) : null
              const riskBadge = student ? getRiskBadge(student.riskLevel) : null

              return (
                <div
                  key={session.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-200",
                    isCompleted
                      ? "border-green-500/30 bg-green-500/5"
                      : isSoon
                      ? "border-primary/50 bg-primary/10 ring-1 ring-primary/30"
                      : "border-border/50 bg-secondary/30 hover:bg-secondary/50"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div 
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => student && onSelectStudent(student.id)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {isSoon && !isCompleted && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full animate-pulse">
                            Starting soon
                          </span>
                        )}
                        {isCompleted && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-300 rounded-full flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" /> Completed
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {student?.alias || "Unknown Student"}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {privacyBadge && (
                              <span className={`text-xs px-1.5 py-0.5 rounded border ${privacyBadge.color}`}>
                                {privacyBadge.label}
                              </span>
                            )}
                            {riskBadge && student?.riskLevel !== "low" && (
                              <span className={`text-xs px-1.5 py-0.5 rounded border ${riskBadge.color}`}>
                                {riskBadge.label}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mt-2">
                        {session.topic || "Wellness Session"}
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
                        <span>{session.duration} min</span>
                      </div>
                    </div>

                    {!isCompleted && session.status === "scheduled" && (
                      <Button
                        size="sm"
                        onClick={() => handleStartSession(session.id)}
                        className={cn(
                          isSoon 
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan" 
                            : "bg-secondary text-foreground hover:bg-secondary/80"
                        )}
                        disabled={!isSoon}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        {isSoon ? "Start" : "Upcoming"}
                      </Button>
                    )}
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
