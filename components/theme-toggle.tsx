"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    // Toggle between light and dark only
    if (resolvedTheme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 rounded-xl p-0 transition-all duration-300 hover:bg-white/15 hover:scale-105"
        disabled
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="group/theme h-9 w-9 rounded-xl p-0 transition-all duration-300 hover:bg-white/15 hover:scale-105 relative overflow-hidden"
      title={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 group-hover/theme:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>
      
      {/* Sun Icon - visible in dark mode */}
      <Sun className={`h-4 w-4 transition-all duration-500 ease-out ${
        isDark 
          ? "rotate-0 scale-100 opacity-100" 
          : "rotate-90 scale-0 opacity-0"
      } group-hover/theme:rotate-12 group-hover/theme:scale-110`} />
      
      {/* Moon Icon - visible in light mode */}
      <Moon className={`absolute h-4 w-4 transition-all duration-500 ease-out ${
        isDark 
          ? "-rotate-90 scale-0 opacity-0" 
          : "rotate-0 scale-100 opacity-100"
      } group-hover/theme:-rotate-12 group-hover/theme:scale-110`} />
      
      <span className="sr-only">
        {isDark ? "Passer au mode clair" : "Passer au mode sombre"}
      </span>
    </Button>
  )
}
