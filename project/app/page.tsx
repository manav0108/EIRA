import { HeroSection } from "@/components/home/hero-section"
import { MoodSelector } from "@/components/home/mood-selector"
import { MicroHabits } from "@/components/home/micro-habits"
import { SuggestionsFeed } from "@/components/home/suggestions-feed"
import { StudentWellness } from "@/components/home/student-wellness"
import { QuickActions } from "@/components/home/quick-actions"
import { ProgressCards } from "@/components/home/progress-cards"
import { WellnessPlan } from "@/components/home/wellness-plan"
import { GuidedResources } from "@/components/home/guided-resources"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MoodSelector />
      <MicroHabits />
      <SuggestionsFeed />
      <StudentWellness />
      <QuickActions />
      <ProgressCards />
      <WellnessPlan />
      <GuidedResources />
    </div>
  )
}
