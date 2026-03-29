"use client"

import { Video, MessageSquare, MapPin, MoreHorizontal, Lock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TodaysSessionsProps {
  onSelectStudent: (studentId: string) => void
}

const sessions = [
  {
    id: "1",
    alias: "User_4821",
    time: "10:00 AM",
    mode: "video",
    context: "Stress check-in",
    status: "scheduled",
  },
  {
    id: "2",
    alias: "MindFlow_92",
    time: "11:30 AM",
    mode: "in-person",
    context: "Anxiety management follow-up",
    status: "scheduled",
  },
  {
    id: "3",
    alias: "Serenity_X",
    time: "2:00 PM",
    mode: "chat",
    context: "Academic pressure discussion",
    status: "scheduled",
  },
  {
    id: "4",
    alias: "Calm_Wave",
    time: "3:30 PM",
    mode: "video",
    context: "Weekly wellness check",
    status: "ongoing",
  },
]

const modeIcons = {
  video: Video,
  chat: MessageSquare,
  "in-person": MapPin,
}

const modeLabels = {
  video: "Video Call",
  chat: "Chat",
  "in-person": "In-Person",
}

export function TodaysSessions({ onSelectStudent }: TodaysSessionsProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Today&apos;s Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sessions.map((session) => {
          const ModeIcon = modeIcons[session.mode as keyof typeof modeIcons]
          
          return (
            <div
              key={session.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-all duration-200"
            >
              {/* Avatar */}
              <Avatar className="h-12 w-12 bg-primary/10 border border-primary/20">
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
                    onClick={() => onSelectStudent(session.id)}
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {session.alias}
                  </button>
                  <Lock className="h-3 w-3 text-muted-foreground" aria-label="Anonymous User" />
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span>{session.time}</span>
                  <span className="flex items-center gap-1">
                    <ModeIcon className="h-3.5 w-3.5" />
                    {modeLabels[session.mode as keyof typeof modeLabels]}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{session.context}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Badge 
                  variant={session.status === "ongoing" ? "default" : "secondary"}
                  className={session.status === "ongoing" ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
                >
                  {session.status === "ongoing" ? "Ongoing" : "Scheduled"}
                </Badge>
                
                {session.mode === "video" && (
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {session.status === "ongoing" ? "Join Call" : "Start Call"}
                  </Button>
                )}
                {session.mode === "chat" && (
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Start Chat
                  </Button>
                )}
                {session.mode === "in-person" && (
                  <Button size="sm" variant="outline">
                    Check In
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onSelectStudent(session.id)}>
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>Add Notes</DropdownMenuItem>
                    <DropdownMenuItem>Reschedule</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Cancel Session</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
