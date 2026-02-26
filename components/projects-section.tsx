import { TrendingUp, FolderKanban } from "lucide-react"

const projects = [
  {
    title: "LLM-Driven Thesis Citation Review System",
    role: "Software Engineer - Backend & AI",
    period: "Jul 2024 - Present",
    story:
      "This started because I watched a professor spend her entire afternoon verifying thesis citations by hand. I thought, there has to be a better way. So I built one, LLM pipelines with semantic analysis, regex heuristics, and Ollama verification. No paid APIs, fully self-hosted. What took 30 minutes now takes 2, with 95% precision.",
    metrics: [
      { label: "Extraction Accuracy", value: "80%+" },
      { label: "Classification Precision", value: "95%" },
      { label: "Review Time", value: "30m -> 2m" },
      { label: "Faculty Hours Saved / Sem", value: "10-30" },
    ],
    tags: ["Python", "LLM", "Ollama", "Regex", "Semantic Analysis"],
  },
  {
    title: "KPI Analytics Dashboard",
    role: "Software Engineer - Backend & AI",
    period: "Jul 2024 - Present",
    story:
      "Leadership was making decisions based on manually compiled spreadsheets that were always out of date. Nobody asked me to fix this, I just started building. Piped multi-source operational data through ETL into real-time visualizations. Now it's the thing they pull up in every meeting. 70% less time wasted on reporting.",
    metrics: [
      { label: "Reporting Effort Reduced", value: "70%" },
      { label: "Data Sources", value: "Multi" },
      { label: "Metrics", value: "Real-Time" },
      { label: "Stakeholders", value: "Leadership" },
    ],
    tags: ["Python", "ETL", "PostgreSQL", "React", "Redux"],
  },
  {
    title: "Cross-School Research Intelligence Platform",
    role: "Software Engineer - Backend",
    period: "Jul 2024 - Present",
    story:
      "There was no way to see research trends across schools, five years of publication data just sitting in databases, disconnected. I built a platform that visualizes collaboration networks, growth trajectories, and time-series trends across 100K+ records. Materialized views and indexed models brought query time down 25%.",
    metrics: [
      { label: "Records Indexed", value: "100K+" },
      { label: "Query Time Reduced", value: "25%" },
      { label: "Data Span", value: "5+ Years" },
      { label: "Analytics", value: "Time-Series" },
    ],
    tags: ["PostgreSQL", "Materialized Views", "React", "Indexing"],
  },
  {
    title: "Large-Scale ETL & Streaming Pipelines",
    role: "Software Engineer - Backend",
    period: "Jul 2024 - Present",
    story:
      "50 million records don't move themselves. I owned the full lifecycle on this, from requirements gathering through system design, implementation, CI/CD, and observability. Built delta-sync and real-time streaming capabilities that cut latency by 30%. The kind of plumbing work that's invisible when it works and catastrophic when it doesn't.",
    metrics: [
      { label: "Records Processed", value: "50M+" },
      { label: "Latency Improvement", value: "30%" },
      { label: "Real-Time Sync", value: "Enabled" },
      { label: "Delta Updates", value: "Enabled" },
    ],
    tags: ["Python", "PostgreSQL", "Kafka", "CI/CD"],
  },
  {
    title: "Microservices Modernization on AWS EKS",
    role: "Software Engineer - Backend",
    period: "Jul 2024 - Present",
    story:
      "Inherited a monolith that was held together by hope and duct tape. Decomposed it into containerized Go microservices on AWS EKS with automated CI/CD via GitHub Actions. Uptime went from \"we'll see\" to 99.999%. This was the project that taught me the most about shipping infrastructure that doesn't wake you up at 3 AM.",
    metrics: [
      { label: "System Uptime", value: "99.999%" },
      { label: "Unauth Requests", value: "-40%" },
      { label: "Deployment", value: "Automated" },
      { label: "Architecture", value: "Go + EKS" },
    ],
    tags: ["Go", "Docker", "Kubernetes", "AWS EKS", "GitHub Actions"],
  },
  {
    title: "Internal Full-Stack Academic Portals",
    role: "Full Stack Engineer",
    period: "Jul 2024 - Present",
    story:
      "Built internal portals serving 10K+ students and 100+ faculty across multiple departments. React frontend, Django backend, proper auth, usage tracking, feedback resolution. The kind of boring-but-essential infrastructure that makes an entire university run smoother.",
    metrics: [
      { label: "Students Served", value: "10K+" },
      { label: "Faculty Users", value: "100+" },
      { label: "Departments", value: "Multi" },
      { label: "Stack", value: "React + Django" },
    ],
    tags: ["React", "Django", "PostgreSQL", "Auth", "Full Stack"],
  },
  {
    title: "Mobile-First Payment Platform",
    role: "Software Engineer Intern",
    period: "Jun 2021 - Aug 2021",
    story:
      "My first internship at Ashtech. Redesigned the mobile UX, pushed for WCAG 2.1 compliance when nobody else was thinking about accessibility, and rebuilt the payment module with PayPal integration. User satisfaction up 20%, reliability up 40%. It was the project that taught me that caring about the user experience is an engineering skill, not just a design one.",
    metrics: [
      { label: "User Satisfaction", value: "+20%" },
      { label: "Reliability", value: "+40%" },
      { label: "Accessibility", value: "WCAG 2.1" },
      { label: "API Integration", value: "PayPal" },
    ],
    tags: ["PayPal API", "A/B Testing", "WCAG 2.1", "Jest", "CI/CD"],
  },
]

export function ProjectsSection() {
  return (
    <div className="flex flex-col gap-5">
      {/* Intro blurb */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
        <div className="flex items-start gap-3">
          <FolderKanban className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-foreground">
            The metrics tell one story. The context tells a better one. Every project below has
            numbers, but the part I{"'"}m most proud of is usually the <span className="italic">why</span>,
            the problem I spotted, the person I helped, or the system I refused to let stay broken.
          </p>
        </div>
      </div>

      {projects.map((project) => (
        <div
          key={project.title}
          className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
        >
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
                <span className="text-[11px] font-mono text-muted-foreground">
                  {project.period}
                </span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span className="text-[11px] font-medium text-primary">
                  {project.role}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.story}
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col gap-1 rounded-lg bg-secondary/50 p-3"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-bold font-mono text-foreground">
                      {metric.value}
                    </span>
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-[11px] leading-tight text-muted-foreground">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
