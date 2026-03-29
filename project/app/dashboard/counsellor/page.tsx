"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useApp } from "@/contexts/app-context"
import { CounsellorStats } from "@/components/counsellor-dashboard/counsellor-stats"
import { CounsellorTodaySessions } from "@/components/counsellor-dashboard/counsellor-today-sessions"
import { CounsellorAlerts } from "@/components/counsellor-dashboard/counsellor-alerts"
import { CounsellorStudentList } from "@/components/counsellor-dashboard/counsellor-student-list"
import { CounsellorNotes } from "@/components/counsellor-dashboard/counsellor-notes"
import { CounsellorQuickActions } from "@/components/counsellor-dashboard/counsellor-quick-actions"
import { StudentDetailModal } from "@/components/modals/student-detail-modal"
import { AddNoteModal } from "@/components/modals/add-note-modal"
import { SessionRoomModal } from "@/components/modals/session-room-modal"
import { Sun, Moon, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CounsellorDashboardPage() {
  const { user } = useAuth()
  const { alerts, activeSession } = useApp()
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  const [showAddNote, setShowAddNote] = useState(false)
  const [noteStudentId, setNoteStudentId] = useState<string | null>(null)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: "Good morning", icon: Sun }
    if (hour < 18) return { text: "Good afternoon", icon: Sun }
    return { text: "Good evening", icon: Moon }
  }

  const greeting = getGreeting()
  const GreetingIcon = greeting.icon
  const unresolvedAlerts = alerts.filter(a => !a.resolved).length

  const handleAddNoteForStudent = (studentId: string) => {
    setNoteStudentId(studentId)
    setShowAddNote(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-10 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <GreetingIcon className="h-5 w-5 text-warm" />
                  <span className="text-sm">{greeting.text}</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Welcome, <span className="text-primary">{user?.name?.split(" ").slice(1).join(" ") || "Counsellor"}</span>
                </h1>
                <p className="text-muted-foreground mt-2">
                  You have {alerts.filter(a => !a.resolved && a.severity === "high").length} high-priority alerts and{" "}
                  {/* Count today's sessions - simplified for demo */}
                  3 sessions today
                </p>
              </div>

              {/* Alerts Badge */}
              {unresolvedAlerts > 0 && (
                <Button variant="outline" className="gap-2 border-destructive/50 text-destructive hover:bg-destructive/10">
                  <Bell className="h-4 w-4" />
                  {unresolvedAlerts} Alerts
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <CounsellorStats />

          {/* Quick Actions */}
          <CounsellorQuickActions onAddNote={() => setShowAddNote(true)} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column - Sessions */}
            <div className="lg:col-span-2">
              <CounsellorTodaySessions onSelectStudent={setSelectedStudentId} />
            </div>

            {/* Right Column - Alerts */}
            <div>
              <CounsellorAlerts onSelectStudent={setSelectedStudentId} />
            </div>
          </div>

          {/* Second Row - Students & Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <CounsellorStudentList 
              onSelectStudent={setSelectedStudentId} 
              onAddNote={handleAddNoteForStudent}
            />
            <CounsellorNotes />
          </div>
        </div>
      </div>

      {/* Modals */}
      <StudentDetailModal 
        studentId={selectedStudentId} 
        onClose={() => setSelectedStudentId(null)}
        onAddNote={handleAddNoteForStudent}
      />
      <AddNoteModal 
        open={showAddNote} 
        onOpenChange={setShowAddNote}
        defaultStudentId={noteStudentId}
      />
      {activeSession && <SessionRoomModal />}
    </div>
  )
}
