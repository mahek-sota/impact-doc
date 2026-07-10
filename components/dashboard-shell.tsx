"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { cn } from "@/lib/utils"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const activeSection = pathname.split("/").filter(Boolean)[0] ?? "overview"

  const handleNavigate = (id: string) => {
    router.push(`/${id}`)
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar activeSection={activeSection} onNavigate={handleNavigate} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 z-40 lg:hidden">
            <DashboardSidebar activeSection={activeSection} onNavigate={handleNavigate} />
          </div>
        </>
      )}

      {/* Main content */}
      <div className={cn("flex flex-1 flex-col transition-all duration-300 lg:ml-60")}>
        <DashboardHeader
          activeSection={activeSection}
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
