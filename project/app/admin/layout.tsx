"use client"

import { usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminDashboard = pathname?.startsWith("/admin")

  return (
    <div className={`min-h-screen bg-background ${isAdminDashboard ? "-mt-16 pt-0" : ""}`}>
      <style jsx global>{`
        ${isAdminDashboard ? `
          nav.glass { display: none !important; }
          footer { display: none !important; }
        ` : ""}
      `}</style>
      {children}
    </div>
  )
}
