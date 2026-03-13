import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()

export async function GET() {
  const totalViews = (await redis.get<number>("views:total")) ?? 0
  return NextResponse.json({ totalViews })
}

export async function POST() {
  const totalViews = await redis.incr("views:total")
  return NextResponse.json({ totalViews })
}
