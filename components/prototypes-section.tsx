import { ArrowUpRight, FlaskConical } from "lucide-react"

const prototypes = [
  {
    title: "LLM-Driven Thesis Citation Review Pipeline",
    story:
      "Faculty were spending 30 minutes per thesis manually checking citations. I thought: what if I could get an LLM to do the grunt work? Built a pipeline with semantic analysis, regex heuristics, and Ollama verification. It now does in 2 minutes what used to take 30, with 95% precision. No paid APIs, no vendor lock-in.",
    tags: ["LLM", "Ollama", "Semantic Analysis", "Python"],
    status: "Shipped to Production",
  },
  {
    title: "Agentic RAG Search Assistant",
    story:
      "Our librarians and admins were buried in search queries that took forever to resolve manually. I prototyped an agentic RAG assistant with FAISS indexing and Ollama-based answer verification. 60% faster retrieval, 70% less manual review. It started as a weekend experiment and ended up in production.",
    tags: ["FAISS", "RAG", "Ollama", "AI Agents"],
    status: "Shipped to Production",
  },
  {
    title: "CI/CD Observability Dashboard",
    story:
      "Got tired of the \"did it deploy?\" Slack messages. Built a real-time dashboard that tracks pipeline status, container health, and resource usage. Prometheus + Grafana + alerting. Now the team can actually see what's happening instead of guessing.",
    tags: ["React", "Spring Boot", "Prometheus", "Grafana", "Docker"],
    status: "In Use",
  },
  {
    title: "Modular Finance Tracking System",
    story:
      "Wanted to scratch my own itch -- track expenses properly without bloated apps. Architected a layered backend with modular services for tracking, reporting, and currency conversion with Redis caching for fast lookups. Clean separation of concerns, the way backends should be.",
    tags: ["FastAPI", "PostgreSQL", "Redis", "Docker"],
    status: "Personal Project",
  },
  {
    title: "Collaborative Resource Management Portal",
    story:
      "Built this to explore what a collaborative workflow looks like when you do it right -- RESTful APIs, optimized PostgreSQL schemas, Redis caching, all containerized. Focused on handling concurrent users without things falling apart.",
    tags: ["Ruby on Rails", "React", "PostgreSQL", "Redis", "Docker"],
    status: "Personal Project",
  },
  {
    title: "URL Shortener with Analytics",
    story:
      "A classic project, but I used it to go deep on clean architecture -- proper OO design, analytics tracking baked in from day one, caching layer, and comprehensive test coverage. Sometimes the best way to learn is to build the \"simple\" thing properly.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
    status: "Personal Project",
  },
]

const statusConfig: Record<string, { dot: string; bg: string; text: string }> = {
  "Shipped to Production": { dot: "bg-primary", bg: "bg-primary/10", text: "text-primary" },
  "In Use": { dot: "bg-chart-2", bg: "bg-chart-2/10", text: "text-chart-2" },
  "Personal Project": { dot: "bg-chart-4", bg: "bg-chart-4/10", text: "text-chart-4" },
}

export function PrototypesSection() {
  return (
    <div className="flex flex-col gap-4">
      {/* Intro blurb */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
        <div className="flex items-start gap-3">
          <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-foreground">
            I build things to learn, to solve problems I{"'"}m curious about, and sometimes
            just because I can{"'"}t stop thinking about them. Some made it to production.
            Some live on my GitHub. All of them taught me something.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {prototypes.map((item) => {
          const config = statusConfig[item.status] ?? { dot: "bg-muted-foreground", bg: "bg-secondary", text: "text-secondary-foreground" }
          return (
            <div
              key={item.title}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                  <ArrowUpRight className="ml-1 inline-block h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
