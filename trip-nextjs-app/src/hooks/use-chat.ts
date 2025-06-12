"use client"

import { useState, useEffect, useCallback } from "react"
import { webSocketService, type ChatMessage } from "@/lib/websocket"
import { toast } from "sonner"

export function useChat(tripId: number) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/message/trip/${tripId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch messages")
        }

        const data = await response.json()

        if (data.success && Array.isArray(data.data)) {
          setMessages(data.data)
        } else {
          setMessages([])
        }
      } catch (error) {
        console.error("Error fetching messages:", error)
        setError("Failed to load messages")
        toast.error("Failed to load chat messages")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [tripId])

  // Subscribe to new messages
  useEffect(() => {
    try {
      // Connect to WebSocket
      webSocketService.connect().catch((error) => {
        console.error("WebSocket connection error:", error)
        setError("Failed to connect to chat")
        toast.error("Failed to connect to chat service")
      })

      // Subscribe to messages for this trip
      const unsubscribe = webSocketService.onTripMessage(tripId, (message) => {
        setMessages((prev) => [...prev, message])
      })

      return () => {
        unsubscribe()
      }
    } catch (error) {
      console.error("Error setting up chat:", error)
      setError("Failed to set up chat")
    }
  }, [tripId])

  // Send message function
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return

      try {
        await webSocketService.sendMessage(tripId, content)
      } catch (error) {
        console.error("Error sending message:", error)
        toast.error("Failed to send message")
      }
    },
    [tripId],
  )

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  }
}
