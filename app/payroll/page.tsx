"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FileText, Send, Loader2 } from "lucide-react";
import { formatCurrency, getMonthOptions } from "@/lib/utils";

type PayslipRecord = {
  id: string;
  paid_salary: number;
  email_sent: boolean;
  sent_at: string | null;
};

type EmployeeWithPayslip = {
  id: string;
  name: string;
  designation: string;
  current_salary: number;
  payslips: PayslipRecord[];
};

const monthOptions = getMonthOptions(6);

export default function PayrollPage() {
  const [selected, setSelected] = useState(
    monthOptions.find((m) => m.label === monthOptions[6]?.label) ??
      monthOptions[0]
  );
  const [employees, setEmployees] = useState<EmployeeWithPayslip[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/payroll?month=${selected.month}&year=${selected.year}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to load payroll status", err);
    } finally {
      setLoading(false);
    }
  }, [selected]);

  useEffect(() => {
    fetchStatus();
    setMessage(null);
  }, [fetchStatus]);

  async function handleGenerate() {
    setGenerating(true);
    setMessage(null);
    try {
      const res = await fetch("/api/payroll/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month: selected.month, year: selected.year }),
      });
      const data = await res.json();
      setMessage(`✓ Generated ${data.generated} payslip(s) for ${selected.label}`);
      fetchStatus();
    } catch (err) {
      setMessage("Failed to generate payslips");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSend() {
    setSending(true);
    setMessage(null);
    try {
      const res = await fetch("/api/payroll/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month: selected.month, year: selected.year }),
      });
      const data = await res.json();
      setMessage(`✓ Emailed ${data.sent} payslip(s) for ${selected.label}`);
      fetchStatus();
    } catch (err) {
      setMessage("Failed to send payslip emails");
    } finally {
      setSending(false);
    }
  }

  const generatedCount = employees.filter((e) => e.payslips.length > 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Payroll Automation</h1>
        <p className="text-sm text-white/40">
          Generate and email payslips for active employees
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <label className="text-xs font-medium text-white/50">
          Select Month
        </label>
        <select
          value={selected.label}
          onChange={(e) =>
            setSelected(
              monthOptions.find((m) => m.label === e.target.value)!
            )
          }
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
        >
          {monthOptions.map((m) => (
            <option key={m.label} value={m.label} className="bg-[#0a0a1f]">
              {m.label}
            </option>
          ))}
        </select>

        <div className="ml-auto flex gap-3">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-all hover:bg-cyan-400/20 hover:shadow-neon disabled:opacity-50"
          >
            {generating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            Generate Payslips
          </button>

          <button
            onClick={handleSend}
            disabled={sending || generatedCount === 0}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:border-cyan-400/40 hover:text-cyan-300 disabled:opacity-40"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Email Everyone
          </button>
        </div>
      </div>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-cyan-300"
        >
          {message}
        </motion.p>
      )}

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-white/40">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Designation</th>
              <th className="px-4 py-3 font-medium text-right">Salary</th>
              <th className="px-4 py-3 font-medium">Payslip Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-white/40">
                  Loading…
                </td>
              </tr>
            )}

            {!loading && employees.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-white/40">
                  No active employees found.
                </td>
              </tr>
            )}

            {!loading &&
              employees.map((emp) => {
                const slip = emp.payslips[0];
                return (
                  <tr
                    key={emp.id}
                    className="border-b border-white/5 transition-colors hover:bg-white/5"
                  >
                    <td className="px-4 py-3 font-medium text-white">
                      {emp.name}
                    </td>
                    <td className="px-4 py-3 text-white/70">
                      {emp.designation}
                    </td>
                    <td className="px-4 py-3 text-right text-white/80">
                      {formatCurrency(emp.current_salary)}
                    </td>
                    <td className="px-4 py-3">
                      {!slip && (
                        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-white/50">
                          Pending
                        </span>
                      )}
                      {slip && !slip.email_sent && (
                        <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-xs text-cyan-300">
                          Generated
                        </span>
                      )}
                      {slip && slip.email_sent && (
                        <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs text-emerald-400">
                          Sent
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
