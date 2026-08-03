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
        title: "Collection Value & Renewal Decision Tool",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Usage reports say a journal was read. They can't say whether it's part of how research actually happens here — and both halves are needed to defend a renewal. This tool joins COUNTER usage, subscription invoices, and UM's own research output from OpenAlex into a per-journal Keep / Review / Negotiate / Cancel-candidate recommendation, with the evidence behind every call. Six signals — usage level, cost efficiency, UM authorship, UM citation, usage trend, and open-access substitutability — are each ranked as a percentile *within their own vendor*, because one global scale would mark an entire small publisher as cancellable for being small. The joined view changes answers: Physics Letters B records 78 uses on the platform and looks cancellable on usage alone, until you see UM authors published 22 papers in it and cited it 647 times. Because a weighted average shouldn't have the last word on decisions with consequences, guardrails outrank the score outright — never auto-cancel a journal UM authors publish in, never auto-cancel a top-decile title, always flag a high cost per use however well it scores. Seven-stage pandas pipeline, no server and no database, shipping a single self-contained HTML file you can share by sending the one file.",
        metrics: [
          { label: "Scoring Signals", value: "6" },
          { label: "Decision Bands", value: "4" },
          { label: "Ranking", value: "Within-Vendor" },
          { label: "Output", value: "Single-File HTML" },
        ],
        tags: ["Python", "pandas", "COUNTER 5 / 5.1", "OpenAlex", "YAML Config", "Self-Contained HTML"],
        deployed: true,
      },
      {
        title: "ILL Acquisition-on-Demand",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "The collection-value tool answers \"what should we cancel?\" It structurally cannot answer the opposite question, because COUNTER only counts things we already license. That evidence lives in interlibrary loan: every borrowing request is a patron telling us, at some cost in staff time and several days of their own, that we don't have something they needed — already logged, and nothing reads it. This turns ILL borrowing into a subscribe / purchase / keep-borrowing call per title. The load-bearing computation is the CONTU Rule of Five: within one calendar year a library may receive five articles from the most recent five years of a periodical before royalties kick in. Getting it right means respecting three things a naive request count misses — the allotment is per journal per calendar year, only recent articles count against it, and order matters, so the sixth request *by date* is the one charged. Since it's a guideline rather than statute and local practice varies, the computation is reconciled against ILLiad's own copyright determination and the disagreement rate is reported on the page — a licence can clear an article the guidelines would charge for, and that gap should be explained before any royalty figure is quoted to anyone. It currently runs on synthetic ILLiad-shaped transactions so the analysis could be built and reviewed while the data request was pending, with a banner saying so on every page. The proposal and the data request are both generated from the schema code, so the ask and the implementation can't drift apart.",
        metrics: [
          { label: "Recommendation Classes", value: "5" },
          { label: "Copyright Logic", value: "CONTU Rule of 5" },
          { label: "Data Status", value: "Synthetic - Pending" },
          { label: "Outputs", value: "HTML + 3 CSVs" },
        ],
        tags: ["Python", "ILLiad", "unittest", "YAML Config", "Self-Contained HTML"],
      },
      {
        title: "Institutional Research & Open-Access Reporting Dashboards",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Leadership and the research office needed a defensible, up-to-date picture of the university's entire scholarly footprint — publication output, citation impact, grant funding, and how much of it is openly accessible — but that data was scattered across OpenAlex and Dimensions with no unified view. I developed institutional research dashboards and open-access reporting workflows on top of both sources, tracking 44.5K+ publications, 2.9M+ citations, and $508M+ in tracked grant funding, while surfacing open-access coverage across 21.8K+ publications so the library and research office can report on and push toward open-access goals.",
        metrics: [
          { label: "Publications Tracked", value: "44.5K+" },
          { label: "Citations", value: "2.9M+" },
          { label: "Grant Funding", value: "$508M+" },
          { label: "Open-Access Pubs", value: "21.8K+" },
        ],
        tags: ["Python", "OpenAlex", "Dimensions", "ETL", "React", "Data Visualization"],
        deployed: true,
      },
      {
        title: "AI Archive Image Description & Subject Cataloging",
        role: "Software Engineer - AI",
        org: "University of Mississippi",
        period: "2025 - Present",
        story:
          "Archival photo collections arrive with thousands of images and almost no usable description. I built a pipeline that generates catalog-quality titles and descriptions with local Ollama vision models — fully on-machine, so no image or description ever leaves the building. The interesting problem wasn't generation, it was agreement: asking for a title and two descriptions in one response produces three texts that disagree about what the photograph even shows. So each stage runs chained, with the prior stage's output in front of the model, and each description is checked against its anchors as it's written — if it contradicts the title on posture, setting, or number of subjects, the stage is asked again with the specific disagreement quoted back, and the second answer is kept only if it agrees better. Two things I learned by measuring rather than guessing: small vision models copy concrete nouns straight out of the prompt (an example mentioning \"a pipe\" put a pipe in a subject's mouth), and prompt length costs compliance — a thorough per-clause checklist made things measurably worse, and halving the length is what produced the gain. Subject headings work the same way: the model is trusted only to name what it sees in plain words, which are then looked up at id.loc.gov across LCSH, TGM, and LCNAF, so it can never invent a heading that doesn't exist — worst case is a real-but-wrong heading a cataloger can reject.",
        metrics: [
          { label: "Title Disagreements", value: "11/15 -> 5/15" },
          { label: "Detail Drops", value: "20 -> 9" },
          { label: "Title Contradictions", value: "2 -> 0" },
          { label: "Data Leaving Machine", value: "None" },
        ],
        tags: ["Python", "Ollama", "llama3.2-vision", "LCSH / TGM / LCNAF", "id.loc.gov", "Prompt Engineering"],
      },
      {
        title: "Faculty Research Profile & Keyword Pipeline",
        role: "Software Engineer - Backend & AI",
        org: "University of Mississippi",
        period: "Jul 2024 - Present",
        story:
          "Describing what a faculty member actually researches, from public metadata alone, is harder than it sounds — names collide, ORCIDs are half-adopted, and publication keywords are either missing or uselessly generic. Rather than commit to one approach, I built four competing methods against the same faculty roster and compared them: straight publication-keyword extraction from OpenAlex and ORCID; phrase mining with TF-IDF scoring and similarity ranking; clustering with Crossref enrichment and a review dashboard; and finally an embeddings-based pipeline with temporal trend analysis, cross-source dedupe and merge, preprint harvesting, and name-plus-affiliation discovery for faculty with no ORCID at all. Each round produced debug reports I could actually inspect, so method four is the one that survived on evidence rather than preference. The exported profiles feed a Next.js faculty profile page that renders publications, research interests, and metrics as a presentational layer over whatever the pipeline produces.",
        metrics: [
          { label: "Methods Compared", value: "4" },
          { label: "Identity Sources", value: "3 APIs" },
          { label: "Keywording", value: "Embeddings + TF-IDF" },
          { label: "Output", value: "Per-Faculty Profiles" },
        ],
        tags: ["Python", "OpenAlex", "ORCID", "Crossref", "Embeddings", "Clustering", "Next.js"],
      },
      {
        title: "Ole Miss Researcher Matchmaker",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "2025 - Present",
        story:
          "Assembling a research team, a grant group, or a dissertation committee across a campus this size is mostly word of mouth — you get the collaborators you already know about. This prototype turns it into a questionnaire: purpose, domain, methodologies, technical skills, department, seniority, keywords, team size. Every researcher is scored on transparent weights, and every card shows *why* it matched, because a match score nobody can explain is worse than no score. Repeated hits taper with diminishing returns so a broad query stays interpretable instead of crushing every percentage toward zero, and scoring and the ideal use the same curve so a perfect match still reads exactly 100%. Dissertation-committee mode filters out anyone ineligible to serve, labels members Chair / Member / Cognate, and enforces eligibility even against an explicit pin. The team builder seeds from pinned members, anchors on the top match, then greedily adds people who bring *new* methodology coverage — and reports what the team is missing (\"All senior — an early-career member would add capacity\"). 46 engine tests assert on relationships rather than exact point totals, so weights can be retuned safely but a broken normalization gets caught. Runs on a dummy roster with zero dependencies and no build step.",
        metrics: [
          { label: "Engine Tests", value: "46" },
          { label: "Scoring Signals", value: "8" },
          { label: "Dependencies", value: "0" },
          { label: "Roster", value: "28 - Dummy Data" },
        ],
        tags: ["Node.js", "Vanilla JS", "Zero-Dependency", "Weighted Scoring", "Regression Tests"],
      },
      {
        title: "Letters Anonymous",
        role: "Full Stack Engineer",
        org: "University of Mississippi",
        period: "2025 - Present",
        story:
          "A wall of anonymous, kind notes for students — anyone can submit, and approved notes join a rotating wall of encouragement. The whole design question is moderation: an anonymous submission box on a campus is a liability unless someone reads every note, and nobody has time to. So moderation runs automatically, locally, and for free, in two stages behind a single entry point. First a rules pass rejects links, emails, phone numbers, profanity, spam, and a high-precision harassment / threat / self-harm phrase blocklist that catches the clean-worded cruelty a classifier misses — \"nobody will miss you\" has no toxic vocabulary in it. Then a local toxic-bert model via Transformers.js backstops confident overt toxicity. It fails closed: an error never auto-approves. No paid APIs, no human approval queue, no data leaving the university's own infrastructure. React and Vite frontend served from the same origin as the Express API, Postgres storage, on-prem deploy.",
        metrics: [
          { label: "Moderation", value: "2-Stage, Local" },
          { label: "Human Approval", value: "None Needed" },
          { label: "Paid APIs", value: "0" },
          { label: "Failure Mode", value: "Fails Closed" },
        ],
        tags: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Transformers.js", "toxic-bert"],
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
