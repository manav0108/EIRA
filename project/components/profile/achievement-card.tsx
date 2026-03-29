import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AchievementCardProps {
  icon: LucideIcon
  title: string
  description: string
  earned: boolean
  date?: string
}

export function AchievementCard({
  icon: Icon,
  title,
  description,
  earned,
  date,
}: AchievementCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl border transition-all duration-200",
        earned
          ? "border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02]"
          : "border-border/50 bg-card/50 opacity-60 hover:opacity-80"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            earned ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={cn("font-semibold", earned ? "text-foreground" : "text-muted-foreground")}>
            {title}
          </h4>
          <p className="text-xs text-muted-foreground">{description}</p>
          {earned && date && (
            <p className="text-xs text-primary mt-1">Earned {date}</p>
          )}
        </div>
      </div>
    </div>
  )
}
