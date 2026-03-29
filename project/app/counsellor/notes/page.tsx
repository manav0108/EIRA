"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { CounsellorSidebar } from "@/components/counsellor/counsellor-sidebar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, FileText, Lock } from "lucide-react"

const notes = [
  { id: "1", alias: "User_4821", date: "Mar 28, 2026", title: "Progress on stress management", preview: "Student showing improvement with breathing exercises..." },
  { id: "2", alias: "Silent_Echo", date: "Mar 27, 2026", title: "Urgent follow-up needed", preview: "Detected concerning patterns in recent journal entries..." },
  { id: "3", alias: "MindFlow_92", date: "Mar 26, 2026", title: "Anxiety coping strategies", preview: "Discussed new techniques for managing exam anxiety..." },
  { id: "4", alias: "Serenity_X", date: "Mar 25, 2026", title: "Weekly check-in summary", preview: "Overall positive mood trend. Continue current approach..." },
  { id: "5", alias: "Calm_Wave", date: "Mar 24, 2026", title: "Initial assessment notes", preview: "First session completed. Primary concerns include..." },
]

export default function NotesPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "counselor")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "counselor") return null

  return (
    <div className="min-h-screen bg-background flex">
      <CounsellorSidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notes</h1>
            <p className="text-muted-foreground mt-1">Session notes and documentation</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search notes..." className="pl-9 w-64 bg-card" />
            </div>
            <Button className="gap-2 bg-primary text-primary-foreground">
              <Plus className="h-4 w-4" />
              New Note
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {notes.map((note) => (
            <Card key={note.id} className="border-border/50 hover:border-primary/30 transition-all cursor-pointer">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-primary font-medium flex items-center gap-1">
                      {note.alias}
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </span>
                    <span className="text-xs text-muted-foreground">{note.date}</span>
                  </div>
                  <CardTitle className="text-base mb-1">{note.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{note.preview}</CardDescription>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
