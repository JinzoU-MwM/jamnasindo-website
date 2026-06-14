// Portofolio website travel ibadah yang dibangun Jamnasindo.
// Dipakai di komponen PortfolioSection (beranda) dan halaman /portfolio.
// Setiap item adalah demo LIVE yang bisa dikunjungi — bukti nyata untuk
// membangun kepercayaan calon klien jasa pembuatan website.

export interface PortfolioItem {
  name: string;
  url: string;
  domain: string;
  segment: string;
  description: string;
  tags: string[];
  accent: string; // kelas gradient Tailwind untuk mockup
}

export const portfolioItems: PortfolioItem[] = [
  {
    name: "Labbaik Mabrur",
    url: "https://dummy4.jni.my.id",
    domain: "dummy4.jni.my.id",
    segment: "Umrah & Haji — Full-stack + Panel Admin",
    description:
      "Website travel umrah & haji lengkap: katalog paket dinamis, artikel, formulir lead tersimpan ke database, plus panel admin untuk kelola paket, promo, FAQ, dan inbox.",
    tags: ["Company Profile", "Paket Dinamis", "Panel Admin", "Database"],
    accent: "from-emerald-500/30 to-teal-700/10",
  },
  {
    name: "Raudhah Travel",
    url: "https://dummy5.jni.my.id",
    domain: "dummy5.jni.my.id",
    segment: "Umrah & Haji Plus — Premium",
    description:
      "Landing page premium untuk segmen eksklusif — hotel bintang 5, kuota terbatas, dengan nuansa elegan emas-gelap dan animasi halus.",
    tags: ["Landing Page", "Premium", "Lead WhatsApp"],
    accent: "from-amber-400/30 to-yellow-700/10",
  },
  {
    name: "Sakinah Travel",
    url: "https://dummy6.jni.my.id",
    domain: "dummy6.jni.my.id",
    segment: "Umrah Hemat & Program Tabungan",
    description:
      "Landing page ramah dan modern dengan kalkulator simulasi tabungan umrah interaktif — dirancang untuk konversi keluarga muda.",
    tags: ["Landing Page", "Kalkulator", "Mobile-first"],
    accent: "from-teal-400/30 to-cyan-700/10",
  },
  {
    name: "Barakah Travel",
    url: "https://dummy3.jni.my.id",
    domain: "dummy3.jni.my.id",
    segment: "Umrah & Haji",
    description:
      "Company profile travel umrah dengan katalog paket, promo, galeri, dan FAQ yang tertata rapi serta dioptimasi untuk pencarian.",
    tags: ["Company Profile", "Katalog Paket", "SEO"],
    accent: "from-sky-500/30 to-blue-700/10",
  },
  {
    name: "Mulia Wisata",
    url: "https://dummy2.jni.my.id",
    domain: "dummy2.jni.my.id",
    segment: "Umrah & Haji",
    description:
      "Storefront travel umrah dengan manajemen paket, galeri perjalanan, dan formulir kontak yang terhubung ke database admin.",
    tags: ["Company Profile", "CMS", "Lead Form"],
    accent: "from-violet-500/30 to-purple-700/10",
  },
  {
    name: "Safar Mulia",
    url: "https://dummy1.jni.my.id",
    domain: "dummy1.jni.my.id",
    segment: "Umrah & Haji",
    description:
      "Website travel umrah responsif dengan tampilan bersih — paket, testimoni, dan tombol kontak cepat untuk memaksimalkan inquiry.",
    tags: ["Company Profile", "Responsif", "Testimoni"],
    accent: "from-rose-500/30 to-pink-700/10",
  },
];
