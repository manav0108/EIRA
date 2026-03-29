"use client"

import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Check, User, Clock } from "lucide-react"
import { getStudentById, formatRelativeTime } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface CounsellorAlertsProps {
  onSelectStudent: (id: string) => void
}

export function CounsellorAlerts({ onSelectStudent }: CounsellorAlertsProps) {
  const { alerts, resolveAlert } = useApp()
  const { toast } = useToast()

  const unresolvedAlerts = alerts
    .filter(a => !a.resolved)
    .sort((a, b) => {
      // Sort by severity (high first) then by date
      const severityOrder = { high: 0, medium: 1, low: 2 }
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity]
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    .slice(0, 5)

  const handleResolve = (alertId: string) => {
    resolveAlert(alertId)
    toast({
      title: "Alert resolved",
      description: "The alert has been marked as resolved.",
    })
  }

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500/50 bg-red-500/10"
      case "medium":
        return "border-yellow-500/50 bg-yellow-500/10"
      default:
        return "border-blue-500/50 bg-blue-500/10"
    }
  }

  const getAlertTypeIcon = (type: string) => {
    return AlertTriangle
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 glass overflow-hidden">
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Priority Alerts</h2>
              <p className="text-xs text-muted-foreground">{unresolvedAlerts.length} unresolved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {unresolvedAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Check className="h-10 w-10 text-green-400 mx-auto mb-3" />
            <p className="text-muted-foreground">All alerts resolved</p>
          </div>
        ) : (
          <div className="space-y-3">
            {unresolvedAlerts.map((alert) => {
              const student = getStudentById(alert.studentId)
              const AlertIcon = getAlertTypeIcon(alert.type)

              return (
                <div
                  key={alert.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-200",
                    getSeverityStyle(alert.severity)
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-lg shrink-0",
                      alert.severity === "high" ? "bg-red-500/20" :
                      alert.severity === "medium" ? "bg-yellow-500/20" : "bg-blue-500/20"
                    )}>
                      <AlertIcon className={cn(
                        "h-4 w-4",
                        alert.severity === "high" ? "text-red-400" :
                        alert.severity === "medium" ? "text-yellow-400" : "text-blue-400"
                      )} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div 
                        className="cursor-pointer"
                        onClick={() => student && onSelectStudent(student.id)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">
                            {student?.alias || "Unknown"}
                          </span>
                          <span className={cn(
                            "px-1.5 py-0.5 text-xs rounded-full",
                            alert.severity === "high" ? "bg-red-500/20 text-red-300" :
                            alert.severity === "medium" ? "bg-yellow-500/20 text-yellow-300" : "bg-blue-500/20 text-blue-300"
                          )}>
                            {alert.severity}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {alert.message}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(alert.createdAt)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResolve(alert.id)}
                          className="text-xs h-7 px-2 text-green-400 hover:text-green-300 hover:bg-green-500/10"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
