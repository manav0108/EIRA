"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/contexts/app-context"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  MessageSquare,
  Settings,
  User,
  Clock,
} from "lucide-react"
import { getCounsellorById, getStudentById } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function SessionRoomModal() {
  const { activeSession, endSession, setActiveSession } = useApp()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const [sessionNotes, setSessionNotes] = useState("")

  // Timer
  useEffect(() => {
    if (!activeSession) return
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [activeSession])

  if (!activeSession) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const isCounsellor = user?.role === "counselor"
  const otherParty = isCounsellor
    ? getStudentById(activeSession.studentId)
    : getCounsellorById(activeSession.counsellorId)

  const handleEndSession = () => {
    endSession(activeSession.id, sessionNotes)
    toast({
      title: "Session ended",
      description: "The session has been marked as completed.",
    })
    setShowEndConfirm(false)
    setSessionTime(0)
    setSessionNotes("")
  }

  const handleClose = () => {
    setActiveSession(null)
    setSessionTime(0)
  }

  return (
    <Dialog open={!!activeSession} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl h-[85vh] p-0 bg-background border-border overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">
                  {isCounsellor 
                    ? (otherParty as ReturnType<typeof getStudentById>)?.alias || "Student"
                    : (otherParty as ReturnType<typeof getCounsellorById>)?.name || "Counsellor"}
                </h2>
                <p className="text-sm text-muted-foreground">{activeSession.topic || "Wellness Session"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <Clock className="h-4 w-4 text-red-400" />
                <span className="text-sm font-mono text-red-300">{formatTime(sessionTime)}</span>
              </div>
            </div>
          </div>

          {/* Main Video Area */}
          <div className="flex-1 relative bg-black/50">
            {/* Main Video (Other person) */}
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-card to-background flex items-center justify-center">
              {isVideoOff ? (
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Video is off</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <User className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">
                    {isCounsellor 
                      ? (otherParty as ReturnType<typeof getStudentById>)?.alias
                      : (otherParty as ReturnType<typeof getCounsellorById>)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              )}
            </div>

            {/* Self Video (Picture in Picture) */}
            <div className="absolute bottom-8 right-8 w-48 h-36 rounded-xl bg-card border border-border overflow-hidden shadow-lg">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-card">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">You</p>
                </div>
              </div>
            </div>

            {/* Chat Sidebar */}
            {showChat && (
              <div className="absolute top-4 right-4 bottom-20 w-80 rounded-xl bg-card border border-border shadow-lg overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-foreground">Session Chat</h3>
                </div>
                <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-120px)]">
                  <div className="text-center text-sm text-muted-foreground py-8">
                    Chat messages will appear here
                  </div>
                </div>
                <div className="p-3 border-t border-border">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full px-3 py-2 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="px-6 py-4 border-t border-border bg-card">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-12 h-12 rounded-full",
                  isMuted ? "bg-red-500/20 text-red-400" : "bg-secondary hover:bg-secondary/80"
                )}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-12 h-12 rounded-full",
                  isVideoOff ? "bg-red-500/20 text-red-400" : "bg-secondary hover:bg-secondary/80"
                )}
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-12 h-12 rounded-full",
                  showChat ? "bg-primary/20 text-primary" : "bg-secondary hover:bg-secondary/80"
                )}
                onClick={() => setShowChat(!showChat)}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80"
              >
                <Settings className="h-5 w-5" />
              </Button>

              <Button
                className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white"
                onClick={() => setShowEndConfirm(true)}
              >
                <Phone className="h-5 w-5 rotate-135" />
              </Button>
            </div>
          </div>
        </div>

        {/* End Session Confirmation */}
        {showEndConfirm && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-2xl p-6 max-w-md mx-4">
              <h3 className="text-xl font-semibold text-foreground mb-2">End Session?</h3>
              <p className="text-muted-foreground mb-4">
                Are you sure you want to end this session? The session will be marked as completed.
              </p>

              {isCounsellor && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Session Notes (Optional)
                  </label>
                  <textarea
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    placeholder="Add notes about this session..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowEndConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  onClick={handleEndSession}
                >
                  End Session
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
