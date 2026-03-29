"use client"

import { useApp } from "@/contexts/app-context"
import { Users, Calendar, AlertTriangle, CheckCircle } from "lucide-react"

export function CounsellorStats() {
  const { students, sessions, alerts } = useApp()

  // Calculate stats for the counsellor (c1 is demo counsellor)
  const assignedStudents = students.filter(s => s.assignedCounsellorId === "c1")
  const todaysSessions = sessions.filter(s => {
    const sessionDate = new Date(s.scheduledAt)
    const today = new Date()
    return s.counsellorId === "c1" && 
           sessionDate.toDateString() === today.toDateString() &&
           s.status !== "cancelled"
  })
  const highRiskStudents = assignedStudents.filter(s => s.riskLevel === "high")
  const unresolvedAlerts = alerts.filter(a => !a.resolved)

  const stats = [
    {
      label: "Assigned Students",
      value: assignedStudents.length,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "+2 this week",
    },
    {
      label: "Today's Sessions",
      value: todaysSessions.length,
      icon: Calendar,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      trend: `${todaysSessions.filter(s => s.status === "completed").length} completed`,
    },
    {
      label: "High Risk Cases",
      value: highRiskStudents.length,
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      trend: "Needs attention",
    },
    {
      label: "Pending Alerts",
      value: unresolvedAlerts.length,
      icon: CheckCircle,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      trend: "Review required",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-5 rounded-xl border border-border/50 bg-card/50 glass transition-all duration-200 hover:bg-card/80"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          <p className="text-xs text-muted-foreground/70 mt-2">{stat.trend}</p>
        </div>
      ))}
    </div>
  )
}
