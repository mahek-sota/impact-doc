import {
  GraduationCap,
  MapPin,
  Briefcase,
  Code2,
  Database,
  Cloud,
  Brain,
  TrendingUp,
  Heart,
} from "lucide-react"

const stats = [
  { label: "Projects Shipped", value: "12+", icon: Code2 },
  { label: "Records Processed", value: "50M+", icon: Database },
  { label: "System Uptime", value: "99.999%", icon: Cloud },
  { label: "Query Time Reduced", value: "25%", icon: Brain },
]

const skills = [
  "Python", "Go", "Java", "TypeScript", "Ruby on Rails", "PostgreSQL", "Redis",
  "Kafka", "Docker", "Kubernetes", "Terraform", "AWS", "GCP", "FastAPI", "Django",
  "React", "Next.js", "Spring Boot", "GraphQL", "gRPC", "LLM/RAG", "Prometheus",
]

export function OverviewSection() {
  return (
    <div className="flex flex-col gap-6">
      {/* Bio Card */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
            MS
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Mahek Sota
              </h1>
              <p className="mt-1 text-sm font-medium text-primary">
                Software Engineer &mdash; Backend & AI
              </p>
            </div>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">
              I’m the person who shows up early, stays late, and builds the thing nobody explicitly requested, but everyone ends up relying on. My resume explains <span className="italic">what</span> I’ve shipped. This page shows you <span className="font-medium text-foreground">who I am while shipping</span>, the engineer who jumps into debugging threads uninvited, prototypes dashboards on weekends because the data deserved better, and takes responsibility for making sure the people around me don’t feel stuck.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                Oxford, MS
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5" />
                MS in CS, USC
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" />
                University of Mississippi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Card */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <Heart className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">Why this exists</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Resumes summarize outcomes. Performance reviews summarize scope.
              They don’t capture the smaller, unassigned contributions, mentoring a teammate through infrastructure issues,
              automating repetitive workflows, or tightening systems that were technically “working” but not efficient.
              
              This page documents that context, how I think, how I take ownership, and how I approach building beyond the task at hand.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-4.5 w-4.5 text-muted-foreground" />
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-1 text-sm font-semibold text-foreground">
          Things I reach for
        </h3>
        <p className="mb-4 text-xs text-muted-foreground">
          Not a bingo card &mdash; these are the tools I{"'"}ve actually shipped production code with.
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                University of Southern California
              </h4>
              <p className="text-xs text-muted-foreground">
                M.S. in Computer Science &mdash; GPA 3.5/4.0
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Aug 2022 &ndash; May 2024
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-start gap-3">
            <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Mumbai University (TSEC)
              </h4>
              <p className="text-xs text-muted-foreground">
                B.Tech in Computer Science &mdash; GPA 9.5/10.0
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Aug 2018 &ndash; May 2022
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
