"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { CounsellorSidebar } from "@/components/counsellor/counsellor-sidebar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, Calendar, Activity, Download } from "lucide-react"

const metrics = [
  { label: "Total Sessions This Month", value: "42", change: "+12%", trend: "up", icon: Calendar },
  { label: "Active Students", value: "24", change: "+3", trend: "up", icon: Users },
  { label: "Avg Session Duration", value: "45 min", change: "-5 min", trend: "down", icon: Activity },
  { label: "Student Satisfaction", value: "4.8/5", change: "+0.2", trend: "up", icon: TrendingUp },
]

const riskDistribution = [
  { level: "Low Risk", count: 18, percentage: 75, color: "bg-green-500" },
  { level: "Medium Risk", count: 4, percentage: 17, color: "bg-amber-500" },
  { level: "High Risk", count: 2, percentage: 8, color: "bg-red-500" },
]

export default function ReportsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "counselor")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "counselor") return null

  return (
    <div className="min-h-screen bg-background flex">
      <CounsellorSidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">Analytics and insights overview</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.label} className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <metric.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                    {metric.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {metric.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Distribution */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Student Risk Distribution</CardTitle>
              <CardDescription>Current wellness status of all assigned students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {riskDistribution.map((item) => (
                <div key={item.level}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">{item.level}</span>
                    <span className="text-sm text-muted-foreground">{item.count} students ({item.percentage}%)</span>
                  </div>
                  <Progress value={item.percentage} className={`h-2 [&>div]:${item.color}`} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Session Trends */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Session Trends</CardTitle>
              <CardDescription>Weekly session activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end justify-between gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                  const heights = [60, 80, 45, 90, 70, 30, 20]
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden"
                        style={{ height: `${heights[i]}%` }}
                      >
                        <div 
                          className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all"
                          style={{ height: `${heights[i] * 0.7}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{day}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Common Topics */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Common Discussion Topics</CardTitle>
              <CardDescription>Most frequently addressed concerns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { topic: "Academic Stress", sessions: 18 },
                { topic: "Anxiety", sessions: 14 },
                { topic: "Sleep Issues", sessions: 10 },
                { topic: "Relationship Concerns", sessions: 8 },
                { topic: "Time Management", sessions: 6 },
              ].map((item, i) => (
                <div key={item.topic} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-foreground">{item.topic}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.sessions} sessions</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Engagement Overview */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Student Engagement</CardTitle>
              <CardDescription>Platform activity metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { metric: "Journal Entries", value: "156", period: "this week" },
                { metric: "Mood Check-ins", value: "89", period: "this week" },
                { metric: "Habit Completions", value: "234", period: "this week" },
                { metric: "Chat Sessions", value: "12", period: "this week" },
              ].map((item) => (
                <div key={item.metric} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <span className="text-foreground">{item.metric}</span>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-foreground">{item.value}</span>
                    <span className="text-xs text-muted-foreground ml-2">{item.period}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
