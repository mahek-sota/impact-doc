"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { OverviewSection } from "@/components/overview-section"
import { ColleaguesSection } from "@/components/colleagues-section"
import { PrototypesSection } from "@/components/prototypes-section"
import { WorkSection } from "@/components/work-section"
import { ReliableAISection } from "@/components/reliable-ai-section"
import { WritingSection } from "@/components/writing-section"
import { ContactSection } from "@/components/contact-section"
import { cn } from "@/lib/utils"

const sectionTitles: Record<string, { title: string; subtitle: string }> = {
  overview: {
    title: "Overview",
    subtitle: "The stuff a resume can't capture.",
  },
  colleagues: {
    title: "Helping Colleagues",
    subtitle: "The in-between work that never shows up on a Jira ticket.",
  },
  prototypes: {
    title: "Prototypes",
    subtitle: "Ideas I couldn't stop thinking about, so I built them.",
  },
  work: {
    title: "Work & Impact",
    subtitle: "Shipped systems, self-initiated wins, and volunteer work, all in one place.",
  },
  "reliable-ai": {
    title: "Building Reliable AI Systems",
    subtitle: "The pipelines, evals, and guardrails I've built behind the scenes.",
  },
  writing: {
    title: "Writing",
    subtitle: "Notes from things I debugged, broke, or argued about — explained from first principles.",
  },
  contact: {
    title: "Get in Touch",
    subtitle: "I don't bite. Mostly I just build things.",
  },
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavigate = (id: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
  }

  const section = sectionTitles[activeSection] || sectionTitles.overview

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
          <div className="mx-auto max-w-6xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {section.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {section.subtitle}
              </p>
            </div>

            {activeSection === "overview" && <OverviewSection />}
            {activeSection === "colleagues" && <ColleaguesSection />}
            {activeSection === "prototypes" && <PrototypesSection />}
            {activeSection === "work" && <WorkSection />}
            {activeSection === "reliable-ai" && <ReliableAISection />}
            {activeSection === "writing" && <WritingSection />}
            {activeSection === "contact" && <ContactSection />}

            {/* <footer className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
              <p>
                Built with{" "}
                <a
                  href="https://nextjs.org"
                  className="font-medium text-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  Next.js
                </a>{" "}
                and{" "}
                <a
                  href="https://tailwindcss.com"
                  className="font-medium text-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tailwind CSS
                </a>
                . Inspired by{" "}
                <a
                  href="https://jvns.ca/blog/brag-documents/"
                  className="font-medium text-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  Julia Evans{"'"} brag document
                </a>
                .
              </p>
            </footer> */}
          </div>
        </main>
      </div>
    </div>
  )
}
