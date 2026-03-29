// Centralized Mock Data Store for EIRA Demo
// This provides realistic data for all roles: Student, Counsellor, Admin

export type PrivacyStatus = "anonymous" | "custom_alias" | "identity_shared"
export type RiskLevel = "low" | "medium" | "high"
export type SessionStatus = "scheduled" | "in-progress" | "completed" | "cancelled"
export type MoodType = "stressed" | "anxiety" | "sad" | "displaced" | "angry" | "okayish" | "happy" | "excited"

export interface Student {
  id: string
  alias: string
  realName?: string
  email: string
  privacyStatus: PrivacyStatus
  riskLevel: RiskLevel
  moodHistory: { date: string; mood: MoodType; score: number }[]
  currentMood?: MoodType
  assignedCounsellorId: string
  lastActive: string
  journalCount: number
  habitsCompletedToday: number
  totalHabits: number
  upcomingSessions: string[]
  streak: number
}

export interface Counsellor {
  id: string
  name: string
  email: string
  title: string
  specializations: string[]
  rating: number
  totalSessions: number
  activeStudents: number
  availability: "available" | "busy" | "offline"
  avatar?: string
}

export interface Session {
  id: string
  studentId: string
  counsellorId: string
  scheduledAt: string
  duration: number // in minutes
  type: "video" | "in-person" | "phone"
  status: SessionStatus
  notes?: string
  topic?: string
}

export interface Note {
  id: string
  sessionId?: string
  studentId: string
  counsellorId: string
  content: string
  createdAt: string
  isUrgent: boolean
  tags: string[]
}

export interface Alert {
  id: string
  studentId: string
  type: "risk_elevated" | "missed_session" | "inactivity" | "mood_decline" | "journal_flag"
  message: string
  severity: "low" | "medium" | "high"
  createdAt: string
  resolved: boolean
}

export interface Habit {
  id: string
  name: string
  duration: string
  icon: string
  completed: boolean
}

export interface JournalEntry {
  id: string
  studentId: string
  title: string
  content: string
  mood: MoodType
  createdAt: string
  aiSummary?: string
}

