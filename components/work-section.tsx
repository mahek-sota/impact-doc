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
    blurb:
      "Systems built on the job under real constraints. Most are live and serving users; a few are built and waiting on data or rollout.",
    icon: Briefcase,
    projects: [
      {
        title: "Researcher Discovery & Collaboration Explorer",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Finding who works on what across a campus of thousands of researchers was word of mouth — there was no way to see the university's own collaboration network. I built a full-stack platform that indexes researchers and their publication metrics and renders co-authorship as an explorable graph you can search by name and expand outward from any person. Collaboration patterns that previously took weeks of manual digging are now a search and a few clicks.",
        metrics: [
          { label: "Researchers Indexed", value: "~6,900" },
          { label: "Name Search", value: "Subsecond" },
          { label: "Network Depth", value: "Up to 3 Hops" },
          { label: "Discovery Time", value: "Weeks -> Minutes" },
        ],
        tags: ["FastAPI", "React", "TypeScript", "PostgreSQL", "Graph Visualization", "Docker"],
        deployed: true,
      },
      {
        title: "Research Collaboration Review Tool",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Research-compliance teams have to vet faculty collaborations, but the manual process only realistically surfaces direct relationships — indirect ones, where a collaborator's own network extends further than expected, went unexamined because tracing them by hand wasn't feasible. I built a tool that expands collaboration networks on demand against a large public scholarly dataset and surfaces those indirect paths in a dashboard, with the supporting evidence attached to every result and export for downstream review. It's deliberately framed as a signal for human review — never a determination about any individual — and the language on every screen reflects that.",
        metrics: [
          { label: "Dataset Scale", value: "250M Works" },
          { label: "Network Analysis", value: "Indirect Paths" },
          { label: "Review Workflow", value: "Prioritized Triage" },
          { label: "Output", value: "Evidence-Linked" },
        ],
        tags: ["Python", "FastAPI", "pandas", "React", "Graph Analysis"],
        deployed: true,
      },
      {
        title: "Library Resource Usage Analytics Dashboard",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Years of resource usage data sat in vendor exports and siloed systems, so a question as basic as \"what are we paying for that nobody uses?\" took days of manual spreadsheet work. I built an interactive dashboard that consolidates usage across sources and surfaces trends over time, cost-per-use, peak-demand patterns, and department-level breakdowns. Collection-development staff now use it to justify renewals and cancellations against real demand ahead of each budget cycle.",
        metrics: [
          { label: "Reporting Effort", value: "Days -> Minutes" },
          { label: "Data Sources", value: "Multi-System" },
          { label: "Key Metric", value: "Cost-Per-Use" },
          { label: "Audience", value: "Collection Dev" },
        ],
        tags: ["Python", "ETL", "Data Visualization", "Reporting"],
        deployed: true,
      },
      {
        title: "Collection Value & Renewal Decision Tool",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Usage reports show that a resource was read, but not whether it's part of how research actually happens here — and renewal decisions need both halves, which lived in separate systems. I built a tool that joins usage, cost, and the institution's own research output into a single per-title recommendation, with the supporting evidence attached to every call and safeguards that prevent a score alone from driving a consequential decision. It ships as one self-contained file, so the analysis can be shared with stakeholders without standing up any infrastructure.",
        metrics: [
          { label: "Scoring Signals", value: "6" },
          { label: "Decision Bands", value: "4" },
          { label: "Every Call", value: "Evidence-Backed" },
          { label: "Distribution", value: "Single File" },
        ],
        tags: ["Python", "pandas", "Data Integration", "Reporting"],
        deployed: true,
      },
      {
        title: "Acquisition-on-Demand Analysis",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Usage data can say what to cancel but structurally can't say what to acquire, because it only counts what's already licensed. That evidence sits in interlibrary loan requests — already logged, and nothing was reading them. I built an analysis that turns borrowing history into a subscribe / purchase / keep-borrowing recommendation per title, including the copyright-royalty threshold that determines when borrowing has quietly become the more expensive option. It's built and validated against representative data while the production data request is pending.",
        metrics: [
          { label: "Recommendation Classes", value: "5" },
          { label: "Signal Source", value: "Existing Logs" },
          { label: "Status", value: "Awaiting Data" },
          { label: "Outputs", value: "Report + Exports" },
        ],
        tags: ["Python", "Data Analysis", "Automated Testing", "Reporting"],
      },
      {
        title: "Institutional Research & Open-Access Reporting Dashboards",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Leadership and the research office needed a defensible, current picture of the university's scholarly footprint — publication output, citation impact, grant funding, and how much of it is openly accessible — but the underlying data was scattered across sources with no unified view. I developed institutional reporting dashboards and open-access reporting workflows on top of those sources so both offices can report against real numbers and track progress toward open-access goals.",
        metrics: [
          { label: "Publications Tracked", value: "44.5K+" },
          { label: "Citations", value: "2.9M+" },
          { label: "Grant Funding", value: "$508M+" },
          { label: "Open-Access Pubs", value: "21.8K+" },
        ],
        tags: ["Python", "ETL", "React", "Data Visualization", "Reporting"],
        deployed: true,
      },
      {
        title: "AI Image Description & Subject Cataloging",
        role: "Software Engineer - AI",
        org: "University of Mississippi",
        period: "2025 - Present",
        story:
          "Archival photo collections arrive with thousands of images and little usable description, and cataloging them by hand doesn't scale. I built a pipeline that generates catalog-quality titles and descriptions using vision models running entirely on local infrastructure, so no image or description leaves the institution. Consistency was the hard part, and a measured approach to how the model is prompted and checked cut internal contradictions sharply; suggested subject headings are always validated against the official controlled vocabularies, so the system can surface a heading for a cataloger to reject but can never invent one that doesn't exist.",
        metrics: [
          { label: "Description Conflicts", value: "-55%" },
          { label: "Detail Accuracy", value: "2.2x Better" },
          { label: "Invented Headings", value: "0" },
          { label: "Data Leaving Site", value: "None" },
        ],
        tags: ["Python", "Local LLMs", "Computer Vision", "Controlled Vocabularies"],
      },
      {
        title: "Faculty Research Profile & Keyword Pipeline",
        role: "Software Engineer - Backend & AI",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Describing what a faculty member actually researches from public metadata is harder than it sounds — identities collide across sources, author identifiers are inconsistently adopted, and stated keywords are often missing or too generic to be useful. Rather than commit to one approach, I built and evaluated four competing methods against the same roster, from straightforward keyword extraction up to an embeddings-based pipeline with trend analysis, cross-source identity resolution, and discovery for faculty with no author identifier at all. Each round produced inspectable evaluation reports, so the final method was chosen on evidence; the resulting profiles feed a faculty profile page.",
        metrics: [
          { label: "Methods Evaluated", value: "4" },
          { label: "Identity Sources", value: "3" },
          { label: "Selection Basis", value: "Measured" },
          { label: "Output", value: "Per-Faculty Profiles" },
        ],
        tags: ["Python", "NLP", "Embeddings", "Clustering", "Next.js"],
      },
      {
        title: "Researcher Matchmaker",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "2025 - Present",
        story:
          "Assembling a research team, grant group, or dissertation committee across a campus this size runs on word of mouth, so you get the collaborators you already know about. I built a prototype that turns it into a short questionnaire and returns a ranked, explainable set of matches plus a suggested team — every result shows why it matched, since a score nobody can explain is worse than no score. Committee mode enforces service eligibility and assigns roles, and the team builder reports what a proposed team is still missing. A regression suite asserts on scoring relationships rather than exact totals, so weights can be retuned safely.",
        metrics: [
          { label: "Engine Tests", value: "46" },
          { label: "Scoring Signals", value: "8" },
          { label: "Every Match", value: "Explained" },
          { label: "Status", value: "Prototype" },
        ],
        tags: ["Node.js", "JavaScript", "Weighted Scoring", "Regression Tests"],
      },
      {
        title: "Letters Anonymous",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "2025 - Present",
        story:
          "A wall of anonymous, encouraging notes for students — which is only viable if every submission is screened, and no one has time to read them all. I built the platform with fully automated moderation that runs locally at no per-message cost, layering a fast rules pass with a local classifier as a backstop, and designed it to fail closed so an error can never result in an unscreened note going live. The result is an anonymous submission channel that needs no human approval queue and sends no student-submitted content to any third-party service.",
        metrics: [
          { label: "Moderation", value: "Fully Automated" },
          { label: "Approval Queue", value: "None Needed" },
          { label: "Third-Party APIs", value: "0" },
          { label: "Failure Mode", value: "Fails Closed" },
        ],
        tags: ["React", "Node.js", "Express", "PostgreSQL", "Local ML"],
      },
      {
        title: "LLM-Driven Thesis Citation Review System",
        role: "Software Engineer - Backend & AI",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Verifying thesis citations was an entirely manual job that consumed hours of faculty time per review. I built an automated pipeline that extracts citations and verifies them using language models running on local infrastructure, with no paid APIs and nothing leaving the institution. What took 30 minutes now takes 2, at 95% precision, returning 10-30 faculty hours per semester.",
        metrics: [
          { label: "Classification Precision", value: "95%" },
          { label: "Review Time", value: "30m -> 2m" },
          { label: "Extraction Accuracy", value: "80%+" },
          { label: "Faculty Hours / Sem", value: "10-30" },
        ],
        tags: ["Python", "LLM", "Local Inference", "NLP"],
        deployed: true,
      },
      {
        title: "Agentic RAG Search Assistant",
        role: "Software Engineer - Backend & AI",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Librarians and admins were spending significant time resolving search queries by hand. I prototyped an agentic retrieval assistant with vector search and automated answer verification; it started as an experiment and ended up in production, cutting retrieval time 60% and manual review 70%.",
        metrics: [
          { label: "Retrieval Speed", value: "+60%" },
          { label: "Manual Review", value: "-70%" },
          { label: "Approach", value: "Agentic RAG" },
          { label: "Origin", value: "Experiment -> Prod" },
        ],
        tags: ["Vector Search", "RAG", "Local Inference", "AI Agents"],
        deployed: true,
      },
      {
        title: "Cross-School Research Intelligence Platform",
        role: "Software Engineer - Backend",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "There was no way to see research trends across schools — five years of publication data sat disconnected across databases. I built a platform that visualizes collaboration networks, growth trajectories, and time-series trends across 100K+ records, and tuned the data layer to bring query time down 25%.",
        metrics: [
          { label: "Records Indexed", value: "100K+" },
          { label: "Query Time", value: "-25%" },
          { label: "Data Span", value: "5+ Years" },
          { label: "Analytics", value: "Time-Series" },
        ],
        tags: ["PostgreSQL", "React", "Performance Tuning", "Data Visualization"],
        deployed: true,
      },
      {
        title: "Large-Scale ETL & Streaming Pipelines",
        role: "Software Engineer - Backend",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Moving 50 million records reliably between systems was a recurring bottleneck with no real observability. I owned the full lifecycle — requirements, system design, implementation, CI/CD, and monitoring — and built delta-sync and real-time streaming that cut latency 30%.",
        metrics: [
          { label: "Records Processed", value: "50M+" },
          { label: "Latency", value: "-30%" },
          { label: "Real-Time Sync", value: "Enabled" },
          { label: "Ownership", value: "Full Lifecycle" },
        ],
        tags: ["Python", "PostgreSQL", "Kafka", "CI/CD"],
        deployed: true,
      },
      {
        title: "Microservices Modernization on AWS",
        role: "Software Engineer - Backend",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "An aging monolith was fragile to deploy and hard to secure. I decomposed it into containerized Go microservices on managed Kubernetes with automated CI/CD, fronted by a centralized API gateway with role-based access control, token auth, and rate limiting. Uptime reached 99.999% and unauthorized requests dropped 40%.",
        metrics: [
          { label: "System Uptime", value: "99.999%" },
          { label: "Unauth Requests", value: "-40%" },
          { label: "Deployment", value: "Automated" },
          { label: "Stack", value: "Go + Kubernetes" },
        ],
        tags: ["Go", "Docker", "Kubernetes", "AWS", "CI/CD", "API Gateway"],
        deployed: true,
      },
      {
        title: "Internal Full-Stack Academic Portals",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Multiple departments needed internal portals with proper authentication, usage tracking, and feedback handling. I built and maintained them end to end, serving 10K+ students and 100+ faculty — the kind of infrastructure that's invisible when it works and makes an entire university run smoother.",
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
          "The mobile payment experience was unreliable and inaccessible, with no structured error handling when transactions failed. I redesigned the mobile UX, brought it to WCAG 2.1 compliance, and rebuilt the payment module with third-party integration and proper error handling. User satisfaction rose 20% and reliability 40%.",
        metrics: [
          { label: "User Satisfaction", value: "+20%" },
          { label: "Reliability", value: "+40%" },
          { label: "Accessibility", value: "WCAG 2.1" },
          { label: "Testing", value: "A/B + Automated" },
        ],
        tags: ["Payments API", "A/B Testing", "WCAG 2.1", "Jest", "CI/CD"],
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
          "Most explanations of how large language models work hand you a diagram of how they theoretically work. I wanted one where every knob and prompt changes something you can actually see, so I built an interactive app that runs real language models entirely in the browser — no backend, no server costs, nothing leaving your machine. It's a 5-minute tour across 12 modules in 3 difficulty tiers, and the centerpiece visualizes the sampling math live, turning an invisible internal process into something you can watch token by token.",
        metrics: [
          { label: "Models In-Browser", value: "3 LLMs" },
          { label: "Learning Modules", value: "12" },
          { label: "Backend Calls", value: "0 — Client-Side" },
          { label: "Source Lines", value: "~6,300" },
        ],
        tags: ["React", "Vite", "Tailwind CSS", "transformers.js", "WebGPU / WASM", "Web Workers"],
      },
      {
        title: "KPI Analytics Dashboard",
        role: "Software Engineer - Backend & AI",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Leadership was making decisions from manually compiled spreadsheets that were always out of date. Nobody asked me to fix it — I just started building. I piped multi-source operational data through ETL into real-time visualizations, and it became the thing they pull up in every meeting, cutting reporting effort 70%.",
        metrics: [
          { label: "Reporting Effort", value: "-70%" },
          { label: "Data Sources", value: "Multi" },
          { label: "Metrics", value: "Real-Time" },
          { label: "Stakeholders", value: "Leadership" },
        ],
        tags: ["Python", "ETL", "PostgreSQL", "React"],
      },
      {
        title: "CI/CD Observability & Distributed Monitoring",
        role: "Software Engineer - Backend",
        org: "University of Mississippi",
        period: "2024 - Present",
        story:
          "Deploy status was tracked by asking in chat, and problems surfaced only once something broke. I built a real-time dashboard for pipeline status, service health, and resource usage, plus distributed logging and automated alerting across our services — shifting the team from reactive debugging to proactive monitoring.",
        metrics: [
          { label: "Monitoring", value: "Real-Time" },
          { label: "Alerts", value: "Automated" },
          { label: "Coverage", value: "Multi-Service" },
          { label: "Posture", value: "Proactive" },
        ],
        tags: ["React", "Prometheus", "Grafana", "Docker"],
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
          "Accessible audio content wasn't available in the languages the community I volunteered with actually spoke. I built an AI-powered audiobook translation tool and tuned the NLP pipeline to 80% accuracy, meaningfully widening the pool of content accessible to visually impaired users.",
        metrics: [
          { label: "Accuracy", value: "80%" },
          { label: "Pipeline", value: "NLP" },
          { label: "Focus", value: "Accessibility" },
          { label: "Impact", value: "Wider Access" },
        ],
        tags: ["NLP", "Machine Translation", "Accessibility"],
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
