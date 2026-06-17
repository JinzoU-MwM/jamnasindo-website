import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { renderMarkdown } from "@/lib/articleMarkdown";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Renders Markdown to sanitized HTML using the SAME pipeline as the public
// page, so the editor preview matches production exactly.
export async function POST(req: NextRequest) {
  let content = "";
  try {
    const body = await req.json();
    content = typeof body?.content === "string" ? body.content : "";
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }
  return NextResponse.json({ html: renderMarkdown(content) });
}
