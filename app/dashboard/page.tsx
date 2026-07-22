import { prisma } from "@/lib/prisma";
import StatCards from "@/components/StatCards";
import { MONTHS } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getStats() {
  const now = new Date();
  const currentMonth = MONTHS[now.getMonth()];
  const currentYear = now.getFullYear();

  const [totalEmployees, activeEmployees, payslipsSent, payrollAgg] =
    await Promise.all([
      prisma.employee.count(),
      prisma.employee.count({ where: { status: "Active" } }),
      prisma.payslip.count({ where: { email_sent: true } }),
      prisma.payslip.aggregate({
        _sum: { paid_salary: true },
        where: { month: currentMonth, year: currentYear },
      }),
    ]);

  return {
    totalEmployees,
    activeEmployees,
    payslipsSent,
    monthlyPayroll: payrollAgg._sum.paid_salary ?? 0,
    currentMonth,
    currentYear,
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-white/40">
          Overview for {stats.currentMonth} {stats.currentYear}
        </p>
      </div>

      <StatCards
        totalEmployees={stats.totalEmployees}
        monthlyPayroll={stats.monthlyPayroll}
        payslipsSent={stats.payslipsSent}
        activeEmployees={stats.activeEmployees}
      />
    </div>
  );
}
