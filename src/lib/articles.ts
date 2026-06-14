// Konten organik / blog untuk SEO.
// Artikel ditulis statis di sini agar di-prerender penuh (SSG) — cepat dan
// mudah diindeks. Tambah artikel baru = tambah satu objek di array `articles`.

export type ArticleSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; text: string };

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string; // ISO, untuk JSON-LD + tampilan
  readingMinutes: number;
  keywords: string[];
  sections: ArticleSection[];
  cta?: {
    title: string;
    text: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref?: string;
    secondaryLabel?: string;
  };
}

export const articles: Article[] = [
  {
    slug: "biaya-pembuatan-website-travel-umroh",
    title:
      "Berapa Biaya Pembuatan Website Travel Umroh? Ini Faktor Penentunya",
    description:
      "Berapa biaya pembuatan website travel umroh & haji? Pahami faktor yang menentukan harga, perbedaan tiap jenis website, dan cara mendapatkan penawaran transparan sesuai kebutuhan dan anggaran Anda.",
    category: "Digital Marketing",
    date: "2026-06-14",
    readingMinutes: 6,
    keywords: [
      "biaya pembuatan website travel umroh",
      "harga jasa pembuatan website",
      "biaya bikin website travel",
      "jasa pembuatan website travel umroh",
      "harga website company profile",
    ],
    sections: [
      {
        type: "p",
        text: "Pertanyaan pertama yang muncul saat ingin membuat website biasanya: berapa biayanya? Jawaban jujurnya — tergantung. Sama seperti membangun rumah, biaya website ditentukan oleh ukuran, fitur, dan kualitasnya. Artikel ini membantu Anda memahami apa saja yang memengaruhi harga agar dapat menganggarkan dengan tepat dan tidak salah pilih.",
      },
      { type: "h2", text: "Mengapa Tidak Ada Harga Tunggal?" },
      {
        type: "p",
        text: "Website satu halaman sederhana dan sistem lengkap dengan panel admin adalah dua hal yang sangat berbeda dari sisi pengerjaan. Karena itu, harga yang wajar selalu mengikuti kebutuhan. Waspadai penawaran 'harga pasti murah' tanpa memahami kebutuhan Anda — sering kali hasilnya tidak sepadan dengan tujuan bisnis.",
      },
      { type: "h2", text: "Faktor yang Menentukan Biaya Website" },
      {
        type: "ul",
        items: [
          "Jenis website: landing page satu halaman jauh lebih terjangkau dibanding website multi-halaman atau sistem dengan panel admin.",
          "Kompleksitas fitur: katalog paket dinamis, formulir lead, panel admin, sistem booking, dan integrasi pembayaran menambah biaya.",
          "Desain: template standar vs desain khusus (custom) yang disesuaikan dengan identitas brand travel Anda.",
          "Kesiapan konten: apakah materi teks, foto, dan data paket sudah siap atau perlu disiapkan terlebih dahulu.",
          "Kebutuhan SEO & kecepatan: optimasi teknis dan performa yang baik adalah investasi yang sepadan.",
          "Domain, hosting, dan pemeliharaan: biaya berjalan yang perlu diperhitungkan selain biaya pembuatan awal.",
        ],
      },
      { type: "h2", text: "Tiga Tingkatan Umum Website Travel" },
      { type: "h3", text: "1. Landing Page" },
      {
        type: "p",
        text: "Satu halaman yang fokus pada konversi, ideal untuk iklan dan promo musiman. Ini opsi paling terjangkau dan paling cepat dikerjakan.",
      },
      { type: "h3", text: "2. Website Company Profile" },
      {
        type: "p",
        text: "Website multi-halaman (beranda, paket, tentang, artikel, kontak) — pilihan paling umum untuk travel umroh karena membangun kredibilitas sekaligus menjadi fondasi SEO. Investasi pada tingkat menengah.",
      },
      { type: "h3", text: "3. Website + Sistem (Full-stack)" },
      {
        type: "p",
        text: "Dilengkapi panel admin, sistem booking, dan database agar travel dapat mengelola paket, jamaah, dan inquiry secara mandiri. Investasi tertinggi, namun paling bertenaga untuk travel yang sedang bertumbuh.",
      },
      {
        type: "tip",
        text: "Jangan memilih hanya berdasarkan harga termurah. Website yang lambat atau tidak meyakinkan justru memboroskan anggaran iklan dan kehilangan jamaah. Ukuran sebenarnya bukan 'berapa biaya pembuatannya', melainkan 'berapa banyak jamaah yang dihasilkannya'.",
      },
      { type: "h2", text: "Website Itu Investasi, Bukan Sekadar Biaya" },
      {
        type: "p",
        text: "Coba hitung: jika website mendatangkan satu atau dua jamaah tambahan setiap bulan, dalam waktu singkat biaya pembuatannya sudah tertutup — dan setelah itu ia terus bekerja untuk Anda. Karena itu, pandang website sebagai aset yang menghasilkan, bukan pengeluaran sekali pakai.",
      },
      { type: "h2", text: "Dapatkan Penawaran Transparan dari Jamnasindo" },
      {
        type: "p",
        text: "Jamnasindo memberikan rincian biaya yang jelas tanpa biaya tersembunyi, disesuaikan dengan kebutuhan dan anggaran Anda. Lihat dulu enam contoh website travel yang kami bangun di halaman Portofolio sebagai standar kualitas, lalu konsultasikan kebutuhan Anda untuk mendapatkan estimasi yang sesuai.",
      },
    ],
    cta: {
      title: "Mau Tahu Estimasi untuk Travel Anda?",
      text: "Setiap travel berbeda kebutuhannya. Konsultasikan kebutuhan Anda dan dapatkan penawaran yang transparan serta sesuai anggaran — tanpa biaya tersembunyi.",
      primaryHref: "/kontak",
      primaryLabel: "Minta Penawaran",
      secondaryHref: "/layanan/website-travel",
      secondaryLabel: "Lihat Jasa Pembuatan Website",
    },
  },
  {
    slug: "seo-travel-umroh-tampil-halaman-1-google",
    title:
      "SEO untuk Travel Umroh: Cara Website Anda Tampil di Halaman 1 Google",
    description:
      "Panduan SEO untuk travel umroh & haji: pahami 3 pilar SEO, langkah praktis, dan kesalahan umum agar website travel Anda muncul di halaman pertama Google dan mendatangkan jamaah secara organik.",
    category: "Digital Marketing",
    date: "2026-06-14",
    readingMinutes: 7,
    keywords: [
      "SEO travel umroh",
      "cara website travel umroh muncul di google",
      "jasa SEO travel umroh",
      "optimasi website umroh",
      "SEO untuk travel umrah",
    ],
    sections: [
      {
        type: "p",
        text: "Memiliki website yang bagus tetapi tidak muncul di Google sama saja seperti membuka toko mewah di gang buntu — tidak ada yang menemukannya. SEO (Search Engine Optimization) adalah cara agar website travel Anda muncul ketika calon jamaah mencari di Google, sehingga mendatangkan jamaah secara organik tanpa terus membayar iklan. Artikel ini merangkum dasar SEO yang perlu dipahami setiap pemilik travel umroh.",
      },
      { type: "h2", text: "Mengapa SEO Penting untuk Travel Umroh?" },
      {
        type: "p",
        text: "Mayoritas calon jamaah memulai pencarian dari Google: 'travel umroh terpercaya', 'paket umroh [nama kota]', atau 'biaya umroh 2026'. Travel yang tampil di halaman pertama mendapatkan aliran calon jamaah yang berkelanjutan. Berbeda dengan iklan yang berhenti begitu anggaran habis, peringkat organik terus bekerja 24 jam dan menurunkan biaya akuisisi jamaah dari waktu ke waktu.",
      },
      { type: "h2", text: "3 Pilar SEO yang Wajib Dipahami" },
      { type: "h3", text: "1. SEO Teknis" },
      {
        type: "p",
        text: "Fondasi agar Google dapat menjelajah dan memahami website Anda: kecepatan tinggi, tampilan ramah ponsel, struktur URL yang rapi, sitemap, data terstruktur (schema), HTTPS, dan halaman yang dapat diindeks. Tanpa fondasi teknis yang sehat, upaya SEO lain sulit membuahkan hasil.",
      },
      { type: "h3", text: "2. SEO Konten (On-page)" },
      {
        type: "p",
        text: "Google mengutamakan konten yang relevan dan bermanfaat. Ini mencakup riset kata kunci, judul dan meta description yang tepat, penggunaan heading yang terstruktur, serta konten halaman paket dan artikel yang menjawab pertanyaan calon jamaah secara mendalam.",
      },
      { type: "h3", text: "3. Otoritas & Reputasi" },
      {
        type: "p",
        text: "Semakin dipercaya website Anda, semakin tinggi peringkatnya. Otoritas dibangun melalui konsistensi konten berkualitas, ulasan positif, profil bisnis yang lengkap, dan tautan dari situs lain yang relevan.",
      },
      { type: "h2", text: "Langkah Praktis SEO untuk Travel Umroh" },
      {
        type: "ol",
        items: [
          "Riset kata kunci, terutama kata kunci lokal seperti 'travel umroh [kota Anda]'.",
          "Optimalkan halaman paket dan layanan dengan judul, deskripsi, dan konten yang jelas.",
          "Tulis artikel bermanfaat secara rutin (panduan, tips, biaya) untuk menjangkau lebih banyak pencarian.",
          "Daftarkan dan lengkapi Google Business Profile agar muncul di pencarian lokal dan Maps.",
          "Pasang Google Search Console untuk memantau performa dan masalah indeks.",
          "Pastikan website cepat dan nyaman diakses dari ponsel.",
        ],
      },
      {
        type: "tip",
        text: "SEO adalah maraton, bukan sprint. Perbaikan teknis bisa berdampak relatif cepat, tetapi peringkat kata kunci kompetitif tumbuh dalam hitungan bulan. Konsistensi adalah kunci yang membedakan travel yang menang di pencarian.",
      },
      { type: "h2", text: "Kesalahan SEO yang Sering Terjadi" },
      {
        type: "ul",
        items: [
          "Website lambat dan tidak ramah ponsel, padahal mayoritas pencarian dari HP.",
          "Konten tipis atau menyalin dari travel lain — Google menilai rendah konten duplikat.",
          "Mengabaikan kata kunci lokal padahal calon jamaah sering mencari berdasarkan kota.",
          "Tidak konsisten membuat konten sehingga peringkat tidak pernah bertumbuh.",
          "Tidak memantau hasil melalui Google Search Console.",
        ],
      },
      { type: "h2", text: "Bangun Fondasi SEO Sejak Awal bersama Jamnasindo" },
      {
        type: "p",
        text: "Setiap website yang dibangun Jamnasindo sudah menerapkan fondasi SEO sejak awal — metadata rapi, sitemap, data terstruktur, dan kecepatan tinggi. Untuk website yang sudah ada, kami melakukan audit dan optimasi menyeluruh. Lihat enam contoh website travel yang kami bangun di halaman Portofolio, lalu konsultasikan strategi SEO travel Anda secara gratis.",
      },
    ],
    cta: {
      title: "Ingin Website Travel Anda Tampil di Google?",
      text: "Jamnasindo membangun website yang SEO-ready sejak awal dan menyediakan jasa optimasi untuk website yang sudah ada. Konsultasi gratis untuk menyusun strategi SEO travel Anda.",
      primaryHref: "/kontak",
      primaryLabel: "Konsultasi Gratis",
      secondaryHref: "/layanan/seo-website",
      secondaryLabel: "Lihat Jasa SEO Website",
    },
  },
  {
    slug: "landing-page-vs-website-travel-umroh",
    title:
      "Landing Page vs Website: Mana yang Tepat untuk Travel Umroh Anda?",
    description:
      "Bingung memilih landing page atau website untuk travel umroh? Pelajari perbedaan, kelebihan, dan kapan sebaiknya menggunakan masing-masing agar pemasaran digital travel Anda efektif dan tidak boros anggaran.",
    category: "Digital Marketing",
    date: "2026-06-14",
    readingMinutes: 6,
    keywords: [
      "landing page vs website",
      "perbedaan landing page dan website",
      "landing page travel umroh",
      "website travel umroh",
      "jasa landing page umroh",
      "jasa pembuatan website travel umroh",
    ],
    sections: [
      {
        type: "p",
        text: "Banyak pemilik travel umroh bingung: cukup membuat landing page, atau perlu website penuh? Keduanya sering dianggap sama, padahal fungsinya berbeda. Salah memilih bisa berarti anggaran terbuang atau peluang jamaah hilang. Artikel ini menjelaskan perbedaannya dan kapan sebaiknya Anda memakai masing-masing.",
      },
      { type: "h2", text: "Apa Itu Landing Page?" },
      {
        type: "p",
        text: "Landing page adalah satu halaman tunggal yang dirancang untuk satu tujuan spesifik — biasanya konversi: mendaftar atau menghubungi. Tidak ada menu navigasi yang mengalihkan perhatian; seluruh halaman fokus mengarahkan pengunjung pada satu aksi. Landing page paling cocok sebagai 'tempat mendarat' bagi pengunjung yang datang dari iklan atau campaign tertentu.",
      },
      { type: "h2", text: "Apa Itu Website (Multi-halaman)?" },
      {
        type: "p",
        text: "Website adalah kumpulan banyak halaman yang membangun kehadiran digital menyeluruh: beranda, daftar paket, profil & legalitas, galeri, artikel, dan kontak. Website berperan sebagai 'kantor digital' travel Anda yang buka 24 jam — membangun kredibilitas, menjadi sumber informasi lengkap, dan fondasi untuk ditemukan di Google.",
      },
      { type: "h2", text: "Perbedaan Utama Landing Page vs Website" },
      {
        type: "ul",
        items: [
          "Tujuan: landing page fokus satu aksi (konversi dari iklan); website membangun kehadiran dan kredibilitas menyeluruh.",
          "Jumlah halaman: landing page satu halaman; website banyak halaman (beranda, paket, tentang, artikel, kontak).",
          "Sumber trafik: landing page ideal untuk iklan berbayar dan campaign; website untuk SEO organik dan branding jangka panjang.",
          "Kekuatan SEO: website jauh lebih kuat (banyak halaman dan konten); landing page tunggal terbatas jangkauannya di pencarian.",
          "Masa pakai: landing page sering musiman (mengikuti promo); website adalah aset jangka panjang yang terus bekerja.",
        ],
      },
      { type: "h2", text: "Kapan Travel Umroh Butuh Landing Page?" },
      {
        type: "ul",
        items: [
          "Menjalankan iklan untuk promo spesifik: paket Ramadhan, early bird, atau diskon musiman.",
          "Menguji satu penawaran tertentu dengan cepat sebelum diperluas.",
          "Kampanye Google Ads atau Meta Ads yang butuh halaman fokus konversi tinggi.",
        ],
      },
      { type: "h2", text: "Kapan Travel Umroh Butuh Website Penuh?" },
      {
        type: "ul",
        items: [
          "Membangun kredibilitas resmi dengan menampilkan legalitas PPIU/PIHK dan profil perusahaan.",
          "Ingin ditemukan calon jamaah lewat pencarian Google secara organik (SEO).",
          "Menampilkan seluruh katalog paket, galeri, testimoni, dan artikel dalam satu rumah digital.",
          "Membangun aset jangka panjang yang tidak bergantung pada anggaran iklan terus-menerus.",
        ],
      },
      { type: "h2", text: "Jawaban Terbaik: Keduanya Bekerja Sama" },
      {
        type: "p",
        text: "Ini bukan soal memilih salah satu. Strategi yang matang menjadikan website sebagai fondasi — pusat kredibilitas dan mesin SEO — sementara landing page digunakan untuk setiap campaign iklan agar konversinya maksimal. Website menarik jamaah organik sepanjang waktu; landing page memaksimalkan setiap rupiah anggaran iklan Anda. Keduanya saling melengkapi.",
      },
      {
        type: "tip",
        text: "Jika anggaran terbatas dan harus memilih lebih dulu, mulailah dari website yang solid. Ia memberi kredibilitas dan trafik organik jangka panjang, dan nanti landing page iklan bisa dibangun di atas fondasi yang sama.",
      },
      { type: "h2", text: "Bingung Memilih? Jamnasindo Bantu Tentukan" },
      {
        type: "p",
        text: "Jamnasindo membangun keduanya — landing page yang fokus konversi maupun website travel lengkap yang SEO-ready — dan memahami bisnis travel umroh & haji dari perizinan hingga pemasaran. Kami bantu Anda memilih yang paling tepat sesuai tujuan dan anggaran. Lihat enam contoh karya kami di halaman Portofolio, lalu konsultasikan kebutuhan Anda secara gratis.",
      },
    ],
    cta: {
      title: "Bingung Pilih Landing Page atau Website?",
      text: "Jamnasindo membangun keduanya dan membantu Anda menentukan yang paling tepat untuk tujuan pemasaran travel Anda. Konsultasi gratis, atau lihat langsung hasil karya kami.",
      primaryHref: "/kontak",
      primaryLabel: "Konsultasi Gratis",
      secondaryHref: "/portfolio",
      secondaryLabel: "Lihat Portofolio",
    },
  },
  {
    slug: "digital-marketing-travel-umroh-website",
    title:
      "Digital Marketing Travel Umroh: Mengapa Website adalah Fondasi untuk Mendapatkan Jamaah",
    description:
      "Panduan digital marketing untuk travel umroh & haji. Pelajari mengapa website profesional menjadi fondasi semua channel pemasaran online — SEO, iklan, media sosial, hingga WhatsApp — untuk mendatangkan jamaah secara konsisten.",
    category: "Digital Marketing",
    date: "2026-06-14",
    readingMinutes: 8,
    keywords: [
      "digital marketing travel umroh",
      "cara promosi travel umroh online",
      "website travel umroh",
      "strategi marketing travel umrah",
      "mendapatkan jamaah umroh dari internet",
      "jasa pembuatan website travel umroh",
    ],
    sections: [
      {
        type: "p",
        text: "Persaingan bisnis travel umroh kini tidak lagi terjadi di brosur atau spanduk, melainkan di layar ponsel calon jamaah. Sebelum memutuskan berangkat bersama travel tertentu, mayoritas calon jamaah menelusuri reputasi, paket, dan harga secara online. Artinya, travel yang tidak hadir secara profesional di internet praktis tidak masuk daftar pertimbangan. Di sinilah digital marketing berperan — dan fondasinya adalah sebuah website yang kredibel.",
      },
      { type: "h2", text: "Perilaku Calon Jamaah Sudah Bergeser ke Digital" },
      {
        type: "p",
        text: "Calon jamaah hari ini melakukan riset mandiri: mencari 'travel umroh terpercaya' di Google, membandingkan paket di Instagram, membaca ulasan, lalu menghubungi via WhatsApp. Seluruh perjalanan keputusan ini terjadi secara online. Tanpa kehadiran digital yang meyakinkan, Anda kehilangan calon jamaah jauh sebelum sempat berbicara dengan mereka.",
      },
      { type: "h2", text: "Website: Fondasi dari Seluruh Strategi Digital Marketing" },
      {
        type: "p",
        text: "Banyak travel mengira digital marketing cukup dengan rajin posting di media sosial. Padahal media sosial, iklan, dan WhatsApp hanyalah saluran untuk menarik perhatian — semuanya pada akhirnya perlu mengarahkan calon jamaah ke satu tempat yang meyakinkan dan siap mengonversi: website Anda. Tanpa website yang kredibel dan cepat, anggaran iklan dan kerja keras konten akan bocor sia-sia.",
      },
      {
        type: "ul",
        items: [
          "Membangun kepercayaan: menampilkan legalitas (PPIU/PIHK), izin Kemenag, dan bukti perjalanan secara profesional.",
          "Etalase 24 jam: calon jamaah dapat melihat paket, harga, dan itinerary kapan saja tanpa menunggu balasan admin.",
          "Menangkap lead: formulir dan tombol WhatsApp mengubah pengunjung menjadi kontak yang bisa ditindaklanjuti.",
          "Fondasi SEO: hanya website yang dapat muncul di hasil pencarian Google secara organik.",
          "Tujuan iklan: setiap iklan berbayar membutuhkan halaman tujuan (landing page) yang fokus konversi.",
          "Aset milik sendiri: berbeda dengan akun media sosial yang bisa diblokir atau berubah algoritma, website adalah aset digital yang Anda kendalikan penuh.",
        ],
      },
      { type: "h2", text: "5 Channel Digital Marketing yang Bertumpu pada Website" },
      { type: "h3", text: "1. SEO — Ditemukan Saat Calon Jamaah Mencari" },
      {
        type: "p",
        text: "SEO (Search Engine Optimization) membuat website Anda muncul ketika seseorang mengetik 'travel umroh' di kota Anda pada Google. Ini sumber jamaah organik yang berkelanjutan tanpa terus membayar iklan. Namun SEO hanya berjalan jika Anda memiliki website yang sehat secara teknis, cepat, dan berisi konten relevan.",
      },
      { type: "h3", text: "2. Iklan Berbayar (Google Ads & Meta Ads)" },
      {
        type: "p",
        text: "Iklan dapat mendatangkan trafik dengan cepat, tetapi efektivitasnya ditentukan oleh halaman tujuannya. Mengarahkan iklan ke beranda biasa akan memboroskan anggaran; landing page yang fokus pada satu penawaran dan satu aksi (mendaftar atau menghubungi) menghasilkan konversi jauh lebih tinggi.",
      },
      { type: "h3", text: "3. Media Sosial (Instagram, TikTok, Facebook)" },
      {
        type: "p",
        text: "Media sosial efektif membangun kesadaran dan kedekatan. Namun jadikan ia 'pintu masuk', bukan tujuan akhir. Selalu arahkan audiens ke website untuk informasi lengkap dan proses pendaftaran yang serius — di sanalah keputusan diambil.",
      },
      { type: "h3", text: "4. WhatsApp & Tindak Lanjut Lead" },
      {
        type: "p",
        text: "WhatsApp adalah saluran konversi utama di Indonesia. Website yang baik menempatkan tombol WhatsApp di titik strategis dan menyimpan setiap inquiry, sehingga tim Anda dapat menindaklanjuti calon jamaah secara terstruktur, bukan kehilangan jejak percakapan.",
      },
      { type: "h3", text: "5. Konten & Artikel (Content Marketing)" },
      {
        type: "p",
        text: "Artikel bermanfaat — seperti panduan persiapan umroh atau tips memilih travel — menarik calon jamaah dari pencarian, membangun otoritas, dan memperkuat SEO. Konten yang konsisten menjadikan website Anda rujukan, bukan sekadar etalase.",
      },
      {
        type: "tip",
        text: "Sebelum menggelontorkan anggaran iklan, pastikan fondasinya kuat. Iklan yang mengarah ke website lambat atau tidak meyakinkan sama saja menuang air ke ember bocor. Bangun website yang solid terlebih dahulu.",
      },
      { type: "h2", text: "Kesalahan Umum Travel dalam Digital Marketing" },
      {
        type: "ul",
        items: [
          "Hanya mengandalkan media sosial tanpa website resmi — kehilangan kredibilitas dan trafik pencarian.",
          "Website lambat dan tidak ramah ponsel, padahal mayoritas calon jamaah mengakses dari HP.",
          "Tidak ada ajakan bertindak (CTA) atau formulir yang jelas, sehingga pengunjung pergi tanpa meninggalkan kontak.",
          "Menjalankan iklan tanpa landing page khusus dan tanpa pelacakan konversi.",
          "Konten tidak konsisten sehingga peringkat SEO tidak pernah bertumbuh.",
        ],
      },
      { type: "h2", text: "Mulai dari Fondasi yang Benar bersama Jamnasindo" },
      {
        type: "p",
        text: "Jamnasindo memahami bisnis travel umroh & haji secara menyeluruh — dari perizinan PPIU/PIHK hingga pemasaran digital. Kami membangun website travel yang cepat, SEO-ready sejak awal, dan dirancang untuk mengubah pengunjung menjadi jamaah. Anda tidak perlu menebak: lihat langsung enam contoh website travel yang sudah kami buat di halaman Portofolio kami, lalu konsultasikan kebutuhan Anda secara gratis. Fondasi digital marketing Anda dimulai dari sini.",
      },
    ],
    cta: {
      title: "Siap Punya Website yang Mendatangkan Jamaah?",
      text: "Jamnasindo membangun website travel umroh & haji yang cepat, SEO-ready, dan dirancang untuk konversi — fondasi seluruh strategi digital marketing Anda. Lihat portofolio kami atau konsultasi gratis sekarang.",
      primaryHref: "/kontak",
      primaryLabel: "Konsultasi Gratis",
      secondaryHref: "/portfolio",
      secondaryLabel: "Lihat Portofolio",
    },
  },
  {
    slug: "syarat-izin-ppiu",
    title: "Syarat dan Cara Mengurus Izin PPIU: Panduan Lengkap untuk Travel Umroh",
    description:
      "Panduan lengkap mengurus izin PPIU (Penyelenggara Perjalanan Ibadah Umrah): dasar hukum, syarat dokumen, alur pengajuan lewat OSS dan Kemenag, hingga estimasi waktu prosesnya.",
    category: "Perizinan",
    date: "2026-06-13",
    readingMinutes: 7,
    keywords: [
      "syarat izin PPIU",
      "cara mengurus PPIU",
      "izin travel umroh",
      "PPIU Kemenag",
    ],
    sections: [
      {
        type: "p",
        text: "Izin PPIU (Penyelenggara Perjalanan Ibadah Umrah) adalah syarat mutlak bagi perusahaan travel yang ingin memberangkatkan jamaah umroh secara legal. Tanpa izin ini, kegiatan memberangkatkan jamaah dapat dikategorikan sebagai penyelenggaraan perjalanan ibadah ilegal dengan ancaman sanksi pidana. Artikel ini merangkum dasar hukum, syarat, dan alur pengurusannya.",
      },
      { type: "h2", text: "Dasar Hukum PPIU" },
      {
        type: "p",
        text: "Penyelenggaraan ibadah umroh di Indonesia diatur dalam UU No. 8 Tahun 2019 tentang Penyelenggaraan Ibadah Haji dan Umrah beserta aturan turunannya, termasuk Peraturan Menteri Agama (PMA) tentang Penyelenggaraan Perjalanan Ibadah Umrah. Regulasi ini menetapkan bahwa hanya biro perjalanan wisata yang telah memperoleh izin dari Menteri Agama yang boleh menyelenggarakan perjalanan ibadah umroh.",
      },
      { type: "h2", text: "Syarat Utama Mengajukan Izin PPIU" },
      {
        type: "p",
        text: "Secara garis besar, perusahaan yang ingin menjadi PPIU harus memenuhi syarat berikut:",
      },
      {
        type: "ul",
        items: [
          "Berbadan hukum Perseroan Terbatas (PT) yang dimiliki dan dikelola oleh Warga Negara Indonesia beragama Islam.",
          "Memiliki perizinan berusaha biro perjalanan wisata yang sah melalui sistem OSS (Online Single Submission) dengan KBLI yang sesuai untuk aktivitas perjalanan ibadah.",
          "Telah beroperasi sebagai biro perjalanan wisata selama jangka waktu minimum yang dipersyaratkan regulasi.",
          "Memiliki kantor pelayanan yang jelas dan dibuktikan dengan dokumen domisili.",
          "Menyediakan jaminan dalam bentuk bank garansi atau deposito atas nama perusahaan dengan nominal sesuai ketentuan Kemenag yang berlaku.",
          "Memiliki laporan keuangan perusahaan yang sehat, umumnya harus telah diaudit oleh akuntan publik.",
          "Memiliki sumber daya manusia di bidang tiketing, dokumen perjalanan, dan pembimbing ibadah.",
        ],
      },
      {
        type: "tip",
        text: "Nominal bank garansi dan masa operasional minimum dapat berubah mengikuti regulasi terbaru. Konsultasikan dengan tim Jamnasindo untuk angka yang berlaku saat ini sebelum menyiapkan dana jaminan.",
      },
      { type: "h2", text: "Alur Pengajuan Izin PPIU" },
      {
        type: "ol",
        items: [
          "Pastikan legalitas dasar lengkap: akta PT, NPWP, NIB dengan KBLI biro perjalanan, dan izin usaha pariwisata aktif.",
          "Siapkan dokumen pendukung: laporan keuangan audited, struktur organisasi, daftar SDM beserta sertifikatnya, bukti kepemilikan/sewa kantor.",
          "Terbitkan bank garansi di bank syariah atau bank umum yang ditunjuk, dengan masa berlaku sesuai ketentuan.",
          "Ajukan permohonan izin PPIU melalui sistem perizinan Kemenag dan lengkapi seluruh isian serta unggahan dokumen.",
          "Ikuti proses verifikasi dokumen dan visitasi lapangan ke kantor perusahaan oleh tim Kemenag.",
          "Setelah dinyatakan memenuhi syarat, Keputusan Menteri Agama tentang penetapan izin PPIU diterbitkan.",
        ],
      },
      { type: "h2", text: "Berapa Lama dan Apa Saja Kendalanya?" },
      {
        type: "p",
        text: "Durasi proses sangat bergantung pada kelengkapan dokumen. Kendala paling umum adalah laporan keuangan yang belum memenuhi standar audit, KBLI yang tidak sesuai, dan dokumen SDM yang belum lengkap. Di sinilah pendampingan konsultan berpengalaman menghemat waktu berbulan-bulan: dokumen disiapkan benar sejak awal sehingga tidak bolak-balik revisi.",
      },
      { type: "h2", text: "Serahkan ke Ahlinya" },
      {
        type: "p",
        text: "Jamnasindo telah mendampingi banyak travel dalam pengurusan izin PPIU dari nol hingga terbit, termasuk penyiapan laporan keuangan, bank garansi, dan pendampingan saat visitasi. Hubungi kami untuk konsultasi gratis mengenai kesiapan perusahaan Anda.",
      },
    ],
  },
  {
    slug: "apa-itu-pihk",
    title: "Apa Itu PIHK? Syarat Menjadi Penyelenggara Ibadah Haji Khusus",
    description:
      "PIHK adalah izin untuk menyelenggarakan ibadah haji khusus (ONH Plus). Pelajari perbedaannya dengan PPIU, syarat pengajuan, dan tahapan menjadi PIHK resmi Kemenag.",
    category: "Perizinan",
    date: "2026-06-13",
    readingMinutes: 6,
    keywords: [
      "apa itu PIHK",
      "syarat PIHK",
      "haji khusus",
      "ONH plus",
      "izin haji khusus",
    ],
    sections: [
      {
        type: "p",
        text: "PIHK (Penyelenggara Ibadah Haji Khusus) adalah badan hukum yang memiliki izin dari Menteri Agama untuk menyelenggarakan ibadah haji khusus — yang di masyarakat dikenal sebagai haji plus atau ONH Plus. Bagi travel umroh yang sudah mapan, naik kelas menjadi PIHK adalah langkah bisnis yang strategis karena pasar haji khusus memiliki nilai layanan yang jauh lebih tinggi.",
      },
      { type: "h2", text: "Perbedaan PPIU dan PIHK" },
      {
        type: "ul",
        items: [
          "PPIU menyelenggarakan perjalanan ibadah umroh; PIHK menyelenggarakan ibadah haji khusus dengan kuota resmi dari pemerintah.",
          "Haji khusus terikat kuota nasional dan daftar tunggu yang dikelola melalui sistem Kemenag, sedangkan umroh dapat diberangkatkan sepanjang tahun.",
          "Persyaratan PIHK lebih berat: umumnya perusahaan harus lebih dulu berpengalaman dan terakreditasi sebagai PPIU, dengan jaminan finansial yang lebih besar.",
          "Tanggung jawab layanan PIHK mencakup standar minimum akomodasi, konsumsi, transportasi, dan pembimbingan yang diatur lebih ketat.",
        ],
      },
      { type: "h2", text: "Syarat Umum Menjadi PIHK" },
      {
        type: "ol",
        items: [
          "Berstatus PPIU yang masih berlaku izinnya dan memiliki rekam jejak penyelenggaraan umroh yang baik.",
          "Memenuhi masa operasional minimum sebagai PPIU sesuai regulasi yang berlaku.",
          "Menyerahkan jaminan finansial (bank garansi/deposito) dengan nominal lebih besar dari persyaratan PPIU.",
          "Memiliki laporan keuangan audited dengan opini yang baik.",
          "Memiliki SDM berpengalaman dalam penyelenggaraan ibadah, termasuk petugas yang pernah bertugas di Arab Saudi.",
          "Lulus verifikasi dokumen dan visitasi dari Kementerian Agama.",
        ],
      },
      {
        type: "tip",
        text: "Karena syarat PIHK berjenjang dari status PPIU, strategi paling efisien adalah memastikan akreditasi PPIU Anda bernilai baik terlebih dahulu. Jamnasindo dapat memetakan kesenjangan persyaratan perusahaan Anda sebelum mengajukan.",
      },
      { type: "h2", text: "Mengapa Proses PIHK Sering Gagal?" },
      {
        type: "p",
        text: "Kegagalan umumnya bukan karena perusahaan tidak mampu, melainkan karena dokumen tidak terstruktur: laporan keuangan tidak sinkron dengan laporan penyelenggaraan, data SDM tidak terdokumentasi, atau jaminan finansial tidak sesuai format. Pendampingan profesional memastikan setiap dokumen saling mendukung di mata verifikator.",
      },
      { type: "h2", text: "Konsultasikan Rencana PIHK Anda" },
      {
        type: "p",
        text: "Tim Jamnasindo membantu travel Anda menyusun peta jalan dari PPIU menuju PIHK: audit kesiapan, pembenahan laporan keuangan, hingga pendampingan penuh saat proses pengajuan. Hubungi kami melalui halaman kontak untuk diskusi awal tanpa biaya.",
      },
    ],
  },
  {
    slug: "panduan-akreditasi-ppiu",
    title: "Panduan Akreditasi PPIU: Persiapan, Proses, dan Tips Lulus dengan Nilai Baik",
    description:
      "Akreditasi PPIU menentukan kredibilitas dan kelangsungan izin travel umroh Anda. Pelajari komponen penilaian, dokumen yang disiapkan, dan strategi lulus akreditasi.",
    category: "Akreditasi",
    date: "2026-06-13",
    readingMinutes: 6,
    keywords: [
      "akreditasi PPIU",
      "penilaian PPIU",
      "sertifikasi travel umroh",
      "standar pelayanan umroh",
    ],
    sections: [
      {
        type: "p",
        text: "Setelah izin PPIU terbit, kewajiban berikutnya adalah akreditasi — penilaian berkala atas kualitas penyelenggaraan perjalanan ibadah umroh. Akreditasi bukan formalitas: hasilnya memengaruhi reputasi di mata jamaah, menjadi syarat naik kelas ke PIHK, dan PPIU yang tidak terakreditasi dapat terkena sanksi administratif.",
      },
      { type: "h2", text: "Apa Saja yang Dinilai?" },
      {
        type: "ul",
        items: [
          "Aspek legalitas dan kelembagaan: kelengkapan izin, struktur organisasi, dan kepatuhan pelaporan kepada Kemenag.",
          "Aspek keuangan: kesehatan laporan keuangan, pengelolaan dana jamaah, dan keberadaan jaminan.",
          "Aspek pelayanan: standar layanan sebelum keberangkatan, selama di Tanah Suci, dan setelah kepulangan — termasuk akomodasi, konsumsi, dan transportasi.",
          "Aspek SDM: kompetensi pembimbing ibadah, petugas tiketing, dan penanganan dokumen perjalanan.",
          "Aspek sarana-prasarana: kantor pelayanan, sistem informasi, dan kanal pengaduan jamaah.",
        ],
      },
      { type: "h2", text: "Dokumen yang Wajib Disiapkan" },
      {
        type: "ol",
        items: [
          "Salinan izin PPIU dan legalitas perusahaan (akta, NIB, NPWP).",
          "Laporan keuangan periode terakhir, idealnya audited.",
          "Laporan penyelenggaraan umroh: data jamaah, jadwal keberangkatan, dan bukti pelaporan ke Kemenag.",
          "SOP pelayanan tertulis dari pendaftaran hingga kepulangan jamaah.",
          "Dokumen SDM: kontrak kerja, sertifikat pembimbing ibadah, dan pelatihan yang pernah diikuti.",
          "Bukti kerja sama dengan penyedia layanan di Arab Saudi (hotel, transportasi, muassasah).",
        ],
      },
      {
        type: "tip",
        text: "Nilai akreditasi sering jatuh di dokumentasi, bukan di kualitas layanan yang sebenarnya. Travel yang pelayanannya bagus tetap bisa dinilai rendah jika SOP dan bukti pelaksanaannya tidak terdokumentasi rapi.",
      },
      { type: "h2", text: "Strategi Lulus dengan Nilai Baik" },
      {
        type: "p",
        text: "Mulailah dari audit internal: bandingkan kondisi perusahaan dengan instrumen penilaian, identifikasi kesenjangan, lalu benahi satu per satu dengan bukti tertulis. Simulasikan visitasi agar tim siap menjawab pertanyaan verifikator. Jamnasindo menyediakan jasa pendampingan akreditasi end-to-end — dari audit kesenjangan, penyusunan SOP, hingga simulasi penilaian — sehingga perusahaan Anda menghadapi akreditasi dengan percaya diri.",
      },
    ],
  },
  {
    slug: "cara-daftar-iata",
    title: "Cara Mendaftar Keanggotaan IATA untuk Travel Agent di Indonesia",
    description:
      "Panduan mendaftar akreditasi IATA bagi travel agent Indonesia: jenis keanggotaan, syarat finansial, dokumen yang dibutuhkan, dan manfaatnya untuk bisnis travel umroh & haji.",
    category: "Keanggotaan",
    date: "2026-06-13",
    readingMinutes: 6,
    keywords: [
      "cara daftar IATA",
      "akreditasi IATA Indonesia",
      "IATA travel agent",
      "keanggotaan IATA",
    ],
    sections: [
      {
        type: "p",
        text: "Akreditasi IATA (International Air Transport Association) memungkinkan travel agent menerbitkan tiket penerbangan internasional secara langsung melalui sistem BSP, tanpa bergantung pada agen lain. Bagi travel umroh dan haji, IATA berarti kendali penuh atas tiket grup, harga yang lebih kompetitif, dan kredibilitas di mata mitra maskapai.",
      },
      { type: "h2", text: "Jenis Keanggotaan yang Perlu Anda Tahu" },
      {
        type: "ul",
        items: [
          "Akreditasi penuh (IATA Accredited Agent): dapat menerbitkan tiket sendiri melalui BSP dengan jaminan finansial.",
          "TIDS (Travel Industry Designator Service): nomor identitas industri untuk travel yang belum perlu menerbitkan tiket sendiri — lebih ringan syaratnya dan sering menjadi langkah awal.",
        ],
      },
      { type: "h2", text: "Syarat Umum Akreditasi IATA" },
      {
        type: "ol",
        items: [
          "Legalitas perusahaan lengkap dan izin usaha perjalanan wisata yang berlaku.",
          "Laporan keuangan yang memenuhi kriteria penilaian finansial IATA — umumnya wajib audited dan menunjukkan rasio keuangan yang sehat.",
          "Jaminan finansial (financial security) berupa bank garansi atau instrumen lain, nominalnya bergantung pada hasil penilaian risiko dan proyeksi penjualan.",
          "Staf yang kompeten di bidang tiketing dengan sertifikat yang diakui.",
          "Kantor operasional yang layak dan dapat diverifikasi.",
        ],
      },
      {
        type: "tip",
        text: "Penolakan akreditasi IATA paling sering terjadi karena laporan keuangan tidak memenuhi kriteria finansial. Pastikan laporan disusun dan diaudit dengan benar sebelum mengajukan — ini area di mana Jamnasindo paling banyak membantu klien.",
      },
      { type: "h2", text: "Alur Pendaftaran Singkat" },
      {
        type: "ol",
        items: [
          "Buat akun di portal layanan pelanggan IATA dan pilih jenis akreditasi.",
          "Lengkapi formulir aplikasi dan unggah dokumen legalitas serta keuangan.",
          "Ikuti proses penilaian finansial; siapkan jaminan jika diminta.",
          "Setelah disetujui, lakukan setup BSP dan pelatihan staf untuk mulai menerbitkan tiket.",
        ],
      },
      { type: "h2", text: "IATA + PPIU = Kombinasi Kuat" },
      {
        type: "p",
        text: "Travel umroh yang memegang izin PPIU sekaligus akreditasi IATA mengendalikan dua komponen biaya terbesar: legalitas keberangkatan dan tiket penerbangan. Jamnasindo membantu pengurusan keduanya secara paralel agar bisnis Anda efisien sejak awal. Hubungi kami untuk konsultasi gratis.",
      },
    ],
  },
  {
    slug: "bank-garansi-surety-bond-umroh",
    title: "Bank Garansi vs Surety Bond untuk Travel Umroh: Pengertian, Perbedaan, dan Syarat",
    description:
      "Memahami bank garansi dan surety bond sebagai jaminan PPIU/PIHK: perbedaan keduanya, kapan digunakan, syarat penerbitan, dan tips memilih yang sesuai untuk travel Anda.",
    category: "Keuangan",
    date: "2026-06-13",
    readingMinutes: 5,
    keywords: [
      "bank garansi umroh",
      "surety bond travel",
      "jaminan PPIU",
      "bank garansi PPIU",
    ],
    sections: [
      {
        type: "p",
        text: "Setiap PPIU dan PIHK wajib menyerahkan jaminan kepada pemerintah sebagai perlindungan dana jamaah. Dua instrumen yang paling umum adalah bank garansi dan surety bond. Memilih instrumen yang tepat berdampak langsung pada arus kas perusahaan.",
      },
      { type: "h2", text: "Apa Itu Bank Garansi?" },
      {
        type: "p",
        text: "Bank garansi adalah jaminan tertulis dari bank bahwa bank akan membayar sejumlah dana kepada penerima jaminan jika pihak yang dijamin wanprestasi. Untuk PPIU, bank garansi umumnya diterbitkan oleh bank syariah atau bank umum yang ditunjuk, atas nama perusahaan, dengan masa berlaku sesuai ketentuan Kemenag. Konsekuensinya: bank biasanya meminta setoran jaminan (kontra garansi) yang mengendap.",
      },
      { type: "h2", text: "Apa Itu Surety Bond?" },
      {
        type: "p",
        text: "Surety bond adalah produk penjaminan serupa yang diterbitkan oleh perusahaan asuransi atau penjaminan. Premi dan persyaratan kolateralnya umumnya lebih ringan daripada setoran penuh di bank, sehingga lebih ramah arus kas — namun penerimaannya bergantung pada ketentuan instansi penerima jaminan.",
      },
      { type: "h2", text: "Perbandingan Singkat" },
      {
        type: "ul",
        items: [
          "Penerbit: bank (bank garansi) vs perusahaan asuransi/penjaminan (surety bond).",
          "Beban kas: bank garansi sering butuh dana mengendap; surety bond berbasis premi.",
          "Kekuatan klaim: bank garansi umumnya dianggap lebih likuid oleh penerima jaminan.",
          "Penerimaan: pastikan instrumen yang dipilih diterima oleh instansi tujuan — untuk jaminan PPIU, ikuti format dan ketentuan Kemenag yang berlaku.",
        ],
      },
      {
        type: "tip",
        text: "Sebelum menerbitkan jaminan, pastikan nominal, format dokumen, dan masa berlaku sesuai ketentuan terbaru. Kesalahan format adalah penyebab klasik dokumen jaminan ditolak dan proses izin tertunda.",
      },
      { type: "h2", text: "Bantuan Pengurusan Jaminan" },
      {
        type: "p",
        text: "Jamnasindo bermitra dengan bank dan perusahaan penjaminan untuk membantu travel menerbitkan bank garansi maupun surety bond dengan proses cepat dan format yang dijamin sesuai. Konsultasikan kebutuhan jaminan Anda dengan tim kami.",
      },
    ],
  },
  {
    slug: "memulai-bisnis-travel-umroh",
    title: "Checklist Memulai Bisnis Travel Umroh dari Nol: Roadmap Legalitas Lengkap",
    description:
      "Roadmap lengkap membangun bisnis travel umroh yang legal: dari pendirian PT, izin biro perjalanan wisata, izin PPIU, sampai akreditasi dan keanggotaan IATA.",
    category: "Bisnis",
    date: "2026-06-13",
    readingMinutes: 7,
    keywords: [
      "memulai bisnis travel umroh",
      "cara buka travel umroh",
      "bisnis umroh legal",
      "modal travel umroh",
    ],
    sections: [
      {
        type: "p",
        text: "Bisnis travel umroh adalah bisnis kepercayaan: jamaah menitipkan dana dan ibadahnya kepada Anda. Karena itu fondasi legalitas bukan sekadar kewajiban, melainkan aset komersial. Berikut roadmap tahapan legalitas dari nol hingga siap memberangkatkan jamaah secara resmi.",
      },
      { type: "h2", text: "Tahap 1 — Fondasi Badan Usaha" },
      {
        type: "ol",
        items: [
          "Dirikan PT dengan pemegang saham dan pengurus WNI beragama Islam (syarat khas perizinan ibadah).",
          "Urus NIB melalui OSS dengan KBLI biro perjalanan wisata yang relevan.",
          "Aktifkan perizinan berusaha pariwisata dan penuhi kewajiban dasarnya.",
          "Siapkan kantor operasional dengan bukti domisili yang jelas.",
        ],
      },
      { type: "h2", text: "Tahap 2 — Bangun Rekam Jejak Biro Perjalanan" },
      {
        type: "p",
        text: "Izin PPIU mensyaratkan pengalaman operasional sebagai biro perjalanan wisata. Manfaatkan masa ini untuk menjalankan paket wisata halal atau layanan tur reguler, membangun pembukuan yang rapi, dan menyiapkan laporan keuangan yang kelak wajib diaudit. Pada masa ini Anda juga dapat memberangkatkan jamaah umroh melalui kerja sama keagenan resmi dengan PPIU lain — pastikan perjanjian keagenannya benar agar tidak melanggar aturan.",
      },
      { type: "h2", text: "Tahap 3 — Ajukan Izin PPIU" },
      {
        type: "ul",
        items: [
          "Audit laporan keuangan oleh akuntan publik.",
          "Terbitkan bank garansi sesuai nominal dan format ketentuan.",
          "Rekrut dan latih SDM kunci: tiketing, dokumen perjalanan (visa), dan pembimbing ibadah bersertifikat.",
          "Ajukan permohonan melalui sistem perizinan Kemenag dan siapkan diri untuk visitasi lapangan.",
        ],
      },
      { type: "h2", text: "Tahap 4 — Naik Kelas" },
      {
        type: "p",
        text: "Setelah PPIU terbit dan berjalan, agenda berikutnya adalah akreditasi dengan nilai baik, akreditasi IATA agar dapat menerbitkan tiket sendiri, dan dalam jangka panjang izin PIHK untuk masuk pasar haji khusus. Setiap tahap memperbesar margin sekaligus kredibilitas bisnis Anda.",
      },
      {
        type: "tip",
        text: "Kesalahan terbesar pemula adalah memberangkatkan jamaah tanpa payung legal yang benar demi cepat untung. Selain berisiko pidana, hal itu menghancurkan kepercayaan yang menjadi modal utama bisnis ini.",
      },
      { type: "h2", text: "Mulai dengan Peta yang Benar" },
      {
        type: "p",
        text: "Jamnasindo mendampingi calon pengusaha travel sejak pendirian PT hingga izin PPIU terbit — satu pintu untuk legalitas, laporan keuangan, jaminan bank, dan persiapan visitasi. Hubungi kami untuk konsultasi gratis dan dapatkan penilaian kesiapan bisnis Anda.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  return articles.filter((a) => a.slug !== slug).slice(0, limit);
}
