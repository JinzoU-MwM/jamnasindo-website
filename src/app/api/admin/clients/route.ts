import { NextRequest, NextResponse } from "next/server";
import {
  getClients,
  insertClient,
  updateClient,
  deleteClient,
} from "@/lib/db";

// Route baca query param (searchParams) → dinamis, jangan dirender statis.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";

    const result = getClients(page, limit, search);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Clients API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, pic, phone, active_services, status } = body;

    if (!name || !pic || !phone) {
      return NextResponse.json(
        { error: "Nama travel, penanggung jawab, dan telepon wajib diisi." },
        { status: 400 },
      );
    }

    const client = insertClient({ name, pic, phone, active_services, status });
    return NextResponse.json({ data: client }, { status: 201 });
  } catch (error) {
    console.error("Clients POST error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID wajib diisi." },
        { status: 400 },
      );
    }

    updateClient(id, data);
    return NextResponse.json({ message: "Data klien berhasil diperbarui." });
  } catch (error) {
    console.error("Clients PATCH error:", error);
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

    deleteClient(parseInt(id, 10));
    return NextResponse.json({ message: "Klien berhasil dihapus." });
  } catch (error) {
    console.error("Clients DELETE error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
