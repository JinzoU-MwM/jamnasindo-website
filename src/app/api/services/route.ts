import { NextResponse } from "next/server";
import { getServices } from "@/lib/db";

export async function GET() {
  try {
    const services = getServices();
    return NextResponse.json({ data: services });
  } catch (error) {
    console.error("Services API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
