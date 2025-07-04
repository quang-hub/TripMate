"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, FileText, Download, Trash2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DocumentsTabProps {
  tripId: string
}

export function DocumentsTab({ tripId }: DocumentsTabProps) {
  // In a real app, fetch document data based on tripId
  const [documents, setDocuments] = useState([
    {
      id: "1",
      name: "Flight Tickets.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedBy: "John",
      uploadedAt: "July 1, 2025",
    },
    {
      id: "2",
      name: "Accommodation Booking.pdf",
      type: "pdf",
      size: "1.8 MB",
      uploadedBy: "John",
      uploadedAt: "July 2, 2025",
    },
    {
      id: "3",
      name: "Travel Insurance.pdf",
      type: "pdf",
      size: "3.2 MB",
      uploadedBy: "Sarah",
      uploadedAt: "July 5, 2025",
    },
    {
      id: "4",
      name: "Packing List.docx",
      type: "docx",
      size: "0.5 MB",
      uploadedBy: "Mike",
      uploadedAt: "July 8, 2025",
    },
  ])

  const [newDocument, setNewDocument] = useState({
    name: "",
    file: null as File | null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewDocument({
        name: e.target.files[0].name,
        file: e.target.files[0],
      })
    }
  }

  const handleAddDocument = () => {
    // In a real app, this would upload the file to storage and save metadata to a database
    if (newDocument.file) {
      setDocuments([
        ...documents,
        {
          id: Math.random().toString(),
          name: newDocument.name,
          type: newDocument.file.name.split(".").pop() || "",
          size: `${(newDocument.file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadedBy: "John", // Would be the current user
          uploadedAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        },
      ])

      setNewDocument({
        name: "",
        file: null,
      })
    }
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const getFileIcon = (type: string) => {
    return <FileText className="h-5 w-5" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Trip Documents</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>Upload important documents for your trip.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="document">Select File</Label>
                <div className="grid gap-2">
                  <div className="flex items-center justify-center border-2 border-dashed rounded-md p-8">
                    <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm font-medium">Click to upload or drag and drop</span>
                      <span className="text-xs text-muted-foreground mt-1">PDF, DOCX, JPG, PNG (max 10MB)</span>
                      <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                  {newDocument.file && (
                    <div className="text-sm">
                      Selected: {newDocument.file.name} ({(newDocument.file.size / (1024 * 1024)).toFixed(1)} MB)
                    </div>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Document Name (optional)</Label>
                <Input
                  id="name"
                  value={newDocument.name}
                  onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                  placeholder="Custom document name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddDocument} disabled={!newDocument.file}>
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents ({documents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted">
                    {getFileIcon(doc.type)}
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.size} • Uploaded by {doc.uploadedBy} on {doc.uploadedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteDocument(doc.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}

            {documents.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No documents uploaded yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
