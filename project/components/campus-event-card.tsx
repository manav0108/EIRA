import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CampusEventCardProps {
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  type: "workshop" | "seminar" | "support-group" | "activity"
}

const typeColors = {
  workshop: "from-purple-500/10 to-pink-500/10",
  seminar: "from-cyan-500/10 to-blue-500/10",
  "support-group": "from-green-500/10 to-emerald-500/10",
  activity: "from-orange-500/10 to-yellow-500/10",
}

const typeLabels = {
  workshop: "Workshop",
  seminar: "Seminar",
  "support-group": "Support Group",
  activity: "Activity",
}

export function CampusEventCard({
  title,
  description,
  date,
  time,
  location,
  attendees,
  type,
}: CampusEventCardProps) {
  return (
    <div className={`flex flex-col p-5 rounded-2xl border border-border/50 bg-gradient-to-br ${typeColors[type]} transition-all duration-300 hover:border-primary/30`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-card/80 text-primary">
          {typeLabels[type]}
        </span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          <span>{attendees} attending</span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{description}</p>
      
      <div className="space-y-2 text-xs text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3 text-primary" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-primary" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3 text-primary" />
          <span>{location}</span>
        </div>
      </div>

      <Button variant="outline" size="sm" className="w-full border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30">
        Register
      </Button>
    </div>
  )
}
