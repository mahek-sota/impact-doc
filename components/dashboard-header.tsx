"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Menu } from "lucide-react"

const sectionLabels: Record<string, string> = {
  overview: "Overview",
  colleagues: "Helping Colleagues",
  extras: "Above & Beyond",
  prototypes: "Prototypes",
  projects: "Projects & Metrics",
}

interface DashboardHeaderProps {
  activeSection: string
  onMenuToggle: () => void
}

export function DashboardHeader({ activeSection, onMenuToggle }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Brag Document</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-foreground">
            {sectionLabels[activeSection] || "Overview"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="mailto:sotamahek@gmail.com"
          className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
        >
          Get in Touch
        </a>
        <ThemeToggle />
      </div>
    </header>
  )
}
