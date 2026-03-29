"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminStatCards } from "@/components/admin/admin-stat-cards"
import { AdminAnalytics } from "@/components/admin/admin-analytics"
import { CriticalCases } from "@/components/admin/critical-cases"
import { UserManagement } from "@/components/admin/user-management"
import { CounsellorManagement } from "@/components/admin/counsellor-management"
import { SystemHealth } from "@/components/admin/system-health"
import { Bell, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
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

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Platform overview, analytics, and system health
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users, counsellors..."
                className="pl-9 w-64 bg-card border-border"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <AdminStatCards />

        {/* Analytics Section */}
        <div className="mt-8">
          <AdminAnalytics />
        </div>

        {/* Critical Cases */}
        <div className="mt-8">
          <CriticalCases />
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <UserManagement />
          <CounsellorManagement />
        </div>

        {/* System Health */}
        <div className="mt-8">
          <SystemHealth />
        </div>
      </div>
    </div>
  )
}
