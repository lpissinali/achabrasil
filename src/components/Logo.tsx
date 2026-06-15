/**
 * AchaBrasil wordmark — "acha" in ink, "brasil" in teal, with a coral
 * "runway" underline that lifts off into a plane. Adapted from the
 * approved logo-lab design direction.
 */
export default function Logo({
  size = 26,
  dark = false,
}: {
  size?: number;
  dark?: boolean;
}) {
  const ink = dark ? "#ffffff" : "var(--ink)";
  const teal = dark ? "#5fd6c7" : "var(--teal)";
  return (
    <span
      className="inline-flex items-end font-display font-extrabold leading-none select-none"
      style={{ gap: size * 0.12 }}
    >
      <span
        className="relative"
        style={{
          fontSize: size,
          letterSpacing: "-0.035em",
          color: ink,
          paddingBottom: size * 0.16,
        }}
      >
        acha<span style={{ color: teal }}>brasil</span>
        <span
          className="absolute left-0 right-0 bottom-0 rounded-full"
          style={{ height: Math.max(3, size * 0.07), background: "var(--coral)" }}
        />
      </span>
      <svg
        width={size * 0.92}
        height={size * 0.92}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
        style={{ marginBottom: -size * 0.02 }}
      >
        <path
          d="M2 34 C10 33 16 28 22 18"
          stroke="var(--coral)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="0.1 5.5"
        />
        <path d="M34 6 L18 15 L24 18 Z" fill="var(--coral)" />
        <path d="M34 6 L24 18 L27 26 Z" fill="var(--coral)" opacity="0.75" />
      </svg>
    </span>
  );
}
