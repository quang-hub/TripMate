"use client"

import { useState } from "react"
import { PlusCircle, Mail, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface MembersTabProps {
  tripId: string
}

export function MembersTab({ tripId }: MembersTabProps) {
  // In a real app, fetch member data based on tripId
  const [members, setMembers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Organizer",
      status: "confirmed",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Member",
      status: "confirmed",
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@example.com",
      role: "Member",
      status: "confirmed",
    },
    {
      id: "4",
      name: "Lisa Brown",
      email: "lisa@example.com",
      role: "Member",
      status: "confirmed",
    },
    {
      id: "5",
      name: "Alex Chen",
      email: "alex@example.com",
      role: "Member",
      status: "pending",
    },
  ])

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "Member",
  })

  const handleAddMember = () => {
    // In a real app, this would send an invitation and save to a database
    setMembers([
      ...members,
      {
        id: Math.random().toString(),
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        status: "pending",
      },
    ])

    setNewMember({
      name: "",
      email: "",
      role: "Member",
    })
  }

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  const roles = ["Organizer", "Member"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Trip Members</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Member</DialogTitle>
              <DialogDescription>Send an invitation to join this trip.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newMember.role} onValueChange={(value) => setNewMember({ ...newMember, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddMember}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members ({members.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 mr-1" />
                      {member.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">{member.role}</span>
                    <span className={`text-xs ${member.status === "confirmed" ? "text-green-500" : "text-amber-500"}`}>
                      {member.status === "confirmed" ? "Confirmed" : "Pending"}
                    </span>
                  </div>
                  {member.role !== "Organizer" && (
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(member.id)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
