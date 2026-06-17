// Server-only Markdown rendering + upload parsing (heavy deps: marked,
// sanitize-html, gray-matter). Do NOT import from client components.
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import matter from "gray-matter";
import { slugify, readingMinutes } from "@/lib/articleUtils";

marked.use({ gfm: true, breaks: false });

const SANITIZE_OPTS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "a", "ul", "ol", "li", "strong", "em", "b", "i", "s", "del",
    "blockquote", "code", "pre", "hr", "br",
    "table", "thead", "tbody", "tr", "th", "td",
    "img", "figure", "figcaption",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    code: ["class"],
    th: ["align"],
    td: ["align"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      rel: "noopener noreferrer",
    }),
  },
};

// Markdown string -> safe HTML string (rendered server-side).
export function renderMarkdown(md: string): string {
  const raw = marked.parse(md ?? "", { async: false }) as string;
  return sanitizeHtml(raw, SANITIZE_OPTS);
}

export interface ParsedUpload {
  title: string;
  slug: string;
  description: string;
  category: string;
  date: string; // yyyy-mm-dd
  keywords: string[];
  readingMinutes: number;
  content_md: string;
  cover_image: string;
}

function toDateString(v: unknown): string {
  if (v instanceof Date && !isNaN(v.getTime())) {
    return v.toISOString().slice(0, 10);
  }
  if (typeof v === "string" && v.trim()) {
    const m = v.trim().match(/^\d{4}-\d{2}-\d{2}/);
    if (m) return m[0];
    const d = new Date(v);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  return new Date().toISOString().slice(0, 10);
}

function toKeywords(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v === "string") {
    return v
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }
  return [];
}

function firstParagraph(md: string): string {
  for (const line of md.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    if (/^(#{1,6}\s|>|[-*+]\s|\d+\.\s|\||```|!\[|<)/.test(t)) continue;
    return t
      .replace(/\*\*|__|\*|_|`/g, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .slice(0, 200);
  }
  return "";
}

// Parse a raw uploaded .md file (with or without YAML frontmatter) into
// suggested fields for the hybrid review form. Never throws on bad input.
export function parseUpload(raw: string): ParsedUpload {
  let data: Record<string, unknown> = {};
  let content = raw ?? "";
  try {
    const parsed = matter(raw ?? "");
    data = (parsed.data ?? {}) as Record<string, unknown>;
    content = parsed.content ?? "";
  } catch {
    // malformed frontmatter -> treat whole file as body
    content = raw ?? "";
  }

  let body = content.replace(/^\s+/, "");
  let title = typeof data.title === "string" ? data.title.trim() : "";

  // Derive title from the first H1 and strip it from the body to avoid
  // duplicating it (the page renders the title separately).
  const h1 = body.match(/^#\s+(.+?)\s*$/m);
  if (!title && h1) title = h1[1].trim();
  if (h1 && (!data.title || data.title === h1[1])) {
    body = body.replace(h1[0], "").replace(/^\s+/, "");
  }
  if (!title) title = "Artikel Tanpa Judul";

  const description =
    (typeof data.description === "string" && data.description.trim()) ||
    (typeof data.excerpt === "string" && data.excerpt.trim()) ||
    firstParagraph(body);

  return {
    title,
    slug: typeof data.slug === "string" && data.slug.trim() ? slugify(data.slug) : slugify(title),
    description: String(description),
    category: typeof data.category === "string" && data.category.trim() ? data.category.trim() : "Artikel",
    date: toDateString(data.date),
    keywords: toKeywords(data.keywords ?? data.tags),
    readingMinutes: readingMinutes(body),
    content_md: body.trimEnd() + "\n",
    cover_image:
      typeof data.cover === "string"
        ? data.cover.trim()
        : typeof data.image === "string"
          ? data.image.trim()
          : "",
  };
}
