import { CheckCircle2, BookOpen, Brain, Trophy, Flame } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const progressData = [
  {
    icon: CheckCircle2,
    title: "Mood Check-ins",
    value: 12,
    total: 14,
    unit: "this week",
    streak: 5,
    color: "text-cyan-400",
    progressColor: "bg-cyan-500",
  },
  {
    icon: BookOpen,
    title: "Daily Journal",
    value: 8,
    total: 10,
    unit: "entries",
    streak: 3,
    color: "text-purple-400",
    progressColor: "bg-purple-500",
  },
  {
    icon: Brain,
    title: "Mindfulness",
    value: 45,
    total: 60,
    unit: "minutes",
    streak: 7,
    color: "text-green-400",
    progressColor: "bg-green-500",
  },
  {
    icon: Trophy,
    title: "Wellness Score",
    value: 78,
    total: 100,
    unit: "points",
    streak: null,
    color: "text-yellow-400",
    progressColor: "bg-yellow-500",
  },
]

export function ProgressCards() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Your Progress</h2>
          <p className="mt-2 text-muted-foreground">Track your wellness journey and achievements</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {progressData.map((item) => (
            <div
              key={item.title}
              className="relative p-6 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-secondary ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                {item.streak && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/10 text-orange-400">
                    <Flame className="h-3 w-3" />
                    <span className="text-xs font-medium">{item.streak}</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{item.title}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-foreground">{item.value}</span>
                <span className="text-sm text-muted-foreground">/ {item.total} {item.unit}</span>
              </div>
              
              <Progress 
                value={(item.value / item.total) * 100} 
                className="h-2 bg-secondary"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
