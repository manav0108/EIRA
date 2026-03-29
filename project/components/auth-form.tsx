"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, GraduationCap, Users, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"

interface AuthFormProps {
  mode: "login" | "signup"
}

const demoAccounts = [
  {
    role: "Student",
    email: "student@eira.app",
    description: "Personal wellness dashboard",
    icon: GraduationCap,
    color: "teal",
    bgClass: "bg-teal-500/10 hover:bg-teal-500/20 border-teal-500/30",
    iconClass: "text-teal-400",
    buttonClass: "bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border-teal-500/40",
  },
  {
    role: "Counsellor",
    email: "counselor@eira.app",
    description: "Manage sessions & students",
    icon: Users,
    color: "blue",
    bgClass: "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30",
    iconClass: "text-blue-400",
    buttonClass: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/40",
  },
  {
    role: "Admin",
    email: "admin@eira.app",
    description: "Platform analytics & control",
    icon: Shield,
    color: "purple",
    bgClass: "bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30",
    iconClass: "text-purple-400",
    buttonClass: "bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border-purple-500/40",
  },
]

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingRole, setLoadingRole] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    rememberMe: false,
    agreeTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      if (mode === "login") {
        const success = await login(formData.email, formData.password)
        if (success) {
          router.push("/")
        } else {
          setError("Please use one of the demo accounts below")
        }
      } else {
        // Signup - validate and then login
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match")
          setIsSubmitting(false)
          return
        }
        if (!formData.agreeTerms) {
          setError("Please agree to the terms and conditions")
          setIsSubmitting(false)
          return
        }
        const success = await login(formData.email, formData.password)
        if (success) {
          router.push("/")
        } else {
          setError("Failed to create account")
        }
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDemoLogin = async (email: string, role: string) => {
    setFormData({ ...formData, email, password: "12345678" })
    setError("")
    setLoadingRole(role)
    
    // Small delay to show the auto-fill effect
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const success = await login(email, "12345678")
    if (success) {
      router.push("/")
    } else {
      setError("Demo login failed")
      setLoadingRole(null)
    }
  }

  const isLogin = mode === "login"

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex justify-center w-full mb-4">
          <img 
            src="/images/eira-logo.png" 
            alt="EIRA Logo" 
            className="h-20 w-20 transition-transform hover:scale-110"
          />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">
          {isLogin ? "Welcome Back to EIRA" : "Create Your EIRA Account"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isLogin ? "Sign in to continue your wellness journey" : "Start your mental wellness journey today"}
        </p>
      </div>

      {/* Demo Login Section - Moved to top for better visibility */}
      {isLogin && (
        <div className="mb-8">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">
              Try EIRA instantly with demo accounts
            </p>
          </div>
          
          <div className="grid gap-3">
            {demoAccounts.map((account) => {
              const Icon = account.icon
              const isLoading = loadingRole === account.role
              
              return (
                <div
                  key={account.role}
                  className={`relative p-4 rounded-xl border transition-all duration-300 ${account.bgClass} ${
                    isLoading ? "ring-2 ring-primary/50" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg bg-background/50 ${account.iconClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm">{account.role}</h3>
                      <p className="text-xs text-muted-foreground truncate">{account.description}</p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className={`shrink-0 border transition-all duration-200 ${account.buttonClass}`}
                      onClick={() => handleDemoLogin(account.email, account.role)}
                      disabled={loadingRole !== null}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        `Login as ${account.role}`
                      )}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {isLogin ? "Or sign in with email" : "Or continue with email"}
          </span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="flex gap-3 mb-6">
        <Button variant="outline" className="flex-1 border-border hover:bg-secondary gap-2 transition-all duration-200 hover:scale-[1.02]">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>
        <Button variant="outline" className="flex-1 border-border hover:bg-secondary gap-2 transition-all duration-200 hover:scale-[1.02]">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Other
        </Button>
      </div>

      {/* Error Message - Softer styling */}
      {error && (
        <div className="mb-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-center gap-3">
          <div className="shrink-0 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
            required
            disabled={isSubmitting || loadingRole !== null}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 pr-12 transition-all duration-200"
              required
              disabled={isSubmitting || loadingRole !== null}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {!isLogin && (
          <>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 pr-12 transition-all duration-200"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                disabled={isSubmitting}
              />
            </div>
          </>
        )}

        {/* Remember me / Terms */}
        <div className="flex items-center justify-between">
          {isLogin ? (
            <>
              <label className="flex items-center gap-2 cursor-pointer group">
                <Checkbox
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                  disabled={isSubmitting || loadingRole !== null}
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors">
                Forgot password?
              </Link>
            </>
          ) : (
            <label className="flex items-start gap-2 cursor-pointer group">
              <Checkbox
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                className="mt-0.5"
                disabled={isSubmitting}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                I agree to the{" "}
                <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </label>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan py-6 transition-all duration-200 hover:scale-[1.02]"
          disabled={isSubmitting || loadingRole !== null}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isLogin ? "Signing in..." : "Creating account..."}
            </>
          ) : (
            isLogin ? "Login" : "Create Account"
          )}
        </Button>
      </form>

      {/* Switch mode link */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        {isLogin ? (
          <>
            {`Don't have an account? `}
            <Link href="/signup" className="text-primary hover:underline font-medium transition-colors hover:text-primary/80">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium transition-colors hover:text-primary/80">
              Login
            </Link>
          </>
        )}
      </p>
    </div>
  )
}
