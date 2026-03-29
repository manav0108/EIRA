"use client"

import { ArrowRight, Lock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface PriorityAlertsProps {
  onSelectStudent: (studentId: string) => void
}

const alerts = [
  {
    id: "5",
    alias: "Silent_Echo",
    riskLevel: "high",
    reason: "High stress detected in recent entries",
    category: "Stress",
  },
  {
    id: "6",
    alias: "Dusk_Walker",
    riskLevel: "medium",
    reason: "Low activity for 5 days",
    category: "Engagement",
  },
  {
    id: "7",
    alias: "Cloud_Nine",
    riskLevel: "low",
    reason: "Mood trend declining",
    category: "Mood",
  },
]

const riskColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-green-500/20 text-green-400 border-green-500/30",
}

const riskLabels = {
  high: "High Risk",
  medium: "Medium",
  low: "Low",
}

export function PriorityAlerts({ onSelectStudent }: PriorityAlertsProps) {
  return (
    <Card className="border-border/50 h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Students Needing Attention</CardTitle>
        <CardAction>
          <Link href="/counsellor/students">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onSelectStudent(alert.id)}
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {alert.alias}
                  </button>
                  <Lock className="h-3 w-3 text-muted-foreground" aria-label="Anonymous User" />
                  <Badge variant="outline" className="text-xs">
                    {alert.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1.5">
                  {alert.reason}
                </p>
              </div>
              <Badge 
                className={`${riskColors[alert.riskLevel as keyof typeof riskColors]} shrink-0`}
              >
                {riskLabels[alert.riskLevel as keyof typeof riskLabels]}
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3 w-full"
              onClick={() => onSelectStudent(alert.id)}
            >
              View Profile
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
