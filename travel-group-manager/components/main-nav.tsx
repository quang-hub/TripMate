import Link from "next/link"
import { Plane } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <Plane className="h-6 w-6 text-teal-500" />
        <span className="font-bold text-xl">TripTogether</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
          Dashboard
        </Link>
        <Link href="/trips" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          My Trips
        </Link>
        <Link
          href="/calendar"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Calendar
        </Link>
      </nav>
    </div>
  )
}
