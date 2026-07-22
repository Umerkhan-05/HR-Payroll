const INFO = [
  { label: "Company Name", value: "Nevzora Systems" },
  { label: "Address", value: "B-17, Block B, PRECHS, Gulshan-e-Iqbal, Karachi" },
  { label: "Phone", value: "+92-3118110822" },
  { label: "Email", value: "sales@nevzora.com" },
  { label: "Website", value: "www.nevzora.com" },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Settings</h1>
        <p className="text-sm text-white/40">Company profile used across the system</p>
      </div>

      <div className="max-w-lg rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
        <dl className="divide-y divide-white/5">
          {INFO.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-3 text-sm">
              <dt className="text-white/40">{row.label}</dt>
              <dd className="text-white/90">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
