"use client"

import { ArrowRight, Lock, Smile, Meh, Frown, MessageSquare, Calendar } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

interface AssignedStudentsProps {
  onSelectStudent: (studentId: string) => void
}

const students = [
  {
    id: "1",
    alias: "User_4821",
    mood: "positive",
    riskLevel: "low",
    lastActive: "2 hours ago",
    nextSession: "Tomorrow 10:00 AM",
  },
  {
    id: "2",
    alias: "MindFlow_92",
    mood: "neutral",
    riskLevel: "medium",
    lastActive: "1 day ago",
    nextSession: "Today 2:00 PM",
  },
  {
    id: "3",
    alias: "Serenity_X",
    mood: "negative",
    riskLevel: "high",
    lastActive: "3 hours ago",
    nextSession: "None scheduled",
  },
  {
    id: "4",
    alias: "Calm_Wave",
    mood: "positive",
    riskLevel: "low",
    lastActive: "30 minutes ago",
    nextSession: "Friday 3:00 PM",
  },
  {
    id: "5",
    alias: "Silent_Echo",
    mood: "neutral",
    riskLevel: "medium",
    lastActive: "5 days ago",
    nextSession: "None scheduled",
  },
]

const moodIcons = {
  positive: Smile,
  neutral: Meh,
  negative: Frown,
}

const moodColors = {
  positive: "text-green-400",
  neutral: "text-amber-400",
  negative: "text-red-400",
}

const riskColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-green-500/20 text-green-400 border-green-500/30",
}

export function AssignedStudents({ onSelectStudent }: AssignedStudentsProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Assigned Students</CardTitle>
        <CardAction>
          <Link href="/counsellor/students">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {students.map((student) => {
          const MoodIcon = moodIcons[student.mood as keyof typeof moodIcons]

          return (
            <div
              key={student.id}
              className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-all duration-200"
            >
              {/* Avatar */}
              <Avatar className="h-10 w-10 bg-primary/10 border border-primary/20">
                <AvatarFallback className="bg-transparent flex items-center justify-center p-0">
                  <img
                    src="/logo.png"
                    alt="EIRA Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectStudent(student.id)}
                    className="font-medium text-foreground hover:text-primary transition-colors text-sm"
                  >
                    {student.alias}
                  </button>
                  <Lock className="h-3 w-3 text-muted-foreground" />
                  <MoodIcon className={`h-4 w-4 ${moodColors[student.mood as keyof typeof moodColors]}`} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Active: {student.lastActive}
                </p>
              </div>

              {/* Risk Badge */}
              <Badge
                variant="outline"
                className={`text-xs ${riskColors[student.riskLevel as keyof typeof riskColors]}`}
              >
                {student.riskLevel.charAt(0).toUpperCase() + student.riskLevel.slice(1)}
              </Badge>

              {/* Quick Actions */}
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
