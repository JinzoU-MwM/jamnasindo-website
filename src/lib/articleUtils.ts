// Pure helpers (no heavy deps) — safe to import anywhere server-side,
// including the DB seed.
import type { Article, ArticleSection } from "@/lib/articles";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Estimate reading time from Markdown/plain text (~200 wpm, min 1).
export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Convert the legacy structured sections into Markdown (one-time migration seed).
export function sectionsToMarkdown(sections: ArticleSection[]): string {
  const out: string[] = [];
  for (const s of sections) {
    switch (s.type) {
      case "h2":
        out.push(`## ${s.text}`);
        break;
      case "h3":
        out.push(`### ${s.text}`);
        break;
      case "ul":
        out.push(s.items.map((i) => `- ${i}`).join("\n"));
        break;
      case "ol":
        out.push(s.items.map((i, n) => `${n + 1}. ${i}`).join("\n"));
        break;
      case "tip":
        // Rendered as a styled blockquote ("Tips" callout) on the public page.
        out.push(`> **Tips Jamnasindo:** ${s.text}`);
        break;
      default:
        out.push(s.text);
    }
  }
  return out.join("\n\n") + "\n";
}

// Full Markdown body for a legacy article (used to seed the DB).
export function articleToMarkdown(a: Article): string {
  return sectionsToMarkdown(a.sections);
}
