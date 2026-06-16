/** Diagonal-striped image placeholder used in "Ofertas do dia" cards. */
const TONES: Record<string, [string, string, string]> = {
  teal: ["#d7efe9", "#c4e7df", "#0a6f66"],
  coral: ["#ffe2db", "#ffd2c6", "#b5432f"],
  sun: ["#fff0c9", "#ffe6a8", "#8a6a14"],
  ink: ["#cdd6d3", "#bcc8c4", "#3a4744"],
};

export default function Placeholder({
  label,
  height = 172,
  tone = "teal",
}: {
  label: string;
  height?: number;
  tone?: keyof typeof TONES;
}) {
  const t = TONES[tone] ?? TONES.teal;
  return (
    <div
      className="relative flex items-start overflow-hidden"
      style={{
        height,
        background: `repeating-linear-gradient(135deg, ${t[0]} 0 10px, ${t[1]} 10px 20px)`,
      }}
    >
      <span
        className="m-2 rounded-md px-1.5 py-1 font-mono text-[10px] uppercase tracking-wider"
        style={{ color: t[2], background: "rgba(255,255,255,0.72)" }}
      >
        {label}
      </span>
    </div>
  );
}
