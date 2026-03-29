"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { CounsellorSidebar } from "@/components/counsellor/counsellor-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Check, X, Lock, MessageSquare } from "lucide-react"

const pendingRequests = [
  { id: "1", alias: "New_User_291", date: "2 hours ago", type: "Initial Session", urgency: "normal", message: "Would like to discuss academic stress" },
  { id: "2", alias: "Sunrise_88", date: "5 hours ago", type: "Follow-up", urgency: "urgent", message: "Feeling overwhelmed, need to talk soon" },
  { id: "3", alias: "Harmony_X", date: "1 day ago", type: "Initial Session", urgency: "normal", message: "Looking for general wellness support" },
]

const resolvedRequests = [
  { id: "4", alias: "User_4821", date: "Mar 26", type: "Follow-up", status: "accepted" },
  { id: "5", alias: "MindFlow_92", date: "Mar 25", type: "Reschedule", status: "accepted" },
  { id: "6", alias: "Cloud_Nine", date: "Mar 24", type: "Initial Session", status: "accepted" },
]

export default function RequestsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "counselor")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "counselor") return null

  return (
    <div className="min-h-screen bg-background flex">
      <CounsellorSidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Requests</h1>
          <p className="text-muted-foreground mt-1">Session requests from students</p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="pending" className="gap-2">
              Pending
              <Badge variant="secondary" className="bg-primary/20 text-primary">{pendingRequests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {request.alias.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground flex items-center gap-1">
                            {request.alias}
                            <Lock className="h-3 w-3 text-muted-foreground" />
                          </span>
                          <Badge variant="outline">{request.type}</Badge>
                          {request.urgency === "urgent" && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Clock className="h-3.5 w-3.5" />
                          {request.date}
                        </div>
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/30 max-w-md">
                          <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground/80">{request.message}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <X className="h-4 w-4" />
                        Decline
                      </Button>
                      <Button size="sm" className="gap-1 bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {resolvedRequests.map((request) => (
              <Card key={request.id} className="border-border/50">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">
                        {request.alias.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground flex items-center gap-1">
                        {request.alias}
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      </p>
                      <p className="text-sm text-muted-foreground">{request.date} - {request.type}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {request.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
