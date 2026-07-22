import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (!month || !year) {
      return NextResponse.json(
        { error: "month and year query params are required" },
        { status: 400 }
      );
    }

    const employees = await prisma.employee.findMany({
      where: { status: "Active" },
      orderBy: { name: "asc" },
      include: {
        payslips: {
          where: { month, year: parseInt(year) },
        },
      },
    });

    return NextResponse.json(employees);
  } catch (error) {
    console.error("GET /api/payroll error:", error);
    return NextResponse.json(
      { error: "Failed to fetch payroll status" },
      { status: 500 }
    );
  }
}
