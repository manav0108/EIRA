import { Star, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SpecialistCardProps {
  name: string
  title: string
  expertise: string[]
  rating: number
  reviews: number
  available: boolean
  selected?: boolean
  onSelect?: () => void
}

export function SpecialistCard({
  name,
  title,
  expertise,
  rating,
  reviews,
  available,
  selected,
  onSelect,
}: SpecialistCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full p-4 rounded-xl border text-left transition-all",
        selected
          ? "border-primary bg-primary/10"
          : "border-border/50 bg-card/80 hover:border-primary/30"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <User className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-primary">{title}</p>
            </div>
            {available && (
              <span className="flex-shrink-0 px-2 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400">
                Available
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {expertise.slice(0, 3).map((item) => (
              <span
                key={item}
                className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  )
}
