"use client"

import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"

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

interface ExpensesTabProps {
  tripId: string
}

export function ExpensesTab({ tripId }: ExpensesTabProps) {
  // In a real app, fetch expense data based on tripId
  const [expenses, setExpenses] = useState([
    {
      id: "1",
      title: "Accommodation",
      amount: 1200,
      paidBy: "John",
      date: "July 10, 2025",
      category: "Lodging",
      splitWith: ["John", "Sarah", "Mike", "Lisa", "Alex"],
    },
    {
      id: "2",
      title: "Groceries",
      amount: 150,
      paidBy: "Sarah",
      date: "July 15, 2025",
      category: "Food",
      splitWith: ["John", "Sarah", "Mike", "Lisa", "Alex"],
    },
    {
      id: "3",
      title: "Surfing Lessons",
      amount: 300,
      paidBy: "Mike",
      date: "July 16, 2025",
      category: "Activities",
      splitWith: ["John", "Sarah", "Mike"],
    },
  ])

  const members = ["John", "Sarah", "Mike", "Lisa", "Alex"]

  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    paidBy: "",
    category: "",
    splitWith: [] as string[],
  })

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const handleAddExpense = () => {
    // In a real app, this would save to a database
    setExpenses([
      ...expenses,
      {
        id: Math.random().toString(),
        title: newExpense.title,
        amount: Number.parseFloat(newExpense.amount),
        paidBy: newExpense.paidBy,
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        category: newExpense.category,
        splitWith: newExpense.splitWith,
      },
    ])

    setNewExpense({
      title: "",
      amount: "",
      paidBy: "",
      category: "",
      splitWith: [],
    })
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const categories = ["Lodging", "Food", "Transportation", "Activities", "Other"]

  // Calculate per-person expenses
  const memberExpenses = members.map((member) => {
    let paid = 0
    let owes = 0

    expenses.forEach((expense) => {
      // If this member paid for the expense
      if (expense.paidBy === member) {
        paid += expense.amount
      }

      // If this expense is split with this member
      if (expense.splitWith.includes(member)) {
        owes += expense.amount / expense.splitWith.length
      }
    })

    return {
      name: member,
      paid,
      owes,
      balance: paid - owes,
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Trip Expenses</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>Add a new expense to track and split with your group.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Expense Title</Label>
                <Input
                  id="title"
                  value={newExpense.title}
                  onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paidBy">Paid By</Label>
                <Select
                  value={newExpense.paidBy}
                  onValueChange={(value) => setNewExpense({ ...newExpense, paidBy: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem key={member} value={member}>
                        {member}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Split With</Label>
                <div className="flex flex-wrap gap-2">
                  {members.map((member) => (
                    <Button
                      key={member}
                      type="button"
                      variant={newExpense.splitWith.includes(member) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (newExpense.splitWith.includes(member)) {
                          setNewExpense({
                            ...newExpense,
                            splitWith: newExpense.splitWith.filter((m) => m !== member),
                          })
                        } else {
                          setNewExpense({
                            ...newExpense,
                            splitWith: [...newExpense.splitWith, member],
                          })
                        }
                      }}
                    >
                      {member}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddExpense}>Add Expense</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Per Person (Avg)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(totalExpenses / members.length).toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expenses Count</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{expenses.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expense List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-start justify-between border-b pb-4">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium">{expense.title}</span>
                      <span className="ml-2 text-xs px-2 py-0.5 bg-muted rounded-full">{expense.category}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{expense.date}</p>
                    <p className="text-sm">
                      Paid by {expense.paidBy} • Split with {expense.splitWith.length} people
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">${expense.amount.toFixed(2)}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteExpense(expense.id)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))}

              {expenses.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No expenses added yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {memberExpenses.map((member) => (
                <div key={member.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Paid ${member.paid.toFixed(2)} • Owes ${member.owes.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${member.balance > 0 ? "text-green-600" : member.balance < 0 ? "text-red-600" : ""}`}
                  >
                    {member.balance > 0
                      ? `+$${member.balance.toFixed(2)}`
                      : member.balance < 0
                        ? `-$${Math.abs(member.balance).toFixed(2)}`
                        : "$0.00"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
