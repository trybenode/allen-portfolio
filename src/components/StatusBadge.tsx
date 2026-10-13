/** Small status pill shown next to a project name (card + detail page). */
export default function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-block shrink-0 whitespace-nowrap rounded-full bg-white/10 font-mono text-[#D7E2EA] text-[11px] uppercase tracking-wide px-3 py-1">
      {label}
    </span>
  );
}
