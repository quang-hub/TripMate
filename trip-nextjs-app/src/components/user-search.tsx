"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { userApi, type UserSearchResponse } from "@/lib/api"

interface UserSearchProps {
  onUserSelect: (user: UserSearchResponse) => void
  placeholder?: string
}

export function UserSearch({ onUserSelect, placeholder = "Search users by nickname..." }: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<UserSearchResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.trim().length < 2) {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await userApi.searchUsers(searchTerm)
        if (response.success && response.data) {
          setSearchResults(response.data)
        }
      } catch (error) {
        console.error("Search failed:", error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchUsers, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Searching...</p>}

      {searchResults.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {searchResults.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.nickname} />
                  <AvatarFallback>{user.nickname[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{user.nickname}</span>
              </div>
              <Button size="sm" onClick={() => onUserSelect(user)}>
                Select
              </Button>
            </div>
          ))}
        </div>
      )}

      {searchTerm.length >= 2 && !isLoading && searchResults.length === 0 && (
        <p className="text-sm text-muted-foreground">No users found matching "{searchTerm}"</p>
      )}
    </div>
  )
}
