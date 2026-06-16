/**
 * AchaBrasil wordmark - "Til" direction (logo concept B).
 * A Brazilian tilde floats over the word as a flight contrail that
 * resolves into a plane. "acha" in ink, "brasil" in teal.
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
      className="inline-flex flex-col items-center select-none"
      style={{ gap: size * 0.04 }}
    >
      <svg
        width={size * 2.2}
        height={size * 0.5}
        viewBox="0 0 110 25"
        fill="none"
        aria-hidden
        style={{ display: "block" }}
      >
        <path
          d="M6 18 C16 4 30 4 40 12 C50 20 64 20 76 8"
          stroke="var(--teal)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.1 6"
        />
        <path d="M92 3 L72 10 L80 13.5 Z" fill="var(--coral)" />
        <path d="M92 3 L80 13.5 L83 21 Z" fill="var(--coral)" fillOpacity="0.62" />
      </svg>
      <span
        className="font-display font-extrabold leading-none"
        style={{ fontSize: size, letterSpacing: "-0.04em", color: ink }}
      >
        acha<span style={{ color: teal }}>brasil</span>
      </span>
    </span>
  );
}
