import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(employees);
  } catch (error) {
    console.error("GET /api/employees error:", error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const required = [
      "employee_id",
      "name",
      "email",
      "cnic",
      "designation",
      "joining_date",
      "current_salary",
    ];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const employee = await prisma.employee.create({
      data: {
        employee_id: body.employee_id,
        name: body.name,
        email: body.email,
        cnic: body.cnic,
        designation: body.designation,
        joining_date: new Date(body.joining_date),
        current_salary: parseFloat(body.current_salary),
        status: body.status === "Inactive" ? "Inactive" : "Active",
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/employees error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "An employee with this Employee ID already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}
