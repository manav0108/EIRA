"use client"

import { Lock, Eye, UserPlus, Flag, MoreHorizontal } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const users = [
  {
    id: "1",
    alias: "Anonymous_4821",
    privacyStatus: "anonymous",
    riskLevel: "high",
    activityStatus: "active",
    counsellor: "Dr. Sarah Chen",
  },
  {
    id: "2",
    alias: "Mindful_User",
    privacyStatus: "custom",
    riskLevel: "low",
    activityStatus: "active",
    counsellor: "Dr. Michael Park",
  },
  {
    id: "3",
    alias: "User_7392",
    privacyStatus: "anonymous",
    riskLevel: "medium",
    activityStatus: "inactive",
    counsellor: "Unassigned",
  },
  {
    id: "4",
    alias: "Serene_Wave",
    privacyStatus: "shared",
    riskLevel: "low",
    activityStatus: "active",
    counsellor: "Dr. Emily Wong",
  },
]

const privacyColors = {
  anonymous: "bg-primary/20 text-primary border-primary/30",
  custom: "bg-accent/20 text-accent border-accent/30",
  shared: "bg-chart-4/20 text-chart-4 border-chart-4/30",
}

const riskColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-green-500/20 text-green-400 border-green-500/30",
}

const activityColors = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  inactive: "bg-muted text-muted-foreground border-border",
}

export function UserManagement() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">User Management</CardTitle>
        <CardAction>
          <Button size="sm" variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-muted-foreground uppercase tracking-wide border-b border-border">
                <th className="pb-3 font-medium">Alias / ID</th>
                <th className="pb-3 font-medium">Privacy</th>
                <th className="pb-3 font-medium">Risk</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Counsellor</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{user.alias}</span>
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant="outline"
                      className={privacyColors[user.privacyStatus as keyof typeof privacyColors]}
                    >
                      {user.privacyStatus === "anonymous" && "Anonymous"}
                      {user.privacyStatus === "custom" && "Custom Alias"}
                      {user.privacyStatus === "shared" && "Shared"}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant="outline"
                      className={riskColors[user.riskLevel as keyof typeof riskColors]}
                    >
                      {user.riskLevel.charAt(0).toUpperCase() + user.riskLevel.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant="outline"
                      className={activityColors[user.activityStatus as keyof typeof activityColors]}
                    >
                      {user.activityStatus.charAt(0).toUpperCase() + user.activityStatus.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">{user.counsellor}</td>
                  <td className="py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <UserPlus className="h-4 w-4" />
                          Assign Counsellor
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Flag className="h-4 w-4" />
                          Flag User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
