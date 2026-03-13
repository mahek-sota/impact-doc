import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()

export async function GET() {
  const totalViews = (await redis.get<number>("views:total")) ?? 0
  const log = (await redis.lrange<string>("views:log", 0, -1)).map((entry) =>
    JSON.parse(entry)
  )
  return NextResponse.json({ totalViews, log })
}

export async function POST(req: NextRequest) {
  const { referrer } = await req.json().catch(() => ({ referrer: "direct" }))

  const country = req.headers.get("x-vercel-ip-country") ?? "Unknown"
  const city = req.headers.get("x-vercel-ip-city") ?? "Unknown"
  const timestamp = new Date().toISOString()

  const entry = JSON.stringify({ timestamp, referrer, city, country })
  await redis.lpush("views:log", entry)

  const totalViews = await redis.incr("views:total")
  return NextResponse.json({ totalViews })
}
