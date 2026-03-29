import { AlertTriangle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmergencyBanner() {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-orange-500/10 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20">
          <AlertTriangle className="h-6 w-6 text-red-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">Emergency Support</h3>
          <p className="text-sm text-muted-foreground">
            If you or someone you know is in immediate danger, please contact emergency services immediately.
          </p>
        </div>
        <Button className="bg-red-500 hover:bg-red-600 text-white gap-2">
          <Phone className="h-4 w-4" />
          Call Emergency Services
        </Button>
      </div>
    </div>
  )
}
