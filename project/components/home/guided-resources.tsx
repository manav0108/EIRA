"use client"

import { useState } from "react"
import { Wind, Lightbulb, RotateCcw, Moon, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const resources = [
  {
    id: "breathing",
    icon: Wind,
    title: "Breathing Exercise",
    description: "4-7-8 technique to calm your mind",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    content: {
      title: "4-7-8 Breathing Technique",
      steps: [
        "Find a comfortable position and relax your shoulders",
        "Breathe in quietly through your nose for 4 seconds",
        "Hold your breath for 7 seconds",
        "Exhale completely through your mouth for 8 seconds",
        "Repeat this cycle 3-4 times",
      ],
      tip: "This technique activates your parasympathetic nervous system, helping reduce anxiety and promote relaxation.",
    },
  },
  {
    id: "stress",
    icon: Lightbulb,
    title: "Stress Tips",
    description: "Quick strategies to manage stress",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    content: {
      title: "Quick Stress Relief Tips",
      steps: [
        "Take a short walk, even just 5 minutes helps",
        "Practice progressive muscle relaxation",
        "Write down 3 things you're grateful for",
        "Limit caffeine and get enough sleep",
        "Talk to someone you trust about how you feel",
      ],
      tip: "Small actions can make a big difference. Pick one tip to try right now!",
    },
  },
  {
    id: "reset",
    icon: RotateCcw,
    title: "5-Min Reset",
    description: "A quick mental refresh routine",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    content: {
      title: "5-Minute Mental Reset",
      steps: [
        "Stop what you're doing and close your eyes",
        "Take 5 deep breaths, focusing only on breathing",
        "Name 5 things you can see around you",
        "Name 4 things you can touch or feel",
        "Name 3 things you can hear right now",
      ],
      tip: "This grounding exercise brings you back to the present moment and reduces overwhelm.",
    },
  },
  {
    id: "sleep",
    icon: Moon,
    title: "Sleep Tips",
    description: "Improve your sleep quality",
    gradient: "from-purple-500/20 to-indigo-500/20",
    iconColor: "text-purple-400",
    content: {
      title: "Better Sleep Habits",
      steps: [
        "Keep a consistent sleep schedule, even on weekends",
        "Avoid screens 30 minutes before bed",
        "Keep your room cool, dark, and quiet",
        "Avoid caffeine after 2pm",
        "Try a relaxing bedtime routine like reading",
      ],
      tip: "Good sleep is foundational to mental wellness. Small changes can dramatically improve sleep quality.",
    },
  },
]

export function GuidedResources() {
  const [activeResource, setActiveResource] = useState<string | null>(null)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const selectedResource = resources.find((r) => r.id === activeResource)

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const closeModal = () => {
    setActiveResource(null)
    setCompletedSteps([])
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Guided Resources</h2>
          <p className="mt-2 text-muted-foreground">Quick exercises and tips for your wellness</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource) => (
            <button
              key={resource.id}
              onClick={() => setActiveResource(resource.id)}
              className={`group p-5 rounded-xl border border-border/50 bg-gradient-to-br ${resource.gradient} text-left transition-all hover:scale-[1.02] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5`}
            >
              <div className={`p-3 rounded-lg bg-background/50 inline-block mb-3 ${resource.iconColor} group-hover:scale-110 transition-transform`}>
                <resource.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{resource.title}</h3>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
            </button>
          ))}
        </div>

        {/* Modal */}
        {activeResource && selectedResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={closeModal} />
            <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>

              <div className={`p-3 rounded-lg bg-gradient-to-br ${selectedResource.gradient} inline-block mb-4`}>
                <selectedResource.icon className={`h-6 w-6 ${selectedResource.iconColor}`} />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-4">{selectedResource.content.title}</h3>

              <div className="space-y-3 mb-6">
                {selectedResource.content.steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => toggleStep(index)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all text-left ${
                      completedSteps.includes(index)
                        ? "border-primary/50 bg-primary/10"
                        : "border-border/50 bg-secondary/30 hover:border-primary/30"
                    }`}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      completedSteps.includes(index) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {completedSteps.includes(index) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm ${completedSteps.includes(index) ? "text-foreground" : "text-muted-foreground"}`}>
                      {step}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">Tip:</span> {selectedResource.content.tip}
                </p>
              </div>

              {completedSteps.length === selectedResource.content.steps.length && (
                <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
                  <p className="text-green-400 font-medium">Great job completing all the steps!</p>
                </div>
              )}

              <Button onClick={closeModal} className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
