"use client"

import { usePathname } from "next/navigation"

export default function CounsellorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith("/counsellor")

  return (
    <div className={`min-h-screen bg-background ${isDashboard ? "-mt-16 pt-0" : ""}`}>
      <style jsx global>{`
        ${isDashboard ? `
          nav.glass { display: none !important; }
          footer { display: none !important; }
        ` : ""}
      `}</style>
      {children}
    </div>
  )
}
