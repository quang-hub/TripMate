import SockJS from "sockjs-client"
import { type Client, type IMessage, Stomp, type StompSubscription } from "@stomp/stompjs"
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
  private client: Client | null = null
  private subscriptions: Map<string, StompSubscription> = new Map()
  private messageCallbacks: Map<number, ((message: ChatMessage) => void)[]> = new Map()
  private connectionPromise: Promise<Client> | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeClient()
    }
  }

  private initializeClient() {
    this.client = Stomp.over(() => new SockJS(`${API_BASE_URL}/ws`))

    // Configure client
    this.client.reconnectDelay = 5000
    this.client.heartbeatIncoming = 4000
    this.client.heartbeatOutgoing = 4000

    // Debug settings
    if (process.env.NODE_ENV !== "production") {
      this.client.debug = (msg) => console.log("STOMP: ", msg)
    } else {
      this.client.debug = () => {}
    }
  }

  public connect(): Promise<Client> {
    if (!this.client) {
      this.initializeClient()
    }

    if (this.connectionPromise) {
      return this.connectionPromise
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      if (!this.client) {
        reject(new Error("STOMP client not initialized"))
        return
      }

      this.client.onConnect = () => {
        console.log("WebSocket connected")
        this.subscribeToMessages()
        resolve(this.client!)
      }

      this.client.onStompError = (frame) => {
        console.error("STOMP error", frame)
        reject(new Error(`WebSocket error: ${frame.headers.message}`))
      }

      this.client.activate()
    })

    return this.connectionPromise
  }

  public disconnect() {
    if (this.client && this.client.connected) {
      this.client.deactivate()
      this.subscriptions.clear()
      this.connectionPromise = null
      console.log("WebSocket disconnected")
    }
  }

  private subscribeToMessages() {
    if (!this.client || !this.client.connected) return

    const subscription = this.client.subscribe("/topic/messages", (message: IMessage) => {
      try {
        const chatMessage = JSON.parse(message.body) as ChatMessage

        // Notify all callbacks registered for this trip
        const callbacks = this.messageCallbacks.get(chatMessage.tripId) || []
        callbacks.forEach((callback) => callback(chatMessage))
      } catch (error) {
        console.error("Error processing message", error)
      }
    })

    this.subscriptions.set("messages", subscription)
  }

  public async sendMessage(tripId: number, content: string): Promise<void> {
    try {
      const client = await this.connect()
      const token = tokenManager.getAccessToken()

      if (!token) {
        throw new Error("Not authenticated")
      }

      const messageRequest: MessageRequest = {
        tripId,
        content,
        token,
      }

      client.publish({
        destination: "/app/send-message",
        body: JSON.stringify(messageRequest),
      })
    } catch (error) {
      console.error("Error sending message", error)
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
