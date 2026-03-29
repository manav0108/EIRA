"use client"

import { useState } from "react"
import { Calendar, Clock, Video, Building2, Phone, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface BookingFormProps {
  specialist: string | null
}

export function BookingForm({ specialist }: BookingFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    sessionType: "video",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    toast({
      title: "Booking confirmed",
      description: "Your session request has been received. We'll contact you soon with details.",
      duration: 3000,
    })
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card/80 p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
        <p className="text-muted-foreground mb-6">
          We&apos;ve sent a confirmation email with all the details. Your specialist will reach out shortly.
        </p>
        <Button onClick={() => setSubmitted(false)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Book Another Session
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 overflow-hidden">
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
        <h2 className="text-xl font-semibold text-foreground">Book Your Session</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {specialist ? `Booking with ${specialist}` : "Fill in your details to book"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Preferred Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Preferred Time</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="time"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Session Type</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "video", label: "Video Call", icon: Video },
              { id: "in-person", label: "In-Person", icon: Building2 },
              { id: "phone", label: "Phone Call", icon: Phone },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFormData({ ...formData, sessionType: option.id })}
                className={`p-3 rounded-xl border text-center transition-all ${
                  formData.sessionType === option.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-primary/30"
                }`}
              >
                <option.icon className="h-5 w-5 mx-auto mb-1" />
                <span className="text-xs">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Message (Optional)</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us briefly what you'd like to discuss..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan py-6">
          Book Demo Session
        </Button>
      </form>

      {/* What to Expect */}
      <div className="p-6 border-t border-border/50 bg-secondary/30">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">What to Expect</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>A confirmation email will be sent within 24 hours</li>
              <li>Sessions typically last 45-60 minutes</li>
              <li>Your first session focuses on understanding your needs</li>
              <li>All sessions are completely confidential</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
