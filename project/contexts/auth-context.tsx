"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface User {
  email: string
  name: string
  role: "student" | "counselor" | "admin"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users
const DEMO_USERS: Record<string, User> = {
  "student@eira.app": {
    email: "student@eira.app",
    name: "Alex Student",
    role: "student",
  },
  "counselor@eira.app": {
    email: "counselor@eira.app",
    name: "Dr. Sarah Chen",
    role: "counselor",
  },
  "admin@eira.app": {
    email: "admin@eira.app",
    name: "Admin User",
    role: "admin",
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("eira_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("eira_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login - only allow demo users with correct credentials
    const demoUser = DEMO_USERS[email.toLowerCase()]
    if (demoUser && password === "12345678") {
      setUser(demoUser)
      localStorage.setItem("eira_user", JSON.stringify(demoUser))
      return true
    }
    
    // Reject all other credentials
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("eira_user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
