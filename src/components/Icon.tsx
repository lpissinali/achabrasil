/** Compact line-icon set used across the site (from the Voa design kit). */
type Props = {
  name: string;
  size?: number;
  stroke?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

const PATHS: Record<string, React.ReactNode> = {
  planeUp: <path d="M12 19V5m0 0-5 5m5-5 5 5" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </>
  ),
  swap: <path d="M7 4 4 7l3 3M4 7h13M17 20l3-3-3-3M20 17H7" />,
  cal: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  bell: <path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7 2.5 7H3.5S6 15 6 9ZM10 20a2 2 0 0 0 4 0" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12 5 5 9-11" />,
  chevD: <path d="m6 9 6 6 6-6" />,
  chevR: <path d="m9 6 6 6-6 6" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7Z" />,
  heart: <path d="M12 20s-7-4.6-9.2-9C1.3 7.8 3 5 6 5c2 0 3.2 1.3 4 2.5C10.8 6.3 12 5 14 5c3 0 4.7 2.8 3.2 6-2.2 4.4-9.2 9-9.2 9Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
    </>
  ),
  sparkle: <path d="M12 3v6m0 6v6m-4.5-13.5L9 9m6 6 1.5 1.5M3 12h6m6 0h6M7.5 16.5 9 15m6-6 1.5-1.5" />,
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  bed: <path d="M3 7v10M3 12h18v5M21 12v-1a3 3 0 0 0-3-3h-6v4M7 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />,
};

export default function Icon({
  name,
  size = 20,
  stroke = 2,
  color = "currentColor",
  className,
  style,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
    >
      {PATHS[name] ?? null}
    </svg>
  );
}
