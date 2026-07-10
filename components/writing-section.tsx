"use client"

import { PenSquare, ArrowUpRight } from "lucide-react"

type Post = {
  title: string
  date: string
  topic: string
  blurb: string
  url: string
}

const posts: Post[] = [
  {
    title: "Most AI Problems Are Actually Data Pipeline Problems",
    date: "May 2026",
    topic: "AI & Data",
    blurb:
      "The model rarely fails loudly. The pipeline feeding it fails silently — stale joins, dropped rows, schema drift — and the AI just confidently learns the wrong thing. Why observability upstream matters more than a bigger model.",
    url: "https://medium.com/@maheksota56/most-ai-problems-are-actually-data-pipeline-problems-3dd97186ed76",
  },
  {
    title: "What Fails First at Scale: Lessons from Processing Millions of Records",
    date: "May 2026",
    topic: "Scale",
    blurb:
      "At 50M+ records, compute is almost never the bottleneck. Memory, I/O, and data skew break first — usually in ways your test dataset never revealed. Field notes from the plumbing.",
    url: "https://medium.com/@maheksota56/what-fails-first-at-scale-lessons-from-processing-millions-of-records-4d6788428ed3",
  },
  {
    title: "A Practical Introduction to Kafka and Event-Driven Systems",
    date: "May 2026",
    topic: "Systems",
    blurb:
      "Kafka as an append-only distributed log, not a message queue — and why that mental shift changes how you design everything downstream of it.",
    url: "https://medium.com/@maheksota56/a-practical-introduction-to-kafka-and-event-driven-systems-5873943c8d7c",
  },
  {
    title: "Batch vs Streaming: Acting on Incomplete vs Complete Data",
    date: "May 2026",
    topic: "Data Eng",
    blurb:
      "Batch waits for the whole picture; streaming acts on fragments as they arrive. The real question isn't which is better — it's how wrong you can afford to be, and for how long.",
    url: "https://medium.com/@maheksota56/batch-vs-streaming-acting-on-incomplete-vs-complete-data-1f134b6cc8c3",
  },
  {
    title: "Nothing Was Failing. Which Was Suspicious",
    date: "May 2026",
    topic: "Observability",
    blurb:
      "Every dashboard was green and that was the problem. A short story about swallowed exceptions, and why a system that never errors is often one that stopped telling you the truth.",
    url: "https://medium.com/@maheksota56/nothing-was-failing-which-was-suspicious-d59afa89c102",
  },
  {
    title: "Sessions vs JWT: Why This Choice Actually Matters",
    date: "April 2026",
    topic: "Backend",
    blurb:
      "Stateful sessions vs stateless tokens isn't a style preference — it decides how you scale, how you revoke access, and what actually happens when a user hits log out.",
    url: "https://medium.com/@maheksota56/sessions-vs-jwt-why-this-choice-actually-matters-c93a67b548ec",
  },
  {
    title: "Interesting Reads of the Week (05/05/2026)",
    date: "May 2026",
    topic: "Field Notes",
    blurb:
      "Insights pulled from how DoorDash, Instacart, and LinkedIn are folding AI agents and tools like Cursor into real engineering workflows — what's hype and what's actually shipping.",
    url: "https://medium.com/@maheksota56/interesting-reads-of-the-week-05-05-2026-e460b0646607",
  },
  {
    title: "Interesting Reads of the Week (05/01/2026)",
    date: "May 2026",
    topic: "Field Notes",
    blurb:
      "Notes from NVIDIA's Nemotron multimodal model, Pinterest's network optimization work, and Blender's texture caching — engineering-blog deep dives worth stealing ideas from.",
    url: "https://medium.com/@maheksota56/interesting-reads-of-the-week-05-01-2026-9d65c43bc018",
  },
]

export function WritingSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          I write to think. Most of these started as something I debugged, broke,
          or argued about at work, then tried to explain from first principles.
          A curated few are below — the rest live on{" "}
          <a
            href="https://medium.com/@maheksota56"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Medium
          </a>
          .
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {posts.map((post) => (
          <a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground/5 text-foreground">
                  <PenSquare className="h-4 w-4" />
                </span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-mono text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                    {post.topic}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>

            <h4 className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
              {post.title}
            </h4>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {post.blurb}
            </p>

            <span className="mt-auto pt-1 text-[11px] font-medium text-primary">
              Read on Medium
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
