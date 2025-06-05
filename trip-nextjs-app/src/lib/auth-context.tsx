"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

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
        const userId = localStorage.getItem("userId")
        const username = localStorage.getItem("username")

        if (userId && username) {
          // Create user object from stored data
          const userData: User = {
            id: Number.parseInt(userId),
            username: username,
            nickname: username, // You might want to fetch full user details from API
            email: "", // You might want to fetch full user details from API
          }
          setUser(userData)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        // Clear invalid data
        localStorage.removeItem("userId")
        localStorage.removeItem("username")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    // Store in localStorage for persistence
    localStorage.setItem("userId", userData.id.toString())
    localStorage.setItem("username", userData.username)
  }

  const logout = () => {
    setUser(null)
    // Clear localStorage
    localStorage.removeItem("userId")
    localStorage.removeItem("username")
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
