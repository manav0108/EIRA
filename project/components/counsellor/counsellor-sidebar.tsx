"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Bell, 
  BarChart3, 
  LogOut,
  ArrowLeft
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/counsellor/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/counsellor/students", label: "Students", icon: Users },
  { href: "/counsellor/sessions", label: "Sessions", icon: Calendar },
  { href: "/counsellor/notes", label: "Notes", icon: FileText },
  { href: "/counsellor/requests", label: "Requests", icon: Bell },
  { href: "/counsellor/reports", label: "Reports", icon: BarChart3 },
]

export function CounsellorSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/logo.png" 
            alt="EIRA Logo" 
            width={40} 
            height={40} 
            className="transition-transform duration-300 group-hover:scale-105" 
          />
          <span className="text-xl font-bold text-primary">EIRA</span>
        </Link>
      </div>

      {/* Counsellor Profile */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
            <img
              src="/logo.png"
              alt="EIRA Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground">Counsellor</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500" title="Online" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground glow-cyan" 
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 w-full"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Main Site
        </Link>
      </div>
    </aside>
  )
}
