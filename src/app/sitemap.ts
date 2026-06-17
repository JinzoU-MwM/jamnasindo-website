import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/db";
import { serviceCategories } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jamnas.id";
  const lastModified = new Date();
  const articles = getPublishedArticles();
  const serviceSlugs = serviceCategories.flatMap((c) =>
    c.services.map((s) => s.id),
  );
  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/layanan`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/portfolio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...serviceSlugs.map((slug) => ({
      url: `${base}/layanan/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/artikel`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${base}/artikel/${article.slug}`,
      lastModified: new Date(`${article.date}T00:00:00+07:00`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${base}/testimoni`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/kontak`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
