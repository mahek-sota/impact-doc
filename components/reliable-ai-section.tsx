"use client"

import { useState } from "react"
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Beaker,
  Boxes,
  CheckCircle2,
  ChevronDown,
  CircuitBoard,
  Database,
  Eye,
  FileSearch,
  GitBranch,
  Layers,
  LineChart as LineChartIcon,
  Microscope,
  Network,
  Radar,
  RefreshCw,
  Search,
  ShieldCheck,
  Target,
  Workflow,
  XCircle,
  Zap,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "@/lib/utils"

const themes = [
  {
    icon: Microscope,
    title: "Evaluation & Benchmarking",
    description:
      "Treating evals as the contract, not the demo. Datasets, scoring, regressions, and per-slice breakdowns over vibes.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability Engineering",
    description:
      "Designing for the long tail: retries, timeouts, idempotency, and graceful degradation when models drift or APIs blink.",
  },
  {
    icon: Radar,
    title: "Hallucination Detection",
    description:
      "Catching fabricated entities, mismatched citations, and ungrounded claims before they reach the user.",
  },
  {
    icon: Eye,
    title: "Human-in-the-Loop",
    description:
      "Routing low-confidence outputs to reviewers, capturing their corrections, and feeding them back as evaluation signal.",
  },
  {
    icon: Workflow,
    title: "Agentic Workflows",
    description:
      "Tool use, planning, and verification loops — bounded, observable, and never trusted without checks.",
  },
  {
    icon: Search,
    title: "Retrieval Quality",
    description:
      "Recall, precision, and reranking — measured per query class, not averaged into a single dashboard number.",
  },
  {
    icon: CheckCircle2,
    title: "Structured Verification",
    description:
      "Schema validation, constrained decoding, and post-hoc checkers that turn free-form output into something a system can trust.",
  },
  {
    icon: AlertTriangle,
    title: "Failure Analysis",
    description:
      "Reading transcripts. Clustering wrong answers. Naming failure modes so the team can target them, not just feel them.",
  },
  {
    icon: Activity,
    title: "Observability",
    description:
      "Traces, prompt versions, retrieval snapshots, and per-call cost — so reproducing a bad run isn't an archaeology project.",
  },
  {
    icon: CircuitBoard,
    title: "AI Workflow Design",
    description:
      "Deciding what the model owns, what the system owns, and where the human stays in the loop. Boundaries beat magic.",
  },
  {
    icon: Beaker,
    title: "Ambiguity Handling",
    description:
      "When the input is underspecified, asking back is a feature. Confidence is the API, not just the prediction.",
  },
  {
    icon: Boxes,
    title: "Production-Oriented AI",
    description:
      "Cost ceilings, latency budgets, on-prem constraints, audit trails. The parts of AI that don't show up in a notebook.",
  },
]

const failureModes = [
  { label: "Fabricated journals", note: "Plausible but non-existent venue names" },
  { label: "DOI mismatches", note: "DOI resolves to a different paper than the citation claims" },
  { label: "OCR corruption", note: "Glyph drops, ligature joins, hyphenation splits" },
  { label: "Semantic drift", note: "High cosine similarity, wrong topic" },
  { label: "Malformed references", note: "Author/year swapped, missing volume, broken delimiters" },
  { label: "Partial metadata overlap", note: "Two real papers collapsing into one phantom" },
]

const precisionData = [
  { stage: "v0 baseline", precision: 62, hallucination: 28 },
  { stage: "v1 heuristics", precision: 74, hallucination: 19 },
  { stage: "v2 semantic", precision: 86, hallucination: 11 },
  { stage: "v3 verifier", precision: 92, hallucination: 6 },
  { stage: "v4 + HITL", precision: 95, hallucination: 3 },
]

const reviewTimeData = [
  { phase: "Manual", minutes: 30 },
  { phase: "v1", minutes: 14 },
  { phase: "v2", minutes: 6 },
  { phase: "v3", minutes: 3 },
  { phase: "Current", minutes: 2 },
]

