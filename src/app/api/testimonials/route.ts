import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/db";

export async function GET() {
  try {
    const testimonials = getTestimonials();
    return NextResponse.json({ data: testimonials });
  } catch (error) {
    console.error("Testimonials API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}
