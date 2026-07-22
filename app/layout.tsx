import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Nevzora HR & Payroll",
  description: "Internal HR & Payroll system for Nevzora Systems",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Sidebar />
        <main className="ml-60 min-h-screen px-8 py-8">{children}</main>
      </body>
    </html>
  );
}
