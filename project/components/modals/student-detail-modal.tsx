"use client"

import { useApp } from "@/contexts/app-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { 
  User, 
  Calendar, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Shield,
  Clock,
  BookOpen,
  Flame
} from "lucide-react"
import { getStudentById, getPrivacyBadge, getRiskBadge, getSessionsByStudent, getNotesByStudent, formatRelativeTime } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface StudentDetailModalProps {
  studentId: string | null
  onClose: () => void
  onAddNote: (studentId: string) => void
}

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

export function StudentDetailModal({ studentId, onClose, onAddNote }: StudentDetailModalProps) {
  const { updateStudentRisk } = useApp()

  if (!studentId) return null

  const student = getStudentById(studentId)
  if (!student) return null

  const privacyBadge = getPrivacyBadge(student.privacyStatus)
  const riskBadge = getRiskBadge(student.riskLevel)
  const sessions = getSessionsByStudent(studentId)
  const notes = getNotesByStudent(studentId)

  // Calculate mood trend
  const recentMoods = student.moodHistory.slice(-7)
  const avgScore = recentMoods.reduce((sum, m) => sum + m.score, 0) / recentMoods.length
  const previousAvg = student.moodHistory.slice(-14, -7).reduce((sum, m) => sum + m.score, 0) / 7
  const moodTrend = avgScore - previousAvg

  const handleRiskUpdate = (newLevel: "low" | "medium" | "high") => {
    updateStudentRisk(studentId, newLevel)
  }

  return (
    <Dialog open={!!studentId} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{student.alias}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded border ${privacyBadge.color}`}>
                  {privacyBadge.label}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded border ${riskBadge.color}`}>
                  {riskBadge.label}
                </span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-secondary/30 text-center">
              <p className="text-2xl font-bold text-foreground">{student.journalCount}</p>
              <p className="text-xs text-muted-foreground">Journals</p>
            </div>
            <div className="p-3 rounded-xl bg-secondary/30 text-center">
              <div className="flex items-center justify-center gap-1">
                <Flame className="h-4 w-4 text-warm" />
                <p className="text-2xl font-bold text-foreground">{student.streak}</p>
              </div>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div className="p-3 rounded-xl bg-secondary/30 text-center">
              <p className="text-2xl font-bold text-foreground">{sessions.length}</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
            <div className="p-3 rounded-xl bg-secondary/30 text-center">
              <p className="text-2xl font-bold text-foreground">{notes.length}</p>
              <p className="text-xs text-muted-foreground">Notes</p>
            </div>
          </div>

          {/* Mood Section */}
          <div className="p-4 rounded-xl border border-border/50 bg-secondary/30">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <span>Current Mood</span>
              <span className="text-2xl">{student.currentMood ? moodEmojis[student.currentMood] : "—"}</span>
            </h3>
            
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">7-Day Mood Trend</p>
                <div className="flex items-center gap-1">
                  {recentMoods.map((mood, i) => (
                    <div
                      key={i}
                      className="flex-1 h-8 rounded-sm bg-primary/20"
                      style={{
                        opacity: 0.3 + (mood.score / 10) * 0.7
                      }}
                      title={`${mood.mood}: ${mood.score}/10`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  {moodTrend > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : moodTrend < 0 ? (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    moodTrend > 0 ? "text-green-400" : moodTrend < 0 ? "text-red-400" : "text-muted-foreground"
                  )}>
                    {moodTrend > 0 ? "+" : ""}{moodTrend.toFixed(1)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">vs last week</p>
              </div>
            </div>
          </div>

          {/* Risk Level Management */}
          <div className="p-4 rounded-xl border border-border/50 bg-secondary/30">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Risk Level
            </h3>
            <div className="flex gap-2">
              {(["low", "medium", "high"] as const).map((level) => {
                const badge = getRiskBadge(level)
                const isActive = student.riskLevel === level
                return (
                  <button
                    key={level}
                    onClick={() => handleRiskUpdate(level)}
                    className={cn(
                      "flex-1 py-2 rounded-lg border transition-all",
                      isActive
                        ? badge.color + " ring-2 ring-offset-2 ring-offset-card"
                        : "border-border/50 bg-secondary/50 text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    {badge.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Activity Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border/50 bg-secondary/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Last Active</span>
              </div>
              <p className="font-medium text-foreground">{formatRelativeTime(student.lastActive)}</p>
            </div>
            <div className="p-4 rounded-xl border border-border/50 bg-secondary/30">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Today&apos;s Habits</span>
              </div>
              <p className="font-medium text-foreground">{student.habitsCompletedToday}/{student.totalHabits} completed</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onAddNote(studentId)}
            >
              <FileText className="h-4 w-4 mr-2" />
              Add Note
            </Button>
            <Button variant="outline" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Session
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
