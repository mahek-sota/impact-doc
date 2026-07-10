import type { ComponentType } from "react"
import { notFound } from "next/navigation"
import { OverviewSection } from "@/components/overview-section"
import { ColleaguesSection } from "@/components/colleagues-section"
import { PrototypesSection } from "@/components/prototypes-section"
import { WorkSection } from "@/components/work-section"
import { ReliableAISection } from "@/components/reliable-ai-section"
import { WritingSection } from "@/components/writing-section"
import { ContactSection } from "@/components/contact-section"

const sections: Record<
  string,
  { title: string; subtitle: string; Component: ComponentType }
> = {
  overview: {
    title: "Overview",
    subtitle: "The stuff a resume can't capture.",
    Component: OverviewSection,
  },
  colleagues: {
    title: "Helping Colleagues",
    subtitle: "The in-between work that never shows up on a Jira ticket.",
    Component: ColleaguesSection,
  },
  work: {
    title: "Work & Impact",
    subtitle: "Shipped systems, self-initiated wins, and volunteer work, all in one place.",
    Component: WorkSection,
  },
  prototypes: {
    title: "Prototypes",
    subtitle: "Ideas I couldn't stop thinking about, so I built them.",
    Component: PrototypesSection,
  },
  "reliable-ai": {
    title: "Building Reliable AI Systems",
    subtitle: "The pipelines, evals, and guardrails I've built behind the scenes.",
    Component: ReliableAISection,
  },
  "tech-blogs": {
    title: "Tech Blogs",
    subtitle: "Notes from things I debugged, broke, or argued about — explained from first principles.",
    Component: WritingSection,
  },
  contact: {
    title: "Get in Touch",
    subtitle: "I don't bite. Mostly I just build things.",
    Component: ContactSection,
  },
}

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }))
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params
  const entry = sections[section]

  if (!entry) {
    notFound()
  }

  const { title, subtitle, Component } = entry

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <Component />
    </>
  )
}
