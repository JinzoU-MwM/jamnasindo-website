import { NextRequest, NextResponse } from "next/server";
import { insertContact } from "@/lib/db";

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
