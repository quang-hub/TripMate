import SockJS from "sockjs-client"
import { Stomp } from "@stomp/stompjs"
import { tokenManager } from "./api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export interface ChatMessage {
  tripId: number
  senderId: number
  senderAvatarUrl: string
  nickname: string
  content: string
  createdAt: string
}

export interface MessageRequest {
  tripId: number
  content: string
  token: string
}

class WebSocketService {
  private stompClient: any = null
  private messageCallbacks: Map<number, ((message: ChatMessage) => void)[]> = new Map()
  private isConnected = false
  private connectionPromise: Promise<any> | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeClient()
    }
  }

  private initializeClient() {
    // Use SockJS and Stomp similar to your working HTML
    const socket = new SockJS(`${API_BASE_URL}/ws`)
    this.stompClient = Stomp.over(socket)

    // Disable debug in production
    if (process.env.NODE_ENV === "production") {
      this.stompClient.debug = null
    } else {
      this.stompClient.debug = (msg: string) => console.log("STOMP: ", msg)
    }
  }

  public connect(): Promise<any> {
    if (this.isConnected) {
      return Promise.resolve(this.stompClient)
    }

    if (this.connectionPromise) {
      return this.connectionPromise
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      if (!this.stompClient) {
        this.initializeClient()
      }

      this.stompClient.connect(
        {}, // headers
        () => {
          console.log("WebSocket connected successfully!")
          this.isConnected = true
          this.subscribeToMessages()
          resolve(this.stompClient)
        },
        (error: any) => {
          console.error("WebSocket connection error:", error)
          this.isConnected = false
          this.connectionPromise = null
          reject(new Error(`WebSocket connection failed: ${error}`))
        },
      )
    })

    return this.connectionPromise
  }

  public disconnect() {
    if (this.stompClient && this.isConnected) {
      this.stompClient.disconnect(() => {
        console.log("WebSocket disconnected")
      })
      this.isConnected = false
      this.connectionPromise = null
    }
  }

  private subscribeToMessages() {
    if (!this.stompClient || !this.isConnected) return

    this.stompClient.subscribe("/topic/messages", (message: any) => {
      try {
        console.log("Raw message received:", message.body)
        const chatMessage = JSON.parse(message.body) as ChatMessage

        // Notify all callbacks registered for this trip
        const callbacks = this.messageCallbacks.get(chatMessage.tripId) || []
        callbacks.forEach((callback) => callback(chatMessage))
      } catch (error) {
        console.error("Error processing message:", error)
      }
    })
  }

  public async sendMessage(tripId: number, content: string): Promise<void> {
    try {
      await this.connect()
      const token = tokenManager.getAccessToken()

      if (!token) {
        throw new Error("Not authenticated")
      }

      const messageRequest: MessageRequest = {
        tripId,
        content,
        token,
      }

      console.log("Sending message:", messageRequest)

      this.stompClient.send("/app/send-message", {}, JSON.stringify(messageRequest))
    } catch (error) {
      console.error("Error sending message:", error)
      throw error
    }
  }

  public onTripMessage(tripId: number, callback: (message: ChatMessage) => void): () => void {
    if (!this.messageCallbacks.has(tripId)) {
      this.messageCallbacks.set(tripId, [])
    }

    this.messageCallbacks.get(tripId)!.push(callback)

    // Return unsubscribe function
    return () => {
      const callbacks = this.messageCallbacks.get(tripId) || []
      const index = callbacks.indexOf(callback)
      if (index !== -1) {
        callbacks.splice(index, 1)
      }
    }
  }
}

// Create singleton instance
export const webSocketService = new WebSocketService()
