"use client"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, Video, Building2, Phone, CheckCircle, User } from "lucide-react"
import { mockCounsellors, type Session } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface BookSessionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookSessionModal({ open, onOpenChange }: BookSessionModalProps) {
  const { bookSession } = useApp()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    counsellorId: "",
    date: "",
    time: "",
    type: "video" as Session["type"],
    topic: "",
  })

  const handleSubmit = async () => {
    if (!formData.counsellorId || !formData.date || !formData.time) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const scheduledAt = new Date(`${formData.date}T${formData.time}`).toISOString()

    bookSession({
      studentId: "s1", // Demo student
      counsellorId: formData.counsellorId,
      scheduledAt,
      duration: 45,
      type: formData.type,
      status: "scheduled",
      topic: formData.topic || "Wellness Session",
    })

    setIsSubmitting(false)
    setStep(3) // Success step

    toast({
      title: "Session booked!",
      description: "You'll receive a confirmation email shortly.",
    })
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form after close animation
    setTimeout(() => {
      setStep(1)
      setFormData({
        counsellorId: "",
        date: "",
        time: "",
        type: "video",
        topic: "",
      })
    }, 300)
  }

  const availableCounsellors = mockCounsellors.filter(c => c.availability !== "offline")

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {step === 1 && "Select a Counsellor"}
            {step === 2 && "Choose Date & Time"}
            {step === 3 && "Booking Confirmed!"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === 1 && "Choose a counsellor based on your needs"}
            {step === 2 && "Select a convenient time for your session"}
            {step === 3 && "Your session has been scheduled"}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Select Counsellor */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-3">
              {availableCounsellors.map((counsellor) => (
                <button
                  key={counsellor.id}
                  onClick={() => setFormData({ ...formData, counsellorId: counsellor.id })}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                    formData.counsellorId === counsellor.id
                      ? "border-primary bg-primary/10"
                      : "border-border/50 bg-secondary/30 hover:border-primary/30"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground">{counsellor.name}</h3>
                        <span className={cn(
                          "px-2 py-0.5 text-xs rounded-full",
                          counsellor.availability === "available"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        )}>
                          {counsellor.availability}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{counsellor.title}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {counsellor.specializations.slice(0, 3).map(spec => (
                          <span key={spec} className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-muted-foreground">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!formData.counsellorId}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Session Type</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "video", label: "Video", icon: Video },
                  { id: "in-person", label: "In-Person", icon: Building2 },
                  { id: "phone", label: "Phone", icon: Phone },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: option.id as Session["type"] })}
                    className={cn(
                      "p-3 rounded-xl border text-center transition-all",
                      formData.type === option.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-primary/30"
                    )}
                  >
                    <option.icon className="h-5 w-5 mx-auto mb-1" />
                    <span className="text-xs">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Topic (Optional)</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="What would you like to discuss?"
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!formData.date || !formData.time || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? "Booking..." : "Book Session"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Session Booked!</h3>
            <p className="text-muted-foreground mb-6">
              Your session with {mockCounsellors.find(c => c.id === formData.counsellorId)?.name} has been confirmed.
            </p>
            <Button onClick={handleClose} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
