// Konten SEO panjang per layanan, di-render di /layanan/[slug].
// Slug = id pada serviceCategories (src/lib/data.ts).
// Memakai model section yang sama dengan artikel agar renderer konsisten.
import type { ArticleSection } from "./articles";

export interface ServiceDetail {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  summary: string; // paragraf pembuka (lead)
  sections: ArticleSection[];
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
  },
};

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug];
}
