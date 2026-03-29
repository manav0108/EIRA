"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, Calendar } from "lucide-react"

// Mock chart data visualization using CSS
const moodData = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 72 },
  { day: "Wed", value: 58 },
  { day: "Thu", value: 80 },
  { day: "Fri", value: 75 },
  { day: "Sat", value: 85 },
  { day: "Sun", value: 78 },
]

const engagementData = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 52 },
  { day: "Wed", value: 68 },
  { day: "Thu", value: 72 },
  { day: "Fri", value: 80 },
  { day: "Sat", value: 55 },
  { day: "Sun", value: 48 },
]

const sessionData = [
  { day: "Mon", value: 12 },
  { day: "Tue", value: 18 },
  { day: "Wed", value: 24 },
  { day: "Thu", value: 20 },
  { day: "Fri", value: 28 },
  { day: "Sat", value: 8 },
  { day: "Sun", value: 5 },
]

interface ChartBarProps {
  data: { day: string; value: number }[]
  color: string
  maxValue?: number
}

function ChartBar({ data, color, maxValue = 100 }: ChartBarProps) {
  return (
    <div className="flex items-end justify-between gap-2 h-32 mt-4">
      {data.map((item) => (
        <div key={item.day} className="flex flex-col items-center flex-1">
          <div
            className={`w-full rounded-t-sm ${color} transition-all duration-300 hover:opacity-80`}
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          />
          <span className="text-xs text-muted-foreground mt-2">{item.day}</span>
        </div>
      ))}
    </div>
  )
}

const insights = [
  {
    icon: TrendingUp,
    text: "Peak stress detected during exam periods",
    color: "text-warm",
  },
  {
    icon: Clock,
    text: "Most active time: 6PM - 9PM",
    color: "text-primary",
  },
  {
    icon: Calendar,
    text: "Wednesday sees highest session bookings",
    color: "text-accent",
  },
]

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">Analytics Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Weekly Mood Trend */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Weekly Mood Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartBar data={moodData} color="bg-primary" />
          </CardContent>
        </Card>

        {/* User Engagement */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              User Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartBar data={engagementData} color="bg-accent" />
          </CardContent>
        </Card>

        {/* Session Activity */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Session Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartBar data={sessionData} color="bg-chart-4" maxValue={30} />
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
              >
                <insight.icon className={`h-5 w-5 ${insight.color}`} />
                <span className="text-sm text-foreground">{insight.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
