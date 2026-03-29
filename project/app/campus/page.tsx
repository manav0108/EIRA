import { Building2, GraduationCap, Calendar, Users, Shield, Clock, CheckCircle } from "lucide-react"
import { CampusEventCard } from "@/components/campus-event-card"
import { Button } from "@/components/ui/button"

const campusEvents = [
  {
    title: "Stress Management Workshop",
    description: "Learn practical techniques to manage academic stress and maintain balance.",
    date: "April 2, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "Student Center, Room 201",
    attendees: 45,
    type: "workshop" as const,
  },
  {
    title: "Mindfulness Meditation Session",
    description: "Guided meditation session for beginners. No experience needed.",
    date: "April 5, 2026",
    time: "12:00 PM - 1:00 PM",
    location: "Campus Garden",
    attendees: 28,
    type: "activity" as const,
  },
  {
    title: "Anxiety Support Circle",
    description: "A safe space to share experiences and coping strategies with peers.",
    date: "April 7, 2026",
    time: "5:00 PM - 6:30 PM",
    location: "Wellness Center",
    attendees: 12,
    type: "support-group" as const,
  },
  {
    title: "Mental Health Awareness Seminar",
    description: "Expert speakers discuss mental health topics and campus resources.",
    date: "April 10, 2026",
    time: "3:00 PM - 5:00 PM",
    location: "Main Auditorium",
    attendees: 150,
    type: "seminar" as const,
  },
]

const whyIntegrate = [
  {
    icon: Shield,
    title: "Safe & Confidential",
    description: "All student data is protected and sessions are completely confidential.",
  },
  {
    icon: Clock,
    title: "Convenient Access",
    description: "Access wellness resources directly from your student portal anytime.",
  },
  {
    icon: Users,
    title: "Peer Support",
    description: "Connect with trained student wellness ambassadors on campus.",
  },
  {
    icon: GraduationCap,
    title: "Academic Success",
    description: "Mental wellness directly supports better academic performance.",
  },
]

export default function CampusPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Campus Wellness</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Campus <span className="text-primary">Integration</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access your university&apos;s wellness programs, campus counseling, and student-specific mental health resources.
          </p>
        </div>

        {/* Student Portal Card */}
        <div className="rounded-2xl border border-border/50 bg-gradient-to-r from-primary/10 to-accent/10 p-8 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 glow-cyan">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">Student Portal</h2>
              <p className="text-muted-foreground mb-4">
                Connect your student account to access exclusive campus resources, book on-campus counseling sessions, 
                and sync your wellness data with university health services.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Connect Student Account
                </Button>
                <Button variant="outline" className="border-border hover:bg-secondary">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Campus Wellness Events */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Campus Wellness Events</h2>
              <p className="text-muted-foreground">Upcoming events and programs at your university</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>April 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {campusEvents.map((event) => (
              <CampusEventCard key={event.title} {...event} />
            ))}
          </div>
        </div>

        {/* Why Campus Integration */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Campus Integration?</h2>
            <p className="text-muted-foreground">Benefits of connecting your student account</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyIntegrate.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border border-border/50 bg-card/80 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Request Campus Access CTA */}
        <div className="rounded-2xl border border-border/50 bg-card/80 p-8 text-center">
          <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3">Request Campus Access</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            {`Is your university not yet integrated with EIRA? Let us know and we'll work to bring 
            mental wellness resources to your campus.`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Request Integration
            </Button>
            <Button variant="outline" className="border-border hover:bg-secondary">
              Contact Campus Admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
