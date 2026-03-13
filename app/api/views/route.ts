import { NextResponse } from "next/server"

// ---------------------------------------------------------------------------
// Stub implementation — works out of the box with an in-process counter.
// In production, replace the two helpers below with Upstash Redis calls:
//
//   import { Redis } from "@upstash/redis"
//   const redis = Redis.fromEnv()
//
//   async function getViews()  { return Number(await redis.get("views:total")) || 0 }
//   async function incrViews() { return redis.incr("views:total") }
//
// Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to your .env.local
// and install the client:  npm i @upstash/redis
// ---------------------------------------------------------------------------

// In-memory fallback (resets on each cold start — fine for development/preview)
let _views = 0

async function getViews(): Promise<number> {
  return _views
}

async function incrViews(): Promise<number> {
  _views += 1
  return _views
}

export async function GET() {
  const totalViews = await getViews()
  return NextResponse.json({ totalViews })
}

export async function POST() {
  const totalViews = await incrViews()
  return NextResponse.json({ totalViews })
}