const benchmarkRows = [
  {
    config: "Local 7B • naive prompt",
    precision: "0.71",
    recall: "0.66",
    halluc: "18%",
    p95: "1.4s",
    cost: "—",
  },
  {
    config: "Local 7B • structured + verifier",
    precision: "0.88",
    recall: "0.81",
    halluc: "6%",
    p95: "2.1s",
    cost: "—",
  },
  {
    config: "Local 13B • structured + verifier",
    precision: "0.92",
    recall: "0.84",
    halluc: "4%",
    p95: "3.6s",
    cost: "—",
  },
  {
    config: "Hosted • structured + verifier",
    precision: "0.94",
    recall: "0.87",
    halluc: "3%",
    p95: "0.9s",
    cost: "$$",
  },
  {
    config: "Hosted • + HITL on low conf",
    precision: "0.97",
    recall: "0.86",
    halluc: "1%",
    p95: "0.9s",
    cost: "$$",
  },
]

const promptVariants = [
  { variant: "Zero-shot freeform", structured: 41, grounded: 58, faithful: 60 },
  { variant: "Few-shot freeform", structured: 63, grounded: 71, faithful: 74 },
  { variant: "Few-shot + schema", structured: 92, grounded: 79, faithful: 81 },
  { variant: "Schema + verifier", structured: 98, grounded: 88, faithful: 91 },
  { variant: "Schema + verifier + cite", structured: 98, grounded: 94, faithful: 95 },
]

const lessons = [
  {
    icon: Search,
    title: "Retrieval is the bottleneck more often than the model",
    body:
      "Most of the time when the answer was wrong, the right context wasn't in the prompt to begin with. Investing in chunking, reranking, and query rewriting paid off more than swapping models.",
  },
  {
    icon: Beaker,
    title: "Prompts are not stable interfaces",
    body:
      "A prompt that 'works' on Monday quietly regresses by Friday after an upstream change in retrieval, formatting, or tokenization. Pin prompts behind versions and run them through evals on every change.",
  },
  {
    icon: AlertTriangle,
    title: "Edge cases compound faster than you expect",
    body:
      "Two independent failure modes don't stay independent. OCR corruption + ambiguous abbreviations + a permissive parser is how a 1% bug becomes a 7% bug overnight.",
  },
  {
    icon: Eye,
    title: "Evaluations have blind spots",
    body:
      "If your eval set was built from happy-path traffic, it won't catch the messy queries production actually receives. Mining real failures back into the eval set is the only honest loop.",
  },
  {
    icon: RefreshCw,
    title: "Models drift; pipelines should not",
    body:
      "Even small weight or backend changes shift output distributions. The wrapping system — schemas, verifiers, retries, fallbacks — is what holds reliability constant when the model underneath moves.",
  },
  {
    icon: Zap,
    title: "Latency is a reliability concern",
    body:
      "Long retrieval-depth setups produce better answers and worse experiences. Past a budget, users abandon and the 'better' answer never gets read. Latency lives in the same quality budget as accuracy.",
  },
  {
    icon: FileSearch,
    title: "Structured outputs are brittle without verification",
    body:
      "JSON-shaped outputs lie convincingly. A schema that parses cleanly can still describe a hallucinated paper. The verifier is what makes the structure mean something.",
  },
  {
    icon: Target,
    title: "Ambiguity should be surfaced, not guessed away",
    body:
      "Underspecified inputs are not the model's fault to fix silently. Returning a confidence band, a clarifying question, or a 'I'm not sure' is more useful than a confident wrong answer.",
  },
  {
    icon: Network,
    title: "Grounding fails in interesting ways",
    body:
      "The model cites a real source — but for a claim that source never made. 'Cited' and 'supported' are different signals; only the second one earns the user's trust.",
  },
]

