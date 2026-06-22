import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)', '/demo(.*)']);

// Graceful Redis Initialization
// This prevents crashes in CI/Build environments where env vars might be missing
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
  : null; // Return null if config is missing

// Initialize Rate Limiter safely
const ratelimit = redis
  ? new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 m"),
    analytics: true,
  })
  : null;

export default clerkMiddleware(async (auth, req) => {
  // 1. Rate Limiting Logic (Only runs for /api/generate)
  if (req.nextUrl.pathname.startsWith("/api/generate")) {

    // If Redis/RateLimit is not configured (e.g., in CI or build), skip the check
    if (!ratelimit) {
      // In production, we might want to warn, but in CI this is expected
      if (process.env.NODE_ENV !== 'test') {
        console.warn("Rate Limiting skipped: Upstash credentials not found.");
      }
      return NextResponse.next();
    }

    // Extract real IP (handles Vercel/Cloudflare proxies)
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

    try {
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);

      // If limit exceeded, return 429 immediately
      if (!success) {
        console.warn(`[Security] Rate limit exceeded for IP: ${ip}`);
        return new NextResponse(
          JSON.stringify({ error: "Too Many Requests", retryAfter: reset }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString(),
            },
          }
        );
      }
    } catch (error) {
      console.error("Rate limiting error:", error);
      // Fail open: If Redis goes down, don't block users, just log the error
      return NextResponse.next();
    }
  }

  // 2. Clerk Authentication - Protect non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

// Standard Next.js + Clerk Matcher Config
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
