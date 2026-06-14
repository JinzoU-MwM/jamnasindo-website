import type {
  NavItem,
  ServiceCategory,
  ProcessStep,
  Feature,
  Testimonial,
  ContactInfoItem,
} from "@/types";

export const navItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "/layanan" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Artikel", href: "/artikel" },
  { label: "Testimoni", href: "/testimoni" },
  { label: "Kontak", href: "/kontak" },
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: "perizinan",
    title: "Perizinan",
    subtitle: "Legalitas dan izin resmi untuk travel ibadah",
    icon: "document",
    layout: "2col",
    services: [
      {
        id: "ppiu",
        title: "PPIU",
        description:
          "Izin Penyelenggara Perjalanan Ibadah Umrah — syarat utama operasional travel umrah di Indonesia.",
        tags: ["Kemenag", "Umrah", "Wajib"],
        icon: "award",
      },
      {
        id: "pihk",
        title: "PIHK",
        description:
          "Izin Penyelenggara Ibadah Haji Khusus — wajib bagi travel yang menyelenggarakan haji khusus.",
        tags: ["Kemenag", "Haji", "Wajib"],
        icon: "shield",
      },
      {
        id: "akreditasi",
        title: "Akreditasi & Surveilance",
        description:
          "Proses akreditasi travel dan pengawasan surveilance berkala sesuai regulasi Kemenag.",
        tags: ["Akreditasi", "Surveilance"],
        icon: "monitor",
      },
      {
        id: "iata",
        title: "Akreditasi IATA",
        description:
          "Sertifikasi IATA untuk akses langsung ke sistem tiket maskapai internasional.",
        tags: ["Penerbangan", "Tiket", "IATA"],
        icon: "plane",
      },
    ],
  },
  {
    id: "administratif",
    title: "Administratif",
    subtitle: "Dukungan administratif dan keuangan",
    icon: "chart",
    layout: "2col",
    services: [
      {
        id: "keuangan",
        title: "Laporan Keuangan",
        description:
          "Pelaporan keuangan sesuai standar akuntansi untuk travel ibadah.",
        tags: ["Laporan", "Akuntansi"],
        icon: "credit-card",
      },
      {
        id: "pajak",
        title: "Perpajakan",
        description:
          "Penanganan kewajiban perpajakan travel ibadah sesuai regulasi perpajakan terbaru.",
        tags: ["Pajak", "Kepatuhan"],
        icon: "chart",
      },
      {
        id: "bank-garansi",
        title: "Bank Garansi",
        description:
          "Pengurusan bank garansi sebagai persyaratan administratif perizinan travel.",
        tags: ["Garansi", "Perbankan"],
        icon: "bank",
      },
      {
        id: "surety-bond",
        title: "Surety Bond",
        description:
          "Jaminan surety bond untuk memenuhi kewajiban finansial travel ibadah Anda.",
        tags: ["Jaminan", "Keuangan"],
        icon: "shield",
      },
    ],
  },
  {
    id: "website",
    title: "Pembuatan Website & Digital",
    subtitle: "Website profesional untuk travel umrah & haji Anda",
    icon: "globe",
    layout: "4col",
    services: [
      {
        id: "website-travel",
        title: "Website Travel & Umrah",
        description:
          "Website company profile travel umrah & haji yang profesional, cepat, dan meyakinkan calon jamaah — lengkap dengan katalog paket.",
        tags: ["Company Profile", "Katalog Paket", "Responsif"],
        icon: "monitor",
      },
      {
        id: "landing-page",
        title: "Landing Page Promosi",
        description:
          "Landing page fokus konversi untuk kampanye paket umrah, promo musiman, atau iklan — dirancang untuk menghasilkan lead.",
        tags: ["Landing Page", "Konversi", "Iklan"],
        icon: "rocket",
      },
      {
        id: "aplikasi-web",
        title: "Aplikasi Web & Sistem",
        description:
          "Sistem booking, panel admin, dan CMS untuk mengelola paket, jamaah, dan inquiry secara mandiri dan real-time.",
        tags: ["Sistem Booking", "Panel Admin", "CMS"],
        icon: "code",
      },
      {
        id: "seo-website",
        title: "SEO & Optimasi Website",
        description:
          "Optimasi mesin pencari agar travel Anda mudah ditemukan calon jamaah di Google — dari sisi teknis, konten, hingga kecepatan.",
        tags: ["SEO", "Google", "Performa"],
        icon: "search",
      },
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Konsultasi Awal",
    description:
      "Diskusi mendalam tentang kebutuhan bisnis travel Anda, jenis perizinan yang diperlukan, dan kondisi saat ini.",
    variant: "filled",
  },
  {
    step: 2,
    title: "Analisis & Perencanaan",
    description:
      "Tim kami menganalisis kesiapan dokumen dan menyusun roadmap pengurusan izin serta administrasi secara menyeluruh.",
    variant: "outlined",
  },
  {
    step: 3,
    title: "Eksekusi & Pendampingan",
    description:
      "Kami mengurus seluruh proses perizinan dan administrasi, mendampingi Anda di setiap tahapan hingga selesai.",
    variant: "outlined",
  },
  {
    step: 4,
    title: "Izin Terbit & Purna Jual",
    description:
      "Izin resmi diterbitkan dan kami tetap mendampingi untuk kebutuhan surveilance, pelaporan, dan pembaruan dokumen.",
    variant: "outlined",
  },
];

