import { NextRequest, NextResponse } from "next/server";
import {
  getContacts,
  updateContactStatus,
  deleteContact,
} from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const result = getContacts(page, limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Admin contacts API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID dan status wajib diisi." },
        { status: 400 },
      );
    }

    updateContactStatus(id, status);
    return NextResponse.json({ message: "Status berhasil diperbarui." });
  } catch (error) {
    console.error("Admin contacts PATCH error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID wajib diisi." },
        { status: 400 },
      );
    }

    deleteContact(parseInt(id, 10));
    return NextResponse.json({ message: "Kontak berhasil dihapus." });
  } catch (error) {
    console.error("Admin contacts DELETE error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
