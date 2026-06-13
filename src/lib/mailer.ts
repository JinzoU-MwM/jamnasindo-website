import nodemailer, { type Transporter } from "nodemailer";

// Konfigurasi SMTP via env (.env.local di server). Tidak pernah di-commit.
const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 465);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const to = process.env.CONTACT_TO || user;

export function isMailerConfigured(): boolean {
  return Boolean(host && user && pass);
}

let transporter: Transporter | null = null;
function getTransport(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = SSL, 587 = STARTTLS
      auth: { user, pass },
    });
  }
  return transporter;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  services: string[];
  message: string;
}

export async function sendContactEmail(
  c: ContactPayload,
): Promise<{ sent: boolean; reason?: string }> {
  if (!isMailerConfigured()) {
    return { sent: false, reason: "SMTP belum dikonfigurasi" };
  }

  const services = c.services.join(", ") || "-";
  const subject = `Konsultasi Baru dari Website — ${c.name}`;

  const text = [
    "Permintaan konsultasi baru dari website jamnas.id:",
    "",
    `Nama     : ${c.name}`,
    `Email    : ${c.email}`,
    `Telepon  : ${c.phone}`,
    `Layanan  : ${services}`,
    "",
    "Pesan:",
    c.message || "(tidak ada pesan)",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
      <div style="background:#0d7334;padding:18px 24px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0;font-size:18px">Konsultasi Baru — Website Jamnasindo</h2>
      </div>
      <div style="border:1px solid #e5e5e5;border-top:0;border-radius:0 0 12px 12px;padding:24px">
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#222">
          <tr><td style="padding:6px 0;color:#888;width:110px">Nama</td><td style="padding:6px 0;font-weight:600">${c.name}</td></tr>
          <tr><td style="padding:6px 0;color:#888">Email</td><td style="padding:6px 0"><a href="mailto:${c.email}">${c.email}</a></td></tr>
          <tr><td style="padding:6px 0;color:#888">Telepon</td><td style="padding:6px 0"><a href="tel:${c.phone}">${c.phone}</a></td></tr>
          <tr><td style="padding:6px 0;color:#888">Layanan</td><td style="padding:6px 0">${services}</td></tr>
        </table>
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid #eee">
          <div style="color:#888;font-size:13px;margin-bottom:6px">Pesan</div>
          <div style="font-size:14px;color:#222;white-space:pre-wrap">${c.message || "(tidak ada pesan)"}</div>
        </div>
      </div>
    </div>`;

  await getTransport().sendMail({
    from: `"Jamnasindo Website" <${user}>`,
    to,
    replyTo: c.email, // balas langsung ke pengirim
    subject,
    text,
    html,
  });

  return { sent: true };
}
