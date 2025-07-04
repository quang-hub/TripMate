"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { tokenManager } from "./api"

interface User {
  id: number
  username: string
  nickname: string
  email: string
  avatarUrl?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuth = async () => {
      try {
        const accessToken = tokenManager.getAccessToken()
        const username = localStorage.getItem("username")

        if (accessToken && username) {
          // Create user object from stored data
          // In a real app, you might want to decode the JWT to get user info
          const userData: User = {
            id: 0, // You might want to decode this from the JWT
            username: username,
            nickname: username,
            email: "",
          }
          setUser(userData)
        } else if (tokenManager.getRefreshToken()) {
          // Try to refresh the token
          const newTokens = await tokenManager.refreshAccessToken()
          if (newTokens && username) {
            const userData: User = {
              id: 0,
              username: username,
              nickname: username,
              email: "",
            }
            setUser(userData)
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        // Clear invalid data
        tokenManager.clearTokens()
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    // Store username for persistence
    localStorage.setItem("username", userData.username)
  }

  const logout = () => {
    setUser(null)
    // Clear all stored data
    tokenManager.clearTokens()
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
