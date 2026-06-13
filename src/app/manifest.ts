import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jamnasindo — Konsultan Perizinan Travel Umroh & Haji",
    short_name: "Jamnasindo",
    description:
      "Konsultan perizinan dan administrasi bisnis travel Umroh & Haji: PPIU, PIHK, IATA, akreditasi, bank garansi, dan laporan keuangan.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#0d7334",
    lang: "id",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
