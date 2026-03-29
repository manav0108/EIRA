"use client"

import { Eye, Settings } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const counsellors = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    initials: "SC",
    activeStudents: 24,
    sessionsToday: 5,
    performance: 92,
    status: "available",
  },
  {
    id: "2",
    name: "Dr. Michael Park",
    initials: "MP",
    activeStudents: 18,
    sessionsToday: 4,
    performance: 88,
    status: "in-session",
  },
  {
    id: "3",
    name: "Dr. Emily Wong",
    initials: "EW",
    activeStudents: 21,
    sessionsToday: 6,
    performance: 95,
    status: "available",
  },
  {
    id: "4",
    name: "Dr. James Liu",
    initials: "JL",
    activeStudents: 15,
    sessionsToday: 3,
    performance: 85,
    status: "offline",
  },
]

const statusColors = {
  available: "bg-green-500/20 text-green-400 border-green-500/30",
  "in-session": "bg-primary/20 text-primary border-primary/30",
  offline: "bg-muted text-muted-foreground border-border",
}

export function CounsellorManagement() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Counsellor Management</CardTitle>
        <CardAction>
          <Button size="sm" variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {counsellors.map((counsellor) => (
            <div
              key={counsellor.id}
              className="p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 bg-primary/20 border border-primary/30">
                  <AvatarFallback className="bg-transparent text-primary font-semibold">
                    {counsellor.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">{counsellor.name}</h3>
                    <Badge
                      variant="outline"
                      className={statusColors[counsellor.status as keyof typeof statusColors]}
                    >
                      {counsellor.status === "in-session"
                        ? "In Session"
                        : counsellor.status.charAt(0).toUpperCase() + counsellor.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Active Students</p>
                      <p className="font-semibold text-foreground">{counsellor.activeStudents}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sessions Today</p>
                      <p className="font-semibold text-foreground">{counsellor.sessionsToday}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Performance</span>
                      <span className="text-foreground font-medium">{counsellor.performance}%</span>
                    </div>
                    <Progress value={counsellor.performance} className="h-1.5" />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Settings className="h-3 w-3" />
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
