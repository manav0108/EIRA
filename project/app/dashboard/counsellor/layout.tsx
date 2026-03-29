"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/counsellor", label: "Dashboard", icon: LayoutDashboard },
  { href: "/counsellor/students", label: "Students", icon: Users },
  { href: "/counsellor/sessions", label: "Sessions", icon: Calendar },
  { href: "/counsellor/notes", label: "Notes", icon: FileText },
  { href: "/counsellor/requests", label: "Requests", icon: Bell },
  { href: "/counsellor/reports", label: "Reports", icon: BarChart3 },
]

export default function CounsellorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "counselor")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    )
  }

  if (!user || user.role !== "counselor") {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-40 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="EIRA" width={40} height={40} />
            <div>
              <span className="text-xl font-bold text-primary">EIRA</span>
              <span className="block text-xs text-muted-foreground">Counsellor Portal</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = item.href === "/dashboard/counsellor"
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Settings & Logout */}
        <div className="p-4 border-t border-sidebar-border space-y-1">
          <Link href="/profile">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        {children}
      </div>
    </div>
  )
}
