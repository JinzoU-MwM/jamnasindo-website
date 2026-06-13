import { NextRequest, NextResponse } from "next/server";
import { insertContact } from "@/lib/db";
import { sendContactEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, services, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Nama, email, dan nomor telepon wajib diisi." },
        { status: 400 },
      );
    }

    if (!services || !Array.isArray(services) || services.length === 0) {
      return NextResponse.json(
        { error: "Pilih minimal satu layanan." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 },
      );
    }

    const contact = insertContact({
      name,
      email,
      phone,
      services,
      message: message || "",
    });

    // Kirim notifikasi email ke admin (jangan gagalkan request kalau email error —
    // lead sudah tersimpan di database/panel admin).
    try {
      const result = await sendContactEmail({
        name,
        email,
        phone,
        services,
        message: message || "",
      });
      if (!result.sent) {
        console.warn("Contact email not sent:", result.reason);
      }
    } catch (mailErr) {
      console.error("Contact email failed:", mailErr);
    }

    return NextResponse.json(
      { message: "Pesan berhasil dikirim!", data: contact },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
