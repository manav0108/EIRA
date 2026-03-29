"use client"

import { Users, UserCog, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

const stats = [
  {
    label: "Total Students",
    value: "1,248",
    change: "+12%",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Active Counsellors",
    value: "18",
    change: "+2",
    icon: UserCog,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Sessions Completed",
    value: "3,456",
    change: "+8%",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    label: "High-Risk Users",
    value: "23",
    change: "-5%",
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    label: "Engagement Rate",
    value: "78%",
    change: "+4%",
    icon: TrendingUp,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function AdminStatCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="p-4 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              <p className={`text-xs mt-1 ${stat.change.startsWith("+") ? "text-green-500" : "text-red-400"}`}>
                {stat.change} this month
              </p>
            </div>
            <div
              className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
