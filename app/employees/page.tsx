"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import EmployeeTable, { Employee } from "@/components/EmployeeTable";
import EmployeeModal from "@/components/EmployeeModal";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/employees", { cache: "no-store" });
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to load employees", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Employees</h1>
          <p className="text-sm text-white/40">
            {employees.length} total employee{employees.length !== 1 && "s"}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-all hover:bg-cyan-400/20 hover:shadow-neon"
        >
          <Plus className="h-4 w-4" />
          Add Employee
        </button>
      </div>

      <EmployeeTable employees={employees} loading={loading} />

      <EmployeeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={fetchEmployees}
      />
    </div>
  );
}