const workflowPrinciples = [
  {
    icon: Layers,
    title: "Progressive disclosure",
    body: "Show the answer first. Show the reasoning, sources, and confidence on demand. Reviewers want depth; readers want speed.",
  },
  {
    icon: ShieldCheck,
    title: "Confidence as an interface",
    body: "Every output ships with a confidence band. Low-confidence outputs route to a human queue instead of pretending to be answers.",
  },
  {
    icon: RefreshCw,
    title: "Retries that mean something",
    body: "Retry strategies are tied to failure type — schema-fail retries differ from rate-limit retries differ from grounding-fail retries.",
  },
  {
    icon: AlertTriangle,
    title: "Fallback before failure",
    body: "When the agent path can't finish in budget, the system degrades to a simpler retrieval-only response — never a blank screen.",
  },
  {
    icon: Eye,
    title: "Explainability where it matters",
    body: "Citations, retrieved chunks, and verifier verdicts are surfaced inline. The user shouldn't have to trust the system blindly.",
  },
  {
    icon: Target,
    title: "Automation vs. control",
    body: "Auto-resolve only what the system has earned. Everything else is a suggestion the human accepts, edits, or rejects.",
  },
]

interface CaseStudySection {
  heading: string
  body: string
  bullets?: string[]
}

interface CaseStudy {
  id: string
  framing: string
  title: string
  summary: string
  stack: string[]
  sections: CaseStudySection[]
}

