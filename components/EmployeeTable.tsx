"use client";

import StatusBadge from "@/components/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

export type Employee = {
  id: string;
  employee_id: string;
  name: string;
  email: string;
  cnic: string;
  designation: string;
  joining_date: string;
  current_salary: number;
  status: string;
};

export default function EmployeeTable({
  employees,
  loading,
}: {
  employees: Employee[];
  loading: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-white/40">
              <th className="px-4 py-3 font-medium">Employee ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Designation</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium text-right">Salary</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-white/40">
                  Loading employees…
                </td>
              </tr>
            )}

            {!loading && employees.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-white/40">
                  No employees yet. Add your first employee to get started.
                </td>
              </tr>
            )}

            {!loading &&
              employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-white/5 transition-colors hover:bg-white/5"
                >
                  <td className="px-4 py-3 font-mono text-xs text-cyan-300/80">
                    {emp.employee_id}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{emp.name}</td>
                  <td className="px-4 py-3 text-white/70">{emp.designation}</td>
                  <td className="px-4 py-3 text-white/50">{emp.email}</td>
                  <td className="px-4 py-3 text-white/50">
                    {formatDate(emp.joining_date)}
                  </td>
                  <td className="px-4 py-3 text-right text-white/80">
                    {formatCurrency(emp.current_salary)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={emp.status} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
