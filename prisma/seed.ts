import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedEmployee = {
  employee_id: string;
  name: string;
  email: string;
  cnic: string;
  designation: string;
  joining_date: string; // YYYY-MM-DD
  current_salary: number;
  status?: "Active" | "Inactive";
};

// ---------------------------------------------------------------------------
// EDIT THIS LIST with real employee details, then run:  npm run seed
// Fields marked TODO are placeholders — replace with real values before
// running against production. Re-running this script is safe: it upserts
// on employee_id, so existing records get updated rather than duplicated.
// ---------------------------------------------------------------------------
const employees: SeedEmployee[] = [
  {
    employee_id: "NS-EMP-001",
    name: "Mirza Mahad Baig",
    email: "TODO@nevzora.com",
    cnic: "TODO-0000000-0",
    designation: "Customer Support Representative",
    joining_date: "2026-05-20",
    current_salary: 50000,
  },
  {
    employee_id: "NS-EMP-002",
    name: "Syed Muhammad Fawwad",
    email: "TODO@nevzora.com",
    cnic: "TODO-0000000-0",
    designation: "Customer Support Representative",
    joining_date: "TODO", // e.g. "2026-06-01"
    current_salary: 60000,
  },
  {
    employee_id: "NS-EMP-003",
    name: "Muhammad Hadees",
    email: "TODO@nevzora.com",
    cnic: "TODO-0000000-0",
    designation: "Customer Support Representative",
    joining_date: "TODO",
    current_salary: 70000,
  },
  {
    employee_id: "NS-EMP-004",
    name: "Muhammad Kaif",
    email: "TODO@nevzora.com",
    cnic: "TODO-0000000-0",
    designation: "Customer Support Representative",
    joining_date: "TODO",
    current_salary: 60000,
  },
  {
    employee_id: "NS-EMP-005",
    name: "Asad Ali",
    email: "TODO@nevzora.com",
    cnic: "TODO-0000000-0",
    designation: "Customer Support Representative",
    joining_date: "TODO",
    current_salary: 55000,
  },
  {
    employee_id: "NS-EMP-006",
    name: "Osama",
    email: "TODO@nevzora.com",
    cnic: "TODO-0000000-0",
    designation: "Customer Support Representative",
    joining_date: "TODO",
    current_salary: 60000,
  },
  {
    employee_id: "NS-EMP-007",
    name: "Shaheeer",
    email: "TODO@nevzora.com",
    cnic: "TODO-0000000-0",
    designation: "Customer Support Representative",
    joining_date: "TODO",
    current_salary: 50000,
  },
  {
    employee_id: "NS-EMP-008",
    name: "Shahvaiz",
    email: "TODO@nevzora.com",
    cnic: "TODO-0000000-0",
    designation: "Customer Support Representative",
    joining_date: "TODO",
    current_salary: 50000,
  },
  {
    employee_id: "NS-EMP-009",
    name: "Ali Ahmed Khan",
    email: "TODO@nevzora.com",
    cnic: "TODO-0000000-0",
    designation: "Customer Support Representative",
    joining_date: "TODO",
    current_salary: 50000,
  },
];

async function main() {
  for (const emp of employees) {
    if (emp.email.startsWith("TODO") || emp.joining_date === "TODO") {
      console.warn(
        `⚠️  Skipped ${emp.name} (${emp.employee_id}) — placeholder fields still need to be filled in.`
      );
      continue;
    }

    const record = await prisma.employee.upsert({
      where: { employee_id: emp.employee_id },
      update: {
        name: emp.name,
        email: emp.email,
        cnic: emp.cnic,
        designation: emp.designation,
        joining_date: new Date(emp.joining_date),
        current_salary: emp.current_salary,
        status: emp.status ?? "Active",
      },
      create: {
        employee_id: emp.employee_id,
        name: emp.name,
        email: emp.email,
        cnic: emp.cnic,
        designation: emp.designation,
        joining_date: new Date(emp.joining_date),
        current_salary: emp.current_salary,
        status: emp.status ?? "Active",
      },
    });
    console.log(`✓ Upserted ${record.name} (${record.employee_id})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
