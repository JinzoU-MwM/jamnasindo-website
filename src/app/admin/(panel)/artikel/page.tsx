"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  FileText,
  Upload,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  Save,
  Loader2,
  ExternalLink,
  Image as ImageIcon,
  X,
} from "lucide-react";

interface ListItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  reading_minutes: number;
  cover_image: string | null;
  status: string;
}

interface FormState {
  id?: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  description: string;
  keywords: string; // comma-separated in the form
  reading_minutes: string;
  content_md: string;
  cover_image: string;
  status: "published" | "draft";
}

const emptyForm = (): FormState => ({
  title: "",
  slug: "",
  category: "Artikel",
  date: new Date().toISOString().slice(0, 10),
  description: "",
  keywords: "",
  reading_minutes: "",
  content_md: "",
  cover_image: "",
  status: "published",
});

export default function AdminArtikelPage() {
  const [items, setItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "form">("list");
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const inlineRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/articles?limit=200");
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      setError("Gagal memuat daftar artikel.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // Debounced live preview — renders Markdown via the same server pipeline.
  useEffect(() => {
    if (view !== "form") return;
    const md = form.content_md;
    if (!md.trim()) {
      setPreviewHtml("");
      return;
    }
    const t = setTimeout(async () => {
      setPreviewLoading(true);
      try {
        const res = await fetch("/api/admin/articles/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: md }),
        });
        const data = await res.json();
        setPreviewHtml(data.html || "");
      } catch {
        /* preview is best-effort */
      }
      setPreviewLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [form.content_md, view]);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const startNew = () => {
    setForm(emptyForm());
    setError("");
    setMessage("");
    setView("form");
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengunggah gambar.");
      return data.url as string;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengunggah gambar.");
      return null;
    } finally {
      setBusy(false);
    }
  };

  const handleCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) e.target.value = "";
    if (!file) return;
    const url = await uploadImage(file);
    if (url) setForm((p) => ({ ...p, cover_image: url }));
  };

  const handleInlineImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) e.target.value = "";
    if (!file) return;
    const url = await uploadImage(file);
    if (!url) return;
    const alt = file.name.replace(/\.[^.]+$/, "");
    const snippet = `\n\n![${alt}](${url})\n\n`;
    setForm((p) => {
      const ta = contentRef.current;
      const start = ta?.selectionStart ?? p.content_md.length;
      const end = ta?.selectionEnd ?? start;
      return {
        ...p,
        content_md:
          p.content_md.slice(0, start) + snippet + p.content_md.slice(end),
      };
    });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) e.target.value = ""; // allow re-uploading same file
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const content = await file.text();
      const res = await fetch("/api/admin/articles/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memproses file.");
      const p = data.parsed;
      setForm({
        title: p.title || "",
        slug: p.slug || "",
        category: p.category || "Artikel",
        date: p.date || new Date().toISOString().slice(0, 10),
        description: p.description || "",
        keywords: Array.isArray(p.keywords) ? p.keywords.join(", ") : "",
        reading_minutes: String(p.readingMinutes || ""),
        content_md: p.content_md || "",
        cover_image: p.cover_image || "",
        status: "published",
      });
      setMessage(`File "${file.name}" dimuat. Periksa lalu publikasikan.`);
      setView("form");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memproses file.");
    }
    setBusy(false);
  };

  const startEdit = async (id: number) => {
    setError("");
    setMessage("");
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/articles/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memuat artikel.");
      const a = data.article;
      let kw: string[] = [];
      try {
        kw = JSON.parse(a.keywords);
      } catch {
        kw = [];
      }
      setForm({
        id: a.id,
        title: a.title,
        slug: a.slug,
        category: a.category,
        date: a.date,
        description: a.description,
        keywords: kw.join(", "),
        reading_minutes: String(a.reading_minutes),
        content_md: a.content_md,
        cover_image: a.cover_image || "",
        status: a.status === "draft" ? "draft" : "published",
      });
      setView("form");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat artikel.");
    }
    setBusy(false);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!form.title.trim()) return setError("Judul wajib diisi.");
    if (!form.content_md.trim()) return setError("Konten artikel kosong.");
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        category: form.category,
        date: form.date,
        description: form.description,
        keywords: form.keywords,
        reading_minutes: form.reading_minutes,
        content_md: form.content_md,
        cover_image: form.cover_image,
        status: form.status,
      };
      const res = form.id
        ? await fetch(`/api/admin/articles/${form.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/articles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan.");
      setMessage(form.id ? "Artikel diperbarui." : "Artikel dipublikasikan.");
      setView("list");
      fetchList();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.");
    }
    setSaving(false);
  };

  const remove = async (item: ListItem) => {
    if (!confirm(`Hapus artikel "${item.title}"? Tindakan ini permanen.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/articles/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setMessage("Artikel dihapus.");
      fetchList();
    } catch {
      setError("Gagal menghapus artikel.");
    }
    setBusy(false);
  };

  const cleanupUploads = async () => {
    if (!confirm("Hapus semua gambar yang tidak lagi dipakai artikel mana pun?")) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/uploads/cleanup", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal membersihkan.");
      const kb = Math.round((data.freedBytes || 0) / 1024);
      const n = data.deleted?.length || 0;
      setMessage(
        n
          ? `${n} gambar tak terpakai dihapus${kb ? ` (${kb} KB)` : ""}.`
          : "Tidak ada gambar tak terpakai.",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal membersihkan.");
    }
    setBusy(false);
  };

  // ---------- FORM VIEW ----------
  if (view === "form") {
    return (
      <div className="max-w-6xl space-y-6">
        <button
          onClick={() => setView("list")}
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white"
        >
          <ArrowLeft size={16} /> Kembali ke daftar
        </button>
        <h1 className="font-heading text-2xl font-bold text-white">
          {form.id ? "Edit Artikel" : "Artikel Baru"}
        </h1>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
        {message && !error && (
          <div className="rounded-lg border border-lime-400/30 bg-lime-400/5 px-4 py-3 text-sm text-lime-400">
            {message}
          </div>
        )}

        <form onSubmit={save} className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-zinc-900 p-6 space-y-5">
            <Field label="Judul">
              <input className={inputCls} value={form.title} onChange={set("title")} required />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Slug (URL)" hint="dikosongkan = otomatis dari judul">
                <input className={inputCls} value={form.slug} onChange={set("slug")} placeholder="otomatis-dari-judul" />
              </Field>
              <Field label="Kategori">
                <input className={inputCls} value={form.category} onChange={set("category")} />
              </Field>
              <Field label="Tanggal">
                <input type="date" className={inputCls} value={form.date} onChange={set("date")} />
              </Field>
              <Field label="Menit baca" hint="dikosongkan = otomatis">
                <input type="number" min={1} className={inputCls} value={form.reading_minutes} onChange={set("reading_minutes")} />
              </Field>
            </div>
            <Field label="Deskripsi (meta / ringkasan)">
              <textarea rows={2} className={inputCls} value={form.description} onChange={set("description")} />
            </Field>
            <Field label="Kata kunci (pisahkan dengan koma)">
              <input className={inputCls} value={form.keywords} onChange={set("keywords")} placeholder="ppiu, izin travel umroh, ..." />
            </Field>
            <Field label="Status">
              <select className={inputCls} value={form.status} onChange={set("status")}>
                <option value="published">Publik (tampil di situs)</option>
                <option value="draft">Draf (disembunyikan)</option>
              </select>
            </Field>
            <Field label="Gambar sampul (cover)" hint="opsional — tampil di header artikel & kartu daftar">
              <input ref={coverRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={handleCover} />
              {form.cover_image ? (
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.cover_image} alt="" className="h-20 w-32 rounded-lg border border-white/10 object-cover" />
                  <button type="button" onClick={() => setForm((p) => ({ ...p, cover_image: "" }))} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm text-neutral-300 hover:bg-white/5">
                    <X size={14} /> Hapus
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => coverRef.current?.click()} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-800/50 px-4 py-2.5 text-sm text-neutral-300 hover:bg-white/5 disabled:opacity-60">
                  {busy ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />} Unggah cover
                </button>
              )}
            </Field>
          </div>

          <div className="rounded-xl border border-white/5 bg-zinc-900 p-6">
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="text-sm font-medium text-neutral-400">
                Konten (Markdown)
                <span className="ml-2 text-xs font-normal text-neutral-600">
                  — # judul, **tebal**, - daftar, &gt; kutipan, [tautan](...)
                </span>
              </label>
              <input ref={inlineRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={handleInlineImage} />
              <button
                type="button"
                onClick={() => inlineRef.current?.click()}
                disabled={busy}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-lime-400/30 bg-lime-400/10 px-3 py-1.5 text-xs font-medium text-lime-400 hover:bg-lime-400/20 disabled:opacity-60"
              >
                {busy ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />} Sisipkan gambar
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <textarea
                ref={contentRef}
                rows={22}
                className={`${inputCls} font-mono text-xs leading-relaxed`}
                value={form.content_md}
                onChange={set("content_md")}
                placeholder="Tulis atau tempel Markdown di sini..."
              />
              <div className="relative overflow-auto rounded-lg border border-white/10 bg-zinc-950 p-5" style={{ maxHeight: "34rem" }}>
                {previewLoading && (
                  <Loader2 size={14} className="absolute right-3 top-3 animate-spin text-neutral-600" />
                )}
                {previewHtml ? (
                  <div
                    className="prose prose-invert prose-sm max-w-none prose-headings:font-heading prose-headings:text-white prose-p:text-neutral-300 prose-li:text-neutral-300 prose-li:marker:text-lime-400 prose-a:text-lime-400 prose-strong:text-white prose-blockquote:border-lime-400 prose-blockquote:bg-lime-400/5 prose-blockquote:not-italic prose-blockquote:text-neutral-200 prose-code:text-lime-300 prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                ) : (
                  <p className="text-sm text-neutral-600">Pratinjau langsung muncul di sini saat Anda mengetik atau menyisipkan gambar.</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={() => setView("list")} className="rounded-lg border border-white/10 px-5 py-2.5 text-sm text-neutral-300 hover:bg-white/5">
              Batal
            </button>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-6 py-2.5 text-sm font-bold text-black hover:bg-lime-300 disabled:opacity-70">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Menyimpan..." : form.id ? "Simpan Perubahan" : "Publikasikan"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ---------- LIST VIEW ----------
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Manajemen Artikel</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Unggah file Markdown (.md), atau tulis dan kelola artikel blog situs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input ref={fileRef} type="file" accept=".md,.markdown,text/markdown,text/plain" onChange={handleFile} className="hidden" />
          <button
            onClick={cleanupUploads}
            disabled={busy}
            title="Hapus gambar yang tidak lagi dipakai artikel mana pun"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-neutral-300 hover:bg-white/5 disabled:opacity-60"
          >
            <Trash2 size={16} /> Bersihkan gambar
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg border border-lime-400/30 bg-lime-400/10 px-4 py-2.5 text-sm font-medium text-lime-400 hover:bg-lime-400/20 disabled:opacity-60"
          >
            {busy ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
            Unggah .md
          </button>
          <button
            onClick={startNew}
            className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2.5 text-sm font-bold text-black hover:bg-lime-300"
          >
            <Plus size={18} /> Tulis Baru
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">{error}</div>
      )}
      {message && !error && (
        <div className="rounded-lg border border-lime-400/30 bg-lime-400/5 px-4 py-3 text-sm text-lime-400">{message}</div>
      )}

      <div className="overflow-hidden rounded-xl border border-white/5 bg-zinc-900">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-lime-400" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <FileText className="text-neutral-600" size={36} />
            <p className="text-sm text-neutral-500">Belum ada artikel. Unggah .md atau tulis baru.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/5 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-5 py-3 font-medium">Judul</th>
                <th className="px-5 py-3 font-medium">Kategori</th>
                <th className="px-5 py-3 font-medium">Tanggal</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {item.cover_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.cover_image} alt="" className="h-10 w-14 shrink-0 rounded object-cover" />
                      ) : (
                        <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-zinc-800 text-neutral-600">
                          <FileText size={14} />
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-white">{item.title}</span>
                        <span className="block text-xs text-neutral-600">/{item.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-neutral-400">{item.category}</td>
                  <td className="px-5 py-3 text-neutral-400">{item.date}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.status === "published" ? "bg-lime-400/10 text-lime-400" : "bg-neutral-700/40 text-neutral-400"}`}>
                      {item.status === "published" ? "Publik" : "Draf"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/artikel/${item.slug}`} target="_blank" rel="noopener noreferrer" title="Lihat" className="rounded-md p-2 text-neutral-400 hover:bg-white/5 hover:text-white">
                        <ExternalLink size={16} />
                      </a>
                      <button onClick={() => startEdit(item.id)} title="Edit" className="rounded-md p-2 text-neutral-400 hover:bg-white/5 hover:text-white">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => remove(item)} title="Hapus" className="rounded-md p-2 text-red-400 hover:bg-red-400/10">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/10 bg-zinc-800/50 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-lime-400/50 focus:outline-none transition-colors";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-neutral-400">
        {label}
        {hint && <span className="text-xs font-normal text-neutral-600">— {hint}</span>}
      </label>
      {children}
    </div>
  );
}
