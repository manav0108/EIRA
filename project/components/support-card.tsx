import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SupportCardProps {
  icon: LucideIcon
  title: string
  description: string
  buttonText: string
  buttonHref?: string
  available?: string
  gradient?: string
  iconColor?: string
}

export function SupportCard({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonHref,
  available,
  gradient = "from-primary/10 to-accent/10",
  iconColor = "text-primary",
}: SupportCardProps) {
  return (
    <div className={`flex flex-col p-6 rounded-2xl border border-border/50 bg-gradient-to-br ${gradient}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-xl bg-card/80 ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {available && (
            <span className="text-xs text-primary">{available}</span>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-6 flex-1">{description}</p>
      {buttonHref ? (
        <a href={buttonHref}>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {buttonText}
          </Button>
        </a>
      ) : (
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          {buttonText}
        </Button>
      )}
    </div>
  )
}
