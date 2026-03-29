"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import {
  mockStudents,
  mockCounsellors,
  mockSessions,
  mockNotes,
  mockAlerts,
  mockJournalEntries,
  defaultHabits,
  mockAnalytics,
  type Student,
  type Counsellor,
  type Session,
  type Note,
  type Alert,
  type JournalEntry,
  type Habit,
  type MoodType,
} from "@/lib/mock-data"

interface AppContextType {
  // Data
  students: Student[]
  counsellors: Counsellor[]
  sessions: Session[]
  notes: Note[]
  alerts: Alert[]
  journalEntries: JournalEntry[]
  habits: Habit[]
  analytics: typeof mockAnalytics

  // Current student data (for logged in student)
  currentStudentMood: MoodType | null
  currentStudentHabits: Habit[]
  currentStudentStreak: number

  // Actions - Sessions
  bookSession: (session: Omit<Session, "id">) => void
  startSession: (sessionId: string) => void
  endSession: (sessionId: string, notes?: string) => void
  cancelSession: (sessionId: string) => void

  // Actions - Notes
  addNote: (note: Omit<Note, "id" | "createdAt">) => void

  // Actions - Alerts
  resolveAlert: (alertId: string) => void

  // Actions - Student
  submitMood: (mood: MoodType) => void
  completeHabit: (habitId: string) => void
  resetDailyHabits: () => void
  addJournalEntry: (entry: Omit<JournalEntry, "id" | "createdAt">) => void

  // Actions - Admin
  assignCounsellor: (studentId: string, counsellorId: string) => void
  updateStudentRisk: (studentId: string, riskLevel: Student["riskLevel"]) => void

  // UI State
  activeSession: Session | null
  setActiveSession: (session: Session | null) => void
  selectedStudentId: string | null
  setSelectedStudentId: (id: string | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  // State
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [counsellors] = useState<Counsellor[]>(mockCounsellors)
  const [sessions, setSessions] = useState<Session[]>(mockSessions)
  const [notes, setNotes] = useState<Note[]>(mockNotes)
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(mockJournalEntries)
  const [habits, setHabits] = useState<Habit[]>(defaultHabits)
  const [analytics] = useState(mockAnalytics)

  // Current student state
  const [currentStudentMood, setCurrentStudentMood] = useState<MoodType | null>(null)
  const [currentStudentStreak, setCurrentStudentStreak] = useState(7)

  // UI State
  const [activeSession, setActiveSession] = useState<Session | null>(null)
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)

  // Session Actions
  const bookSession = useCallback((sessionData: Omit<Session, "id">) => {
    const newSession: Session = {
      ...sessionData,
      id: `sess${Date.now()}`,
    }
    setSessions(prev => [...prev, newSession])
  }, [])

  const startSession = useCallback((sessionId: string) => {
    setSessions(prev =>
      prev.map(s =>
        s.id === sessionId ? { ...s, status: "in-progress" as const } : s
      )
    )
    const session = sessions.find(s => s.id === sessionId)
    if (session) {
      setActiveSession({ ...session, status: "in-progress" })
    }
  }, [sessions])

  const endSession = useCallback((sessionId: string, sessionNotes?: string) => {
    setSessions(prev =>
      prev.map(s =>
        s.id === sessionId
          ? { ...s, status: "completed" as const, notes: sessionNotes || s.notes }
          : s
      )
    )
    setActiveSession(null)
  }, [])

  const cancelSession = useCallback((sessionId: string) => {
    setSessions(prev =>
      prev.map(s =>
        s.id === sessionId ? { ...s, status: "cancelled" as const } : s
      )
    )
  }, [])

  // Note Actions
  const addNote = useCallback((noteData: Omit<Note, "id" | "createdAt">) => {
    const newNote: Note = {
      ...noteData,
      id: `n${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    setNotes(prev => [newNote, ...prev])
  }, [])

  // Alert Actions
  const resolveAlert = useCallback((alertId: string) => {
    setAlerts(prev =>
      prev.map(a =>
        a.id === alertId ? { ...a, resolved: true } : a
      )
    )
  }, [])

  // Student Actions
  const submitMood = useCallback((mood: MoodType) => {
    setCurrentStudentMood(mood)
    // In a real app, this would update the student's mood history
  }, [])

  const completeHabit = useCallback((habitId: string) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === habitId ? { ...h, completed: !h.completed } : h
      )
    )
    // Update streak if all habits completed
    const updatedHabits = habits.map(h =>
      h.id === habitId ? { ...h, completed: !h.completed } : h
    )
    if (updatedHabits.every(h => h.completed)) {
      setCurrentStudentStreak(prev => prev + 1)
    }
  }, [habits])

  const resetDailyHabits = useCallback(() => {
    setHabits(defaultHabits)
  }, [])

  const addJournalEntry = useCallback((entryData: Omit<JournalEntry, "id" | "createdAt">) => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: `j${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    setJournalEntries(prev => [newEntry, ...prev])
  }, [])

  // Admin Actions
  const assignCounsellor = useCallback((studentId: string, counsellorId: string) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === studentId ? { ...s, assignedCounsellorId: counsellorId } : s
      )
    )
  }, [])

  const updateStudentRisk = useCallback((studentId: string, riskLevel: Student["riskLevel"]) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === studentId ? { ...s, riskLevel } : s
      )
    )
  }, [])

  const currentStudentHabits = habits

  return (
    <AppContext.Provider
      value={{
        students,
        counsellors,
        sessions,
        notes,
        alerts,
        journalEntries,
        habits,
        analytics,
        currentStudentMood,
        currentStudentHabits,
        currentStudentStreak,
        bookSession,
        startSession,
        endSession,
        cancelSession,
        addNote,
        resolveAlert,
        submitMood,
        completeHabit,
        resetDailyHabits,
        addJournalEntry,
        assignCounsellor,
        updateStudentRisk,
        activeSession,
        setActiveSession,
        selectedStudentId,
        setSelectedStudentId,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
