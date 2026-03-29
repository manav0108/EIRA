"use client"

import { Plus, MessageSquare, Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatSession {
  id: string
  title: string
  timestamp: string
  preview: string
}

interface ChatSidebarProps {
  sessions: ChatSession[]
  activeSession: string | null
  onSelectSession: (id: string) => void
  onNewChat: () => void
}

export function ChatSidebar({ sessions, activeSession, onSelectSession, onNewChat }: ChatSidebarProps) {
  return (
    <div className="flex flex-col h-full w-64 border-r border-border bg-sidebar">
      <div className="p-4 border-b border-sidebar-border">
        <Button
          onClick={onNewChat}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="mb-2 px-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Chats
          </h3>
        </div>
        
        <div className="space-y-1">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={cn(
                "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                activeSession === session.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
              )}
            >
              <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{session.title}</p>
                <p className="text-xs text-muted-foreground truncate">{session.preview}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{session.timestamp}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center">
          Chats are stored locally for your privacy
        </p>
      </div>
    </div>
  )
}
