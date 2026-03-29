import { Heart, Target, Users, Shield, Sparkles, Globe, User } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach every interaction with empathy and understanding.",
    gradient: "from-pink-500/10 to-red-500/10",
    iconColor: "text-pink-400",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Your privacy and security are our top priorities.",
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Mental wellness support should be available to everyone.",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-400",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Leveraging technology to make mental health care more effective.",
    gradient: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-400",
  },
]

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Founder & CEO",
    bio: "Clinical psychologist with 15 years of experience in student mental health.",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Product",
    bio: "Former Google engineer passionate about mental wellness technology.",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Clinical Director",
    bio: "Board-certified psychiatrist specializing in anxiety and depression.",
  },
  {
    name: "James Park",
    role: "Head of Engineering",
    bio: "Building scalable mental health platforms for over a decade.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Mission</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            EIRA is dedicated to making mental wellness accessible, affordable, and stigma-free 
            for students everywhere. We believe every student deserves support on their wellness journey.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div id="mission" className="p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 glow-cyan">
              <Target className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              To empower students with the tools, resources, and support they need to maintain their 
              mental wellness throughout their academic journey. We combine AI-powered support with 
              professional care to provide comprehensive, accessible mental health resources.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
            <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
              <Globe className="h-7 w-7 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              A world where every student has immediate access to mental health support when they need it. 
              We envision campuses where mental wellness is prioritized alongside academic success, 
              creating healthier, more resilient communities.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
          </div>
          <div className="prose prose-invert mx-auto">
            <p className="text-muted-foreground leading-relaxed mb-4">
              EIRA was born from a simple observation: too many students struggle in silence. 
              Our founders, having experienced the challenges of student life firsthand, recognized 
              the gap between the mental health support students need and what was actually available.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In 2024, we launched EIRA with a small team and a big vision. Starting with just 
              a chatbot and basic assessments, we quickly grew as students embraced our platform. 
              Their feedback shaped every feature we built.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, EIRA represents the evolution of our platform. We&apos;ve integrated 
              AI companions, professional support networks, campus partnerships, and comprehensive 
              wellness tools - all while keeping the student experience at the heart of everything we do.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className={`p-6 rounded-2xl border border-border/50 bg-gradient-to-br ${value.gradient} text-center`}
              >
                <div className={`w-12 h-12 rounded-xl bg-card/80 flex items-center justify-center mx-auto mb-4 ${value.iconColor}`}>
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div id="team">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">The people behind EIRA</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-2xl border border-border/50 bg-card/80 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 rounded-2xl border border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
          <h3 className="text-2xl font-bold text-foreground mb-4">Join Our Mission</h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            {`Whether you're a student seeking support or an institution looking to partner, 
            we'd love to hear from you.`}
          </p>
        </div>
      </div>
    </div>
  )
}