// Mock Students
export const mockStudents: Student[] = [
  {
    id: "s1",
    alias: "Calm River",
    realName: "Alex Student",
    email: "student@eira.app",
    privacyStatus: "custom_alias",
    riskLevel: "low",
    moodHistory: [
      { date: "2024-01-15", mood: "happy", score: 8 },
      { date: "2024-01-16", mood: "okayish", score: 6 },
      { date: "2024-01-17", mood: "stressed", score: 4 },
      { date: "2024-01-18", mood: "anxiety", score: 3 },
      { date: "2024-01-19", mood: "okayish", score: 5 },
      { date: "2024-01-20", mood: "happy", score: 7 },
      { date: "2024-01-21", mood: "excited", score: 9 },
    ],
    currentMood: "happy",
    assignedCounsellorId: "c1",
    lastActive: "2024-01-21T10:30:00Z",
    journalCount: 23,
    habitsCompletedToday: 2,
    totalHabits: 4,
    upcomingSessions: ["sess1"],
    streak: 7,
  },
  {
    id: "s2",
    alias: "Quiet Mountain",
    privacyStatus: "anonymous",
    riskLevel: "high",
    email: "student2@university.edu",
    moodHistory: [
      { date: "2024-01-15", mood: "sad", score: 3 },
      { date: "2024-01-16", mood: "anxiety", score: 2 },
      { date: "2024-01-17", mood: "stressed", score: 2 },
      { date: "2024-01-18", mood: "sad", score: 2 },
      { date: "2024-01-19", mood: "displaced", score: 3 },
      { date: "2024-01-20", mood: "anxiety", score: 2 },
      { date: "2024-01-21", mood: "sad", score: 3 },
    ],
    currentMood: "sad",
    assignedCounsellorId: "c1",
    lastActive: "2024-01-21T08:15:00Z",
    journalCount: 8,
    habitsCompletedToday: 0,
    totalHabits: 4,
    upcomingSessions: ["sess2"],
    streak: 0,
  },
  {
    id: "s3",
    alias: "Bright Star",
    realName: "Jordan Lee",
    privacyStatus: "identity_shared",
    riskLevel: "medium",
    email: "jlee@university.edu",
    moodHistory: [
      { date: "2024-01-15", mood: "okayish", score: 5 },
      { date: "2024-01-16", mood: "stressed", score: 4 },
      { date: "2024-01-17", mood: "anxiety", score: 3 },
      { date: "2024-01-18", mood: "okayish", score: 5 },
      { date: "2024-01-19", mood: "happy", score: 6 },
      { date: "2024-01-20", mood: "stressed", score: 4 },
      { date: "2024-01-21", mood: "okayish", score: 5 },
    ],
    currentMood: "okayish",
    assignedCounsellorId: "c1",
    lastActive: "2024-01-20T16:45:00Z",
    journalCount: 15,
    habitsCompletedToday: 3,
    totalHabits: 4,
    upcomingSessions: [],
    streak: 4,
  },
  {
    id: "s4",
    alias: "Ocean Wave",
    privacyStatus: "custom_alias",
    riskLevel: "low",
    email: "student4@university.edu",
    moodHistory: [
      { date: "2024-01-15", mood: "happy", score: 7 },
      { date: "2024-01-16", mood: "excited", score: 8 },
      { date: "2024-01-17", mood: "happy", score: 7 },
      { date: "2024-01-18", mood: "okayish", score: 6 },
      { date: "2024-01-19", mood: "happy", score: 7 },
      { date: "2024-01-20", mood: "excited", score: 8 },
      { date: "2024-01-21", mood: "happy", score: 7 },
    ],
    currentMood: "happy",
    assignedCounsellorId: "c2",
    lastActive: "2024-01-21T11:00:00Z",
    journalCount: 31,
    habitsCompletedToday: 4,
    totalHabits: 4,
    upcomingSessions: ["sess4"],
    streak: 12,
  },
  {
    id: "s5",
    alias: "Silent Forest",
    privacyStatus: "anonymous",
    riskLevel: "high",
    email: "student5@university.edu",
    moodHistory: [
      { date: "2024-01-15", mood: "angry", score: 2 },
      { date: "2024-01-16", mood: "sad", score: 2 },
      { date: "2024-01-17", mood: "displaced", score: 3 },
      { date: "2024-01-18", mood: "anxiety", score: 2 },
      { date: "2024-01-19", mood: "sad", score: 2 },
      { date: "2024-01-20", mood: "stressed", score: 3 },
      { date: "2024-01-21", mood: "anxiety", score: 2 },
    ],
    currentMood: "anxiety",
    assignedCounsellorId: "c2",
    lastActive: "2024-01-19T09:30:00Z",
    journalCount: 3,
    habitsCompletedToday: 0,
    totalHabits: 4,
    upcomingSessions: ["sess5"],
    streak: 0,
  },
]

// Mock Counsellors
export const mockCounsellors: Counsellor[] = [
  {
    id: "c1",
    name: "Dr. Sarah Chen",
    email: "counselor@eira.app",
    title: "Clinical Psychologist",
    specializations: ["Anxiety", "Depression", "Student Wellness"],
    rating: 4.9,
    totalSessions: 245,
    activeStudents: 3,
    availability: "available",
  },
  {
    id: "c2",
    name: "Dr. Marcus Williams",
    email: "mwilliams@eira.app",
    title: "Licensed Counselor",
    specializations: ["Stress Management", "Academic Pressure", "Life Transitions"],
    rating: 4.8,
    totalSessions: 189,
    activeStudents: 2,
    availability: "busy",
  },
  {
    id: "c3",
    name: "Dr. Emily Watson",
    email: "ewatson@eira.app",
    title: "Wellness Coach",
    specializations: ["Mindfulness", "Self-Care", "Work-Life Balance"],
    rating: 4.7,
    totalSessions: 156,
    activeStudents: 4,
    availability: "available",
  },
]

