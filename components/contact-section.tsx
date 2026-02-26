"use client"

import { Linkedin, Mail, ArrowUpRight } from "lucide-react"

export function ContactSection() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          If something here resonated, a project, a prototype, an approach to
          helping people, I would genuinely love to hear from you. I am always
          open to conversations about building things that matter, joining a team
          that cares about craft, or just nerding out about backend systems and
          AI pipelines.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/maheksota"
          target="_blank"
          rel="noreferrer"
          className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A66C2]/10">
              <Linkedin className="h-6 w-6 text-[#0A66C2]" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              LinkedIn
            </h3>
          </div>
          <span className="mt-auto text-xs font-medium text-primary">
            linkedin.com/in/maheksota
          </span>
        </a>

        {/* Email */}
        <a
          href="mailto:sotamahek@gmail.com"
          className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Email
            </h3>
          </div>
          <span className="mt-auto text-xs font-medium text-primary">
            sotamahek@gmail.com
          </span>
        </a>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-card/50 p-5 text-center">
        <p className="text-xs text-muted-foreground">
          I typically respond within 24 hours. If I take longer, I am probably
          heads-down building something and will get back to you as soon as I
          come up for air.
        </p>
      </div>
    </div>
  )
}
