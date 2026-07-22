import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// NOTE: This simulates sending payslip emails by marking records as sent.
// Wire up an actual email provider (Resend, SendGrid, etc.) here when ready.
export async function POST(request: Request) {
  try {
    const { month, year } = await request.json();

    if (!month || !year) {
      return NextResponse.json(
        { error: "month and year are required" },
        { status: 400 }
      );
    }

    const result = await prisma.payslip.updateMany({
      where: { month, year, email_sent: false },
      data: { email_sent: true, sent_at: new Date() },
    });

    return NextResponse.json({ sent: result.count });
  } catch (error) {
    console.error("POST /api/payroll/send error:", error);
    return NextResponse.json(
      { error: "Failed to send payslip emails" },
      { status: 500 }
    );
  }
}
