"use client"

import Link from "next/link"
import { FileText, Calendar, Users, BarChart3, MessageSquare, Bell } from "lucide-react"

interface CounsellorQuickActionsProps {
  onAddNote: () => void
}

const actions = [
  {
    onClick: "addNote",
    icon: FileText,
    title: "Add Note",
    description: "Record observations",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    href: "/counsellor/sessions",
    icon: Calendar,
    title: "Schedule",
    description: "Manage sessions",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    href: "/counsellor/students",
    icon: Users,
    title: "Students",
    description: "View all students",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-primary",
  },
  {
    href: "/counsellor/reports",
    icon: BarChart3,
    title: "Reports",
    description: "View analytics",
    gradient: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-400",
  },
  {
    href: "/chat",
    icon: MessageSquare,
    title: "Messages",
    description: "Student messages",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
  },
  {
    href: "/counsellor/requests",
    icon: Bell,
    title: "Requests",
    description: "Session requests",
    gradient: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-400",
  },
]

export function CounsellorQuickActions({ onAddNote }: CounsellorQuickActionsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action) => {
          const content = (
            <>
              <div className={`p-3 rounded-xl bg-card/80 ${action.iconColor}`}>
                <action.icon className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-medium text-foreground">{action.title}</h3>
              <p className="text-xs text-muted-foreground">{action.description}</p>
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
            </>
          )

          if (action.onClick === "addNote") {
            return (
              <button
                key={action.title}
                onClick={onAddNote}
                className={`group relative flex flex-col items-center p-4 rounded-xl border border-border/50 bg-gradient-to-br ${action.gradient} transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 text-center`}
              >
                {content}
              </button>
            )
          }

          return (
            <Link
              key={action.title}
              href={action.href!}
              className={`group relative flex flex-col items-center p-4 rounded-xl border border-border/50 bg-gradient-to-br ${action.gradient} transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5`}
            >
              {content}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
