"use client"

import { User, Calendar, Edit2, BookOpen, MessageCircle, ClipboardCheck, Target, Award, Zap, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ProfileStats } from "@/components/profile/profile-stats"
import { AchievementCard } from "@/components/profile/achievement-card"
import { SettingsPanel } from "@/components/profile/settings-panel"
import { useAuth } from "@/contexts/auth-context"

type ProfileData = {
  name: string
  email?: string
  joined: string
  streakDays: number
  assessmentCount: number
  progressLevel: string
}

const achievements = [
  {
    icon: BookOpen,
    title: "First Journal",
    description: "Write your first journal entry",
    earned: true,
    date: "March 15, 2026",
  },
  {
    icon: Zap,
    title: "3-Day Streak",
    description: "Use EIRA for 3 consecutive days",
    earned: true,
    date: "March 18, 2026",
  },
  {
    icon: ClipboardCheck,
    title: "First Assessment",
    description: "Complete your first wellness assessment",
    earned: true,
    date: "March 20, 2026",
  },
  {
    icon: Target,
    title: "7-Day Streak",
    description: "Use EIRA for 7 consecutive days",
    earned: false,
  },
  {
    icon: Heart,
    title: "Self-Care Pro",
    description: "Complete 10 wellness activities",
    earned: false,
  },
  {
    icon: Award,
    title: "Assessment Master",
    description: "Take all available assessments",
    earned: false,
  },
]

const recentActivity = [
  {
    icon: ClipboardCheck,
    title: "Completed PHQ-9 Assessment",
    time: "2 hours ago",
    type: "assessment",
  },
  {
    icon: BookOpen,
    title: "Wrote journal entry",
    time: "Yesterday",
    type: "journal",
  },
  {
    icon: MessageCircle,
    title: "Chat session with AI",
    time: "2 days ago",
    type: "chat",
  },
]

export default function ProfilePage() {
  const { user } = useAuth()

  // Mock profile data per user role
  const getProfileData = (): ProfileData => {
    if (!user) return { name: "User", email: "user@eira.app", joined: "March 2026", streakDays: 0, assessmentCount: 0, progressLevel: "Beginner" }
    
    const profileMap: Record<string, ProfileData> = {
      "student@eira.app": { name: "Alex Student", joined: "March 2026", streakDays: 12, assessmentCount: 8, progressLevel: "Advanced" },
      "counselor@eira.app": { name: "Dr. Sarah Chen", joined: "February 2026", streakDays: 28, assessmentCount: 15, progressLevel: "Master" },
      "admin@eira.app": { name: "Admin User", joined: "January 2026", streakDays: 45, assessmentCount: 20, progressLevel: "Expert" },
    }
    
    return profileMap[user.email] || { name: user.name, email: user.email, joined: "March 2026", streakDays: 5, assessmentCount: 2, progressLevel: "Beginner" }
  }

  const profile = getProfileData()

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="rounded-2xl border border-border/50 bg-linear-to-r from-primary/10 to-accent/10 p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center glow-cyan">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-4 border-background flex items-center justify-center">
                <span className="text-xs font-bold text-white">{profile.streakDays}</span>
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
              <p className="text-muted-foreground">{user?.email || "user@eira.app"}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {profile.joined}</span>
              </div>
            </div>
            <Button variant="outline" className="border-border hover:bg-secondary gap-2">
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <ProfileStats />
        </div>

        {/* Wellness Progress */}
        <div className="rounded-xl border border-border/50 bg-card/80 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Wellness Progress</h3>
              <p className="text-sm text-muted-foreground">65% through current milestone</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">{profile.progressLevel}</span>
              <p className="text-xs text-muted-foreground">Engagement Level</p>
            </div>
          </div>
          <Progress value={65} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Current Progress</span>
            <span>Next Milestone</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Achievements</h2>
            <div className="grid grid-cols-1 gap-3">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.title} {...achievement} />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
              <div className="rounded-xl border border-border/50 bg-card/80 divide-y divide-border/50">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-4 flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-secondary text-primary">
                      <activity.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Settings</h2>
              <SettingsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
