"use client"

import { Plus, FileText, Bell, BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const actions = [
  {
    href: "/counsellor/sessions/new",
    label: "Start New Session",
    description: "Begin an unscheduled session",
    icon: Plus,
    color: "text-primary",
    bgColor: "bg-primary/10",
    hoverBg: "hover:bg-primary/20",
  },
  {
    href: "/counsellor/notes",
    label: "Add Notes",
    description: "Document session insights",
    icon: FileText,
    color: "text-accent",
    bgColor: "bg-accent/10",
    hoverBg: "hover:bg-accent/20",
  },
  {
    href: "/counsellor/requests",
    label: "Review Requests",
    description: "3 pending requests",
    icon: Bell,
    color: "text-warm",
    bgColor: "bg-warm/10",
    hoverBg: "hover:bg-warm/20",
  },
  {
    href: "/counsellor/reports",
    label: "View Reports",
    description: "Analytics & insights",
    icon: BarChart3,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    hoverBg: "hover:bg-chart-4/20",
  },
]

export function QuickActions() {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card 
              className={`p-5 border-border/50 ${action.hoverBg} hover:border-primary/30 transition-all duration-300 cursor-pointer group`}
            >
              <div className={`w-12 h-12 rounded-xl ${action.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <h3 className="font-medium text-foreground">{action.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
