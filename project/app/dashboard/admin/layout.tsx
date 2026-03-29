"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  UserCog,
  BarChart3,
  AlertTriangle,
  Settings,
  LogOut,
  Shield,
  Activity,
} from "lucide-react"

const sidebarItems = [
  { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/counsellors", label: "Counsellors", icon: UserCog },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/alerts", label: "Critical Cases", icon: AlertTriangle },
  { href: "/admin/system", label: "System Health", icon: Activity },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
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

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 z-40 w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="EIRA" width={40} height={40} />
            <div>
              <span className="text-xl font-bold text-primary">EIRA</span>
              <span className="block text-xs text-muted-foreground">Admin Portal</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = item.href === "/dashboard/admin"
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

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
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

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  )
}
