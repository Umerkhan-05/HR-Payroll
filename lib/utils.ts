export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Generates a rolling list of {month, year} options centered on the current month
export function getMonthOptions(range = 6) {
  const now = new Date();
  const options: { label: string; month: string; year: number }[] = [];
  for (let i = -range; i <= range; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const month = MONTHS[d.getMonth()];
    const year = d.getFullYear();
    options.push({ label: `${month} ${year}`, month, year });
  }
  return options;
}
