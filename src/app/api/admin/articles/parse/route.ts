import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseUpload } from "@/lib/articleMarkdown";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Accepts raw .md text and returns suggested fields to pre-fill the review form.
export async function POST(req: NextRequest) {
  let raw = "";
  try {
    const body = await req.json();
    raw = typeof body?.content === "string" ? body.content : "";
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }
  if (!raw.trim()) {
    return NextResponse.json({ error: "File kosong." }, { status: 400 });
  }
  return NextResponse.json({ parsed: parseUpload(raw) });
}
