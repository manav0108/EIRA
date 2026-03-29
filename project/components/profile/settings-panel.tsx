"use client"

import { useState } from "react"
import { Bell, Shield, Download, LogOut, ChevronRight } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function SettingsPanel() {
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    weeklyReports: true,
    supportMessages: true,
  })

  const [privacy, setPrivacy] = useState({
    shareProgress: false,
    anonymousData: true,
  })

  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <div className="rounded-xl border border-border/50 bg-card/80 overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Notification Preferences</h3>
        </div>
        <div className="divide-y divide-border/50">
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Daily Reminders</p>
              <p className="text-sm text-muted-foreground">Get daily wellness check-in reminders</p>
            </div>
            <Switch
              checked={notifications.dailyReminders}
              onCheckedChange={(checked) => setNotifications({ ...notifications, dailyReminders: checked })}
            />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Weekly Reports</p>
              <p className="text-sm text-muted-foreground">Receive weekly wellness summary emails</p>
            </div>
            <Switch
              checked={notifications.weeklyReports}
              onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
            />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Support Messages</p>
              <p className="text-sm text-muted-foreground">Notifications for counselor responses</p>
            </div>
            <Switch
              checked={notifications.supportMessages}
              onCheckedChange={(checked) => setNotifications({ ...notifications, supportMessages: checked })}
            />
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="rounded-xl border border-border/50 bg-card/80 overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center gap-3">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Privacy Settings</h3>
        </div>
        <div className="divide-y divide-border/50">
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Share Progress</p>
              <p className="text-sm text-muted-foreground">Allow campus counselors to view your progress</p>
            </div>
            <Switch
              checked={privacy.shareProgress}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, shareProgress: checked })}
            />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Anonymous Data</p>
              <p className="text-sm text-muted-foreground">Help improve EIRA with anonymous usage data</p>
            </div>
            <Switch
              checked={privacy.anonymousData}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, anonymousData: checked })}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="rounded-xl border border-border/50 bg-card/80 overflow-hidden">
        <button className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
          <div className="flex items-center gap-3">
            <Download className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="font-medium text-foreground">Export My Data</p>
              <p className="text-sm text-muted-foreground">Download all your wellness data</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="border-t border-border/50">
          <button className="w-full p-4 flex items-center justify-between hover:bg-destructive/10 transition-colors">
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5 text-destructive" />
              <div className="text-left">
                <p className="font-medium text-destructive">Logout</p>
                <p className="text-sm text-muted-foreground">Sign out of your account</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
