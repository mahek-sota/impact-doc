import { ExternalLink, FlaskConical, Github } from "lucide-react"

type Prototype = {
  title: string
  story: string
  tags: string[]
  status: string
  github?: string
  demo?: string
}

const prototypes: Prototype[] = [
  {
    title: "Modular Finance Tracking System",
    story:
      "Wanted to scratch my own itch -- track expenses properly without bloated apps. Architected a layered backend with modular services for tracking, reporting, and currency conversion with Redis caching for fast lookups. Clean separation of concerns, the way backends should be.",
    tags: ["FastAPI", "PostgreSQL", "Redis", "Docker"],
    status: "Personal Project",
    github: "",
  },
  {
    title: "Collaborative Resource Management Portal",
    story:
      "Built this to explore what a collaborative workflow looks like when you do it right -- RESTful APIs, optimized PostgreSQL schemas, Redis caching, all containerized. Focused on handling concurrent users without things falling apart.",
    tags: ["Ruby on Rails", "React", "PostgreSQL", "Redis", "Docker"],
    status: "Personal Project",
    github: "https://github.com/mahek-sota/collaborative-resource-management-portal",
  },
  {
    title: "URL Shortener with Analytics",
    story:
      "A classic project, but I used it to go deep on clean architecture -- proper OO design, analytics tracking baked in from day one, caching layer, and comprehensive test coverage. Sometimes the best way to learn is to build the \"simple\" thing properly.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
    status: "Personal Project",
    github: "https://github.com/mahek-sota/url-shortner",
  },
  {
    title: "DeFi Portfolio Tracker",
    story:
      "Tired of jumping between 5 tabs to check my crypto holdings. Built a dashboard that pulls wallet balances, token prices, and transaction history across chains via Web3.js and CoinGecko API. Tracks P&L, gas spent, and portfolio allocation in real time.",
    tags: ["React", "Web3.js", "Node.js", "CoinGecko API", "PostgreSQL"],
    status: "Personal Project",
    github: "",
  },
  {
    title: "Habit Tracker with Streaks",
    story:
      "Built this because every habit app I tried was either too complex or too forgettable. Went fully native with SwiftUI -- smooth animations, local notifications that actually fire at the right time, and CoreData for offline-first persistence. The streak analytics piece was the most fun: tracking longest streaks, completion rates, and weekly patterns using Swift Charts. Scratched my own itch and learned a ton about iOS lifecycle and notification scheduling in the process.",
    tags: ["SwiftUI", "CoreData", "Swift", "Local Notifications", "Swift Charts"],
    status: "Personal Project",
    github: "https://github.com/mahek-sota/habit-tracker-with-streaks",
  },
  {
    title: "DevPersona — Developer Personality Quiz",
    story:
      "8 questions. 8 archetypes. One honest result. Built this because I wanted a fun way to capture the different flavors of engineering personality — the Microservices Architect, the Zen Coder, the Overengineering Enthusiast. Scoring lives server-side so the weights stay out of the client bundle. Stateless by design: no database, no persistence, just compute and discard. Shipped to Vercel with a serverless Node.js backend and a React + Vite frontend.",
    tags: ["React 18", "Vite", "Node.js", "Vercel", "Serverless"],
    status: "Personal Project",
    github: "https://github.com/mahek-sota/DevPersona",
    demo: "https://dev-persona-hrsh.vercel.app",
  },
  {
    title: "Second Brain Organizer",
    story:
      "Dump everything. I'll structure it. Paste a brain dump — tasks, errands, loose thoughts — and Gemini parses it into prioritized clusters with categories, urgency, and effort scores. The fun part was the animation: tasks scatter across a canvas while the AI processes, then drift and settle into category zones. Fallback parser keeps it functional when the API is unavailable. No database, no auth — stateless backend, client-side persistence.",
    tags: ["Next.js 15", "TypeScript", "Framer Motion", "Gemini AI", "Tailwind CSS"],
    status: "Personal Project",
    github: "https://github.com/mahek-sota/second-brain-organizer",
    demo: "https://second-brain-organizer.vercel.app",
  },
  {
    title: "Overthinking Engine",
    story:
      "Give it a thought like 'They didn't reply' and it shows you the cognitive distortions shaping it, the spiral path your mind is taking, grounded alternatives, and an absurd worst-case so you can see the spiral rendered ridiculous. Built three modes: Standard, Dramatic, and Zen. Safety check catches crisis inputs before analysis runs. Powered by Gemini with a rule-based fallback when the API is unavailable. Not therapy — just a mirror.",
    tags: ["Next.js", "TypeScript", "Gemini AI", "Zod", "Tailwind CSS"],
    status: "Personal Project",
    github: "https://github.com/mahek-sota/overthinking-engine",
    demo: "https://overthinking-engine.vercel.app",
  },
  {
    title: "Your Life, Visualised",
    story:
      "A daily check-in app that turns mood and energy inputs into a dashboard with metrics like 'Main Character Energy', 'Avoidance Rate', 'Delusion-to-Execution Ratio', and 'Overthinking Index' — each with an actual formula behind it. Not a health tracker, not a productivity app. Just a cheerful, animated mirror for your day. History, trends, and insights across the last 7 entries. All local, no backend, no auth. Just vibes.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "localStorage"],
    status: "Personal Project",
    github: "https://github.com/mahek-sota/your-life-visualized",
    demo: "https://your-life-visualized.vercel.app",
  },
  {
    title: "Go Task Manager API",
    story:
      "Wanted to learn Go the way I learn best — by building something real with no framework crutches. A task manager REST API on nothing but the standard net/http library: create, list, and delete tasks with proper status codes (201, 204, 400, 404, 405) and JSON validation at the edges. Kept it deliberately minimal so the focus stayed on Go's HTTP primitives, routing, and error handling instead of reaching for a framework.",
    tags: ["Go", "net/http", "REST API", "JSON"],
    status: "Personal Project",
    github: "https://github.com/mahek-sota/go-task-manager-api",
  },
]

const statusConfig: Record<string, { dot: string; bg: string; text: string }> = {
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
