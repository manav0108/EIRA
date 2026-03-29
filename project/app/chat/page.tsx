"use client"

import { useState } from "react"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockSessions = [
  {
    id: "1",
    title: "Feeling stressed about exams",
    timestamp: "2 hours ago",
    preview: "I understand exam stress can be overwhelming...",
  },
  {
    id: "2",
    title: "Anxiety management",
    timestamp: "Yesterday",
    preview: "Let's try some breathing exercises...",
  },
  {
    id: "3",
    title: "General check-in",
    timestamp: "3 days ago",
    preview: "It's great that you're taking time to check in...",
  },
]

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSession, setActiveSession] = useState<string | null>(null)

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed bottom-4 left-4 z-50 bg-card border border-border shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } mt-16 lg:mt-0`}
      >
        <ChatSidebar
          sessions={mockSessions}
          activeSession={activeSession}
          onSelectSession={(id) => {
            setActiveSession(id)
            setSidebarOpen(false)
          }}
          onNewChat={() => {
            setActiveSession(null)
            setSidebarOpen(false)
          }}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat Window */}
      <div className="flex-1 bg-background">
        <ChatWindow />
      </div>
    </div>
  )
}
