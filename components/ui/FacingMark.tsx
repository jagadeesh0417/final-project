import { bearing, facing as facingName } from "../../lib/format";
import type { Facing } from "../../lib/types";

/**
 * Orientation matters enough in Indian property listings to earn its own mark,
 * so every card carries a small compass rather than a text label.
 */
export default function FacingMark({ value, size = 34 }: { value: Facing; size?: number }) {
  const deg = bearing(value);
  return (
    <span
      className="inline-flex items-center gap-2"
      title={`${facingName(value)} facing`}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden className="shrink-0">
        <circle cx="20" cy="20" r="15.5" fill="none" stroke="currentColor" strokeOpacity="0.28" />
        {[0, 90, 180, 270].map((a) => (
          <line
            key={a}
            x1="20"
            y1="4"
            x2="20"
            y2="8"
            stroke="currentColor"
            strokeOpacity="0.38"
            transform={`rotate(${a} 20 20)`}
          />
        ))}
        <g transform={`rotate(${deg} 20 20)`}>
          <path d="M20 7 L23.4 21 L20 18.4 L16.6 21 Z" fill="#f0b23f" />
        </g>
        <circle cx="20" cy="20" r="1.4" fill="currentColor" fillOpacity="0.5" />
      </svg>
      <span className="data">{value}</span>
    </span>
  );
}
