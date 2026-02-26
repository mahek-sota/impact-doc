import { Users, Compass, Wrench, MessageSquare } from "lucide-react"

const stories = [
  {
    icon: Users,
    label: "20+ Workshops",
    title: "Between the sessions",
    body: "I volunteered to help during workshops and started walking between rows to check in on people who were stuck but hesitant to ask. Over time, it became instinct — fixing environment issues, untangling logic, or clarifying concepts in real time. The goal was simple: make sure no one left blocked.",
  },
  {
    icon: Compass,
    label: "Tech Navigator",
    title: "\"Hey, can you help me with this?\"",
    body: "Colleagues often reached out when they were new to something — Linux, Git, web development, or command-line tools. I’d sit with them and walk through it step by step until it felt manageable. Not doing it for them, just helping them build confidence using it.",
  },
  {
    icon: Wrench,
    label: "Automation",
    title: "\"This shouldn’t be manual\"",
    body: "When I noticed repetitive tasks taking significant time, I built scripts or small tools to automate them. Setup helpers, workflow scripts, lightweight pipelines — practical solutions that reduced manual effort and let people focus on higher-value work.",
  },
  {
    icon: MessageSquare,
    label: "Peer Mentor",
    title: "Learning together",
    body: "During internships, when teammates ran into unfamiliar patterns or difficult errors, I’d debug alongside them or share clearer resources. It wasn’t formal mentorship — just making sure progress didn’t stall.",
  },
]

export function ColleaguesSection() {
  return (
    <div className="space-y-6">
      {/* Intro blurb */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
      <p className="text-sm leading-relaxed text-foreground">
        Not every contribution is assigned. Some of it happens in conversations,
        debugging sessions, or quick calls that unblock someone else.
        This section reflects that layer of work.
      </p>
      </div>

      {/* Story cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {stories.map((story) => (
          <div
            key={story.title}
            className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <story.icon className="h-4.5 w-4.5" />
              </div>
              <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase text-primary">
                {story.label}
              </span>
            </div>
            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {story.title}
            </h3>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
              {story.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
