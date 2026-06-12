import { NextRequest, NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/db";

export async function GET() {
  try {
    const settings = getSettings();
    return NextResponse.json({ data: settings });
  } catch (error) {
    console.error("Settings API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    updateSettings(body);
    return NextResponse.json({ message: "Pengaturan berhasil disimpan." });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
