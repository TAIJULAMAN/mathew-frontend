import React, { useState, useRef, useEffect } from "react"

const cn = (...classes) => classes.filter(Boolean).join(" ")

// Main Dropdown Menu Component
const DropdownMenu = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open || false)
  
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen)
    if (onOpenChange) {
      onOpenChange(newOpen)
    }
  }

  return (
    <div className="relative">
      {React.Children.map(children, child =>
        React.cloneElement(child, { isOpen, setIsOpen: handleOpenChange })
      )}
    </div>
  )
}

// Dropdown Trigger Component
const DropdownMenuTrigger = React.forwardRef(({ children, className, asChild, isOpen, setIsOpen, ...props }, ref) => {
  const handleClick = (e) => {
    e.preventDefault()
    if (setIsOpen) {
      setIsOpen(!isOpen)
    }
    if (props.onClick) {
      props.onClick(e)
    }
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      onClick: handleClick,
      ...props
    })
  }

  return (
    <button
      ref={ref}
      className={cn("outline-none", className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

// Dropdown Content Component
const DropdownMenuContent = React.forwardRef(({ 
  children, 
  className, 
  align = "start", 
  sideOffset = 4, 
  isOpen, 
  setIsOpen,
  ...props 
}, ref) => {
  const contentRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        if (setIsOpen) {
          setIsOpen(false)
        }
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  if (!isOpen) return null

  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 transform -translate-x-1/2",
    end: "right-0"
  }

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-gray-900 shadow-md mt-1",
        alignmentClasses[align],
        className
      )}
      style={{ top: `${sideOffset}px` }}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

// Dropdown Menu Item Component
const DropdownMenuItem = React.forwardRef(({ 
  children, 
  className, 
  asChild, 
  onClick,
  ...props 
}, ref) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 w-full",
        className,
        children.props.className
      ),
      onClick: handleClick,
      ...props
    })
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
}
