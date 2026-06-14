// Konten SEO panjang per layanan, di-render di /layanan/[slug].
// Slug = id pada serviceCategories (src/lib/data.ts).
// Memakai model section yang sama dengan artikel agar renderer konsisten.
import type { ArticleSection } from "./articles";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  summary: string; // paragraf pembuka (lead)
  sections: ArticleSection[];
  faq: ServiceFaq[]; // dirender + di-inject sebagai FAQPage JSON-LD
}

export const serviceDetails: Record<string, ServiceDetail> = {
  ppiu: {
    slug: "ppiu",
    metaTitle: "Jasa Pengurusan Izin PPIU (Penyelenggara Perjalanan Ibadah Umrah)",
    metaDescription:
      "Jasa konsultan pengurusan izin PPIU untuk travel umroh: syarat, dasar hukum, alur OSS & Kemenag, hingga izin terbit. Didampingi tim Jamnasindo dari awal sampai selesai.",
    keywords: [
      "jasa pengurusan PPIU",
      "izin PPIU",
      "konsultan PPIU",
      "syarat izin travel umroh",
      "PPIU Kemenag",
    ],
    summary:
      "PPIU (Penyelenggara Perjalanan Ibadah Umrah) adalah izin resmi dari Kementerian Agama yang wajib dimiliki setiap perusahaan yang ingin memberangkatkan jamaah umroh. Jamnasindo mendampingi pengurusan izin PPIU Anda dari penyiapan dokumen hingga izin terbit.",
    sections: [
      { type: "h2", text: "Apa Itu Izin PPIU dan Mengapa Wajib?" },
      {
        type: "p",
        text: "Izin PPIU adalah legalitas inti bagi bisnis travel umroh. Tanpa izin ini, kegiatan memberangkatkan jamaah umroh dikategorikan ilegal dan berisiko sanksi administratif maupun pidana. Izin PPIU memastikan perusahaan Anda diakui negara, dipercaya calon jamaah, dan dapat beroperasi secara berkelanjutan.",
      },
      { type: "h2", text: "Dasar Hukum" },
      {
        type: "p",
        text: "Penyelenggaraan ibadah umroh diatur dalam UU No. 8 Tahun 2019 tentang Penyelenggaraan Ibadah Haji dan Umrah beserta Peraturan Menteri Agama turunannya. Regulasi ini menetapkan bahwa hanya biro perjalanan wisata berizin resmi dari Menteri Agama yang boleh menyelenggarakan perjalanan ibadah umroh.",
      },
      { type: "h2", text: "Syarat Utama Pengajuan PPIU" },
      {
        type: "ul",
        items: [
          "Berbadan hukum PT yang dimiliki dan dikelola WNI beragama Islam.",
          "Memiliki izin usaha biro perjalanan wisata melalui OSS dengan KBLI yang sesuai.",
          "Telah beroperasi sebagai biro perjalanan wisata sesuai jangka waktu minimum yang dipersyaratkan.",
          "Memiliki kantor pelayanan yang jelas dan terbukti dengan dokumen domisili.",
          "Menyediakan jaminan dalam bentuk bank garansi sesuai ketentuan.",
        ],
      },
      { type: "h2", text: "Alur Pengurusan Bersama Jamnasindo" },
      {
        type: "ol",
        items: [
          "Konsultasi dan audit kesiapan dokumen serta legalitas perusahaan.",
          "Penyiapan dan perapian seluruh berkas persyaratan agar lolos verifikasi.",
          "Pengajuan melalui OSS dan sistem perizinan Kementerian Agama.",
          "Pendampingan saat verifikasi dan visitasi hingga izin PPIU diterbitkan.",
        ],
      },
      {
        type: "tip",
        text: "Penyebab paling umum proses PPIU molor adalah berkas yang kurang lengkap atau tidak sesuai format. Jamnasindo memastikan dokumen Anda rapi sejak awal sehingga pengajuan berjalan tanpa bolak-balik revisi.",
      },
    ],
    faq: [
      {
        question: "Apakah travel umroh wajib punya izin PPIU?",
        answer:
          "Ya. Setiap perusahaan yang memberangkatkan jamaah umroh wajib memiliki izin PPIU dari Kementerian Agama. Tanpa izin ini kegiatan tergolong ilegal dan berisiko sanksi.",
      },
      {
        question: "Berapa lama proses pengurusan izin PPIU?",
        answer:
          "Tergantung kelengkapan dokumen dan antrean verifikasi Kemenag. Dengan pendampingan agar berkas lengkap dan sesuai sejak awal, proses berjalan jauh lebih cepat tanpa revisi berulang.",
      },
      {
        question: "Apa syarat badan hukum untuk PPIU?",
        answer:
          "Perusahaan harus berbadan hukum PT yang dimiliki dan dikelola WNI beragama Islam, memiliki izin biro perjalanan wisata via OSS dengan KBLI yang sesuai, kantor pelayanan yang jelas, serta jaminan bank garansi.",
      },
    ],
  },

  pihk: {
    slug: "pihk",
    metaTitle: "Jasa Pengurusan Izin PIHK (Penyelenggara Ibadah Haji Khusus)",
    metaDescription:
      "Konsultan pengurusan izin PIHK untuk travel haji khusus (ONH Plus): syarat, dasar hukum, dan pendampingan penuh oleh Jamnasindo hingga izin Kemenag terbit.",
    keywords: [
      "jasa pengurusan PIHK",
      "izin PIHK",
      "haji khusus",
      "ONH Plus",
      "konsultan PIHK",
    ],
    summary:
      "PIHK (Penyelenggara Ibadah Haji Khusus) adalah izin untuk menyelenggarakan ibadah haji khusus atau ONH Plus. Jamnasindo membantu travel yang ingin naik kelas dari umroh ke haji khusus mengurus izin PIHK secara menyeluruh.",
    sections: [
      { type: "h2", text: "Memahami Izin PIHK" },
      {
        type: "p",
        text: "Berbeda dengan PPIU yang melayani umroh, PIHK adalah izin untuk menyelenggarakan ibadah haji khusus dengan layanan dan fasilitas di atas haji reguler. PIHK menjadi langkah lanjutan bagi travel yang telah matang menjalankan umroh dan ingin memperluas layanan ke segmen haji khusus.",
      },
      { type: "h2", text: "Dasar Hukum dan Posisi PIHK" },
      {
        type: "p",
        text: "Sama seperti umroh, haji khusus tunduk pada UU No. 8 Tahun 2019 dan peraturan turunannya. Umumnya travel mengurus izin PPIU terlebih dahulu, lalu meningkat ke PIHK setelah memenuhi syarat pengalaman operasional dan akreditasi yang ditetapkan Kementerian Agama.",
      },
      { type: "h2", text: "Syarat Umum Pengajuan PIHK" },
      {
        type: "ul",
        items: [
          "Telah memiliki dan menjalankan izin PPIU aktif dengan rekam jejak baik.",
          "Memenuhi syarat akreditasi dan masa operasional minimum sebagai PPIU.",
          "Memiliki kemampuan finansial yang dibuktikan, termasuk jaminan yang dipersyaratkan.",
          "Struktur organisasi dan SDM yang memadai untuk layanan haji khusus.",
        ],
      },
      { type: "h2", text: "Peran Jamnasindo" },
      {
        type: "p",
        text: "Kami memetakan kesiapan perusahaan Anda untuk naik ke PIHK, menyiapkan seluruh dokumen, dan mendampingi proses pengajuan hingga izin terbit — termasuk memastikan akreditasi dan persyaratan finansial terpenuhi.",
      },
      {
        type: "tip",
        text: "Bangun rekam jejak PPIU yang bersih dan terdokumentasi sejak awal. Riwayat operasional yang rapi sangat mempermudah peningkatan ke PIHK di kemudian hari.",
      },
    ],
    faq: [
      {
        question: "Apa beda PIHK dan PPIU?",
        answer:
          "PPIU adalah izin untuk menyelenggarakan perjalanan ibadah umroh, sedangkan PIHK adalah izin untuk menyelenggarakan ibadah haji khusus (ONH Plus).",
      },
      {
        question: "Apakah harus punya PPIU dulu sebelum mengurus PIHK?",
        answer:
          "Umumnya ya. Travel mengurus dan menjalankan izin PPIU terlebih dahulu, lalu meningkat ke PIHK setelah memenuhi syarat pengalaman operasional dan akreditasi yang ditetapkan Kemenag.",
      },
    ],
  },

  akreditasi: {
    slug: "akreditasi",
    metaTitle: "Jasa Akreditasi & Surveilance PPIU/PIHK Travel Umroh & Haji",
    metaDescription:
      "Pendampingan akreditasi dan surveilance berkala PPIU/PIHK sesuai regulasi Kemenag. Jamnasindo bantu travel Anda mempertahankan nilai akreditasi dan kepatuhan.",
    keywords: [
      "akreditasi PPIU",
      "akreditasi PIHK",
      "surveilance travel umroh",
      "kepatuhan Kemenag",
    ],
    summary:
      "Akreditasi adalah penilaian mutu penyelenggaraan travel ibadah, sementara surveilance adalah pengawasan berkala untuk menjaga kepatuhan. Jamnasindo mendampingi keduanya agar izin Anda tetap kuat dan reputasi terjaga.",
    sections: [
      { type: "h2", text: "Kenapa Akreditasi Penting?" },
      {
        type: "p",
        text: "Akreditasi menilai kualitas layanan, manajemen, dan kepatuhan travel terhadap standar yang ditetapkan. Nilai akreditasi yang baik bukan sekadar formalitas — ia menjadi syarat untuk peningkatan izin (mis. dari PPIU ke PIHK) sekaligus bukti kredibilitas di mata calon jamaah.",
      },
      { type: "h2", text: "Surveilance Berkala" },
      {
        type: "p",
        text: "Setelah izin terbit, travel tetap diawasi melalui surveilance untuk memastikan operasional terus sesuai regulasi. Temuan yang tidak ditangani dapat berdampak pada penurunan nilai akreditasi hingga sanksi.",
      },
      { type: "h2", text: "Yang Kami Dampingi" },
      {
        type: "ul",
        items: [
          "Persiapan dokumen dan bukti pemenuhan standar akreditasi.",
          "Pembenahan sistem dan SOP operasional agar selaras dengan kriteria penilaian.",
          "Pendampingan saat asesmen dan tindak lanjut temuan surveilance.",
          "Pemantauan kepatuhan berkelanjutan agar nilai akreditasi terjaga.",
        ],
      },
      {
        type: "tip",
        text: "Dokumentasikan setiap proses operasional secara rapi sepanjang tahun, bukan hanya menjelang asesmen. Kesiapan berkelanjutan jauh lebih ringan daripada mengejar dokumen di saat-saat akhir.",
      },
    ],
    faq: [
      {
        question: "Apa itu akreditasi PPIU/PIHK?",
        answer:
          "Akreditasi adalah penilaian mutu penyelenggaraan travel ibadah terhadap standar layanan, manajemen, dan kepatuhan. Nilai akreditasi yang baik menjadi syarat peningkatan izin sekaligus bukti kredibilitas.",
      },
      {
        question: "Apa itu surveilance dan kenapa penting?",
        answer:
          "Surveilance adalah pengawasan berkala setelah izin terbit untuk memastikan operasional tetap sesuai regulasi. Temuan yang tidak ditangani bisa menurunkan nilai akreditasi hingga sanksi.",
      },
    ],
  },

  iata: {
    slug: "iata",
    metaTitle: "Jasa Pengurusan Keanggotaan & Akreditasi IATA untuk Travel",
    metaDescription:
      "Pendampingan pendaftaran akreditasi IATA agar travel Anda dapat menerbitkan tiket maskapai internasional secara langsung. Konsultan Jamnasindo siap membantu.",
    keywords: [
      "akreditasi IATA",
      "keanggotaan IATA travel",
      "cara daftar IATA",
      "agen IATA Indonesia",
    ],
    summary:
      "Akreditasi IATA memberi travel akses langsung ke sistem tiket maskapai internasional, menekan ketergantungan pada pihak ketiga dan meningkatkan margin. Jamnasindo membantu travel memenuhi syarat dan proses pendaftarannya.",
    sections: [
      { type: "h2", text: "Apa Manfaat Akreditasi IATA?" },
      {
        type: "p",
        text: "Dengan akreditasi IATA, travel dapat menerbitkan tiket penerbangan internasional secara langsung melalui sistem standar industri. Ini mempercepat layanan, memperluas pilihan maskapai, serta membuka peluang margin yang lebih sehat dibanding membeli tiket lewat perantara.",
      },
      { type: "h2", text: "Syarat Umum" },
      {
        type: "ul",
        items: [
          "Badan usaha resmi dengan legalitas dan izin perjalanan wisata yang sah.",
          "Kesiapan finansial dan jaminan sesuai ketentuan IATA.",
          "SDM dengan kualifikasi ticketing yang dipersyaratkan.",
          "Kantor dan sistem operasional yang memenuhi standar verifikasi.",
        ],
      },
      { type: "h2", text: "Proses Bersama Jamnasindo" },
      {
        type: "ol",
        items: [
          "Asesmen kesiapan perusahaan terhadap kriteria IATA.",
          "Penyiapan dokumen legal, finansial, dan SDM.",
          "Pengajuan dan pendampingan proses verifikasi hingga akreditasi terbit.",
        ],
      },
      {
        type: "tip",
        text: "Siapkan aspek finansial dan jaminan sejak dini — bagian ini sering menjadi penentu kelancaran proses akreditasi IATA.",
      },
    ],
    faq: [
      {
        question: "Apa manfaat akreditasi IATA untuk travel?",
        answer:
          "Dengan akreditasi IATA, travel dapat menerbitkan tiket maskapai internasional secara langsung melalui sistem standar industri — lebih cepat, lebih banyak pilihan maskapai, dan margin lebih sehat dibanding lewat perantara.",
      },
      {
        question: "Apa syarat utama mendaftar IATA?",
        answer:
          "Badan usaha resmi dengan legalitas sah, kesiapan finansial dan jaminan sesuai ketentuan IATA, SDM ticketing yang berkualifikasi, serta kantor dan sistem operasional yang memenuhi standar verifikasi.",
      },
    ],
  },

  keuangan: {
    slug: "keuangan",
    metaTitle: "Jasa Penyusunan Laporan Keuangan Travel Umroh & Haji",
    metaDescription:
      "Penyusunan laporan keuangan travel ibadah sesuai standar akuntansi — rapi, akuntabel, dan siap untuk syarat perizinan serta audit. Didukung tim Jamnasindo.",
    keywords: [
      "laporan keuangan travel umroh",
      "akuntansi travel ibadah",
      "jasa laporan keuangan PPIU",
    ],
    summary:
      "Laporan keuangan yang rapi adalah fondasi kepercayaan dan syarat penting dalam perizinan travel ibadah. Jamnasindo menyusun laporan keuangan Anda sesuai standar akuntansi yang berlaku.",
    sections: [
      { type: "h2", text: "Mengapa Laporan Keuangan Krusial bagi Travel" },
      {
        type: "p",
        text: "Bisnis travel ibadah mengelola dana jamaah dalam jumlah besar. Laporan keuangan yang tersusun sesuai standar bukan hanya syarat administratif perizinan, tetapi juga alat kontrol arus kas, dasar pengambilan keputusan, dan bukti akuntabilitas kepada jamaah serta regulator.",
      },
      { type: "h2", text: "Lingkup Layanan" },
      {
        type: "ul",
        items: [
          "Penyusunan laporan keuangan sesuai standar akuntansi yang berlaku.",
          "Perapian pembukuan dan rekonsiliasi transaksi.",
          "Penyiapan laporan untuk kebutuhan perizinan, akreditasi, dan audit.",
          "Konsultasi pengelolaan keuangan operasional travel.",
        ],
      },
      {
        type: "tip",
        text: "Pisahkan dana operasional dan dana jamaah sejak awal. Pemisahan yang disiplin membuat laporan keuangan jauh lebih sehat dan kredibel.",
      },
    ],
    faq: [
      {
        question: "Apakah laporan keuangan wajib untuk travel umroh?",
        answer:
          "Laporan keuangan yang tersusun sesuai standar menjadi syarat penting dalam perizinan dan akreditasi travel ibadah, sekaligus alat kontrol arus kas dan bukti akuntabilitas kepada jamaah serta regulator.",
      },
      {
        question: "Apakah Jamnasindo bisa merapikan pembukuan yang berantakan?",
        answer:
          "Bisa. Kami melakukan perapian pembukuan, rekonsiliasi transaksi, dan menyusun laporan keuangan sesuai standar yang berlaku, termasuk untuk kebutuhan perizinan dan audit.",
      },
    ],
  },

  pajak: {
    slug: "pajak",
    metaTitle: "Jasa Konsultan Perpajakan Travel Umroh & Haji",
    metaDescription:
      "Penanganan kewajiban perpajakan travel ibadah sesuai regulasi terbaru: pelaporan, kepatuhan, dan optimasi. Jamnasindo menjaga bisnis travel Anda tetap patuh.",
    keywords: [
      "konsultan pajak travel",
      "perpajakan travel umroh",
      "pajak biro perjalanan",
      "kepatuhan pajak PPIU",
    ],
    summary:
      "Kepatuhan pajak melindungi bisnis travel dari sanksi dan menjaga reputasi. Jamnasindo menangani kewajiban perpajakan travel ibadah Anda sesuai regulasi terbaru.",
    sections: [
      { type: "h2", text: "Pajak dalam Bisnis Travel Ibadah" },
      {
        type: "p",
        text: "Sebagai badan usaha, travel ibadah memiliki kewajiban perpajakan yang harus dipenuhi secara tepat waktu dan akurat. Ketidakpatuhan dapat berujung pada denda, sanksi, hingga gangguan operasional. Pengelolaan pajak yang baik justru memberi kepastian dan ketenangan dalam menjalankan bisnis.",
      },
      { type: "h2", text: "Yang Kami Tangani" },
      {
        type: "ul",
        items: [
          "Perhitungan dan pelaporan kewajiban pajak sesuai ketentuan terbaru.",
          "Penyiapan dan penyampaian SPT secara tepat waktu.",
          "Konsultasi kepatuhan dan perencanaan pajak yang sehat.",
          "Pendampingan saat ada pemeriksaan atau klarifikasi perpajakan.",
        ],
      },
      {
        type: "tip",
        text: "Catat dan arsipkan bukti transaksi secara tertib setiap bulan. Administrasi pajak yang rapi sepanjang tahun mencegah masalah saat pelaporan.",
      },
    ],
    faq: [
      {
        question: "Apa saja kewajiban pajak travel umroh?",
        answer:
          "Sebagai badan usaha, travel ibadah memiliki kewajiban perhitungan dan pelaporan pajak sesuai ketentuan terbaru, termasuk penyampaian SPT tepat waktu. Jamnasindo menangani perhitungan, pelaporan, dan kepatuhannya.",
      },
      {
        question: "Apa risiko jika tidak patuh pajak?",
        answer:
          "Ketidakpatuhan dapat berujung pada denda, sanksi, hingga gangguan operasional. Pengelolaan pajak yang baik memberi kepastian dan melindungi reputasi bisnis travel Anda.",
      },
    ],
  },

  "bank-garansi": {
    slug: "bank-garansi",
    metaTitle: "Jasa Pengurusan Bank Garansi untuk Perizinan Travel Umroh",
    metaDescription:
      "Pengurusan bank garansi sebagai syarat perizinan PPIU/PIHK travel ibadah. Jamnasindo membantu penerbitan jaminan dari lembaga perbankan dengan proses efisien.",
    keywords: [
      "bank garansi umroh",
      "jaminan PPIU",
      "syarat bank garansi travel",
      "pengurusan bank garansi",
    ],
    summary:
      "Bank garansi adalah jaminan finansial dari bank yang menjadi salah satu syarat perizinan travel ibadah. Jamnasindo membantu pengurusan penerbitannya secara efisien.",
    sections: [
      { type: "h2", text: "Apa Itu Bank Garansi dan Fungsinya" },
      {
        type: "p",
        text: "Bank garansi adalah jaminan tertulis dari bank bahwa travel mampu memenuhi kewajiban finansial tertentu. Dalam konteks perizinan PPIU/PIHK, jaminan ini melindungi kepentingan jamaah sekaligus menjadi bukti kesungguhan dan kapasitas finansial penyelenggara.",
      },
      { type: "h2", text: "Peran dalam Perizinan" },
      {
        type: "p",
        text: "Bank garansi termasuk syarat administratif yang sering menjadi penentu kelolosan pengajuan izin. Nilai dan jenis jaminan mengikuti ketentuan regulasi yang berlaku.",
      },
      { type: "h2", text: "Bantuan Jamnasindo" },
      {
        type: "ul",
        items: [
          "Konsultasi jenis dan nilai jaminan yang dibutuhkan.",
          "Penyiapan dokumen pengajuan ke lembaga perbankan.",
          "Pendampingan proses penerbitan hingga sertifikat jaminan terbit.",
        ],
      },
      {
        type: "tip",
        text: "Urus bank garansi sejak tahap awal perizinan agar tidak menjadi penghambat di akhir proses pengajuan izin.",
      },
    ],
    faq: [
      {
        question: "Apa fungsi bank garansi dalam perizinan travel?",
        answer:
          "Bank garansi adalah jaminan tertulis dari bank bahwa travel mampu memenuhi kewajiban finansial tertentu. Dalam perizinan PPIU/PIHK, jaminan ini melindungi jamaah sekaligus menjadi bukti kapasitas finansial penyelenggara.",
      },
      {
        question: "Berapa nilai bank garansi yang dibutuhkan?",
        answer:
          "Nilai dan jenis jaminan mengikuti ketentuan regulasi yang berlaku. Jamnasindo membantu mengonsultasikan kebutuhan dan mengurus penerbitannya ke lembaga perbankan.",
      },
    ],
  },

  "surety-bond": {
    slug: "surety-bond",
    metaTitle: "Jasa Pengurusan Surety Bond untuk Travel Umroh & Haji",
    metaDescription:
      "Pengurusan surety bond sebagai alternatif jaminan finansial untuk memenuhi kewajiban perizinan travel ibadah. Jamnasindo bantu prosesnya dengan mudah.",
    keywords: [
      "surety bond travel",
      "jaminan surety bond umroh",
      "alternatif bank garansi",
      "jaminan finansial PPIU",
    ],
    summary:
      "Surety bond adalah jaminan dari perusahaan penjamin yang dapat menjadi alternatif bank garansi untuk memenuhi kewajiban finansial travel ibadah. Jamnasindo membantu pengurusannya.",
    sections: [
      { type: "h2", text: "Mengenal Surety Bond" },
      {
        type: "p",
        text: "Surety bond adalah produk penjaminan dari perusahaan asuransi/penjamin yang menjamin pemenuhan kewajiban travel kepada pihak yang dijamin. Bagi sebagian travel, surety bond menjadi alternatif yang lebih fleksibel dibanding bank garansi.",
      },
      { type: "h2", text: "Surety Bond vs Bank Garansi" },
      {
        type: "p",
        text: "Keduanya sama-sama berfungsi sebagai jaminan finansial. Perbedaannya umumnya terletak pada penerbit, mekanisme, serta persyaratan. Pemilihan yang tepat bergantung pada kondisi dan kebutuhan perusahaan Anda — kami membantu menimbang opsi terbaik.",
      },
      { type: "h2", text: "Pendampingan Jamnasindo" },
      {
        type: "ul",
        items: [
          "Analisis kebutuhan jaminan dan pilihan penerbit yang sesuai.",
          "Penyiapan dokumen dan pengajuan ke perusahaan penjamin.",
          "Pendampingan hingga polis/sertifikat jaminan terbit.",
        ],
      },
      {
        type: "tip",
        text: "Bandingkan syarat dan biaya antara bank garansi dan surety bond sebelum memutuskan. Pilihan yang tepat bisa menghemat biaya sekaligus mempercepat proses.",
      },
    ],
    faq: [
      {
        question: "Apa beda surety bond dan bank garansi?",
        answer:
          "Keduanya sama-sama jaminan finansial. Bedanya umumnya pada penerbit (perusahaan penjamin/asuransi vs bank), mekanisme, dan persyaratan. Surety bond sering menjadi alternatif yang lebih fleksibel.",
      },
      {
        question: "Apakah surety bond bisa menggantikan bank garansi?",
        answer:
          "Dalam banyak kasus surety bond dapat menjadi alternatif jaminan, tergantung ketentuan yang berlaku dan kebutuhan perusahaan. Jamnasindo membantu menimbang opsi terbaik untuk Anda.",
      },
    ],
  },

  "website-travel": {
    slug: "website-travel",
    metaTitle: "Jasa Pembuatan Website Travel Umrah & Haji Profesional",
    metaDescription:
      "Jasa pembuatan website travel umrah & haji yang profesional, cepat, dan SEO-friendly. Tingkatkan kepercayaan calon jamaah dengan company profile online. Lihat portofolio Jamnasindo.",
    keywords: [
      "jasa pembuatan website travel umroh",
      "jasa bikin website travel haji",
      "website company profile travel",
      "jasa website umroh",
      "pembuatan website travel ibadah",
    ],
    summary:
      "Calon jamaah kini mencari travel umrah secara online sebelum memutuskan berangkat. Website yang profesional dan cepat adalah etalase digital yang menentukan apakah mereka percaya — atau pindah ke kompetitor. Jamnasindo membangun website travel umrah & haji yang meyakinkan, mudah dikelola, dan dioptimasi agar ditemukan di Google.",
    sections: [
      { type: "h2", text: "Mengapa Travel Umrah Wajib Punya Website Profesional?" },
      {
        type: "p",
        text: "Sebelum mendaftar, calon jamaah memeriksa kredibilitas travel lewat internet. Tanpa website yang meyakinkan, Anda kehilangan kepercayaan di tahap paling awal. Website resmi menampilkan legalitas (PPIU/PIHK), paket, harga transparan, dan bukti perjalanan — menjadikan travel Anda terlihat profesional dan tepercaya 24 jam sehari.",
      },
      { type: "h2", text: "Yang Anda Dapatkan" },
      {
        type: "ul",
        items: [
          "Desain modern, mobile-first, dan cepat diakses.",
          "Katalog paket umrah & haji yang rapi beserta halaman detail dan itinerary.",
          "Integrasi WhatsApp dan formulir lead yang langsung menangkap calon jamaah.",
          "Galeri perjalanan dan testimoni sebagai social proof.",
          "Struktur SEO, metadata, dan kecepatan yang ramah mesin pencari.",
          "Opsi panel admin/CMS agar tim Anda bisa memperbarui konten sendiri.",
        ],
      },
      { type: "h2", text: "Kenapa Jamnasindo?" },
      {
        type: "p",
        text: "Kami bukan sekadar pembuat website — kami memahami bisnis travel ibadah dari sisi perizinan PPIU/PIHK hingga alur jamaah. Artinya website yang kami bangun tidak hanya indah, tetapi dirancang sesuai cara calon jamaah mengambil keputusan. Kunjungi halaman Portofolio kami untuk melihat langsung enam contoh website travel yang sudah jadi dan bisa Anda jelajahi.",
      },
      { type: "h2", text: "Alur Pengerjaan" },
      {
        type: "ol",
        items: [
          "Konsultasi kebutuhan dan brief identitas brand travel Anda.",
          "Penyusunan struktur konten, desain, dan alur halaman.",
          "Pengembangan website beserta integrasi WhatsApp/formulir/paket.",
          "Revisi sesuai masukan, lalu publikasi (live) dan pelatihan pengelolaan.",
        ],
      },
      {
        type: "tip",
        text: "Website tercepat menarik lebih banyak jamaah. Kami membangun dengan teknologi modern (Next.js) sehingga skor kecepatan dan SEO tinggi sejak hari pertama.",
      },
    ],
    faq: [
      {
        question: "Berapa biaya pembuatan website travel umrah?",
        answer:
          "Biaya menyesuaikan kebutuhan fitur — mulai dari company profile sederhana hingga sistem dengan panel admin. Hubungi kami untuk konsultasi gratis dan estimasi yang transparan tanpa biaya tersembunyi.",
      },
      {
        question: "Berapa lama proses pembuatannya?",
        answer:
          "Website company profile umumnya selesai dalam hitungan beberapa pekan tergantung kelengkapan materi dan jumlah revisi. Timeline pasti kami sampaikan setelah brief awal.",
      },
      {
        question: "Apakah saya bisa memperbarui konten sendiri?",
        answer:
          "Bisa. Kami menyediakan opsi panel admin/CMS sehingga tim Anda dapat menambah paket, promo, artikel, dan menerima inquiry secara mandiri tanpa perlu teknis.",
      },
      {
        question: "Apakah sudah termasuk domain dan hosting?",
        answer:
          "Kami membantu pengadaan dan konfigurasi domain serta hosting, termasuk subdomain demo, sertifikat SSL (HTTPS), dan pengaturan agar website cepat dan aman.",
      },
    ],
  },

  "landing-page": {
    slug: "landing-page",
    metaTitle: "Jasa Pembuatan Landing Page Promosi Umrah (Fokus Konversi)",
    metaDescription:
      "Jasa pembuatan landing page promosi paket umrah & haji yang fokus konversi untuk iklan dan campaign. Desain cepat, persuasif, dan siap menangkap lead. Jamnasindo.",
    keywords: [
      "jasa landing page umroh",
      "landing page promosi travel",
      "landing page iklan umroh",
      "jasa landing page travel haji",
    ],
    summary:
      "Saat menjalankan iklan paket umrah, mengarahkan trafik ke beranda biasa akan membuang anggaran. Landing page yang fokus pada satu tujuan — mendaftar atau menghubungi — meningkatkan konversi secara signifikan. Jamnasindo membuat landing page persuasif yang dirancang untuk menangkap lead.",
    sections: [
      { type: "h2", text: "Kapan Anda Butuh Landing Page?" },
      {
        type: "p",
        text: "Landing page ideal untuk kampanye spesifik: promo umrah awal tahun, paket Ramadhan, early bird, atau iklan Meta/Google Ads. Berbeda dengan website penuh, landing page menghapus distraksi dan mengarahkan pengunjung pada satu aksi sehingga rasio konversi jauh lebih tinggi.",
      },
      { type: "h2", text: "Elemen Landing Page yang Mengonversi" },
      {
        type: "ul",
        items: [
          "Headline dan penawaran yang jelas di atas lipatan (above the fold).",
          "Bukti sosial: testimoni, jumlah jamaah, dan legalitas.",
          "Rincian paket dan harga yang transparan.",
          "Tombol aksi (CTA) WhatsApp dan formulir yang menonjol di banyak titik.",
          "Kecepatan tinggi agar pengunjung dari iklan tidak kabur.",
        ],
      },
      { type: "h2", text: "Pendekatan Jamnasindo" },
      {
        type: "p",
        text: "Kami merancang landing page berdasarkan psikologi keputusan calon jamaah dan menyiapkannya untuk pelacakan konversi (pixel/analytics) agar performa iklan Anda terukur. Lihat contoh gaya desainnya pada portofolio kami.",
      },
      {
        type: "tip",
        text: "Satu landing page = satu tujuan. Jangan campur banyak penawaran dalam satu halaman iklan — fokus selalu menang dalam hal konversi.",
      },
    ],
    faq: [
      {
        question: "Apa beda landing page dengan website biasa?",
        answer:
          "Website menampilkan keseluruhan profil travel, sedangkan landing page fokus pada satu kampanye dan satu aksi (mendaftar/menghubungi) sehingga konversinya lebih tinggi untuk keperluan iklan.",
      },
      {
        question: "Apakah cocok untuk iklan Facebook/Instagram dan Google Ads?",
        answer:
          "Sangat cocok. Kami menyiapkan landing page yang cepat dan dapat dipasang pixel/analytics agar hasil iklan Anda dapat diukur dan dioptimalkan.",
      },
      {
        question: "Berapa lama pembuatan landing page?",
        answer:
          "Landing page umumnya lebih cepat dibanding website penuh dan bisa selesai dalam hitungan hari hingga sepekan tergantung materi dan revisi.",
      },
    ],
  },

  "aplikasi-web": {
    slug: "aplikasi-web",
    metaTitle: "Jasa Pembuatan Sistem Booking, Panel Admin & Aplikasi Web Travel",
    metaDescription:
      "Jasa pembuatan aplikasi web, sistem booking paket umrah, panel admin, dan CMS untuk travel ibadah. Kelola paket, jamaah, dan inquiry secara mandiri. Jamnasindo.",
    keywords: [
      "jasa pembuatan sistem booking umroh",
      "aplikasi web travel",
      "panel admin travel umroh",
      "CMS travel ibadah",
    ],
    summary:
      "Ketika travel Anda bertumbuh, mengelola paket, jamaah, dan inquiry secara manual menjadi tidak efisien. Jamnasindo membangun aplikasi web, sistem booking, dan panel admin yang membuat operasional travel lebih cepat, rapi, dan terukur.",
    sections: [
      { type: "h2", text: "Dari Website Menjadi Sistem" },
      {
        type: "p",
        text: "Company profile menarik calon jamaah; sistem membuat Anda mengelolanya dengan efisien. Dengan panel admin, tim Anda dapat menambah/mengubah paket, mempublikasikan promo, dan menindaklanjuti inquiry secara real-time tanpa bergantung pada developer.",
      },
      { type: "h2", text: "Yang Bisa Kami Bangun" },
      {
        type: "ul",
        items: [
          "Panel admin untuk kelola paket, artikel, promo, dan FAQ.",
          "Inbox lead/inquiry yang tersimpan rapi di database.",
          "Sistem booking dan pendaftaran jamaah online.",
          "Manajemen status keberangkatan dan dokumen jamaah.",
          "Integrasi WhatsApp, pembayaran, dan notifikasi sesuai kebutuhan.",
        ],
      },
      { type: "h2", text: "Contoh Nyata" },
      {
        type: "p",
        text: "Pada portofolio kami, website Labbaik Mabrur adalah contoh full-stack: situs publik untuk calon jamaah sekaligus panel admin untuk mengelola paket, promo, dan inbox lead. Sistem serupa dapat kami sesuaikan untuk travel Anda.",
      },
      {
        type: "tip",
        text: "Mulai dari yang esensial, lalu kembangkan bertahap. Kami merancang sistem yang modular sehingga fitur dapat ditambah seiring pertumbuhan travel Anda.",
      },
    ],
    faq: [
      {
        question: "Apakah saya bisa mengelola paket dan jamaah sendiri?",
        answer:
          "Ya. Kami menyediakan panel admin yang mudah digunakan sehingga tim Anda dapat mengelola paket, promo, artikel, dan inquiry secara mandiri dan real-time.",
      },
      {
        question: "Apakah bisa terintegrasi dengan pembayaran dan WhatsApp?",
        answer:
          "Bisa. Kami dapat mengintegrasikan WhatsApp, gerbang pembayaran, dan notifikasi sesuai kebutuhan operasional travel Anda.",
      },
      {
        question: "Apakah datanya aman?",
        answer:
          "Data tersimpan di database dengan akses yang terlindungi autentikasi. Kami menerapkan praktik keamanan standar dan HTTPS pada seluruh sistem.",
      },
    ],
  },

  "seo-website": {
    slug: "seo-website",
    metaTitle: "Jasa SEO & Optimasi Website Travel Umrah agar Tampil di Google",
    metaDescription:
      "Jasa SEO dan optimasi website travel umrah & haji agar mudah ditemukan calon jamaah di Google. Optimasi teknis, konten, dan kecepatan oleh Jamnasindo.",
    keywords: [
      "jasa SEO travel umroh",
      "optimasi website umroh",
      "SEO website travel",
      "jasa SEO travel haji",
    ],
    summary:
      "Website yang bagus tidak berarti banyak jika tidak ditemukan. SEO (Search Engine Optimization) membuat travel Anda muncul saat calon jamaah mencari 'travel umrah terpercaya' di Google. Jamnasindo mengoptimasi sisi teknis, konten, dan kecepatan website Anda.",
    sections: [
      { type: "h2", text: "Mengapa SEO Penting untuk Travel Umrah?" },
      {
        type: "p",
        text: "Mayoritas calon jamaah memulai pencarian dari Google. Tampil di halaman pertama berarti aliran lead organik yang berkelanjutan tanpa terus membayar iklan. SEO adalah investasi jangka panjang yang menurunkan biaya akuisisi jamaah dari waktu ke waktu.",
      },
      { type: "h2", text: "Yang Kami Optimasi" },
      {
        type: "ul",
        items: [
          "SEO teknis: struktur, metadata, sitemap, data terstruktur (schema), dan indexability.",
          "Kecepatan dan Core Web Vitals agar ramah peringkat dan pengguna.",
          "Riset kata kunci dan optimasi konten halaman layanan & artikel.",
          "Internal linking dan struktur informasi yang sehat.",
          "Optimasi mobile dan pengalaman pengguna.",
        ],
      },
      { type: "h2", text: "Dibangun SEO-Ready Sejak Awal" },
      {
        type: "p",
        text: "Setiap website yang kami buat sudah menerapkan fondasi SEO sejak awal — metadata rapi, sitemap, schema, dan kecepatan tinggi. Untuk website yang sudah ada, kami melakukan audit dan optimasi menyeluruh.",
      },
      {
        type: "tip",
        text: "SEO adalah maraton, bukan sprint. Konsistensi konten dan kesehatan teknis yang terjaga akan memberi hasil yang menumpuk seiring waktu.",
      },
    ],
    faq: [
      {
        question: "Berapa lama SEO menunjukkan hasil?",
        answer:
          "SEO bersifat jangka menengah-panjang. Perbaikan teknis dapat berdampak relatif cepat, sedangkan peringkat kata kunci kompetitif umumnya bertumbuh dalam beberapa bulan dengan konsistensi.",
      },
      {
        question: "Apakah website lama saya bisa dioptimasi?",
        answer:
          "Bisa. Kami melakukan audit SEO menyeluruh pada website yang sudah ada lalu memperbaiki sisi teknis, konten, dan kecepatannya.",
      },
      {
        question: "Apakah hasil SEO bisa dipantau?",
        answer:
          "Ya. Kami menyiapkan pelacakan melalui Google Search Console dan analytics sehingga performa pencarian dan trafik Anda terukur dan transparan.",
      },
    ],
  },
};

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug];
}
