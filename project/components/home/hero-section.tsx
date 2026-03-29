import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles, MessageCircle, ClipboardList } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Premium Brand Lockup - Centered Vertical Stack */}
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <Image
              src="/logo.png"
              alt="EIRA 2.0 Logo"
              width={120}
              height={120}
              priority
              className="mb-6"
            />
            
            {/* EIRA Text */}
            <h1 className="text-4xl font-bold text-primary tracking-wider mb-4">
              EIRA
            </h1>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Student Mental Wellness Platform</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            Your Mental Health Journey{" "}
            <span className="text-primary">Starts Here</span>
          </h1>

          {/* Subtext */}
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Access personalized support, guided journaling, self-assessments, and campus wellness resources. 
            EIRA is your safe space for mental wellness.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/book-session">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan gap-2">
                <ClipboardList className="h-5 w-5" />
                Book a Demo
              </Button>
            </Link>
            <Link href="/assessments">
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary gap-2">
                <Sparkles className="h-5 w-5" />
                Take a Quiz
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" variant="ghost" className="text-primary hover:bg-primary/10 gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat with AI
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>24/7 Support Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span>Student-Friendly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
