"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TripCard } from "@/components/trip-card"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { tripMembersApi, type TripMemberResponse } from "@/lib/api"
import { TripCardSkeleton } from "@/components/trip-card-skeleton"

export default function Dashboard() {
  const { toast } = useToast()
  const { user, isLoading: authLoading } = useAuth()
  const [trips, setTrips] = useState<TripMemberResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserTrips = async () => {
      // Don't fetch if user is not authenticated
      if (authLoading) return
      if (!user) {
        // Redirect to login if not authenticated
        window.location.href = "/auth/login"
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        // Updated to use the new endpoint without userId parameter
        const response = await tripMembersApi.getUserTrips()

        if (response.success && response.data) {
          setTrips(response.data)
        } else {
          throw new Error(response.message || "Failed to fetch trips")
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load trips"
        setError(errorMessage)
        toast({
          title: "Error loading trips",
          description: errorMessage,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserTrips()
  }, [user, authLoading, toast])

  const handleRetry = () => {
    setError(null)
    // Re-trigger the useEffect by updating a dependency
    window.location.reload()
  }

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 container py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <TripCardSkeleton key={index} />
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserNav />
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Trips</h1>
            {user && <p className="text-muted-foreground">Welcome back, {user.nickname || user.username}!</p>}
          </div>
          <Button asChild>
            <Link href="/trips/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Trip
            </Link>
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <TripCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load trips</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={handleRetry} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && trips.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips yet</h3>
              <p className="text-gray-600 mb-4">Start planning your first group trip!</p>
              <Button asChild>
                <Link href="/trips/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Trip
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Trips Grid */}
        {!isLoading && !error && trips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
