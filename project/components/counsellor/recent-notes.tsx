"use client"

import { ArrowRight, FileText, Lock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const notes = [
  {
    id: "1",
    studentAlias: "MindFlow_92",
    title: "Follow-up: Anxiety Management",
    preview: "Student showed improvement in breathing exercises. Discussed new coping strategies...",
    date: "Today, 11:30 AM",
    type: "session",
  },
  {
    id: "2",
    studentAlias: "Serenity_X",
    title: "Crisis Response Note",
    preview: "Immediate intervention required. Student reported severe stress due to academic pressure...",
    date: "Today, 9:15 AM",
    type: "urgent",
  },
  {
    id: "3",
    studentAlias: "User_4821",
    title: "Weekly Check-in Summary",
    preview: "Overall positive progress. Mood has stabilized. Continuing current wellness plan...",
    date: "Yesterday",
    type: "session",
  },
  {
    id: "4",
    studentAlias: "Calm_Wave",
    title: "Initial Assessment",
    preview: "First session completed. Identified key areas: sleep quality, social connections...",
    date: "2 days ago",
    type: "assessment",
  },
]

const typeColors = {
  session: "bg-primary/20 text-primary border-primary/30",
  urgent: "bg-destructive/20 text-destructive border-destructive/30",
  assessment: "bg-accent/20 text-accent border-accent/30",
}

export function RecentNotes() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Recent Notes</CardTitle>
        <CardAction>
          <Link href="/counsellor/notes">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{note.title}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                  <span>{note.studentAlias}</span>
                  <Lock className="h-3 w-3" />
                  <span className="text-muted-foreground/60">|</span>
                  <span>{note.date}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{note.preview}</p>
              </div>
              <Badge variant="outline" className={typeColors[note.type as keyof typeof typeColors]}>
                {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
