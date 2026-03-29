"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { CounsellorSidebar } from "@/components/counsellor/counsellor-sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Lock, Filter } from "lucide-react"

const students = [
  { id: "1", alias: "User_4821", riskLevel: "low", lastActive: "2 hours ago", sessions: 5, engagement: 85 },
  { id: "2", alias: "MindFlow_92", riskLevel: "medium", lastActive: "1 day ago", sessions: 3, engagement: 60 },
  { id: "3", alias: "Serenity_X", riskLevel: "low", lastActive: "5 hours ago", sessions: 4, engagement: 78 },
  { id: "4", alias: "Calm_Wave", riskLevel: "low", lastActive: "Just now", sessions: 6, engagement: 92 },
  { id: "5", alias: "Silent_Echo", riskLevel: "high", lastActive: "3 days ago", sessions: 2, engagement: 25 },
  { id: "6", alias: "Dusk_Walker", riskLevel: "medium", lastActive: "2 days ago", sessions: 3, engagement: 45 },
  { id: "7", alias: "Cloud_Nine", riskLevel: "low", lastActive: "1 hour ago", sessions: 8, engagement: 88 },
  { id: "8", alias: "Peaceful_Mind", riskLevel: "low", lastActive: "4 hours ago", sessions: 4, engagement: 72 },
]

const riskColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-green-500/20 text-green-400 border-green-500/30",
}

export default function StudentsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "counselor")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "counselor") {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex">
      <CounsellorSidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Students</h1>
            <p className="text-muted-foreground mt-1">Manage and monitor student wellness</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-9 w-64 bg-card" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {students.map((student) => (
            <Card key={student.id} className="border-border/50 hover:border-primary/30 transition-all cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-sm font-semibold">
                        {student.alias.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base flex items-center gap-1">
                        {student.alias}
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">{student.lastActive}</p>
                    </div>
                  </div>
                  <Badge className={riskColors[student.riskLevel as keyof typeof riskColors]}>
                    {student.riskLevel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sessions: {student.sessions}</span>
                  <span className="text-muted-foreground">Engagement: {student.engagement}%</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
