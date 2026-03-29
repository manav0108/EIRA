"use client"

import Link from "next/link"
import { BookOpen, Bot, Calendar, ClipboardCheck, Moon, HeartPulse } from "lucide-react"

interface StudentQuickActionsProps {
  onBookSession: () => void
}

const actions = [
  {
    href: "/journal",
    icon: BookOpen,
    title: "Write Journal",
    description: "Express your thoughts",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    href: "/chat",
    icon: Bot,
    title: "AI Support",
    description: "Chat with EIRA",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-primary",
  },
  {
    onClick: "bookSession",
    icon: Calendar,
    title: "Book Session",
    description: "Talk to a counsellor",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    href: "/assessments",
    icon: ClipboardCheck,
    title: "Self Assessment",
    description: "Check your wellness",
    gradient: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-400",
  },
  {
    href: "#focus",
    icon: Moon,
    title: "Focus Mode",
    description: "Minimize distractions",
    gradient: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-400",
  },
  {
    href: "/support",
    icon: HeartPulse,
    title: "Emergency Help",
    description: "Get immediate support",
    gradient: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-400",
  },
]

export function StudentQuickActions({ onBookSession }: StudentQuickActionsProps) {
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

          if (action.onClick === "bookSession") {
            return (
              <button
                key={action.title}
                onClick={onBookSession}
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
