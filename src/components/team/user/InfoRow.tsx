export default function InfoRow({ label, value, textColor = "text-white/90" }: { label: string; value: string; textColor?: string; }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-1 sm:gap-4">
      <span className="text-xs font-medium text-white/40 uppercase tracking-wider sm:normal-case sm:text-sm sm:text-white/60">
        {label}
      </span>
      <span className={`${textColor} truncate text-sm`}>
        {value}
      </span>
    </div>
  );
}