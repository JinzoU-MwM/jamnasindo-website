import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jamnasindo — Konsultan Travel Umroh & Haji",
  description: "Solusi lengkap perizinan dan administrasi...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