const caseStudies: CaseStudy[] = [
  {
    id: "citation",
    framing: "Evaluating Reliability in LLM-Based Citation Workflows",
    title: "Citation Verification & Hallucination Analysis System",
    summary:
      "A multi-stage verification pipeline that takes thesis bibliographies, extracts every reference, and decides — with calibrated confidence — whether each citation actually exists, matches the cited claim, and points to a real venue.",
    stack: [
      "Python",
      "Ollama (local LLM)",
      "Sentence Transformers",
      "Regex heuristics",
      "Postgres",
      "Structured JSON",
    ],
    sections: [
      {
        heading: "Problem",
        body:
          "Faculty were spending ~30 minutes per thesis manually verifying citations. The naive pipeline — extract reference, ask LLM if it's real — produced confident hallucinations at a rate that made reviewers trust the tool less than no tool at all.",
      },
      {
        heading: "Architecture",
        body:
          "A staged pipeline rather than a single LLM call:",
        bullets: [
          "OCR + reference parser that splits raw bibliographies into structured candidate records",
          "Heuristic scorer (regex + metadata patterns) that catches malformed references early",
          "Semantic similarity check against an indexed corpus to flag drift between cited claim and source",
          "Local LLM verifier prompted with the parsed record, the cited passage, and retrieved metadata",
          "Confidence aggregator that combines heuristic, semantic, and LLM signals into one score",
          "Human-in-the-loop queue for everything below a calibrated confidence threshold",
        ],
      },
      {
        heading: "Failure Modes Observed",
        body:
          "Cataloguing failures was the work — every named failure mode became a fixture in the eval set:",
        bullets: [
          "Fabricated journal names that look real (\"Annals of Applied Materials Research\")",
          "DOI strings that resolve, but not to the cited paper",
          "OCR corruption: ligature joins (fi → fl), hyphenation splits, dropped diacritics",
          "Semantic drift: high embedding similarity, wrong topic entirely",
          "Malformed references where author/year were swapped or volumes missing",
          "Two real papers partially overlapping into one phantom citation",
        ],
      },
      {
        heading: "Evaluation Logic",
        body:
          "Three orthogonal metrics, tracked per failure-mode slice instead of as a single average:",
        bullets: [
          "Precision: of citations the system flagged as real, how many were actually real",
          "Recall: of fabricated citations, how many we caught",
          "Hallucination rate: confident-correct claims that turned out to be wrong on review",
          "Per-slice breakdowns by discipline, OCR quality, and reference style",
        ],
      },
      {
        heading: "Tradeoffs",
        body:
          "Every reliability gain cost something else. Adding the verifier doubled latency per reference; adding HITL added human time we then had to win back via better confidence calibration. The honest version of \"95% precision\" includes \"and we route ~12% of references to a human, deliberately.\"",
      },
      {
        heading: "What Improved Over Time",
        body:
          "Precision moved from 62% → 95% across four iterations. The wins came in this order: parser hardening (cheap), heuristic gating (cheap), semantic verification (medium), local LLM verifier with structured output (expensive), HITL routing on low confidence (operationally expensive but the only way past 92%).",
      },
      {
        heading: "Real-World Constraints",
        body:
          "No paid APIs — everything self-hosted on Ollama for compliance. No cloud retrieval — corpus had to live on-prem. Faculty review time was the actual budget being optimized; \"faster\" and \"cheaper\" were both downstream of \"do reviewers trust the output enough to skip re-checking it.\"",
      },
    ],
  },
  {
    id: "rag",
    framing: "Designing Retrieval Systems That Fail Gracefully",
    title: "Agentic RAG Assistant",
    summary:
      "A retrieval-augmented assistant for librarians and admins drowning in long-tail search queries. Built less as a chatbot and more as a verification-first retrieval system with a conversational surface.",
    stack: ["FAISS", "Ollama", "Reranker", "Query rewriter", "Python", "Structured outputs"],
    sections: [
      {
        heading: "System Flow",
        body:
          "User query → query rewrite → multi-vector retrieval → reranker → grounded answer generation with inline citations → verifier pass → confidence-gated response.",
        bullets: [
          "Query rewrite expands underspecified questions before retrieval, not after",
          "Retrieval returns more candidates than needed; reranker is the precision lever",
          "Generation is constrained to cite retrieved chunks by ID, not free-form",
          "Verifier checks that every claim in the answer maps to an actually-retrieved chunk",
          "If verifier fails, the system degrades to retrieval-only — \"here are the docs, I can't summarize them yet\"",
        ],
      },
      {
        heading: "Retrieval Challenges",
        body:
          "The interesting failures were never \"the model said something dumb.\" They were retrieval misses dressed up as confident answers.",
        bullets: [
          "Acronyms and discipline-specific abbreviations that embeddings collapse incorrectly",
          "Time-sensitive queries where the right doc existed but was older than the relevance window",
          "Multi-hop questions where each hop retrieved cleanly, but the join between them didn't",
          "Queries where no good answer exists in the corpus, and the system needed to say so",
        ],
      },
      {
        heading: "Failure Cases",
        body:
          "Ungrounded summarization (model paraphrases beyond what was retrieved), citation-without-support (real source, wrong claim attributed), and confident-empty (a fluent answer to a question the corpus can't answer).",
      },
      {
        heading: "User Trust Considerations",
        body:
          "Trust was the actual product. Inline citations, retrieved snippets shown beside the answer, and a visible confidence band did more for adoption than any accuracy gain. Reviewers stopped re-running queries in Google when they could see what the system was working from.",
      },
      {
        heading: "Reliability Improvements",
        body:
          "Retrieval was the lever, not the model. Reranker tuning, hybrid search (lexical + semantic), and query rewriting gave the largest precision lifts. Verifier gating was what made the gains durable across model swaps.",
      },
      {
        heading: "Human Feedback Loops",
        body:
          "Every thumbs-down went into a triage queue with the full trace — query, retrieved chunks, generated answer, verifier verdict. Failures were clustered weekly, named, and added to the eval set. The eval set grew faster than the corpus did, and that was the point.",
      },
    ],
  },
  {
    id: "harness",
    framing: "Benchmarking LLM Reliability Across Prompt & Retrieval Variations",
    title: "LLM Evaluation Harness",
    summary:
      "An internal harness that asks the only question worth asking: how do we know the system actually works? It runs prompt and retrieval variants against a curated dataset of real failures and surfaces regressions before they ship.",
    stack: [
      "Python",
      "JSON Schema validation",
      "Heuristic + model-graded scoring",
      "Local + hosted LLMs",
      "SQLite results store",
    ],
    sections: [
      {
        heading: "Why It Exists",
        body:
          "Prompt and model changes were landing without anyone knowing whether they helped. \"Looks better\" is not a release criterion. The harness exists so every prompt change, retrieval change, or model swap produces a comparable, dated evaluation report.",
      },
      {
        heading: "Evaluation Datasets",
        body:
          "Three layers of test data, each with a different role:",
        bullets: [
          "Golden set: small, hand-curated, expected to never regress",
          "Failure set: every real-world failure ever observed, mined from production logs",
          "Stress set: adversarial inputs (OCR noise, ambiguous queries, contradictory context) used for ceiling tests",
        ],
      },
      {
        heading: "Scoring Logic",
        body:
          "Three layers of scoring, applied in order:",
        bullets: [
          "Schema validation: does the output parse and conform to the contract",
          "Heuristic checks: presence of required fields, citation format, confidence shape",
          "Model-graded scoring: faithfulness, groundedness, helpfulness — sampled, not 100%, and audited",
          "Per-slice aggregation by query class, retrieval depth, and prompt variant",
        ],
      },
      {
        heading: "Regression Testing",
        body:
          "Every prompt change runs against the golden + failure sets. A drop on any slice — even with overall metrics rising — gates the change. \"Average improved\" has shipped enough silent regressions to lose the benefit of the doubt.",
      },
      {
        heading: "Model Comparison",
        body:
          "Models are evaluated on the same fixtures, same prompts, same retrieval. Tradeoffs surface honestly: hosted models hit higher precision; local 13B is competitive at 4× the latency and zero per-query cost. The right answer depends on the slice.",
      },
      {
        heading: "Latency & Cost Analysis",
        body:
          "Every benchmark row carries p50/p95 latency and per-query cost. \"Best\" is always relative to a budget. The harness makes the budget explicit so the tradeoff is a decision, not a surprise.",
      },
      {
        heading: "What This Communicates",
        body:
          "An evaluation harness is the artifact that distinguishes \"we built an AI feature\" from \"we operate an AI system.\" It is the place where reliability claims become measurable, repeatable, and defensible.",
      },
    ],
  },
]

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-secondary/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      {children}
    </span>
  )
}

