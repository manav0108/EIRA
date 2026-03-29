"use client"

import { useState } from "react"
import { CalendarCheck } from "lucide-react"
import { SpecialistCard } from "@/components/specialist-card"
import { BookingForm } from "@/components/booking-form"

const specialists = [
  {
    id: "1",
    name: "Dr. Emily Watson",
    title: "Clinical Psychologist",
    expertise: ["Anxiety", "Depression", "Stress Management"],
    rating: 4.9,
    reviews: 127,
    available: true,
  },
  {
    id: "2",
    name: "Mark Thompson",
    title: "Student Counselor",
    expertise: ["Academic Stress", "Career Guidance", "Life Transitions"],
    rating: 4.8,
    reviews: 89,
    available: true,
  },
  {
    id: "3",
    name: "Dr. Lisa Chen",
    title: "Wellness Coach",
    expertise: ["Mindfulness", "Work-Life Balance", "Self-Care"],
    rating: 4.7,
    reviews: 64,
    available: false,
  },
  {
    id: "4",
    name: "Dr. James Miller",
    title: "Psychiatric Consultant",
    expertise: ["Medication Management", "Severe Depression", "Bipolar Disorder"],
    rating: 4.9,
    reviews: 156,
    available: true,
  },
]

export default function BookSessionPage() {
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null)

  const selectedSpecialistData = specialists.find(s => s.id === selectedSpecialist)

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <CalendarCheck className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Book a Session</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Connect with a <span className="text-primary">Specialist</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our team of qualified mental health professionals and book a session that works for you.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specialists List */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Select a Specialist</h2>
            <div className="space-y-3">
              {specialists.map((specialist) => (
                <SpecialistCard
                  key={specialist.id}
                  {...specialist}
                  selected={selectedSpecialist === specialist.id}
                  onSelect={() => setSelectedSpecialist(specialist.id)}
                />
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <BookingForm specialist={selectedSpecialistData?.name || null} />
          </div>
        </div>
      </div>
    </div>
  )
}
