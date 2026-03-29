"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { CounsellorSidebar } from "@/components/counsellor/counsellor-sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Video, MessageSquare, MapPin, Plus } from "lucide-react"

const upcomingSessions = [
  { id: "1", alias: "User_4821", date: "Today", time: "10:00 AM", mode: "video", type: "Follow-up" },
  { id: "2", alias: "MindFlow_92", date: "Today", time: "11:30 AM", mode: "in-person", type: "Check-in" },
  { id: "3", alias: "Serenity_X", date: "Today", time: "2:00 PM", mode: "chat", type: "Assessment" },
  { id: "4", alias: "Calm_Wave", date: "Tomorrow", time: "9:00 AM", mode: "video", type: "Initial" },
  { id: "5", alias: "Cloud_Nine", date: "Tomorrow", time: "3:00 PM", mode: "video", type: "Follow-up" },
]

const pastSessions = [
  { id: "6", alias: "User_4821", date: "Mar 25", time: "10:00 AM", mode: "video", notes: "Good progress" },
  { id: "7", alias: "Silent_Echo", date: "Mar 24", time: "2:00 PM", mode: "chat", notes: "Needs follow-up" },
  { id: "8", alias: "MindFlow_92", date: "Mar 23", time: "11:00 AM", mode: "in-person", notes: "Anxiety discussed" },
]

const modeIcons = { video: Video, chat: MessageSquare, "in-person": MapPin }

export default function SessionsPage() {
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
            <h1 className="text-3xl font-bold text-foreground">Sessions</h1>
            <p className="text-muted-foreground mt-1">Manage your counselling sessions</p>
          </div>
          <Button className="gap-2 bg-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
            New Session
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingSessions.map((session) => {
              const ModeIcon = modeIcons[session.mode as keyof typeof modeIcons]
              return (
                <Card key={session.id} className="border-border/50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{session.alias}</p>
                        <p className="text-sm text-muted-foreground">{session.date} at {session.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="gap-1">
                        <ModeIcon className="h-3 w-3" />
                        {session.mode}
                      </Badge>
                      <Badge variant="secondary">{session.type}</Badge>
                      <Button size="sm">Start Session</Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastSessions.map((session) => {
              const ModeIcon = modeIcons[session.mode as keyof typeof modeIcons]
              return (
                <Card key={session.id} className="border-border/50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{session.alias}</p>
                        <p className="text-sm text-muted-foreground">{session.date} at {session.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="gap-1">
                        <ModeIcon className="h-3 w-3" />
                        {session.mode}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{session.notes}</span>
                      <Button variant="outline" size="sm">View Notes</Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="border-border/50 p-8">
              <div className="text-center text-muted-foreground">
                <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Calendar view coming soon</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
