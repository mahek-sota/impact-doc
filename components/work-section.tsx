import { TrendingUp, Briefcase, Sparkles, HeartHandshake, Github, ExternalLink } from "lucide-react"

type Project = {
  title: string
  role: string
  org: string
  period: string
  story: string
  metrics: { label: string; value: string }[]
  tags: string[]
  github?: string
  demo?: string
  deployed?: boolean
}

type Group = {
  id: string
  label: string
  blurb: string
  icon: typeof Briefcase
  projects: Project[]
}

const groups: Group[] = [
  {
    id: "production",
    label: "Production",
    blurb: "Systems shipped on the job, serving real users under real constraints.",
    icon: Briefcase,
    projects: [
      {
        title: "UM Researcher Explorer",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "A full-stack graph visualization platform for exploring the University of Mississippi's research collaboration network. It ingests scholarly metadata from the OpenAlex API and lets you search ~6,900 UM researchers, browse their citation metrics, and visualize co-authorship networks as an explorable force-directed graph. The fun parts: a re-runnable ingestion pipeline with cursor-based pagination into a JSONL snapshot as source of truth, subsecond partial-name search via a pg_trgm GIN index, and on-demand graph expansion — async BFS fetches co-author edges live up to 3 hops, caches them locally, and caps per-node degree to prevent graph explosion. Node size, color, and border each encode a different signal (degree, institution, citations, h-index). Clean layered backend: repository / service / route separation with pure mapping functions from OpenAlex payloads to ORM to API schemas.",
        metrics: [
          { label: "Researchers Indexed", value: "~6,900" },
          { label: "Name Search", value: "Subsecond" },
          { label: "Graph Traversal", value: "BFS, 0-3 Hops" },
          { label: "REST Endpoints", value: "5" },
        ],
        tags: ["FastAPI", "React 18", "TypeScript", "PostgreSQL 16", "Cytoscape.js", "Docker"],
        deployed: true,
      },
      {
        title: "University Collaboration Risk Analysis Tool",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Research-compliance teams need to vet faculty collaborations against foreign-influence and export-control concerns. The obvious risks — a UM professor co-publishing directly with a flagged researcher — are easy to catch. The dangerous ones are indirect: a trusted direct collaborator whose own network reaches researchers on a review list. This tool automates discovery of that UM Author → Direct Collaborator → Flagged Second-Hop path. I built a FastAPI backend that does live, on-demand graph expansion against the OpenAlex API (~250M works) with zero local precompute, a multi-signal risk-scoring engine weighting review-country severity (×10), co-publication tie strength, cross-border affiliation mismatches, and funding signals, plus enrichment pipelines pulling grant, patent, and funder-country data from Dimensions and Scopus for the highest-priority matches. A React + Vite dashboard renders the risk network as a color-coded graph with node/edge drill-downs to shared publications, live filters, a priority-sorted triage table, and CSV export. The NDAA Section 1286 watchlist feeds the flagging logic, and the language stays deliberately neutral (\"Needs Review,\" \"Indirect Risk Path\") — a signal for human review, never a determination about an individual.",
        metrics: [
          { label: "External Dataset", value: "250M Works" },
          { label: "Data Fusion", value: "3-Tier" },
          { label: "Risk Score", value: "6-Factor" },
          { label: "Graph Traversal", value: "Live 2-Hop" },
        ],
        tags: ["Python", "FastAPI", "Pydantic", "pandas", "React 18", "Vite", "OpenAlex / Dimensions / Scopus"],
        deployed: true,
      },
      {
        title: "Library Resource Usage Analytics Dashboard",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Librarians were sitting on years of circulation, database, and e-resource access logs with no way to actually see them — the data lived in vendor exports and siloed systems, so questions like \"which subscriptions are we paying for but nobody uses?\" took days of manual spreadsheet work to answer. I built a dashboard that turns those raw usage logs into something you can explore. It pipes multi-source usage data — physical checkouts, database queries, e-journal and e-book access — through an ETL layer into a warehouse, then surfaces it as interactive charts: usage trends over time, cost-per-use for each subscribed resource, peak-hour and peak-season heatmaps, and department- and subject-level breakdowns. Collection-development staff use it to justify renewals and cancellations against real demand, and to spot underused resources before the next budget cycle.",
        metrics: [
          { label: "Data Sources", value: "Multi-System" },
          { label: "Reporting Effort", value: "Days -> Minutes" },
          { label: "Metrics", value: "Cost-Per-Use" },
          { label: "Audience", value: "Collection Dev" },
        ],
        tags: ["Python", "ETL", "PostgreSQL", "React", "Data Visualization"],
        deployed: true,
      },
      {
        title: "LLM-Driven Thesis Citation Review System",
        role: "Software Engineer - Backend & AI",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "This started because I watched a professor spend her entire afternoon verifying thesis citations by hand. I thought, there has to be a better way. So I built one: LLM pipelines with semantic analysis, regex heuristics, and Ollama verification. No paid APIs, fully self-hosted. What took 30 minutes now takes 2, with 95% precision.",
        metrics: [
          { label: "Classification Precision", value: "95%" },
          { label: "Review Time", value: "30m -> 2m" },
          { label: "Extraction Accuracy", value: "80%+" },
          { label: "Faculty Hours / Sem", value: "10-30" },
        ],
        tags: ["Python", "LLM", "Ollama", "Regex", "Semantic Analysis"],
        deployed: true,
      },
      {
        title: "Agentic RAG Search Assistant",
        role: "Software Engineer - Backend & AI",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Our librarians and admins were buried in search queries that took forever to resolve manually. I prototyped an agentic RAG assistant with FAISS indexing and Ollama-based answer verification. It started as a weekend experiment and ended up in production.",
        metrics: [
          { label: "Retrieval Speed", value: "+60%" },
          { label: "Manual Review", value: "-70%" },
          { label: "Vector Index", value: "FAISS" },
          { label: "Verification", value: "Ollama" },
        ],
        tags: ["FAISS", "RAG", "Ollama", "AI Agents"],
        deployed: true,
      },
      {
        title: "Cross-School Research Intelligence Platform",
        role: "Software Engineer - Backend",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "There was no way to see research trends across schools, five years of publication data just sitting in databases, disconnected. I built a platform that visualizes collaboration networks, growth trajectories, and time-series trends across 100K+ records. Materialized views and indexed models brought query time down 25%.",
        metrics: [
          { label: "Records Indexed", value: "100K+" },
          { label: "Query Time", value: "-25%" },
          { label: "Data Span", value: "5+ Years" },
          { label: "Analytics", value: "Time-Series" },
        ],
        tags: ["PostgreSQL", "Materialized Views", "React", "Indexing"],
        deployed: true,
      },
      {
        title: "Large-Scale ETL & Streaming Pipelines",
        role: "Software Engineer - Backend",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "50 million records don't move themselves. I owned the full lifecycle on this, from requirements gathering through system design, implementation, CI/CD, and observability. Built delta-sync and real-time streaming capabilities that cut latency by 30%. The kind of plumbing work that's invisible when it works and catastrophic when it doesn't.",
        metrics: [
          { label: "Records Processed", value: "50M+" },
          { label: "Latency", value: "-30%" },
          { label: "Real-Time Sync", value: "Enabled" },
          { label: "Delta Updates", value: "Enabled" },
        ],
        tags: ["Python", "PostgreSQL", "Kafka", "CI/CD"],
        deployed: true,
      },
      {
        title: "Microservices Modernization on AWS EKS",
        role: "Software Engineer - Backend",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Inherited a monolith held together by hope and duct tape. Decomposed it into containerized Go microservices on AWS EKS with automated CI/CD via GitHub Actions, fronted by a centralized API gateway with RBAC, JWT auth, and Redis-backed rate limiting. Uptime went from \"we'll see\" to 99.999%, and unauthorized requests dropped 40%.",
        metrics: [
          { label: "System Uptime", value: "99.999%" },
          { label: "Unauth Requests", value: "-40%" },
          { label: "Deployment", value: "Automated" },
          { label: "Stack", value: "Go + EKS" },
        ],
        tags: ["Go", "Docker", "Kubernetes", "AWS EKS", "GitHub Actions", "JWT", "Redis"],
        deployed: true,
      },
      {
        title: "Internal Full-Stack Academic Portals",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
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
        deployed: true,
      },
      {
        title: "Mobile-First Payment Platform",
        role: "Software Engineer Intern",
        org: "Ashtech",
        period: "Jun 2021 - Aug 2021",
        story:
          "My first internship at Ashtech. Redesigned the mobile UX, pushed for WCAG 2.1 compliance when nobody else was thinking about accessibility, and rebuilt the payment module with PayPal integration and structured error handling. User satisfaction up 20%, reliability up 40%. It was the project that taught me caring about user experience is an engineering skill, not just a design one.",
        metrics: [
          { label: "User Satisfaction", value: "+20%" },
          { label: "Reliability", value: "+40%" },
          { label: "Accessibility", value: "WCAG 2.1" },
          { label: "API Integration", value: "PayPal" },
        ],
        tags: ["PayPal API", "A/B Testing", "WCAG 2.1", "Jest", "CI/CD"],
        deployed: true,
      },
    ],
  },
  {
    id: "self-initiated",
    label: "Self-Initiated",
    blurb: "Things no one assigned, no one asked. I saw a gap and couldn't look away.",
    icon: Sparkles,
    projects: [
      {
        title: "LLM Playground — How ChatGPT Actually Works",
        role: "Creator & Engineer",
        org: "Personal Project",
        period: "2025",
        story:
          "Most explainers of how large language models work hand you diagrams of how they theoretically work. I wanted one where every knob, slider, and prompt changes something you can actually see. So I built an interactive, single-page React app that runs real LLMs — DistilGPT-2, SmolLM2-135M, and Qwen2.5-0.5B — entirely in the browser. No backend, no math, no code: the neural networks download to your machine and do inference client-side via WebGPU/WASM, all isolated in a Web Worker so token-by-token generation never freezes the UI. It's framed as a 5-minute tour across 12 interactive modules in 3 difficulty tiers, from tokenization and next-token prediction up to a live pipeline diagram and a sentiment classifier with an animated network. The standout is the sampling-math visualizer: a custom LogitsProcessor intercepts the model mid-generation and snapshots the probability distribution at every stage — raw logits → temperature → top-k → top-p → final — turning an invisible internal process into something you can watch token by token. A service worker caches model weights so each model downloads at most once, and smart backend selection prefers WebGPU for fp16 models and degrades gracefully to single-thread WASM when cross-origin isolation isn't available.",
        metrics: [
          { label: "Models In-Browser", value: "3 LLMs" },
          { label: "Learning Modules", value: "12" },
          { label: "Backend Calls", value: "0 — Client-Side" },
          { label: "Source Lines", value: "~6,300" },
        ],
        tags: ["React 18", "Vite 5", "Tailwind CSS", "transformers.js", "ONNX Runtime", "WebGPU / WASM", "Web Workers", "Service Worker"],
      },
      {
        title: "KPI Analytics Dashboard",
        role: "Software Engineer - Backend & AI",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Leadership was making decisions based on manually compiled spreadsheets that were always out of date. Nobody asked me to fix this, I just started building. Piped multi-source operational data through ETL into real-time visualizations. Now it's the thing they pull up in every meeting. 70% less time wasted on reporting.",
        metrics: [
          { label: "Reporting Effort", value: "-70%" },
          { label: "Data Sources", value: "Multi" },
          { label: "Metrics", value: "Real-Time" },
          { label: "Stakeholders", value: "Leadership" },
        ],
        tags: ["Python", "ETL", "PostgreSQL", "React", "Redux"],
      },
      {
        title: "CI/CD Observability & Distributed Monitoring",
        role: "Software Engineer - Backend",
        org: "University of Mississippi",
        period: "2024 - Present",
        story:
          "Got tired of the \"did it deploy?\" Slack messages. Built a real-time dashboard tracking pipeline status, container health, and resource usage, plus Prometheus-based distributed logging and automated alerting across containerized microservices. Shifted the team from reactive debugging to proactive monitoring.",
        metrics: [
          { label: "Monitoring", value: "Real-Time" },
          { label: "Alerts", value: "Automated" },
          { label: "Coverage", value: "Multi-Service" },
          { label: "Posture", value: "Proactive" },
        ],
        tags: ["React", "Spring Boot", "Prometheus", "Grafana", "Docker"],
      },
    ],
  },
  {
    id: "volunteer",
    label: "Volunteer",
    blurb: "Unpaid work for things I cared about.",
    icon: HeartHandshake,
    projects: [
      {
        title: "AI Audiobook Translation for the Visually Impaired",
        role: "Volunteer Engineer",
        org: "Friends for Inclusion",
        period: "2021 - 2022",
        story:
          "Volunteered with Friends for Inclusion and built an AI-powered audiobook translation tool using Hugging Face Transformers. Optimized NLP pipelines to reach 80% accuracy and improved content accessibility for visually impaired users.",
        metrics: [
          { label: "Accuracy", value: "80%" },
          { label: "Pipeline", value: "NLP" },
          { label: "Models", value: "Hugging Face" },
          { label: "Focus", value: "Accessibility" },
        ],
        tags: ["Hugging Face Transformers", "NLP", "Accessibility"],
      },
    ],
  },
]

export function WorkSection() {
  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <section key={group.id} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <group.icon className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold tracking-tight text-foreground">
                  {group.label}
                </h3>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-mono font-medium text-muted-foreground">
                  {group.projects.length}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {group.blurb}
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {group.projects.map((project) => (
              <article
                key={project.title}
                className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {project.period}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="text-[11px] font-medium text-primary">
                      {project.role}
                    </span>
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                      {project.org}
                    </span>
                    {project.deployed && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Live
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.story}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex flex-col gap-0.5 rounded-lg bg-secondary/50 px-3 py-2"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold font-mono text-foreground">
                          {metric.value}
                        </span>
                        <TrendingUp className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-[10px] leading-tight text-muted-foreground">
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

                {(project.github || project.demo) && (
                  <div className="flex flex-wrap gap-2" aria-label="Links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        <Github className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
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
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
