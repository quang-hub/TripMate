"use client"

import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ItineraryTabProps {
  tripId: string
}

export function ItineraryTab({ tripId }: ItineraryTabProps) {
  // In a real app, fetch itinerary data based on tripId
  const [days, setDays] = useState([
    {
      id: "1",
      date: "July 15, 2025",
      activities: [
        {
          id: "1",
          time: "09:00",
          title: "Arrival and Check-in",
          description: "Check in to beach house",
          location: "Malibu Beach House",
        },
        {
          id: "2",
          time: "12:00",
          title: "Lunch at Seafood Restaurant",
          description: "Reservation for 5 people",
          location: "Ocean View Restaurant",
        },
        { id: "3", time: "15:00", title: "Beach Time", description: "Swimming and relaxing", location: "Malibu Beach" },
      ],
    },
    {
      id: "2",
      date: "July 16, 2025",
      activities: [
        {
          id: "1",
          time: "08:00",
          title: "Surfing Lessons",
          description: "Group lesson with instructor",
          location: "Surf School",
        },
        {
          id: "2",
          time: "13:00",
          title: "Picnic Lunch",
          description: "Packed lunch on the beach",
          location: "Zuma Beach",
        },
      ],
    },
  ])

  const [newActivity, setNewActivity] = useState({
    day: "",
    time: "",
    title: "",
    description: "",
    location: "",
  })

  const handleAddActivity = () => {
    // In a real app, this would save to a database
    const updatedDays = [...days]
    const dayIndex = updatedDays.findIndex((day) => day.id === newActivity.day)

    if (dayIndex !== -1) {
      updatedDays[dayIndex].activities.push({
        id: Math.random().toString(),
        time: newActivity.time,
        title: newActivity.title,
        description: newActivity.description,
        location: newActivity.location,
      })

      setDays(updatedDays)
      setNewActivity({
        day: "",
        time: "",
        title: "",
        description: "",
        location: "",
      })
    }
  }

  const handleDeleteActivity = (dayId: string, activityId: string) => {
    const updatedDays = [...days]
    const dayIndex = updatedDays.findIndex((day) => day.id === dayId)

    if (dayIndex !== -1) {
      updatedDays[dayIndex].activities = updatedDays[dayIndex].activities.filter(
        (activity) => activity.id !== activityId,
      )
      setDays(updatedDays)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Trip Itinerary</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Activity</DialogTitle>
              <DialogDescription>Add a new activity to your trip itinerary.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="day">Day</Label>
                <Select
                  value={newActivity.day}
                  onValueChange={(value) => setNewActivity({ ...newActivity, day: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day.id} value={day.id}>
                        {day.date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newActivity.time}
                  onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Activity Title</Label>
                <Input
                  id="title"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddActivity}>Add Activity</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {days.map((day) => (
          <Card key={day.id}>
            <CardHeader>
              <CardTitle className="text-lg">{day.date}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {day.activities.length > 0 ? (
                  day.activities.map((activity) => (
                    <div key={activity.id} className="flex items-start border-l-4 border-teal-500 pl-4 py-2">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-medium">{activity.time}</span>
                          <span className="mx-2">•</span>
                          <span className="font-medium">{activity.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        <p className="text-sm mt-1">{activity.location}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteActivity(day.id, activity.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No activities planned for this day yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
