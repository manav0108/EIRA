import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  gradient?: string
  iconColor?: string
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  gradient = "from-primary/10 to-accent/10",
  iconColor = "text-primary",
}: ServiceCardProps) {
  return (
    <div className={`group relative flex flex-col p-6 rounded-2xl border border-border/50 bg-gradient-to-br ${gradient} transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10`}>
      <div className={`p-4 rounded-xl bg-card/80 mb-4 w-fit ${iconColor}`}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 flex-1">{description}</p>
      <Link href={href}>
        <Button variant="outline" className="w-full border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30">
          Learn More
        </Button>
      </Link>
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
    </div>
  )
}
