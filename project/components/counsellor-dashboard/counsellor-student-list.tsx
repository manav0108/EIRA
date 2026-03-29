"use client"

import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Users, User, MessageSquare, Calendar, FileText } from "lucide-react"
import { getPrivacyBadge, getRiskBadge, formatRelativeTime } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const moodColors: Record<string, string> = {
  stressed: "bg-orange-500",
  anxiety: "bg-yellow-500",
  sad: "bg-blue-500",
  displaced: "bg-purple-500",
  angry: "bg-red-500",
  okayish: "bg-gray-500",
  happy: "bg-green-500",
  excited: "bg-cyan-500",
}

interface CounsellorStudentListProps {
  onSelectStudent: (id: string) => void
  onAddNote: (studentId: string) => void
}

export function CounsellorStudentList({ onSelectStudent, onAddNote }: CounsellorStudentListProps) {
  const { students } = useApp()

  // Get assigned students for the counsellor (c1 is demo counsellor)
  const assignedStudents = students
    .filter(s => s.assignedCounsellorId === "c1")
    .sort((a, b) => {
      // Sort by risk level (high first)
      const riskOrder = { high: 0, medium: 1, low: 2 }
      return riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
    })

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 glass overflow-hidden">
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Assigned Students</h2>
              <p className="text-xs text-muted-foreground">{assignedStudents.length} students</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {assignedStudents.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No students assigned</p>
          </div>
        ) : (
          <div className="space-y-3">
            {assignedStudents.map((student) => {
              const privacyBadge = getPrivacyBadge(student.privacyStatus)
              const riskBadge = getRiskBadge(student.riskLevel)
              const moodColor = student.currentMood ? moodColors[student.currentMood] : "bg-gray-500"

              return (
                <div
                  key={student.id}
                  className="p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="relative cursor-pointer"
                      onClick={() => onSelectStudent(student.id)}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      {/* Mood indicator */}
                      <div className={cn(
                        "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card",
                        moodColor
                      )} />
                    </div>

                    <div 
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => onSelectStudent(student.id)}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-foreground">{student.alias}</p>
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${riskBadge.color}`}>
                          {riskBadge.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${privacyBadge.color}`}>
                          {privacyBadge.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Active {formatRelativeTime(student.lastActive)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        title="Send message"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        title="Schedule session"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        title="Add note"
                        onClick={() => onAddNote(student.id)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
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
