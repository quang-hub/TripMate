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

// User API types
export interface CreateUserRequest {
  username: string
  password: string
  email: string
  nickname: string
}

export interface UserDto {
  username: string
  password: string
}

export interface LoginResponse {
  userId: number
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

// Updated API helper function to handle your backend's response structure
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const defaultHeaders: Record<string, string> = {}

    // Only add Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
      defaultHeaders["Content-Type"] = "application/json"
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    })

    console.log(`API ${endpoint} response status:`, response.status) // Debug log

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API ${endpoint} error:`, errorText) // Debug log
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

      // Fallback for other response formats
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

// User API functions
export const userApi = {
  register: async (userData: CreateUserRequest): Promise<ApiResponse> => {
    return apiCall("/api/user/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  login: async (credentials: UserDto): Promise<ApiResponse<LoginResponse>> => {
    return apiCall<LoginResponse>("/api/user/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  logout: async (): Promise<ApiResponse> => {
    return apiCall("/api/user/logout", {
      method: "POST",
    })
  },

  updateProfile: async (profileData: UpdateProfileRequest, file?: File): Promise<ApiResponse> => {
    if (file) {
      // Use FormData for file uploads
      const formData = new FormData()
      formData.append("request", JSON.stringify(profileData))
      formData.append("file", file)

      return apiCall("/api/user/update-profile", {
        method: "POST",
        body: formData,
        // Don't set headers for FormData - browser will set them automatically
      })
    } else {
      // Use JSON for profile updates without file
      return apiCall("/api/user/update-profile", {
        method: "POST",
        body: JSON.stringify({ request: profileData }),
      })
    }
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

  // Updated to use the new endpoint
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
