import Link from "next/link"
import { BookOpen, Bot, Building2, ClipboardCheck } from "lucide-react"

const actions = [
  {
    href: "/journal",
    icon: BookOpen,
    title: "Write Journal",
    description: "Express your thoughts and track your emotional journey",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    href: "/chat",
    icon: Bot,
    title: "AI Support",
    description: "Chat with our AI companion for instant emotional support",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-primary",
  },
  {
    href: "/campus",
    icon: Building2,
    title: "Campus Support",
    description: "Connect with your campus wellness resources",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    href: "/assessments",
    icon: ClipboardCheck,
    title: "Assessments",
    description: "Take self-assessments to understand your mental health",
    gradient: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-400",
  },
]

export function QuickActions() {
  return (
    <section className="py-16 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Quick Actions</h2>
          <p className="mt-2 text-muted-foreground">Start your wellness journey with these tools</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`group relative flex flex-col items-center p-6 rounded-2xl border border-border/50 bg-gradient-to-br ${action.gradient} transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5`}
            >
              <div className={`p-4 rounded-xl bg-card/80 mb-4 ${action.iconColor}`}>
                <action.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{action.title}</h3>
              <p className="text-sm text-muted-foreground text-center">{action.description}</p>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
