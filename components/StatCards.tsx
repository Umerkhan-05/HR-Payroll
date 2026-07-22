"use client";

import { motion } from "framer-motion";
import { Users, Wallet, Send, UserCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type StatCardsProps = {
  totalEmployees: number;
  monthlyPayroll: number;
  payslipsSent: number;
  activeEmployees: number;
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function StatCards({
  totalEmployees,
  monthlyPayroll,
  payslipsSent,
  activeEmployees,
}: StatCardsProps) {
  const cards = [
    {
      label: "Total Employees",
      value: totalEmployees.toString(),
      icon: Users,
    },
    {
      label: "This Month Payroll",
      value: formatCurrency(monthlyPayroll),
      icon: Wallet,
    },
    {
      label: "Payslips Sent",
      value: payslipsSent.toString(),
      icon: Send,
    },
    {
      label: "Active Employees",
      value: activeEmployees.toString(),
      icon: UserCheck,
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {cards.map(({ label, value, icon: Icon }) => (
        <motion.div
          key={label}
          variants={item}
          className="group rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-200 hover:border-cyan-400/40 hover:shadow-neon"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-white/40">
              {label}
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5 border border-white/10 text-cyan-400 transition-colors group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30">
              <Icon className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
