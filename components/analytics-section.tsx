"use client"

import useSWR from "swr"
import { Eye, Users, CalendarDays, TrendingUp } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function AnalyticsSection() {
  const { data, isLoading } = useSWR("/api/views", fetcher, {
    refreshInterval: 30000,
  })

  const statCards = [
    {
      label: "Total Views",
      value: data?.totalViews ?? 0,
      icon: Eye,
      description: "All-time page loads",
    },
    {
      label: "Today",
      value: data?.dailyViews ?? 0,
      icon: CalendarDays,
      description: "Views in the last 24h",
    },
    {
      label: "Unique Visitors",
      value: data?.uniqueVisitors ?? 0,
      icon: Users,
      description: "Distinct visitors (approx.)",
    },
    {
      label: "Avg / Day",
      value:
        data?.totalViews && data?.last7Days
          ? Math.round(
              data.last7Days.reduce(
                (sum: number, d: { views: number }) => sum + d.views,
                0
              ) / 7
            )
          : 0,
      icon: TrendingUp,
      description: "Average over last 7 days",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl border border-border bg-card"
            />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-xl border border-border bg-card" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-4.5 w-4.5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono tracking-tight text-foreground">
                {stat.value.toLocaleString()}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground/70">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 7-day chart */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-1 text-sm font-semibold text-foreground">
          Last 7 Days
        </h3>
        <p className="mb-5 text-xs text-muted-foreground">
          Daily page views over the past week.
        </p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data?.last7Days || []}
              margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                className="fill-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                className="fill-muted-foreground"
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.75rem",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--primary))" }}
              />
              <Bar
                dataKey="views"
                fill="oklch(0.78 0.12 175)"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Note */}
      <div className="rounded-xl border border-dashed border-border bg-card/50 p-5">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">How this works:</span>{" "}
          Views are tracked via Upstash Redis. Each page load increments the counter.
          Unique visitors are approximated using HyperLogLog. A session flag prevents
          double-counting refreshes within the same browser session. No cookies, no
          personal data, no tracking scripts.
        </p>
      </div>
    </div>
  )
}
