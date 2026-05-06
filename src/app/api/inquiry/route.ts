import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentName, parentName, email, phone, grade, message } = body;

    if (!studentName || !parentName || !email || !phone || !grade) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!db) {
      return NextResponse.json({
        success: true,
        message: "DEMO MODE: Your inquiry has been recorded (mock). Our admissions office will contact you within 24 hours.",
        data: { id: Date.now(), studentName, parentName, email, phone, grade, message, createdAt: new Date() },
      });
    }

    const inserted = await db.insert(inquiries).values({
      studentName,
      parentName,
      email,
      phone,
      grade,
      message: message || "",
    }).returning();

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been successfully submitted! Our admissions office will contact you within 24 hours.",
      data: inserted[0],
    });
  } catch (error: any) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ success: true, data: [] });
    }
    const list = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(10);
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    console.error("Fetch inquiries error:", error);
    return NextResponse.json(
      { error: "Could not fetch inquiries" },
      { status: 500 }
    );
  }
}