// Mock Sessions
export const mockSessions: Session[] = [
  {
    id: "sess1",
    studentId: "s1",
    counsellorId: "c1",
    scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    duration: 45,
    type: "video",
    status: "scheduled",
    topic: "Weekly check-in",
  },
  {
    id: "sess2",
    studentId: "s2",
    counsellorId: "c1",
    scheduledAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min from now
    duration: 60,
    type: "video",
    status: "scheduled",
    topic: "Urgent: Mood decline follow-up",
  },
  {
    id: "sess3",
    studentId: "s3",
    counsellorId: "c1",
    scheduledAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    duration: 45,
    type: "video",
    status: "completed",
    topic: "Academic stress management",
    notes: "Student is making progress with stress management techniques. Recommended continuing journaling practice.",
  },
  {
    id: "sess4",
    studentId: "s4",
    counsellorId: "c2",
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    duration: 45,
    type: "in-person",
    status: "scheduled",
    topic: "Monthly wellness review",
  },
  {
    id: "sess5",
    studentId: "s5",
    counsellorId: "c2",
    scheduledAt: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // 1 hour from now
    duration: 60,
    type: "video",
    status: "scheduled",
    topic: "Crisis intervention follow-up",
  },
]

// Mock Notes
export const mockNotes: Note[] = [
  {
    id: "n1",
    sessionId: "sess3",
    studentId: "s3",
    counsellorId: "c1",
    content: "Student showed significant improvement in managing academic stress. They have been consistently using the breathing exercises and journaling techniques we discussed. Recommend continuing current approach and checking in next week.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isUrgent: false,
    tags: ["progress", "stress-management", "follow-up"],
  },
  {
    id: "n2",
    studentId: "s2",
    counsellorId: "c1",
    content: "Concerned about Quiet Mountain's declining mood patterns over the past week. Multiple low scores and missed habits. Priority follow-up scheduled for tomorrow.",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isUrgent: true,
    tags: ["concern", "mood-decline", "priority"],
  },
  {
    id: "n3",
    sessionId: "sess3",
    studentId: "s1",
    counsellorId: "c1",
    content: "Calm River continues to show excellent engagement with the platform. Strong habit completion rate and consistent journaling. No concerns at this time.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isUrgent: false,
    tags: ["positive", "engagement", "check-in"],
  },
]

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: "a1",
    studentId: "s2",
    type: "mood_decline",
    message: "Mood score has dropped significantly over the past 5 days",
    severity: "high",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    resolved: false,
  },
  {
    id: "a2",
    studentId: "s5",
    type: "inactivity",
    message: "No platform activity for 48+ hours",
    severity: "high",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    resolved: false,
  },
  {
    id: "a3",
    studentId: "s3",
    type: "risk_elevated",
    message: "Risk level elevated from low to medium based on recent assessments",
    severity: "medium",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    resolved: false,
  },
  {
    id: "a4",
    studentId: "s5",
    type: "journal_flag",
    message: "Journal entry flagged by AI for concerning language patterns",
    severity: "high",
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    resolved: false,
  },
]

// Mock Journal Entries (for student view)
export const mockJournalEntries: JournalEntry[] = [
  {
    id: "j1",
    studentId: "s1",
    title: "Feeling better today",
    content: "Had a really productive study session this morning. The breathing exercises before starting really helped me focus. I think I'm getting better at managing my stress during exam periods.",
    mood: "happy",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    aiSummary: "Positive progress with stress management techniques. Student shows improved focus and self-awareness.",
  },
  {
    id: "j2",
    studentId: "s1",
    title: "Worried about upcoming presentation",
    content: "Have a big presentation next week and starting to feel anxious about it. Going to try the visualization technique Dr. Chen mentioned.",
    mood: "anxiety",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    aiSummary: "Anticipatory anxiety about academic performance. Student is proactively seeking coping strategies.",
  },
  {
    id: "j3",
    studentId: "s1",
    title: "Great weekend with friends",
    content: "Finally took a break and spent time with friends. Realized I need to prioritize social connections more. Feeling refreshed and motivated.",
    mood: "excited",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    aiSummary: "Healthy social engagement. Student recognizes importance of work-life balance.",
  },
]

