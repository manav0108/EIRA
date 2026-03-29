import { Trophy, Flame, ClipboardCheck, Star } from "lucide-react"

const stats = [
  {
    icon: Trophy,
    label: "Consistency Score",
    value: "245",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Flame,
    label: "Day Streak",
    value: "12",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: ClipboardCheck,
    label: "Assessments",
    value: "8",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Star,
    label: "Engagement Level",
    value: "Advanced",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
]

export function ProfileStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-4 rounded-xl border border-border/50 bg-card/80"
        >
          <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
