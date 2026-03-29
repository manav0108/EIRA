"use client"

import { Activity, Zap, Clock, CheckCircle } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const metrics = [
  {
    label: "Avg Response Time",
    value: "1.2s",
    target: "< 2s",
    progress: 85,
    icon: Clock,
    status: "good",
  },
  {
    label: "Active Users",
    value: "324",
    target: "26% of total",
    progress: 26,
    icon: Activity,
    status: "normal",
  },
  {
    label: "Session Success Rate",
    value: "98.5%",
    target: "> 95%",
    progress: 98,
    icon: CheckCircle,
    status: "excellent",
  },
  {
    label: "System Uptime",
    value: "99.9%",
    target: "> 99%",
    progress: 100,
    icon: Zap,
    status: "excellent",
  },
]

const statusColors = {
  excellent: "text-green-400",
  good: "text-primary",
  normal: "text-accent",
  warning: "text-warm",
}

export function SystemHealth() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">System Health</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-4 rounded-xl bg-secondary/30 border border-border/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <metric.icon
                  className={`h-4 w-4 ${statusColors[metric.status as keyof typeof statusColors]}`}
                />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <div className="mt-2">
                <Progress value={metric.progress} className="h-1" />
                <p className="text-xs text-muted-foreground mt-1">{metric.target}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
