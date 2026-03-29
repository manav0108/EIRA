import { Bot, ClipboardCheck, UserRound, AlertTriangle, BookOpen, Building2, CheckCircle } from "lucide-react"
import { ServiceCard } from "@/components/service-card"

const services = [
  {
    icon: Bot,
    title: "AI Companion",
    description: "Chat with our empathetic AI for instant emotional support, coping strategies, and guided conversations available 24/7.",
    href: "/chat",
    gradient: "from-cyan-500/10 to-blue-500/10",
    iconColor: "text-cyan-400",
  },
  {
    icon: ClipboardCheck,
    title: "Self Assessments",
    description: "Take scientifically-validated assessments like PHQ-9 and well-being checks to understand your mental health better.",
    href: "/assessments",
    gradient: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-400",
  },
  {
    icon: UserRound,
    title: "Doctor / Specialist Support",
    description: "Connect with licensed psychologists, counselors, and wellness coaches for professional guidance and therapy sessions.",
    href: "/book-session",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-400",
  },
  {
    icon: AlertTriangle,
    title: "Emergency SOS",
    description: "Immediate access to crisis helplines, emergency contacts, and urgent support resources when you need them most.",
    href: "/support",
    gradient: "from-red-500/10 to-orange-500/10",
    iconColor: "text-red-400",
  },
  {
    icon: BookOpen,
    title: "Guided Wellness Resources",
    description: "Explore curated articles, breathing exercises, mindfulness guides, and self-help materials for daily wellness.",
    href: "/journal",
    gradient: "from-yellow-500/10 to-amber-500/10",
    iconColor: "text-yellow-400",
  },
  {
    icon: Building2,
    title: "Campus Wellness Support",
    description: "Access your university wellness programs, campus counseling, and student-specific mental health resources.",
    href: "/campus",
    gradient: "from-teal-500/10 to-cyan-500/10",
    iconColor: "text-teal-400",
  },
]

const steps = [
  {
    number: "01",
    title: "Assess",
    description: "Take a quick assessment to understand your current mental state and identify areas for support.",
  },
  {
    number: "02",
    title: "Get Personalized Support",
    description: "Receive tailored recommendations, resources, and connect with the right professionals for your needs.",
  },
  {
    number: "03",
    title: "Take Action",
    description: "Follow your personalized wellness plan, track progress, and build lasting mental health habits.",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">Our Services</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Comprehensive <span className="text-primary">Wellness Support</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for your mental wellness journey, from AI-powered support to professional care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground">Three simple steps to start your wellness journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4 glow-cyan">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t border-dashed border-border" />
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center p-8 rounded-2xl border border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Ready to get started?</h3>
            <p className="text-muted-foreground mb-4">Take your first step towards better mental wellness today.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
