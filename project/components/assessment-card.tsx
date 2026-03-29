import { LucideIcon, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AssessmentCardProps {
  icon: LucideIcon
  title: string
  description: string
  duration: string
  questions: number
  gradient?: string
  iconColor?: string
  onStart?: () => void
}

export function AssessmentCard({
  icon: Icon,
  title,
  description,
  duration,
  questions,
  gradient = "from-primary/10 to-accent/10",
  iconColor = "text-primary",
  onStart,
}: AssessmentCardProps) {
  return (
    <div className={`group flex flex-col p-6 rounded-2xl border border-border/50 bg-gradient-to-br ${gradient} transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10`}>
      <div className={`p-4 rounded-xl bg-card/80 mb-4 w-fit ${iconColor} group-hover:scale-110 transition-transform`}>
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{description}</p>
      
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{duration}</span>
        </div>
        <div className="h-1 w-1 rounded-full bg-muted-foreground" />
        <span>{questions} questions</span>
      </div>

      <Button 
        onClick={onStart}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
      >
        Start Quiz
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
