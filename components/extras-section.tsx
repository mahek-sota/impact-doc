import { Brain, Accessibility, CreditCard, Wrench, BarChart3, LineChart, Shield, Sparkles } from "lucide-react"

const extras = [
  {
    icon: LineChart,
    title: "KPI Analytics Dashboard",
    period: "2024 - Present",
    org: "University of Mississippi",
    story:
      "Built ETL pipelines to aggregate multi-source operational data and shipped a real-time KPI dashboard for leadership. Reduced manual reporting effort by 70% and replaced static reports with live metrics used in meetings.",
  },
  {
    icon: Shield,
    title: "Distributed Logging & Alerting",
    period: "2024 - Present",
    org: "University of Mississippi",
    story:
      "Implemented Prometheus-based metrics, distributed logging, and automated alerting across containerized microservices. Shifted the system from reactive debugging to proactive monitoring.",
  },
  {
    icon: Brain,
    title: "AI Audiobook Translation for the Visually Impaired",
    period: "2021 - 2022",
    org: "Friends for Inclusion",
    story:
      "Volunteered with Friends for Inclusion and built an AI-powered audiobook translation tool using Hugging Face Transformers. Optimized NLP pipelines to reach 80% accuracy and improved content accessibility for visually impaired users.",
  },
  {
    icon: Accessibility,
    title: "Accessibility Improvements (WCAG 2.1)",
    period: "2021",
    org: "Ashtech",
    story:
      "Led accessibility improvements for a mobile UI, running A/B tests and redesigning key flows to align with WCAG 2.1 standards. Increased user satisfaction by 20%.",
  },
  {
    icon: CreditCard,
    title: "Payment Processing Module",
    period: "2021",
    org: "Ashtech",
    story:
      "Rebuilt a fragile payment flow with real-time validation, structured error handling, and PayPal API integration. Improved reliability by 40% and reduced production incidents.",
  },
  {
    icon: Wrench,
    title: "Secure API Gateway with RBAC",
    period: "2024 - Present",
    org: "University of Mississippi",
    story:
      "Designed and implemented a centralized API gateway with RBAC, JWT authentication, Redis-backed rate limiting, and structured logging. Reduced unauthorized requests by 40% and improved system-level observability.",
  },
  {
    icon: BarChart3,
    title: "CI/CD Observability Dashboard",
    period: "2024 - Present",
    org: "University of Mississippi",
    story:
      "Built a real-time observability dashboard tracking CI/CD pipelines, container health, and resource utilization using Prometheus and Grafana. Increased deployment transparency and reduced debugging time.",
  },
]

export function ExtrasSection() {
  return (
    <div className="flex flex-col gap-4">
      {/* Intro blurb */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-foreground">
            These are things I built because I saw a gap, felt a frustration, or just couldn{"'"}t
            help myself. No one assigned them. No one asked. I just couldn{"'"}t not do them.
          </p>
        </div>
      </div>

      {extras.map((item) => (
        <div
          key={item.title}
          className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <item.icon className="h-5 w-5" />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                  {item.org}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {item.period}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.story}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