function ArchitectureDiagram() {
  const nodes = [
    { label: "Bibliography Input", icon: FileSearch, tone: "muted" },
    { label: "Reference Parser", icon: Layers, tone: "muted" },
    { label: "Heuristic Scorer", icon: GitBranch, tone: "muted" },
    { label: "Semantic Similarity", icon: Network, tone: "muted" },
    { label: "Local LLM Verifier", icon: Microscope, tone: "primary" },
    { label: "Confidence Aggregator", icon: ShieldCheck, tone: "primary" },
    { label: "Human Review Queue", icon: Eye, tone: "primary" },
  ]
  return (
    <div className="rounded-lg border border-dashed border-border bg-secondary/20 p-4">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
        <CircuitBoard className="h-3.5 w-3.5" />
        Pipeline Architecture
      </div>
      <div className="flex flex-col gap-2">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex flex-col items-stretch gap-2">
            <div
              className={cn(
                "flex items-center gap-3 rounded-md border bg-card px-3 py-2",
                n.tone === "primary"
                  ? "border-primary/40"
                  : "border-border"
              )}
            >
              <n.icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  n.tone === "primary" ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span className="text-xs font-medium text-foreground">{n.label}</span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                stage {i + 1}
              </span>
            </div>
            {i < nodes.length - 1 && (
              <ArrowDown className="mx-auto h-3.5 w-3.5 text-muted-foreground/60" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function RagFlowDiagram() {
  const flow = [
    { label: "User Query", icon: Search },
    { label: "Query Rewrite", icon: RefreshCw },
    { label: "Hybrid Retrieval", icon: Database },
    { label: "Reranker", icon: BarChart3 },
    { label: "Grounded Generation", icon: Workflow },
    { label: "Verifier", icon: ShieldCheck },
    { label: "Confidence Gate", icon: Target },
  ]
  return (
    <div className="rounded-lg border border-dashed border-border bg-secondary/20 p-4">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
        <Workflow className="h-3.5 w-3.5" />
        Retrieval & Verification Flow
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {flow.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1.5">
            <div className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5">
              <step.icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] font-medium text-foreground">{step.label}</span>
            </div>
            {i < flow.length - 1 && (
              <ArrowRight className="h-3 w-3 text-muted-foreground/60" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground sm:grid-cols-3">
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-card/60 px-2 py-1.5">
          <CheckCircle2 className="h-3 w-3 text-primary" />
          High confidence → return
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-card/60 px-2 py-1.5">
          <RefreshCw className="h-3 w-3 text-chart-2" />
          Low confidence → fallback
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-card/60 px-2 py-1.5">
          <Eye className="h-3 w-3 text-chart-4" />
          Verifier fail → human queue
        </div>
      </div>
    </div>
  )
}

function HarnessFlowDiagram() {
  const stages = [
    { label: "Fixture Set", sub: "golden + failures + stress" },
    { label: "Variant Matrix", sub: "prompts × retrieval × models" },
    { label: "Run", sub: "deterministic seeds, pinned versions" },
    { label: "Score", sub: "schema → heuristic → model-graded" },
    { label: "Diff vs. Baseline", sub: "per-slice deltas, regressions gate" },
    { label: "Report", sub: "dated, comparable, archived" },
  ]
  return (
    <div className="rounded-lg border border-dashed border-border bg-secondary/20 p-4">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
        <Beaker className="h-3.5 w-3.5" />
        Evaluation Pipeline
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {stages.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col gap-1 rounded-md border border-border bg-card px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-xs font-medium text-foreground">{s.label}</span>
            </div>
            <span className="text-[11px] text-muted-foreground">{s.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CaseStudyCard({
  study,
  index,
  diagram,
  charts,
}: {
  study: CaseStudy
  index: number
  diagram: React.ReactNode
  charts?: React.ReactNode
}) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className="rounded-xl border border-border bg-card transition-colors hover:border-primary/30">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 p-6 text-left"
        aria-expanded={open}
      >
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted-foreground">
              CASE STUDY {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-primary">
              {study.framing}
            </span>
          </div>
          <h3 className="text-base font-semibold text-foreground">{study.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{study.summary}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {study.stack.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180 text-primary"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-6 py-6">
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3 flex flex-col gap-5">
                {study.sections.map((sec) => (
                  <div key={sec.heading} className="flex flex-col gap-2">
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-primary">
                      {sec.heading}
                    </h4>
                    <p className="text-sm leading-relaxed text-foreground/90">{sec.body}</p>
                    {sec.bullets && (
                      <ul className="mt-1 flex flex-col gap-1.5">
                        {sec.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <div className="lg:col-span-2 flex flex-col gap-4">
                {diagram}
                {charts}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PrecisionChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <h5 className="text-xs font-semibold text-foreground">Precision vs. Hallucination</h5>
        <LineChartIcon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={precisionData} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="stage"
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                fontSize: 11,
                borderRadius: 6,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Line
              type="monotone"
              dataKey="precision"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Precision %"
            />
            <Line
              type="monotone"
              dataKey="hallucination"
              stroke="var(--chart-5)"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Hallucination %"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function ReviewTimeChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <h5 className="text-xs font-semibold text-foreground">Review Time per Thesis (min)</h5>
        <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={reviewTimeData} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="phase"
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                fontSize: 11,
                borderRadius: 6,
              }}
            />
            <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
              {reviewTimeData.map((_, i) => (
                <Cell
                  key={i}
                  fill={
                    i === reviewTimeData.length - 1
                      ? "var(--chart-1)"
                      : "var(--chart-2)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function PromptMatrixChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <h5 className="text-xs font-semibold text-foreground">Prompt Variants × Quality Axes</h5>
        <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={promptVariants}
            margin={{ top: 6, right: 6, bottom: 0, left: -18 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="variant"
              tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
              interval={0}
              angle={-12}
              textAnchor="end"
              height={50}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                fontSize: 11,
                borderRadius: 6,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Bar dataKey="structured" fill="var(--chart-1)" name="Schema Pass %" radius={[3, 3, 0, 0]} />
            <Bar dataKey="grounded" fill="var(--chart-2)" name="Grounded %" radius={[3, 3, 0, 0]} />
            <Bar dataKey="faithful" fill="var(--chart-4)" name="Faithful %" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function BenchmarkTable() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h5 className="text-xs font-semibold text-foreground">Benchmark Matrix</h5>
        <span className="font-mono text-[10px] text-muted-foreground">n=420 fixtures</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="py-2 pr-3 font-medium">Configuration</th>
              <th className="py-2 pr-3 font-medium">Prec</th>
              <th className="py-2 pr-3 font-medium">Recall</th>
              <th className="py-2 pr-3 font-medium">Halluc</th>
              <th className="py-2 pr-3 font-medium">p95</th>
              <th className="py-2 pr-3 font-medium">Cost</th>
            </tr>
          </thead>
          <tbody>
            {benchmarkRows.map((row, i) => (
              <tr
                key={row.config}
                className={cn(
                  "border-b border-border/60 last:border-0",
                  i === benchmarkRows.length - 1 && "bg-primary/5"
                )}
              >
                <td className="py-2 pr-3 text-foreground">{row.config}</td>
                <td className="py-2 pr-3 font-mono text-foreground">{row.precision}</td>
                <td className="py-2 pr-3 font-mono text-foreground">{row.recall}</td>
                <td className="py-2 pr-3 font-mono text-foreground">{row.halluc}</td>
                <td className="py-2 pr-3 font-mono text-muted-foreground">{row.p95}</td>
                <td className="py-2 pr-3 font-mono text-muted-foreground">{row.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ReliableAISection() {
  return (
    <div className="flex flex-col gap-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-7">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-chart-2/10 blur-3xl" />
        <div className="relative flex flex-col gap-5">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-primary">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Reliability · Evaluation · Orchestration
          </div>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Building Reliable AI Systems
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Most AI systems work in demos and fail in real workflows. The interesting
            engineering is in the gap between those two states — evaluation, verification,
            retrieval quality, ambiguity handling, and the orchestration that keeps a
            probabilistic component honest inside a deterministic system.
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            My work focuses on shipping AI features that survive contact with messy data,
            unpredictable users, and shifting models — and on the iterative loop that gets
            them there: <span className="font-medium text-foreground">ship → evaluate → debug → improve</span>.
          </p>

          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Hallucination rate", v: "28% → 3%" },
              { k: "Review time", v: "30m → 2m" },
              { k: "Eval coverage", v: "420+ fixtures" },
              { k: "Human-in-loop", v: "calibrated" },
            ].map((s) => (
              <div
                key={s.k}
                className="flex flex-col gap-1 rounded-lg border border-border bg-background/60 p-3"
              >
                <span className="font-mono text-base font-semibold text-foreground">{s.v}</span>
                <span className="text-[11px] text-muted-foreground">{s.k}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE THEMES */}
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Core Themes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The principles that shape how I design, ship, and operate AI systems.
            </p>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
            12 / principles
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((t) => (
            <div
              key={t.title}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <t.icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-foreground">{t.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Featured Case Studies</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Engineering investigations, not project cards. Click to expand each one.
            </p>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
            03 / deep-dives
          </span>
        </div>

        <CaseStudyCard
          study={caseStudies[0]}
          index={0}
          diagram={<ArchitectureDiagram />}
          charts={
            <>
              <PrecisionChart />
              <ReviewTimeChart />
              <div className="rounded-lg border border-border bg-card p-4">
                <h5 className="mb-2 text-xs font-semibold text-foreground">
                  Failure Modes Catalogued
                </h5>
                <div className="grid grid-cols-1 gap-1.5">
                  {failureModes.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-start gap-2 rounded-md bg-secondary/40 px-2.5 py-1.5"
                    >
                      <XCircle className="mt-0.5 h-3 w-3 shrink-0 text-chart-5" />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-medium text-foreground">
                          {f.label}
                        </span>
                        <span className="text-[10px] leading-snug text-muted-foreground">
                          {f.note}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          }
        />

        <CaseStudyCard
          study={caseStudies[1]}
          index={1}
          diagram={<RagFlowDiagram />}
          charts={
            <div className="rounded-lg border border-border bg-card p-4">
              <h5 className="mb-3 text-xs font-semibold text-foreground">
                Reliability Levers (impact rank)
              </h5>
              <div className="flex flex-col gap-2">
                {[
                  { name: "Reranker tuning", v: 92 },
                  { name: "Hybrid retrieval", v: 81 },
                  { name: "Query rewriting", v: 74 },
                  { name: "Verifier gating", v: 68 },
                  { name: "Model swap", v: 31 },
                ].map((l) => (
                  <div key={l.name} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-foreground">{l.name}</span>
                      <span className="font-mono text-muted-foreground">{l.v}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${l.v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                Retrieval-side levers consistently outperformed model swaps on the same eval set.
              </p>
            </div>
          }
        />

        <CaseStudyCard
          study={caseStudies[2]}
          index={2}
          diagram={<HarnessFlowDiagram />}
          charts={
            <>
              <BenchmarkTable />
              <PromptMatrixChart />
            </>
          }
        />
      </section>

      {/* WORKFLOW DESIGN */}
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Designing Human-AI Workflows</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Backend reliability is half the work. The other half is how the system shows
              up to the people using it — what it asks, what it surfaces, when it defers.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {workflowPrinciples.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-2">
                <p.icon className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Interaction flow */}
        <div className="rounded-xl border border-dashed border-border bg-secondary/20 p-5">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            <Workflow className="h-3.5 w-3.5" />
            Interaction Flow — Confidence-Aware Output
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
                  high
                </span>
                <span className="text-foreground">Return answer + citations + verifier verdict</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-md bg-chart-2/10 px-2 py-0.5 font-mono text-[10px] text-chart-2">
                  medium
                </span>
                <span className="text-foreground">
                  Return answer marked &quot;tentative&quot; + retrieved sources for the user to check
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-md bg-chart-4/10 px-2 py-0.5 font-mono text-[10px] text-chart-4">
                  low
                </span>
                <span className="text-foreground">
                  Surface retrieved docs only; offer clarifying question; queue for human review
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-md bg-chart-5/10 px-2 py-0.5 font-mono text-[10px] text-chart-5">
                  fail
                </span>
                <span className="text-foreground">
                  Degrade gracefully — never confabulate to fill the response slot
                </span>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Confidence is part of the API, not an internal detail. The UI changes shape based
              on it; the user&apos;s trust scales with what the system is willing to admit.
            </p>
          </div>
        </div>
      </section>

      {/* LESSONS LEARNED */}
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">What Real Systems Taught Me</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Engineering notes from debugging AI systems in production. The kind of things
              that don&apos;t make it into the README but show up in every postmortem.
            </p>
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {lessons.map((l, i) => (
            <div
              key={l.title}
              className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex shrink-0 flex-col items-center gap-1 pt-0.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground transition-colors group-hover:text-primary">
                  <l.icon className="h-4 w-4" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold text-foreground">{l.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{l.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              How I think about shipping AI
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The interesting work isn&apos;t prompt engineering — it&apos;s the system around the
              prompt. Evaluation harnesses, verification layers, retrieval discipline,
              confidence-aware UX, and the operational habit of mining real failures back
              into the eval set. That&apos;s what makes an AI feature into an AI system, and an
              AI system into something a team can actually rely on.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
