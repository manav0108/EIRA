import Link from "next/link"
import { CheckCircle, Circle, BookOpen, ClipboardList, Calendar, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const todaysTasks = [
  {
    id: 1,
    title: "Journal for 5 minutes",
    description: "Express your thoughts and feelings",
    icon: BookOpen,
    completed: true,
    href: "/journal",
  },
  {
    id: 2,
    title: "Take one assessment",
    description: "Check in with your mental wellness",
    icon: ClipboardList,
    completed: false,
    href: "/assessments",
  },
  {
    id: 3,
    title: "Talk to AI companion",
    description: "Share what's on your mind",
    icon: MessageCircle,
    completed: false,
    href: "/chat",
  },
  {
    id: 4,
    title: "Book a session",
    description: "Connect with a professional",
    icon: Calendar,
    completed: false,
    href: "/book-session",
  },
]

export function WellnessPlan() {
  return (
    <section className="py-16 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{`Today's Wellness Plan`}</h2>
            <p className="mt-2 text-muted-foreground">Small steps lead to big changes</p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Progress</p>
                  <p className="text-2xl font-bold text-foreground">1 of 4 completed</p>
                </div>
                <div className="h-16 w-16 rounded-full border-4 border-primary flex items-center justify-center glow-cyan">
                  <span className="text-lg font-bold text-primary">25%</span>
                </div>
              </div>
            </div>

            <div className="divide-y divide-border/50">
              {todaysTasks.map((task) => (
                <div key={task.id} className="p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors">
                  <button className="flex-shrink-0">
                    {task.completed ? (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                  </button>
                  <div className={`p-2 rounded-lg bg-secondary ${task.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                    <task.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {task.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                  {!task.completed && (
                    <Link href={task.href}>
                      <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                        Start
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
