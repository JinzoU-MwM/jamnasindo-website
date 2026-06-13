// FAQ untuk homepage — dirender visibel + di-inject sebagai FAQPage JSON-LD
// agar berpeluang muncul sebagai rich result di Google.
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Apa itu izin PPIU dan apakah wajib untuk travel umroh?",
    answer:
      "PPIU (Penyelenggara Perjalanan Ibadah Umrah) adalah izin resmi dari Kementerian Agama yang wajib dimiliki setiap perusahaan yang ingin memberangkatkan jamaah umroh. Tanpa izin PPIU, kegiatan memberangkatkan jamaah tergolong ilegal dan dapat dikenai sanksi. Jamnasindo membantu pengurusan izin PPIU dari awal hingga terbit.",
  },
  {
    question: "Apa perbedaan PPIU dan PIHK?",
    answer:
      "PPIU adalah izin untuk menyelenggarakan perjalanan ibadah umroh, sedangkan PIHK (Penyelenggara Ibadah Haji Khusus) adalah izin untuk menyelenggarakan ibadah haji khusus (ONH Plus). Umumnya sebuah travel mengurus PPIU terlebih dahulu, lalu meningkat ke PIHK setelah memenuhi syarat pengalaman dan akreditasi.",
  },
  {
    question: "Berapa lama proses pengurusan izin PPIU?",
    answer:
      "Lama proses bergantung pada kelengkapan dokumen dan antrean verifikasi di Kementerian Agama. Dengan pendampingan yang tepat agar berkas lengkap dan sesuai sejak awal, proses dapat berjalan jauh lebih cepat tanpa bolak-balik revisi. Tim Jamnasindo membantu menyiapkan seluruh persyaratan agar pengajuan lancar.",
  },
  {
    question: "Apa saja syarat utama mendirikan travel umroh?",
    answer:
      "Secara garis besar dibutuhkan badan hukum PT yang dimiliki WNI beragama Islam, perizinan berusaha biro perjalanan wisata melalui OSS dengan KBLI yang sesuai, kantor pelayanan yang jelas, serta jaminan dalam bentuk bank garansi. Jamnasindo membantu menyiapkan semua aspek legalitas dan administrasinya.",
  },
  {
    question: "Apa itu bank garansi dan surety bond untuk travel umroh?",
    answer:
      "Bank garansi dan surety bond adalah jaminan finansial yang menjadi salah satu syarat perizinan PPIU/PIHK. Jaminan ini melindungi jamaah dan menjadi bukti kesungguhan serta kemampuan finansial penyelenggara. Jamnasindo membantu pengurusan penerbitan jaminan ini ke lembaga penjamin.",
  },
  {
    question: "Apakah Jamnasindo bisa mengurus perizinan dari nol?",
    answer:
      "Bisa. Jamnasindo mendampingi mulai dari pendirian badan hukum PT, perizinan OSS, pengurusan izin PPIU dan PIHK, akreditasi, keanggotaan IATA, hingga penerbitan bank garansi dan penyusunan laporan keuangan. Anda cukup fokus mengembangkan bisnis, urusan legalitas kami tangani.",
  },
  {
    question: "Di mana lokasi kantor Jamnasindo?",
    answer:
      "Kantor Jamnasindo berada di Jl. Condet Raya No. 103E, Kramat Jati, Jakarta Timur, DKI Jakarta. Anda juga dapat menghubungi kami melalui telepon/WhatsApp di +62 812-1397-2604 untuk konsultasi awal tanpa biaya.",
  },
];
