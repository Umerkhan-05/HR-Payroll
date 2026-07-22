import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { month, year } = await request.json();

    if (!month || !year) {
      return NextResponse.json(
        { error: "month and year are required" },
        { status: 400 }
      );
    }

    const activeEmployees = await prisma.employee.findMany({
      where: { status: "Active" },
    });

    const payslips = await Promise.all(
      activeEmployees.map((emp) =>
        prisma.payslip.upsert({
          where: {
            employee_id_month_year: {
              employee_id: emp.id,
              month,
              year,
            },
          },
          update: {
            paid_salary: emp.current_salary,
          },
          create: {
            employee_id: emp.id,
            month,
            year,
            paid_salary: emp.current_salary,
          },
        })
      )
    );

    return NextResponse.json({ generated: payslips.length });
  } catch (error) {
    console.error("POST /api/payroll/generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate payslips" },
      { status: 500 }
    );
  }
}
