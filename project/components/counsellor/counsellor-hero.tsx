"use client"

import Image from "next/image"
import { Bell, Search, Settings, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface CounsellorHeroProps {
  counsellorName: string
}

export function CounsellorHero({ counsellorName }: CounsellorHeroProps) {
  const firstName = counsellorName.split(" ")[0]
  const currentHour = new Date().getHours()
  const greeting =
    currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening"

  return (
    <section className="relative overflow-hidden py-12">
      {/* Background glow effects - same as home hero */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between">
          {/* Left: Welcome message */}
          <div className="flex items-center gap-6">
            <Image
              src="/logo.png"
              alt="EIRA Logo"
              width={80}
              height={80}
              className="opacity-90"
            />
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  variant="outline"
                  className="bg-primary/10 border-primary/30 text-primary gap-1"
                >
                  <Shield className="h-3 w-3" />
                  Counsellor Panel
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {greeting}, <span className="text-primary">{firstName}</span>
              </h1>
              <p className="mt-2 text-muted-foreground max-w-xl">
                Here&apos;s your overview for today. Monitor student wellness, manage sessions, and
                respond to priority alerts.
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-9 w-64 bg-card border-border"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Quick status indicators */}
        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>Online and Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>5 Sessions Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-destructive" />
            <span>2 Priority Alerts</span>
          </div>
        </div>
      </div>
    </section>
  )
}
