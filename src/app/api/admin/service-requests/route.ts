import { NextRequest, NextResponse } from "next/server";
import { getServiceRequests } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";

    const result = getServiceRequests(page, limit, search);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Service requests API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
