import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB input cap (output is optimized)
const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

// Auth-gated by proxy.ts (matches /api/admin/*). Optimizes uploads with sharp
// (auto-orient, resize <=1600px, WebP q82) and writes to public/uploads
// (gitignored, survives deploys, served at /uploads/<name> by the route handler).
export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Unggahan tidak valid." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Format tidak didukung (PNG, JPG, WEBP, GIF)." },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Ukuran melebihi 8MB." }, { status: 413 });
  }

  const inputBuf = Buffer.from(await file.arrayBuffer());
  let outBuf: Buffer;
  try {
    outBuf = await sharp(inputBuf, { animated: file.type === "image/gif" })
      .rotate() // honor EXIF orientation, then strip metadata
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: "Gagal memproses gambar." }, { status: 422 });
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const name = `${Date.now()}-${randomUUID().slice(0, 8)}.webp`;
  await writeFile(path.join(dir, name), outBuf);

  return NextResponse.json({
    url: `/uploads/${name}`,
    name,
    size: outBuf.length,
    original: file.size,
  });
}
