import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getAllArticles,
  insertArticle,
  slugExists,
} from "@/lib/db";
import { slugify, readingMinutes } from "@/lib/articleUtils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const limit = Number(searchParams.get("limit") ?? "50") || 50;
  const search = searchParams.get("search") ?? "";
  return NextResponse.json(getAllArticles(page, limit, search));
}

function toKeywords(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v === "string")
    return v.split(",").map((x) => x.trim()).filter(Boolean);
  return [];
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const content_md = String(body.content_md ?? "").trim();
  if (!title) return NextResponse.json({ error: "Judul wajib diisi." }, { status: 400 });
  if (!content_md) return NextResponse.json({ error: "Konten artikel kosong." }, { status: 400 });

  const slug = slugify(String(body.slug ?? "").trim() || title);
  if (!slug) return NextResponse.json({ error: "Slug tidak valid." }, { status: 400 });
  if (slugExists(slug))
    return NextResponse.json(
      { error: `Slug "${slug}" sudah dipakai. Ubah judul atau slug.` },
      { status: 409 },
    );

  const date =
    typeof body.date === "string" && /^\d{4}-\d{2}-\d{2}/.test(body.date)
      ? body.date.slice(0, 10)
      : new Date().toISOString().slice(0, 10);

  const article = insertArticle({
    slug,
    title,
    description: String(body.description ?? "").trim(),
    category: String(body.category ?? "").trim() || "Artikel",
    date,
    reading_minutes:
      Number(body.reading_minutes) > 0
        ? Math.round(Number(body.reading_minutes))
        : readingMinutes(content_md),
    keywords: toKeywords(body.keywords),
    content_md,
    cover_image:
      typeof body.cover_image === "string" && body.cover_image.trim()
        ? body.cover_image.trim()
        : null,
    status: body.status === "draft" ? "draft" : "published",
  });

  revalidatePath("/artikel");
  revalidatePath(`/artikel/${slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true, article }, { status: 201 });
}
