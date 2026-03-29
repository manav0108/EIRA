"use client"

import { Lock, AlertTriangle } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const criticalCases = [
  {
    id: "1",
    alias: "Anonymous_4821",
    riskLevel: "high",
    reason: "Severe anxiety indicators in recent assessments",
    assignedCounsellor: "Dr. Sarah Chen",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    alias: "User_7392",
    riskLevel: "high",
    reason: "Crisis keywords detected in journal",
    assignedCounsellor: "Dr. Michael Park",
    lastActive: "30 minutes ago",
  },
  {
    id: "3",
    alias: "Mindful_203",
    riskLevel: "medium",
    reason: "No activity for 7 days, previously active daily",
    assignedCounsellor: "Dr. Emily Wong",
    lastActive: "7 days ago",
  },
  {
    id: "4",
    alias: "Serene_Wave",
    riskLevel: "medium",
    reason: "Declining mood trend over 2 weeks",
    assignedCounsellor: "Dr. Sarah Chen",
    lastActive: "1 day ago",
  },
]

const riskColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-green-500/20 text-green-400 border-green-500/30",
}

export function CriticalCases() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-lg font-semibold">
            Students Needing Immediate Attention
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {criticalCases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-all duration-200"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-foreground">{caseItem.alias}</span>
                <Lock className="h-3 w-3 text-muted-foreground" />
                <Badge className={riskColors[caseItem.riskLevel as keyof typeof riskColors]}>
                  {caseItem.riskLevel === "high" ? "High Risk" : "Medium Risk"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{caseItem.reason}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span>Assigned: {caseItem.assignedCounsellor}</span>
                <span>Last active: {caseItem.lastActive}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Review
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
