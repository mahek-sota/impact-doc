"use client"

import { useEffect } from "react"
import useSWR from "swr"
import { Eye } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function ViewCounter() {
  const { data, mutate } = useSWR("/api/views", fetcher, {
    revalidateOnFocus: false,
  })

  useEffect(() => {
    // Fire-and-forget POST to increment on first visit
    const hasVisited = sessionStorage.getItem("brag:visited")
    if (!hasVisited) {
      fetch("/api/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referrer: document.referrer || "direct" }),
      })
        .then((r) => r.json())
        .then((newData) => {
          mutate(newData, false)
          sessionStorage.setItem("brag:visited", "1")
        })
        .catch(() => {})
    }
  }, [mutate])

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground">
      <Eye className="h-3.5 w-3.5" />
      <span className="font-mono font-medium text-foreground">
        {data?.totalViews != null ? data.totalViews.toLocaleString() : "--"}
      </span>
      <span>views</span>
    </div>
  )
}
