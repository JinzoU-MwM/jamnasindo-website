import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/articles";

export const runtime = "nodejs";
export const alt = "Artikel Jamnasindo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontRegular = readFileSync(
  join(process.cwd(), "public/fonts/Inter-Regular.ttf"),
);
const fontBold = readFileSync(
  join(process.cwd(), "public/fonts/Inter-Bold.ttf"),
);

export default function Image({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  const title = article?.title ?? "Artikel — Jamnasindo";
  const category = article?.category ?? "Artikel";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0f0a",
          padding: "72px",
          fontFamily: "Inter",
        }}
      >
        {/* Top: brand + category */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: "#a3e635",
                alignItems: "center",
                justifyContent: "center",
                color: "#0a0f0a",
                fontSize: "32px",
                fontWeight: 700,
                marginRight: "18px",
              }}
            >
              J
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "32px",
                color: "#ffffff",
                fontWeight: 700,
              }}
            >
              Jamnasindo
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#a3e635",
              border: "1px solid rgba(163,230,53,0.45)",
              borderRadius: "999px",
              padding: "10px 26px",
            }}
          >
            {category}
          </div>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: "90px",
              height: "6px",
              backgroundColor: "#a3e635",
              marginBottom: "30px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "54px",
              lineHeight: 1.15,
              color: "#ffffff",
              fontWeight: 700,
              maxWidth: "1010px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: "28px", color: "#d4d4d8" }}>
            jamnas.id
          </div>
          <div style={{ display: "flex", fontSize: "23px", color: "#6b7280" }}>
            Konsultan &amp; Pembuatan Website Travel Umrah
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: fontRegular, weight: 400, style: "normal" },
        { name: "Inter", data: fontBold, weight: 700, style: "normal" },
      ],
    },
  );
}
