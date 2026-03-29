"use client"

import { useState } from "react"
import { ClipboardCheck, Brain, Heart, Sparkles, Info, CheckCircle, ArrowLeft } from "lucide-react"
import { AssessmentCard } from "@/components/assessment-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const assessments = [
  {
    icon: Sparkles,
    title: "Daily Quiz",
    description: "A quick 5-minute check-in to reflect on your day and track your mood patterns over time.",
    duration: "5 min",
    questions: 10,
    gradient: "from-cyan-500/10 to-blue-500/10",
    iconColor: "text-cyan-400",
  },
  {
    icon: Brain,
    title: "PHQ-9 Test",
    description: "A clinically-validated screening tool for depression symptoms. Helps identify if you need professional support.",
    duration: "10 min",
    questions: 9,
    gradient: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-400",
  },
  {
    icon: Heart,
    title: "Well-Being Assessment",
    description: "A comprehensive assessment covering emotional, social, and psychological well-being aspects.",
    duration: "15 min",
    questions: 20,
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "text-green-400",
  },
]

const sampleQuestions = [
  "How would you rate your overall mood today?",
  "How many hours of sleep did you get last night?",
  "Have you felt anxious or worried today?",
  "Did you engage in any physical activity?",
  "How connected do you feel to others today?",
]

export default function AssessmentsPage() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const handleStartQuiz = (title: string) => {
    setActiveQuiz(title)
    setCurrentQuestion(0)
    setAnswers([])
  }

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz complete - show results
      setCurrentQuestion(-1)
    }
  }

  const handleBack = () => {
    setActiveQuiz(null)
    setCurrentQuestion(0)
    setAnswers([])
  }

  if (activeQuiz) {
    const progress = currentQuestion >= 0 
      ? ((currentQuestion + 1) / sampleQuestions.length) * 100 
      : 100

    return (
      <div className="min-h-screen py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Assessments</span>
          </button>

          <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
              <h2 className="text-xl font-semibold text-foreground">{activeQuiz}</h2>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Progress</span>
                  <span>{currentQuestion >= 0 ? currentQuestion + 1 : sampleQuestions.length} / {sampleQuestions.length}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {currentQuestion >= 0 ? (
                <>
                  <p className="text-lg font-medium text-foreground mb-8 text-center">
                    {sampleQuestions[currentQuestion]}
                  </p>
                  <div className="grid grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleAnswer(value)}
                        className="flex flex-col items-center p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-primary/10 hover:border-primary/30 transition-colors"
                      >
                        <span className="text-2xl font-bold text-foreground">{value}</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {value === 1 ? "Not at all" : value === 5 ? "Very much" : ""}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Assessment Complete!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for completing the assessment. Your responses have been recorded.
                  </p>
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6">
                    <p className="text-sm text-foreground">
                      Based on your responses, your wellness score is <span className="font-bold text-primary">72/100</span>
                    </p>
                  </div>
                  <Button onClick={handleBack} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Return to Assessments
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Self-Assessments</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Understand Your <span className="text-primary">Mental Health</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take scientifically-validated assessments to gain insights into your well-being and track your progress over time.
          </p>
        </div>

        {/* Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {assessments.map((assessment) => (
            <AssessmentCard
              key={assessment.title}
              {...assessment}
              onStart={() => handleStartQuiz(assessment.title)}
            />
          ))}
        </div>

        {/* About These Assessments */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-border/50 bg-card/80 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Info className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">About These Assessments</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Our assessments are designed to help you better understand your mental health. 
                    While they provide valuable insights, they are not diagnostic tools.
                  </p>
                  <p>
                    The PHQ-9 is a widely-used clinical screening tool that has been validated through 
                    extensive research. However, only a qualified mental health professional can provide 
                    an official diagnosis.
                  </p>
                  <p>
                    Your responses are confidential and stored securely. We encourage you to share 
                    your results with a healthcare provider if you have concerns about your mental health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