export const features: Feature[] = [
  {
    icon: "shield",
    title: "Resmi & Terpercaya",
    description:
      "Terdaftar dan berpengalaman menangani perizinan travel ibadah sesuai regulasi terbaru Kemenag.",
  },
  {
    icon: "clock",
    title: "Proses Cepat",
    description:
      "Sistem kerja terstruktur memastikan setiap proses berjalan efisien tanpa mengorbankan kualitas.",
  },
  {
    icon: "users",
    title: "Tim Ahli",
    description:
      "Didukung oleh tenaga profesional berpengalaman di bidang perizinan, hukum, dan keuangan.",
  },
  {
    icon: "chat",
    title: "Konsultasi End-to-End",
    description:
      "Pendampingan dari awal hingga izin terbit, termasuk monitoring kepatuhan berkala.",
  },
  {
    icon: "credit-card",
    title: "Biaya Transparan",
    description:
      "Rincian biaya jelas sejak awal, tanpa biaya tersembunyi. Anda tahu persis apa yang dibayar.",
  },
  {
    icon: "activity",
    title: "Update Regulasi",
    description:
      "Selalu mengikuti perubahan regulasi terbaru agar bisnis travel Anda tetap patuh.",
  },
];

export const testimonials: Testimonial[] = [
  {
    initials: "AR",
    name: "Ahmad Rahman",
    company: "PT Al-Haramain Travel",
    quote:
      "Jamnasindo sangat profesional. Proses PPIU kami selesai lebih cepat dari perkiraan. Tim mereka selalu responsif dan informatif.",
  },
  {
    initials: "SN",
    name: "Siti Nurhaliza",
    company: "CV Barokah Umrah",
    quote:
      "Saya sangat terbantu dengan layanan administrasi mereka. Laporan keuangan jadi rapi dan sesuai standar. Sangat direkomendasikan.",
  },
  {
    initials: "HW",
    name: "Hadi Wijaya",
    company: "PT Madinah Indah Travel",
    quote:
      "Pengurusan IATA kami berjalan mulus berkat Jamnasindo. Tim mereka paham betul regulasi dan proses birokrasi.",
  },
];

export const contactInfo: ContactInfoItem[] = [
  {
    icon: "map-pin",
    label: "Alamat",
    value: "Jl. Condet Raya No. 103E, Kramat Jati, Jakarta Timur, DKI Jakarta 13520",
  },
  {
    icon: "phone",
    label: "Telepon",
    value: "+62 812-1397-2604",
    href: "tel:+6281213972604",
  },
  {
    icon: "mail",
    label: "Email",
    value: "admin@jamnas.id",
    href: "mailto:admin@jamnas.id",
  },
  {
    icon: "clock",
    label: "Jam Operasional",
    value: "Senin - Jumat, 08:00 - 17:00 WIB",
  },
];

export const serviceOptions: string[] = [
  "PPIU",
  "PIHK",
  "Akreditasi & Pengawasan",
  "IATA",
  "Laporan Keuangan",
  "Bank Garansi",
  "Surety Bond",
  "Pembuatan Website",
  "SEO Website",
  "Konsultasi Regulasi",
];
