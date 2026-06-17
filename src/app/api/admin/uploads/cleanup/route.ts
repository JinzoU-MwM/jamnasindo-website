import { NextResponse } from "next/server";
import { sweepOrphanedUploads } from "@/lib/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Auth-gated by proxy.ts. Manually sweep uploads not referenced by any article.
export async function POST() {
  const result = await sweepOrphanedUploads();
  return NextResponse.json(result);
}
