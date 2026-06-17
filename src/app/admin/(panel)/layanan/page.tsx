"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FileCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  Filter,
  Search,
  Eye,
} from "lucide-react";

interface ServiceRequest {
  id: string;
  client: string;
  service: string;
  step: string;
  status: string;
  submitted_date: string;
  pic: string;
}

const STATUS_STYLES: Record<string, string> = {
  Baru: "bg-purple-400/10 text-purple-400 border-purple-400/20",
  Diproses: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  "Butuh Revisi": "bg-red-400/10 text-red-400 border-red-400/20",
  Selesai: "bg-lime-400/10 text-lime-400 border-lime-400/20",
};

export default function TrackingLayananPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/service-requests?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRequests(Array.isArray(data.items) ? data.items : []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch {
      setError("Gagal memuat data layanan.");
    }
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Tracking Layanan
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Pantau progres perizinan dan administrasi klien.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
          <FileCheck size={16} />
          Export Laporan
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-zinc-800 rounded-lg px-4 py-2 w-full sm:w-80 border border-white/5">
            <Search size={16} className="text-neutral-500 shrink-0" />
            <input
              type="text"
              placeholder="Cari klien atau ID layanan..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-neutral-500 outline-none w-full"
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors border border-white/10 rounded-lg px-3 py-2">
            <Filter size={14} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Klien / Layanan
                </th>
                <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Tahapan
                </th>
                <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  PIC
                </th>
                <th className="px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                    {search ? "Tidak ada layanan yang sesuai." : "Belum ada data layanan."}
                  </td>
                </tr>
              ) : (
                requests.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-neutral-500">
                      {r.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">
                        {r.client}
                      </div>
                      <div className="text-xs text-lime-400">{r.service}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-400">
                      {r.step}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          STATUS_STYLES[r.status] || "bg-zinc-400/10 text-zinc-400 border-zinc-400/20"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {r.pic}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="p-1.5 rounded-md hover:bg-white/10 text-neutral-400 hover:text-lime-400 transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Menampilkan {requests.length > 0 ? (page - 1) * 20 + 1 : 0}-
            {Math.min(page * 20, total)} dari {total} data
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 text-sm border border-white/10 rounded-lg text-neutral-400 hover:text-white hover:border-white/20 transition-colors disabled:opacity-30"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 text-sm border border-white/10 rounded-lg text-neutral-400 hover:text-white hover:border-white/20 transition-colors disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
