"use client"

import { X, Lock, TrendingUp, TrendingDown, Activity, Calendar, FileText, Brain } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

interface StudentProfileProps {
  studentId: string
  onClose: () => void
}

// Mock student data
const mockStudentData: Record<string, {
  alias: string
  riskLevel: string
  moodTrend: "up" | "down" | "stable"
  avgMood: number
  habitCompletion: number
  lastActive: string
  journalInsight: string
  sessions: { date: string; type: string; notes: string }[]
  notes: { date: string; content: string }[]
}> = {
  "1": {
    alias: "User_4821",
    riskLevel: "low",
    moodTrend: "up",
    avgMood: 7.2,
    habitCompletion: 85,
    lastActive: "2 hours ago",
    journalInsight: "Showing positive progress with stress management techniques. Sleep patterns improving.",
    sessions: [
      { date: "Mar 25", type: "Video", notes: "Discussed exam anxiety" },
      { date: "Mar 18", type: "Chat", notes: "Weekly check-in" },
      { date: "Mar 11", type: "Video", notes: "Initial assessment" },
    ],
    notes: [
      { date: "Mar 25", content: "Making good progress with breathing exercises" },
      { date: "Mar 18", content: "Recommended journaling daily" },
    ],
  },
  "2": {
    alias: "MindFlow_92",
    riskLevel: "medium",
    moodTrend: "stable",
    avgMood: 5.8,
    habitCompletion: 60,
    lastActive: "1 day ago",
    journalInsight: "Consistent engagement but showing signs of academic pressure. Consider workload discussion.",
    sessions: [
      { date: "Mar 24", type: "In-Person", notes: "Anxiety management" },
      { date: "Mar 17", type: "Video", notes: "Follow-up session" },
    ],
    notes: [
      { date: "Mar 24", content: "Suggested time management strategies" },
    ],
  },
  "5": {
    alias: "Silent_Echo",
    riskLevel: "high",
    moodTrend: "down",
    avgMood: 3.4,
    habitCompletion: 25,
    lastActive: "3 days ago",
    journalInsight: "Significant mood decline detected. Multiple stress indicators present. Priority follow-up needed.",
    sessions: [
      { date: "Mar 20", type: "Video", notes: "Urgent check-in" },
    ],
    notes: [
      { date: "Mar 20", content: "Need to schedule follow-up urgently" },
    ],
  },
}

const riskColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-green-500/20 text-green-400 border-green-500/30",
}

export function StudentProfile({ studentId, onClose }: StudentProfileProps) {
  const student = mockStudentData[studentId] || mockStudentData["1"]

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] border-border overflow-hidden">
        <CardHeader className="border-b border-border bg-card sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {student.alias.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>{student.alias}</CardTitle>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                    Anonymous User
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Last active: {student.lastActive}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <CardContent className="p-6 space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <Activity className="h-4 w-4" />
                  Risk Level
                </div>
                <Badge className={riskColors[student.riskLevel as keyof typeof riskColors]}>
                  {student.riskLevel.charAt(0).toUpperCase() + student.riskLevel.slice(1)}
                </Badge>
              </div>
              
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  {student.moodTrend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : student.moodTrend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  ) : (
                    <Activity className="h-4 w-4 text-amber-400" />
                  )}
                  Mood Trend
                </div>
                <p className="text-xl font-semibold text-foreground">{student.avgMood}/10</p>
              </div>
              
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                <div className="text-muted-foreground text-sm mb-2">Habit Completion</div>
                <Progress value={student.habitCompletion} className="h-2 mt-2" />
                <p className="text-sm text-foreground mt-1">{student.habitCompletion}%</p>
              </div>
              
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <Calendar className="h-4 w-4" />
                  Sessions
                </div>
                <p className="text-xl font-semibold text-foreground">{student.sessions.length}</p>
              </div>
            </div>

            {/* AI Insight */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Brain className="h-5 w-5" />
                <span className="font-medium">AI Journal Insight</span>
              </div>
              <p className="text-sm text-foreground/80">{student.journalInsight}</p>
            </div>

            {/* Session History */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Session History
              </h3>
              <div className="space-y-2">
                {student.sessions.map((session, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/20 border border-border/20">
                    <div className="text-sm text-muted-foreground w-16">{session.date}</div>
                    <Badge variant="outline" className="text-xs">{session.type}</Badge>
                    <p className="text-sm text-foreground flex-1">{session.notes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Timeline */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-accent" />
                Notes Timeline
              </h3>
              <div className="space-y-2">
                {student.notes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-lg bg-secondary/20 border border-border/20">
                    <div className="text-sm text-muted-foreground w-16 shrink-0">{note.date}</div>
                    <p className="text-sm text-foreground">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Start Session
              </Button>
              <Button variant="outline" className="flex-1">
                Add Note
              </Button>
              <Button variant="outline">
                View Full History
              </Button>
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  )
}
