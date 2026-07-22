# Nevzora HR & Payroll (MVP)

Internal HR & Payroll system for Nevzora Systems. Next.js App Router + Prisma + PostgreSQL (Supabase) + Tailwind CSS + Framer Motion.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Prisma ORM** → PostgreSQL (Supabase)
- **Tailwind CSS** — dark glassmorphic UI
- **Lucide React** — icons
- **Framer Motion** — animations

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create a Supabase project** at [supabase.com](https://supabase.com) and grab your database connection string from *Project Settings → Database → Connection string (URI)*.

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in `DATABASE_URL` with your Supabase connection string.

4. **Push the Prisma schema to your database**

   ```bash
   npx prisma db push
   ```

   (Or `npx prisma migrate dev --name init` if you prefer tracked migrations.)

5. **Seed initial employee data**

   Edit `prisma/seed.ts` with real employee details (email, CNIC, joining date), then run:

   ```bash
   npm run seed
   ```

   This is safe to re-run — it upserts on `employee_id`, so existing records are updated rather than duplicated.

6. **Run the dev server**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` — it redirects to `/dashboard`.

## Project Structure

```
app/
  dashboard/        Stat cards overview
  employees/         Employee table + Add Employee modal
  payroll/           Month selector + Generate/Email payslip actions
  settings/          Static company profile
  api/
    employees/       GET (list) / POST (create)
    payroll/         GET (status per month) 
    payroll/generate/  POST — creates/updates payslips for active employees
    payroll/send/      POST — marks payslips as emailed
components/           Sidebar, StatCards, EmployeeTable, EmployeeModal, StatusBadge
lib/
  prisma.ts          Prisma client singleton
  utils.ts           Currency/date formatting, month options
prisma/
  schema.prisma      Employee + Payslip models
```

## Notes

- **Payslip generation** locks in `current_salary` as `paid_salary` at the time of generation (via upsert on `employee_id + month + year`), so future salary changes don't retroactively alter historical payslips.
- **Email sending** is currently simulated (marks `email_sent = true`, sets `sent_at`). Wire in a real provider (Resend, SendGrid, Postmark, etc.) inside `app/api/payroll/send/route.ts` when ready.
- **PDF generation** for payslips (`pdf_url` field) is not yet implemented in this MVP — the field is reserved on the `Payslip` model for when you add it (e.g., via `@react-pdf/renderer` or a headless-Chrome render step).
