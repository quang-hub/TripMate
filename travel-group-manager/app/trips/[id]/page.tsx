"use client"
import Link from "next/link"
import Image from "next/image"
import { CalendarDays, ChevronLeft, MapPin, Users, Clock, DollarSign, FileText, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ItineraryTab } from "@/components/itinerary-tab"
import { ExpensesTab } from "@/components/expenses-tab"
import { MembersTab } from "@/components/members-tab"
import { DocumentsTab } from "@/components/documents-tab"
import { ChatTab } from "@/components/chat-tab"

export default function TripDetails({ params }: { params: { id: string } }) {
  // In a real app, fetch trip data based on params.id
  const trip = {
    id: params.id,
    title: "Summer Beach Vacation",
    destination: "Malibu, California",
    startDate: "July 15, 2025",
    endDate: "July 22, 2025",
    members: 5,
    image: "/placeholder.svg?height=300&width=800",
    description:
      "A relaxing week at the beach with friends. We'll be staying in a beachfront house with amazing views of the ocean. Activities include surfing, beach volleyball, and exploring local restaurants.",
    status: "upcoming",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserNav />
        </div>
      </header>
      <main className="flex-1">
        <div className="relative h-[200px] md:h-[300px]">
          <Image src={trip.image || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
            <Button variant="outline" size="sm" asChild className="mb-2">
              <Link href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to trips
              </Link>
            </Button>
            <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-sm">{trip.title}</h1>
            <div className="flex items-center mt-2 text-white">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm md:text-base">{trip.destination}</span>
            </div>
          </div>
        </div>

        <div className="container py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center p-4 border rounded-lg">
              <CalendarDays className="h-5 w-5 mr-2 text-teal-500" />
              <div>
                <p className="text-sm text-muted-foreground">Dates</p>
                <p className="font-medium">
                  {trip.startDate} - {trip.endDate}
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg">
              <Users className="h-5 w-5 mr-2 text-teal-500" />
              <div>
                <p className="text-sm text-muted-foreground">Group Size</p>
                <p className="font-medium">{trip.members} travelers</p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg">
              <Clock className="h-5 w-5 mr-2 text-teal-500" />
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium capitalize">{trip.status}</p>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-6">{trip.description}</p>

          <Tabs defaultValue="itinerary" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="itinerary">
                <Clock className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Itinerary</span>
              </TabsTrigger>
              <TabsTrigger value="expenses">
                <DollarSign className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Expenses</span>
              </TabsTrigger>
              <TabsTrigger value="members">
                <Users className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Members</span>
              </TabsTrigger>
              <TabsTrigger value="documents">
                <FileText className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Documents</span>
              </TabsTrigger>
              <TabsTrigger value="chat">
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Chat</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="itinerary">
              <ItineraryTab tripId={trip.id} />
            </TabsContent>
            <TabsContent value="expenses">
              <ExpensesTab tripId={trip.id} />
            </TabsContent>
            <TabsContent value="members">
              <MembersTab tripId={trip.id} />
            </TabsContent>
            <TabsContent value="documents">
              <DocumentsTab tripId={trip.id} />
            </TabsContent>
            <TabsContent value="chat">
              <ChatTab tripId={trip.id} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
