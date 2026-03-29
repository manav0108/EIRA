"use client"

import { Users, Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

const stats = [
  {
    label: "Total Students",
    value: "24",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Today's Sessions",
    value: "5",
    icon: Calendar,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Upcoming",
    value: "3",
    icon: Clock,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    label: "High-Risk",
    value: "2",
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    label: "Completed",
    value: "12",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
]

export function StatCards() {
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
              <p className="text-3xl font-bold text-foreground mt-1">
                {stat.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
