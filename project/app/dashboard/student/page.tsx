"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useApp } from "@/contexts/app-context"
import { StudentMoodCheckin } from "@/components/student/student-mood-checkin"
import { StudentHabits } from "@/components/student/student-habits"
import { StudentUpcomingSessions } from "@/components/student/student-upcoming-sessions"
import { StudentJournalPreview } from "@/components/student/student-journal-preview"
import { StudentAISuggestions } from "@/components/student/student-ai-suggestions"
import { StudentQuickActions } from "@/components/student/student-quick-actions"
import { StudentWellnessScore } from "@/components/student/student-wellness-score"
import { BookSessionModal } from "@/components/modals/book-session-modal"
import { SessionRoomModal } from "@/components/modals/session-room-modal"
import { Sun, Moon, Sparkles } from "lucide-react"

export default function StudentDashboard() {
  const { user } = useAuth()
  const { currentStudentMood, currentStudentStreak, activeSession } = useApp()
  const [showBookModal, setShowBookModal] = useState(false)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: "Good morning", icon: Sun }
    if (hour < 18) return { text: "Good afternoon", icon: Sun }
    return { text: "Good evening", icon: Moon }
  }

  const greeting = getGreeting()
  const GreetingIcon = greeting.icon

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <GreetingIcon className="h-5 w-5 text-warm" />
                  <span className="text-sm">{greeting.text}</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Welcome back, <span className="text-primary">{user?.name?.split(" ")[0]}</span>
                </h1>
                <p className="text-muted-foreground mt-2 max-w-xl">
                  {currentStudentMood 
                    ? `You're feeling ${currentStudentMood} today. Let's make it a great day!`
                    : "How are you feeling today? Take a moment to check in with yourself."}
                </p>
              </div>

              {/* Streak Badge */}
              <div className="hidden lg:flex items-center gap-3 px-4 py-3 rounded-xl bg-card/80 border border-border/50 glass">
                <div className="p-2 rounded-lg bg-warm/20">
                  <Sparkles className="h-5 w-5 text-warm" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{currentStudentStreak}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>

            {/* Mood Check-in */}
            <StudentMoodCheckin />
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Quick Actions */}
          <StudentQuickActions onBookSession={() => setShowBookModal(true)} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column - Habits & Wellness */}
            <div className="lg:col-span-2 space-y-6">
              <StudentHabits />
              <StudentJournalPreview />
            </div>

            {/* Right Column - Sessions & AI */}
            <div className="space-y-6">
              <StudentWellnessScore />
              <StudentUpcomingSessions onBookSession={() => setShowBookModal(true)} />
              <StudentAISuggestions />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookSessionModal open={showBookModal} onOpenChange={setShowBookModal} />
      {activeSession && <SessionRoomModal />}
    </div>
  )
}
