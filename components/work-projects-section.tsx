import { ExternalLink, Briefcase, Github } from "lucide-react"

type WorkProject = {
  title: string
  story: string
  tags: string[]
  status: string
  github?: string
  demo?: string
}

const workProjects: WorkProject[] = [
  {
    title: "LLM-Driven Thesis Citation Review Pipeline",
    story:
      "Faculty were spending 30 minutes per thesis manually checking citations. I thought: what if I could get an LLM to do the grunt work? Built a pipeline with semantic analysis, regex heuristics, and Ollama verification. It now does in 2 minutes what used to take 30, with 95% precision. No paid APIs, no vendor lock-in.",
    tags: ["LLM", "Ollama", "Semantic Analysis", "Python"],
    status: "Shipped to Production",
    github: "",
  },
  {
    title: "Agentic RAG Search Assistant",
    story:
      "Our librarians and admins were buried in search queries that took forever to resolve manually. I prototyped an agentic RAG assistant with FAISS indexing and Ollama-based answer verification. 60% faster retrieval, 70% less manual review. It started as a weekend experiment and ended up in production.",
    tags: ["FAISS", "RAG", "Ollama", "AI Agents"],
    status: "Shipped to Production",
    github: "",
  },
  {
    title: "CI/CD Observability Dashboard",
    story:
      "Got tired of the \"did it deploy?\" Slack messages. Built a real-time dashboard that tracks pipeline status, container health, and resource usage. Prometheus + Grafana + alerting. Now the team can actually see what's happening instead of guessing.",
    tags: ["React", "Spring Boot", "Prometheus", "Grafana", "Docker"],
    status: "In Use",
    github: "",
  },
]

const statusConfig: Record<string, { dot: string; bg: string; text: string }> = {
  "Shipped to Production": { dot: "bg-primary", bg: "bg-primary/10", text: "text-primary" },
  "In Use": { dot: "bg-chart-2", bg: "bg-chart-2/10", text: "text-chart-2" },
}

export function WorkProjectsSection() {
  return (
    <div className="flex flex-col gap-4">
      {/* Intro blurb */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
        <div className="flex items-start gap-3">
          <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-foreground">
            The work I shipped on the job, production systems serving real users, built with
            teams and under real constraints. These are the things that made it past the prototype
            stage and into people{"'"}s daily workflows.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workProjects.map((item) => {
          const config = statusConfig[item.status] ?? { dot: "bg-muted-foreground", bg: "bg-secondary", text: "text-secondary-foreground" }
          return (
            <div
              key={item.title}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.story}
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5" aria-label="Technologies">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {(item.github || item.demo) && (
                  <div className="flex flex-wrap gap-2" aria-label="Links">
                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        <Github className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    )}
                    {item.demo && (
                      <a
                        href={item.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Demo
                      </a>
                    )}
                  </div>
                )}
                <span className={`inline-flex w-fit items-center gap-1.5 rounded-full ${config.bg} px-2.5 py-0.5 text-[11px] font-medium ${config.text}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                  {item.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
