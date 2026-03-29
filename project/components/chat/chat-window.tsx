"use client"

import { useState } from "react"
import { Send, Bot, User, Sparkles, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const quickPrompts = [
  {
    label: "I feel anxious",
    response: "I hear you, and I want you to know that feeling anxious is completely valid. Let's take a moment to ground ourselves. Try this: Take a slow, deep breath in for 4 counts, hold for 4 counts, then exhale for 6 counts. Repeat this 3 times. Anxiety often comes from worrying about the future - let's focus on right now, this present moment. What specific thoughts are making you feel anxious?",
  },
  {
    label: "I need motivation",
    response: "I understand that finding motivation can be challenging. Remember: you've overcome difficult moments before, and you can do it again. Start with just one small step - it doesn't have to be perfect. What's one tiny action you could take in the next 5 minutes? Sometimes the hardest part is just beginning. I believe in you, and I'm here to support you along the way.",
  },
  {
    label: "Help me calm down",
    response: "Let's try a calming exercise together. Find a comfortable position and close your eyes if you can. Breathe in slowly through your nose for 4 seconds... hold for 2 seconds... now breathe out through your mouth for 6 seconds. As you breathe out, imagine releasing all the tension from your body. Let's do this together 5 times. You're doing great - taking this moment to calm yourself shows real self-awareness.",
  },
  {
    label: "I want to vent",
    response: "I'm here to listen without judgment. Sometimes we just need to let it all out, and that's completely okay. Please share whatever is on your mind - big or small, serious or not. This is a safe space for you to express your feelings. Take your time, and know that whatever you're feeling is valid. I'm here for you.",
  },
]

const mockResponses = [
  "I hear you, and I want you to know that what you're feeling is completely valid. Many students experience similar feelings, especially during stressful periods. Let's work through this together. Would you like to try a quick breathing exercise, or would you prefer to talk more about what's been on your mind?",
  "Thank you for sharing that with me. It takes courage to open up about how you're feeling. I'm here to listen and support you. Remember, seeking help is a sign of strength, not weakness. What would feel most helpful right now - some coping strategies, or just someone to listen?",
  "I understand that can be overwhelming. Let's take a moment to pause and acknowledge your feelings. You're not alone in this. Would you like to explore some techniques that might help, or would you prefer to continue sharing? I'm here for whatever you need.",
]

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickPrompt = (prompt: typeof quickPrompts[0]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt.label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: prompt.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 glow-cyan">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">EIRA AI Companion</h2>
          <p className="text-xs text-muted-foreground">Always here to listen</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 glow-cyan">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Welcome to EIRA Chatbot</h3>
            <p className="text-muted-foreground max-w-md mb-8">
              {`I'm here to listen and support you. Feel free to share what's on your mind, 
              or try one of the suggestions below.`}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="px-4 py-2 rounded-full border border-border/50 bg-card/80 text-sm text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                    message.role === "user" ? "bg-secondary" : "bg-primary/20"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={cn(
                    "text-xs mt-1",
                    message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-card border border-border rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-2 border-t border-border bg-card/50">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="h-3 w-3 text-yellow-500" />
          <span>AI support is not a replacement for emergency care. If in crisis, please call 988.</span>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-4"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
