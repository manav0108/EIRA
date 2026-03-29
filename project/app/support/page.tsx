import { Phone, MessageCircle, HeartHandshake, Globe, Building2, Shield } from "lucide-react"
import { EmergencyBanner } from "@/components/emergency-banner"
import { SupportCard } from "@/components/support-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const supportOptions = [
  {
    icon: Phone,
    title: "24/7 Helpline",
    description: "Speak with a trained counselor anytime, day or night. Completely confidential and free.",
    buttonText: "Call Now",
    buttonHref: "tel:988",
    available: "Available 24/7",
    gradient: "from-cyan-500/10 to-blue-500/10",
    iconColor: "text-cyan-400",
  },
  {
    icon: MessageCircle,
    title: "Live Chat Support",
    description: "Connect with our support team via text chat if you prefer not to call. Same great support, different medium.",
    buttonText: "Start Chat",
    available: "Available 24/7",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-400",
  },
]

const emergencyContacts = [
  {
    name: "24/7 Emergency Helpline",
    number: "Call Emergency Services",
    description: "Immediate crisis support available day or night",
    icon: Phone,
  },
  {
    name: "Mental Health Support Chat",
    description: "Connect with trained counselors via text chat",
    icon: MessageCircle,
  },
  {
    name: "Community Mental Health Services",
    number: "Contact Your Local Provider",
    description: "Access local counseling and support services",
    icon: HeartHandshake,
  },
  {
    name: "International Crisis Centers",
    number: "findahelpline.com",
    description: "Global directory of mental health resources",
    icon: Globe,
  },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Support Center</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {`You're Not Alone`}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help is available. Whether you need someone to talk to or immediate crisis support, we&apos;re here for you.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="mb-12">
          <EmergencyBanner />
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {supportOptions.map((option) => (
            <SupportCard key={option.title} {...option} />
          ))}
        </div>

        {/* Need Help Right Now */}
        <div className="rounded-2xl border border-border/50 bg-gradient-to-r from-primary/10 to-accent/10 p-8 mb-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Need Help Right Now?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {`If you're in crisis or having thoughts of self-harm, please reach out immediately. 
            Trained professionals are ready to help you.`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan gap-2">
              <Phone className="h-5 w-5" />
              Contact Emergency Services
            </Button>
            <Link href="/chat">
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat with AI
              </Button>
            </Link>
          </div>
        </div>

        {/* Emergency Resources */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Emergency Resources</h2>
            <p className="text-muted-foreground">Mental health support available to you</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.name}
                className="flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-card/80"
              >
                <div className="p-3 rounded-lg bg-secondary text-primary">
                  <contact.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{contact.name}</h3>
                  <p className="text-primary font-medium">{contact.number}</p>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Support Link */}
        <div className="mt-12 p-6 rounded-2xl border border-border/50 bg-card/80 flex flex-col sm:flex-row items-center gap-4">
          <div className="p-4 rounded-xl bg-secondary text-primary">
            <Building2 className="h-8 w-8" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-foreground">Looking for Campus Support?</h3>
            <p className="text-sm text-muted-foreground">Access your university&apos;s wellness programs and counseling services.</p>
          </div>
          <Link href="/campus">
            <Button variant="outline" className="border-border hover:bg-primary/10 hover:text-primary">
              Campus Wellness
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
