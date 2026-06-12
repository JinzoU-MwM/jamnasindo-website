"use client";

import { useState, useCallback } from "react";
import { serviceOptions } from "@/lib/data";
import { Icon } from "./icon";
import { Toast } from "./Toast";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      showToast("⚠️ Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    if (selectedServices.length === 0) {
      showToast("⚠️ Mohon pilih minimal satu layanan yang dibutuhkan.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          services: selectedServices,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(`⚠️ ${data.error || "Gagal mengirim pesan."}`);
        setIsSubmitting(false);
        return;
      }

      showToast(
        "✅ Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.",
      );
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedServices([]);
    } catch {
      showToast("⚠️ Gagal terhubung ke server. Silakan coba lagi.");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-white/5 bg-neutral-900 p-8 md:p-10"
      >
        <div>
          <label className="mb-2 block text-sm text-neutral-400">
            Nama Lengkap
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Nama Anda atau Perusahaan"
            className="h-12 w-full rounded-lg border border-white/10 bg-black px-4 text-sm text-white placeholder-neutral-600 transition-colors focus:border-lime-400/50 focus:outline-none"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-neutral-400">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="email@contoh.com"
              className="h-12 w-full rounded-lg border border-white/10 bg-black px-4 text-sm text-white placeholder-neutral-600 transition-colors focus:border-lime-400/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-neutral-400">
              No. Telepon
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="+62 xxx xxxx xxxx"
              className="h-12 w-full rounded-lg border border-white/10 bg-black px-4 text-sm text-white placeholder-neutral-600 transition-colors focus:border-lime-400/50 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-400">
            Layanan yang Dibutuhkan
          </label>
          <div className="grid grid-cols-2 gap-3">
            {serviceOptions.map((service) => (
              <label
                key={service}
                className="flex cursor-pointer items-center gap-2 group"
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="h-4 w-4 rounded border-white/20 bg-black accent-lime-400"
                />
                <span className="text-sm text-neutral-400 transition-colors group-hover:text-white">
                  {service}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-400">Pesan</label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            placeholder="Ceritakan kebutuhan Anda..."
            className="w-full resize-none rounded-lg border border-white/10 bg-black px-4 py-3 text-sm text-white placeholder-neutral-600 transition-colors focus:border-lime-400/50 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-lime-400 text-base font-bold text-black transition-all duration-300 hover:bg-lime-300 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Icon name="clock" size={20} className="animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              Kirim Pesan
              <Icon name="send" size={20} />
            </>
          )}
        </button>
      </form>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={hideToast}
      />
    </>
  );
}
