"use client";

import { useState, useEffect, useCallback } from "react";

interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string;
  services: string;
  message: string;
  status: "pending" | "read" | "responded";
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  },
  read: {
    label: "Dibaca",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  responded: {
    label: "Direspon",
    className: "bg-lime-500/10 text-lime-400 border-lime-500/30",
  },
};

function parseServices(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr.replace(" ", "T") + "Z");
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<Submission | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/contacts?page=${page}&limit=20`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || `HTTP ${res.status}`);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setSubmissions(Array.isArray(data.items) ? data.items : []);
      setTotalPages(Math.max(1, data.totalPages || 1));
    } catch {
      setError("Gagal terhubung ke server.");
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchSubmissions();
    if (selected?.id === id) {
      setSelected((prev) =>
        prev ? { ...prev, status: status as Submission["status"] } : null,
      );
    }
  };

  const deleteSubmission = async (id: number) => {
    if (!confirm("Hapus submission ini?")) return;
    await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
    if (selected?.id === id) setSelected(null);
    fetchSubmissions();
  };

  return (
    <div className="space-y-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-space-grotesk text-3xl font-bold">
              Admin Panel
            </h1>
            <p className="mt-1 text-neutral-400">
              Kontak Submission &mdash; Manajemen Pesan Masuk
            </p>
          </div>
          <button
            onClick={fetchSubmissions}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-neutral-900">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/5 bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-4 font-medium text-neutral-400">#</th>
                  <th className="px-6 py-4 font-medium text-neutral-400">
                    Nama
                  </th>
                  <th className="px-6 py-4 font-medium text-neutral-400">
                    Email
                  </th>
                  <th className="px-6 py-4 font-medium text-neutral-400">
                    Layanan
                  </th>
                  <th className="px-6 py-4 font-medium text-neutral-400">
                    Status
                  </th>
                  <th className="px-6 py-4 font-medium text-neutral-400">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 font-medium text-neutral-400">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => {
                  const svcs = parseServices(s.services);
                  return (
                    <tr
                      key={s.id}
                      onClick={() => setSelected(s)}
                      className="cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-4 text-neutral-500">{s.id}</td>
                      <td className="px-6 py-4 font-medium">{s.name}</td>
                      <td className="px-6 py-4 text-neutral-400">{s.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {svcs.slice(0, 3).map((sv) => (
                            <span
                              key={sv}
                              className="rounded-full border border-lime-400/20 bg-lime-400/5 px-2 py-0.5 text-xs text-lime-400"
                            >
                              {sv}
                            </span>
                          ))}
                          {svcs.length > 3 && (
                            <span className="text-xs text-neutral-500">
                              +{svcs.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full border px-2 py-0.5 text-xs ${STATUS_LABELS[s.status]?.className || STATUS_LABELS.pending.className}`}
                        >
                          {STATUS_LABELS[s.status]?.label || s.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-500">
                        {formatDate(s.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <select
                            value={s.status}
                            onChange={(e) =>
                              updateStatus(s.id, e.target.value)
                            }
                            onClick={(e) => e.stopPropagation()}
                            className="rounded border border-white/10 bg-black px-2 py-1 text-xs"
                          >
                            <option value="pending">Pending</option>
                            <option value="read">Dibaca</option>
                            <option value="responded">Direspon</option>
                          </select>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSubmission(s.id);
                            }}
                            className="rounded border border-red-500/20 bg-red-500/5 px-2 py-1 text-xs text-red-400 transition-colors hover:bg-red-500/10"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {submissions.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-neutral-500"
                    >
                      Belum ada submission.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5 disabled:opacity-30"
          >
            Sebelumnya
          </button>
          <span className="text-sm text-neutral-400">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/5 disabled:opacity-30"
          >
            Selanjutnya
          </button>
        </div>

        {selected && (
          <div className="mt-8 rounded-xl border border-white/5 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-space-grotesk text-xl font-bold">
                Detail Submission #{selected.id}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-neutral-500 hover:text-white"
              >
                {"\u2715"}
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs text-neutral-500">Nama</p>
                <p>{selected.name}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Email</p>
                <p className="text-lime-400">{selected.email}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Telepon</p>
                <p>{selected.phone}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Tanggal</p>
                <p>{formatDate(selected.created_at)}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-neutral-500">Layanan</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {parseServices(selected.services).map((sv) => (
                    <span
                      key={sv}
                      className="rounded-full border border-lime-400/20 bg-lime-400/5 px-3 py-1 text-sm text-lime-400"
                    >
                      {sv}
                    </span>
                  ))}
                </div>
              </div>
              {selected.message && (
                <div className="md:col-span-2">
                  <p className="text-xs text-neutral-500">Pesan</p>
                  <p className="mt-1 rounded-lg bg-white/[0.03] p-4 text-neutral-300">
                    {selected.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
