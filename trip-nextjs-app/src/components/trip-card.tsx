import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Users, Crown, User, UserCheck } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { TripMemberResponse } from "@/lib/api"

interface TripCardProps {
  trip: TripMemberResponse
}

export function TripCard({ trip }: TripCardProps) {
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const startDate = formatDate(trip.startDate)
  const endDate = formatDate(trip.endDate)

  // Get role icon and color
  const getRoleInfo = (role: string) => {
    switch (role.toUpperCase()) {
      case "LEADER":
        return { icon: Crown, color: "text-yellow-600", bgColor: "bg-yellow-100" }
      case "MEMBER":
        return { icon: User, color: "text-blue-600", bgColor: "bg-blue-100" }
      case "GUEST":
        return { icon: UserCheck, color: "text-green-600", bgColor: "bg-green-100" }
      default:
        return { icon: User, color: "text-gray-600", bgColor: "bg-gray-100" }
    }
  }

  const roleInfo = getRoleInfo(trip.role)
  const RoleIcon = roleInfo.icon

  // Determine trip status based on dates
  const now = new Date()
  const tripStart = new Date(trip.startDate)
  const tripEnd = new Date(trip.endDate)

  let status = "upcoming"
  if (now > tripEnd) {
    status = "completed"
  } else if (now >= tripStart && now <= tripEnd) {
    status = "ongoing"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ongoing":
        return <Badge className="bg-green-100 text-green-800">Ongoing</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      default:
        return <Badge>Upcoming</Badge>
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={trip.logoUrl || "/placeholder.svg?height=200&width=400"}
          alt={trip.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {getStatusBadge(status)}
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roleInfo.bgColor} ${roleInfo.color}`}
          >
            <RoleIcon className="h-3 w-3" />
            {trip.role}
          </div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold line-clamp-1">{trip.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{trip.description}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <CalendarDays className="h-3.5 w-3.5 mr-1 text-teal-500" />
            <span>
              {startDate} - {endDate}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1 text-teal-500" />
            <span>{trip.memberCount} travelers</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/trips/${trip.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
