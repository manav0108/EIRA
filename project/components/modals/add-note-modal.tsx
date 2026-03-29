"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/contexts/app-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { FileText, AlertCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddNoteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultStudentId?: string | null
}

const commonTags = [
  "progress",
  "concern",
  "follow-up",
  "mood-decline",
  "positive",
  "crisis",
  "academic",
  "personal",
]

export function AddNoteModal({ open, onOpenChange, defaultStudentId }: AddNoteModalProps) {
  const { students, addNote } = useApp()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    studentId: defaultStudentId || "",
    content: "",
    isUrgent: false,
    tags: [] as string[],
  })

  // Update studentId when defaultStudentId changes
  useEffect(() => {
    if (defaultStudentId) {
      setFormData(prev => ({ ...prev, studentId: defaultStudentId }))
    }
  }, [defaultStudentId])

  // Get assigned students for the counsellor (c1 is demo counsellor)
  const assignedStudents = students.filter(s => s.assignedCounsellorId === "c1")

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const handleSubmit = async () => {
    if (!formData.studentId || !formData.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a student and enter note content",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    addNote({
      studentId: formData.studentId,
      counsellorId: "c1",
      content: formData.content.trim(),
      isUrgent: formData.isUrgent,
      tags: formData.tags,
    })

    setIsSubmitting(false)
    
    toast({
      title: "Note added",
      description: "Your note has been saved successfully.",
    })

    // Reset and close
    setFormData({
      studentId: "",
      content: "",
      isUrgent: false,
      tags: [],
    })
    onOpenChange(false)
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form after close animation
    setTimeout(() => {
      setFormData({
        studentId: "",
        content: "",
        isUrgent: false,
        tags: [],
      })
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <FileText className="h-5 w-5 text-primary" />
            Add Note
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Record observations or concerns about a student
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Student Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Student</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
              >
                <option value="">Select a student</option>
                {assignedStudents.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.alias}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Note Content */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Note Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter your observations, concerns, or notes about this student..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Urgent Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isUrgent: !formData.isUrgent })}
              className={cn(
                "flex items-center gap-3 w-full p-3 rounded-xl border transition-all",
                formData.isUrgent
                  ? "border-red-500/50 bg-red-500/10"
                  : "border-border/50 bg-secondary/30 hover:bg-secondary/50"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg",
                formData.isUrgent ? "bg-red-500/20" : "bg-secondary"
              )}>
                <AlertCircle className={cn(
                  "h-4 w-4",
                  formData.isUrgent ? "text-red-400" : "text-muted-foreground"
                )} />
              </div>
              <div className="text-left flex-1">
                <p className="font-medium text-foreground">Mark as Urgent</p>
                <p className="text-xs text-muted-foreground">
                  This will highlight the note in the dashboard
                </p>
              </div>
              <div className={cn(
                "w-10 h-6 rounded-full transition-all",
                formData.isUrgent ? "bg-red-500" : "bg-secondary"
              )}>
                <div className={cn(
                  "w-4 h-4 rounded-full bg-white mt-1 transition-all",
                  formData.isUrgent ? "ml-5" : "ml-1"
                )} />
              </div>
            </button>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {commonTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-all",
                    formData.tags.includes(tag)
                      ? "bg-primary/20 text-primary border border-primary/50"
                      : "bg-secondary/50 text-muted-foreground border border-border/50 hover:border-primary/30"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!formData.studentId || !formData.content.trim() || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Saving..." : "Save Note"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
