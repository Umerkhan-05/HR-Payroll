"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type EmployeeModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

const emptyForm = {
  employee_id: "",
  name: "",
  email: "",
  cnic: "",
  designation: "",
  joining_date: "",
  current_salary: "",
  status: "Active",
};

export default function EmployeeModal({
  open,
  onClose,
  onCreated,
}: EmployeeModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(field: keyof typeof emptyForm, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add employee");
      }

      setForm(emptyForm);
      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl border border-white/10 bg-[#0a0a1f]/95 p-5 backdrop-blur-xl shadow-neon"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Add Employee</h2>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-white/40 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Employee ID"
                  value={form.employee_id}
                  onChange={(v) => update("employee_id", v)}
                  placeholder="NS-EMP-001"
                  required
                />
                <Field
                  label="Status"
                  select
                  value={form.status}
                  onChange={(v) => update("status", v)}
                  options={["Active", "Inactive"]}
                />
              </div>

              <Field
                label="Full Name"
                value={form.name}
                onChange={(v) => update("name", v)}
                placeholder="Jane Doe"
                required
              />

              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                placeholder="jane@nevzora.com"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="CNIC"
                  value={form.cnic}
                  onChange={(v) => update("cnic", v)}
                  placeholder="XXXXX-XXXXXXX-X"
                  required
                />
                <Field
                  label="Designation"
                  value={form.designation}
                  onChange={(v) => update("designation", v)}
                  placeholder="Support Rep."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Joining Date"
                  type="date"
                  value={form.joining_date}
                  onChange={(v) => update("joining_date", v)}
                  required
                />
                <Field
                  label="Current Salary"
                  type="number"
                  value={form.current_salary}
                  onChange={(v) => update("current_salary", v)}
                  placeholder="60000"
                  required
                />
              </div>

              {error && (
                <p className="rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full rounded-lg border border-cyan-400/40 bg-cyan-400/10 py-2.5 text-sm font-medium text-cyan-300 transition-all hover:bg-cyan-400/20 hover:shadow-neon disabled:opacity-50"
              >
                {submitting ? "Adding…" : "Add Employee"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  select,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  select?: boolean;
  options?: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-white/50">
        {label}
      </span>
      {select ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
        >
          {options?.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0a0a1f]">
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-cyan-400/50"
        />
      )}
    </label>
  );
}
