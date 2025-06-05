"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100",
        success: "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100",
        info: "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  onClose?: () => void
  duration?: number
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, onClose, duration = 5000, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)

    React.useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          setTimeout(() => {
            onClose?.()
          }, 300) // Wait for animation to complete
        }, duration)

        return () => clearTimeout(timer)
      }
    }, [duration, onClose])

    const getIcon = () => {
      switch (variant) {
        case "success":
          return <CheckCircle className="h-5 w-5 text-green-600" />
        case "destructive":
          return <AlertCircle className="h-5 w-5 text-red-600" />
        case "warning":
          return <AlertTriangle className="h-5 w-5 text-yellow-600" />
        case "info":
          return <Info className="h-5 w-5 text-blue-600" />
        default:
          return <Info className="h-5 w-5 text-gray-600" />
      }
    }

    if (!isVisible) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          toastVariants({ variant }),
          isVisible ? "animate-in slide-in-from-top-full" : "animate-out slide-out-to-top-full",
          className,
        )}
        {...props}
      >
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1 space-y-1">
            {title && <div className="text-sm font-semibold">{title}</div>}
            {description && <div className="text-sm opacity-90">{description}</div>}
          </div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(() => {
              onClose?.()
            }, 300)
          }}
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  },
)
Toast.displayName = "Toast"

export { Toast, toastVariants }
