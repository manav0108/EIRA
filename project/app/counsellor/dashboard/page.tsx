"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CounsellorSidebar } from "@/components/counsellor/counsellor-sidebar"
import { DashboardHeader } from "@/components/counsellor/dashboard-header"
import { StatCards } from "@/components/counsellor/stat-cards"
import { TodaysSessions } from "@/components/counsellor/todays-sessions"
import { PriorityAlerts } from "@/components/counsellor/priority-alerts"
import { QuickActions } from "@/components/counsellor/quick-actions"
import { StudentProfile } from "@/components/counsellor/student-profile"

export default function CounsellorDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "counselor")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    )
  }

  if (!user || user.role !== "counselor") {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <CounsellorSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <DashboardHeader counsellorName={user.name} />

        {/* Stat Cards */}
        <StatCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Today's Sessions - Takes 2 columns */}
          <div className="lg:col-span-2">
            <TodaysSessions onSelectStudent={setSelectedStudent} />
          </div>

          {/* Priority Alerts */}
          <div className="lg:col-span-1">
            <PriorityAlerts onSelectStudent={setSelectedStudent} />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Student Profile Modal */}
        {selectedStudent && (
          <StudentProfile 
            studentId={selectedStudent} 
            onClose={() => setSelectedStudent(null)} 
          />
        )}
      </div>
    </div>
  )
}
