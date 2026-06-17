// Server-only: garbage-collect orphaned uploads. An upload is "orphaned" when
// no article references its /uploads/<name> URL (in cover_image or content_md).
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { getAllArticleSources } from "@/lib/db";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
// Protect freshly-uploaded files that aren't attached to a saved article yet
// (e.g. admin uploaded a cover but hasn't clicked Save).
const DEFAULT_GRACE_MS = 60 * 60 * 1000; // 1 hour

export function extractUploadNames(text: string | null | undefined): string[] {
  if (!text) return [];
  const out: string[] = [];
  const re = /\/uploads\/([A-Za-z0-9._-]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) out.push(m[1]);
  return out;
}

function referencedNames(): Set<string> {
  const set = new Set<string>();
  for (const a of getAllArticleSources()) {
    for (const n of extractUploadNames(a.cover_image)) set.add(n);
    for (const n of extractUploadNames(a.content_md)) set.add(n);
  }
  return set;
}

export interface SweepResult {
  deleted: string[];
  freedBytes: number;
  kept: number;
}

export async function sweepOrphanedUploads(
  graceMs = DEFAULT_GRACE_MS,
): Promise<SweepResult> {
  const referenced = referencedNames();
  let files: string[];
  try {
    files = await readdir(UPLOAD_DIR);
  } catch {
    return { deleted: [], freedBytes: 0, kept: 0 }; // dir doesn't exist yet
  }

  const now = Date.now();
  const deleted: string[] = [];
  let freedBytes = 0;
  let kept = 0;

  for (const f of files) {
    if (referenced.has(f)) {
      kept++;
      continue;
    }
    const fp = path.join(UPLOAD_DIR, f);
    try {
      const s = await stat(fp);
      if (!s.isFile()) continue;
      if (now - s.mtimeMs < graceMs) {
        kept++; // too new — keep (likely an in-progress upload)
        continue;
      }
      freedBytes += s.size;
      await unlink(fp);
      deleted.push(f);
    } catch {
      /* skip unreadable entries */
    }
  }
  return { deleted, freedBytes, kept };
}
