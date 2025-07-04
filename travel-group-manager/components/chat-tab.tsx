"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useChat } from "@/hooks/use-chat"
import { useAuth } from "@/lib/auth-context"
import { formatDistanceToNow } from "date-fns"

interface ChatTabProps {
  tripId: string
}

export function ChatTab({ tripId }: ChatTabProps) {
  const { messages, isLoading, error, sendMessage } = useChat(Number(tripId))
  const [newMessage, setNewMessage] = useState("")
  const { user } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      sendMessage(newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Group Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto pb-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-500">{error}</div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No messages yet. Start the conversation!
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => {
                const isCurrentUser = user && message.senderId === user.id
                return (
                  <div key={index} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex max-w-[80%] ${
                        isCurrentUser ? "flex-row-reverse" : "flex-row"
                      } items-start gap-2`}
                    >
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage src={message.senderAvatarUrl || "/placeholder.svg"} alt={message.nickname} />
                        <AvatarFallback>{message.nickname[0]?.toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div
                          className={`rounded-lg px-4 py-2 ${isCurrentUser ? "bg-teal-500 text-white" : "bg-muted"}`}
                        >
                          {!isCurrentUser && <p className="text-xs font-medium mb-1">{message.nickname}</p>}
                          <p className="break-words">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 px-1">
                          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </CardContent>
      </Card>

      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={!newMessage.trim()}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  )
}