// Default habits for students
export const defaultHabits: Habit[] = [
  { id: "breathing", name: "Breathing Exercise", duration: "2 min", icon: "Wind", completed: false },
  { id: "journal", name: "Quick Journal", duration: "3 min", icon: "BookOpen", completed: false },
  { id: "gratitude", name: "Gratitude Note", duration: "2 min", icon: "Heart", completed: false },
  { id: "stretch", name: "Stretch Break", duration: "3 min", icon: "StretchVertical", completed: false },
]

// Analytics data for admin
export const mockAnalytics = {
  totalStudents: 847,
  activeStudents: 623,
  totalCounsellors: 12,
  activeCounsellors: 9,
  sessionsThisWeek: 156,
  sessionsLastWeek: 142,
  averageSessionRating: 4.7,
  highRiskStudents: 23,
  mediumRiskStudents: 89,
  lowRiskStudents: 735,
  engagementRate: 73.5,
  moodTrends: [
    { day: "Mon", positive: 65, neutral: 25, negative: 10 },
    { day: "Tue", positive: 58, neutral: 30, negative: 12 },
    { day: "Wed", positive: 62, neutral: 28, negative: 10 },
    { day: "Thu", positive: 70, neutral: 22, negative: 8 },
    { day: "Fri", positive: 55, neutral: 32, negative: 13 },
    { day: "Sat", positive: 72, neutral: 20, negative: 8 },
    { day: "Sun", positive: 68, neutral: 24, negative: 8 },
  ],
  platformUsage: [
    { hour: "6am", users: 23 },
    { hour: "9am", users: 156 },
    { hour: "12pm", users: 234 },
    { hour: "3pm", users: 312 },
    { hour: "6pm", users: 278 },
    { hour: "9pm", users: 189 },
    { hour: "12am", users: 45 },
  ],
}

// Helper functions
export function getStudentById(id: string): Student | undefined {
  return mockStudents.find(s => s.id === id)
}

export function getCounsellorById(id: string): Counsellor | undefined {
  return mockCounsellors.find(c => c.id === id)
}

export function getSessionById(id: string): Session | undefined {
  return mockSessions.find(s => s.id === id)
}

export function getStudentsByRisk(level: RiskLevel): Student[] {
  return mockStudents.filter(s => s.riskLevel === level)
}

export function getStudentsByCounsellor(counsellorId: string): Student[] {
  return mockStudents.filter(s => s.assignedCounsellorId === counsellorId)
}

export function getSessionsByCounsellor(counsellorId: string): Session[] {
  return mockSessions.filter(s => s.counsellorId === counsellorId)
}

export function getSessionsByStudent(studentId: string): Session[] {
  return mockSessions.filter(s => s.studentId === studentId)
}

export function getAlertsByStudent(studentId: string): Alert[] {
  return mockAlerts.filter(a => a.studentId === studentId)
}

export function getNotesByStudent(studentId: string): Note[] {
  return mockNotes.filter(n => n.studentId === studentId)
}

export function getPrivacyBadge(status: PrivacyStatus): { label: string; color: string } {
  switch (status) {
    case "anonymous":
      return { label: "Anonymous", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" }
    case "custom_alias":
      return { label: "Custom Alias", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" }
    case "identity_shared":
      return { label: "Identity Shared", color: "bg-green-500/20 text-green-300 border-green-500/30" }
  }
}

export function getRiskBadge(level: RiskLevel): { label: string; color: string } {
  switch (level) {
    case "low":
      return { label: "Low Risk", color: "bg-green-500/20 text-green-300 border-green-500/30" }
    case "medium":
      return { label: "Medium Risk", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" }
    case "high":
      return { label: "High Risk", color: "bg-red-500/20 text-red-300 border-red-500/30" }
  }
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

export function formatSessionTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function isSessionSoon(dateString: string): boolean {
  const date = new Date(dateString)
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  return diff > 0 && diff < 60 * 60 * 1000 // Within 1 hour
}
