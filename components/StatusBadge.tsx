export default function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        isActive
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
          : "border-red-400/30 bg-red-400/10 text-red-400",
      ].join(" ")}
    >
      <span
        className={[
          "h-1.5 w-1.5 rounded-full",
          isActive ? "bg-emerald-400" : "bg-red-400",
        ].join(" ")}
      />
      {status}
    </span>
  );
}
