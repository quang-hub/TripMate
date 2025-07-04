// API configuration and helper functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
}

// Standard API response structure from your backend
interface BackendResponse<T = any> {
  code: number
  message: string
  data: T
}

// Updated Auth API types
export interface LoginRequest {
  username: string
  password: string
  platform: string
}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
}

// User API types
export interface CreateUserRequest {
  username: string
  password: string
  email: string
  nickname: string
}

export interface UpdateProfileRequest {
  username: string
  oldPassword?: string
  newPassword?: string
  email?: string
  nickname?: string
}

export interface UserSearchResponse {
  id: number
  nickname: string
  avatarUrl: string
}

// Trip API types
export interface CreateTripRequest {
  name: string
  description: string
  startDate: string // ISO8601
  endDate: string // ISO8601
  logoUrl?: string
}

export interface UpdateTripRequest {
  tripId: number
  name?: string
  description?: string
  startDate: string
  endDate: string
  logoUrl?: string
}

export interface InviteMemberRequest {
  tripId: number
  userId: number
}

export interface TripMemberResponse {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  memberCount: number
  logoUrl: string
  role: string
}

export interface MemberInTripResponse {
  id: number
  nickname: string
  avatarUrl: string
  role: string
}

export interface UpdateTripMemberRole {
  role: string // LEADER, MEMBER, GUEST
  tripId: number
  memberId: number
}

// Token management functions
export const tokenManager = {
  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken")
    }
    return null
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refreshToken")
    }
    return null
  },

  setTokens: (tokens: TokenResponse): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", tokens.accessToken)
      localStorage.setItem("refreshToken", tokens.refreshToken)
    }
  },

  clearTokens: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("userId")
      localStorage.removeItem("username")
    }
  },

  refreshAccessToken: async (): Promise<TokenResponse | null> => {
    const refreshToken = tokenManager.getRefreshToken()
    if (!refreshToken) return null

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/refresh-token?refreshToken=${encodeURIComponent(refreshToken)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.ok) {
        const tokens: TokenResponse = await response.json()
        tokenManager.setTokens(tokens)
        return tokens
      }
    } catch (error) {
      console.error("Token refresh failed:", error)
    }

    return null
  },
}

// Updated API helper function with token management
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const defaultHeaders: Record<string, string> = {}

    // Add Authorization header if we have an access token
    const accessToken = tokenManager.getAccessToken()
    if (accessToken) {
      defaultHeaders["Authorization"] = `Bearer ${accessToken}`
    }

    // Only add Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
      defaultHeaders["Content-Type"] = "application/json"
    }

    let response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    })

    // If we get a 401 and have a refresh token, try to refresh
    if (response.status === 401 && accessToken) {
      const newTokens = await tokenManager.refreshAccessToken()
      if (newTokens) {
        // Retry the request with the new token
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: "GET",
          ...options,
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${newTokens.accessToken}`,
            ...options.headers,
          },
        })
      }
    }

    console.log(`API ${endpoint} response status:`, response.status) // Debug log

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API ${endpoint} error:`, errorText) // Debug log

      // If still 401 after refresh attempt, clear tokens and redirect to login
      if (response.status === 401) {
        tokenManager.clearTokens()
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login"
        }
      }

      throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`)
    }

    // Handle JSON responses
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      const rawData = await response.json()
      console.log(`API ${endpoint} raw response:`, rawData) // Debug log

      // Handle your backend's nested structure: { code, message, data: actualData }
      if (rawData && typeof rawData === "object" && "code" in rawData && "data" in rawData) {
        const backendResponse = rawData as BackendResponse<T>

        // Check if the backend operation was successful
        if (backendResponse.code === 200) {
          return {
            success: true,
            data: backendResponse.data,
            message: backendResponse.message,
          }
        } else {
          return {
            success: false,
            message: backendResponse.message || `Backend error: ${backendResponse.code}`,
          }
        }
      }

      // Handle direct responses (like token responses)
      return { success: true, data: rawData }
    } else {
      const text = await response.text()
      console.log(`API ${endpoint} response text:`, text) // Debug log

      // Try to parse as number if it's a simple numeric response
      if (text && !isNaN(Number(text))) {
        return { success: true, data: Number(text) as T }
      }

      return { success: true, data: text as T }
    }
  } catch (error) {
    console.error("API call failed:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    }
  }
}

// Auth API functions
export const authApi = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<TokenResponse>> => {
    return apiCall<TokenResponse>("/auth/access-token", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<TokenResponse>> => {
    return apiCall<TokenResponse>(`/auth/refresh-token?refreshToken=${encodeURIComponent(refreshToken)}`, {
      method: "POST",
    })
  },

  logout: async (): Promise<ApiResponse> => {
    // Clear tokens locally
    tokenManager.clearTokens()
    return { success: true }
  },
}

// User API functions
export const userApi = {
  register: async (userData: CreateUserRequest): Promise<ApiResponse> => {
    return apiCall("/api/user/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  updateProfile: async (profileData: UpdateProfileRequest, file?: File): Promise<ApiResponse> => {
    // Always use FormData for this endpoint
    const formData = new FormData()
    formData.append("request", JSON.stringify(profileData))

    if (file) {
      formData.append("file", file)
    }

    return apiCall("/api/user/update-profile", {
      method: "POST",
      body: formData,
      // Don't set headers for FormData - browser will set them automatically
    })
  },

  searchUsers: async (nickname: string): Promise<ApiResponse<UserSearchResponse[]>> => {
    return apiCall(`/api/user/search?nickname=${encodeURIComponent(nickname)}`, {
      method: "GET",
    })
  },
}

// Trip API functions
export const tripApi = {
  create: async (tripData: CreateTripRequest): Promise<ApiResponse> => {
    return apiCall("/api/trip/create", {
      method: "POST",
      body: JSON.stringify(tripData),
    })
  },

  update: async (tripData: UpdateTripRequest): Promise<ApiResponse> => {
    return apiCall("/api/trip/update", {
      method: "POST",
      body: JSON.stringify(tripData),
    })
  },

  invite: async (inviteData: InviteMemberRequest): Promise<ApiResponse> => {
    return apiCall("/api/trip/invite", {
      method: "POST",
      body: JSON.stringify(inviteData),
    })
  },
}

// Trip Members API functions
export const tripMembersApi = {
  setRole: async (roleData: UpdateTripMemberRole): Promise<ApiResponse> => {
    return apiCall("/api/trip-members/set-role", {
      method: "POST",
      body: JSON.stringify(roleData),
    })
  },

  getUserTrips: async (): Promise<ApiResponse<TripMemberResponse[]>> => {
    return apiCall(`/api/trip-members/list`, {
      method: "GET",
    })
  },

  getTripMembers: async (tripId: number): Promise<ApiResponse<MemberInTripResponse[]>> => {
    return apiCall(`/api/trip-members/member/${tripId}`, {
      method: "GET",
    })
  },
}
