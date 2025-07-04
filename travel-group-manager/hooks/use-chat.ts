"use client"

import { useState, useEffect, useCallback } from "react"
import { webSocketService, type ChatMessage } from "@/lib/websocket"
import { toast } from "sonner"

export function useChat(tripId: number) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  // Fetch existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const token = localStorage.getItem("accessToken")
        if (!token) {
          throw new Error("No authentication token")
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/message/trip/${tripId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch messages")
        }

        const data = await response.json()
        console.log("Fetched messages:", data)

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
    let unsubscribe: (() => void) | null = null

    const connectWebSocket = async () => {
      try {
        console.log("Connecting to WebSocket for trip:", tripId)

        // Connect to WebSocket
        await webSocketService.connect()
        setIsConnected(true)
        console.log("WebSocket connected successfully")

        // Subscribe to messages for this trip
        unsubscribe = webSocketService.onTripMessage(tripId, (message) => {
          console.log("New message received:", message)
          setMessages((prev) => [...prev, message])
        })
      } catch (error) {
        console.error("WebSocket connection error:", error)
        setError("Failed to connect to chat")
        setIsConnected(false)
        toast.error("Failed to connect to chat service")
      }
    }

    connectWebSocket()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [tripId])

  // Send message function
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return

      try {
        console.log("Sending message:", content, "to trip:", tripId)
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
    isConnected,
    sendMessage,
  }
}
