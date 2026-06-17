import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getArticleById,
  updateArticle,
  deleteArticle,
  slugExists,
} from "@/lib/db";
import { slugify } from "@/lib/articleUtils";
import type { ArticleInput } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toKeywords(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v === "string")
    return v.split(",").map((x) => x.trim()).filter(Boolean);
  return [];
}

export async function GET(_req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const article = getArticleById(Number(params.id));
  if (!article) return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });
  return NextResponse.json({ article });
}

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = Number(params.id);
  const existing = getArticleById(id);
  if (!existing) return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }

  const patch: Partial<ArticleInput> = {};
  if (body.title !== undefined) {
    const t = String(body.title).trim();
    if (!t) return NextResponse.json({ error: "Judul wajib diisi." }, { status: 400 });
    patch.title = t;
  }
  if (body.slug !== undefined) {
    const s = slugify(String(body.slug).trim());
    if (!s) return NextResponse.json({ error: "Slug tidak valid." }, { status: 400 });
    if (slugExists(s, id))
      return NextResponse.json({ error: `Slug "${s}" sudah dipakai.` }, { status: 409 });
    patch.slug = s;
  }
  if (body.description !== undefined) patch.description = String(body.description).trim();
  if (body.category !== undefined) patch.category = String(body.category).trim() || "Artikel";
  if (body.date !== undefined && /^\d{4}-\d{2}-\d{2}/.test(String(body.date)))
    patch.date = String(body.date).slice(0, 10);
  if (body.reading_minutes !== undefined && Number(body.reading_minutes) > 0)
    patch.reading_minutes = Math.round(Number(body.reading_minutes));
  if (body.keywords !== undefined) patch.keywords = toKeywords(body.keywords);
  if (body.content_md !== undefined) {
    const c = String(body.content_md).trim();
    if (!c) return NextResponse.json({ error: "Konten artikel kosong." }, { status: 400 });
    patch.content_md = c;
  }
  if (body.cover_image !== undefined)
    patch.cover_image = String(body.cover_image).trim() || null;
  if (body.status !== undefined) patch.status = body.status === "draft" ? "draft" : "published";

  updateArticle(id, patch);

  revalidatePath("/artikel");
  revalidatePath(`/artikel/${existing.slug}`);
  if (patch.slug && patch.slug !== existing.slug) revalidatePath(`/artikel/${patch.slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = Number(params.id);
  const existing = getArticleById(id);
  if (!existing) return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });

  deleteArticle(id);

  revalidatePath("/artikel");
  revalidatePath(`/artikel/${existing.slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}
