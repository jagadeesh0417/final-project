import { bearing, facing as facingName } from "../../lib/format";
import type { Property } from "../../lib/types";

/**
 * A north-oriented site diagram instead of an embedded map — no API key, and
 * it shows the thing that actually matters here: which way the plot faces.
 */
export default function SitePlan({ p }: { p: Property }) {
  const deg = bearing(p.facing);
  const maps = `https://www.google.com/maps/search/?api=1&query=${p.address.lat},${p.address.lng}`;

  return (
    <div className="border border-line bg-void-2/40">
      <div className="hairline-b flex items-center justify-between px-5 py-3">
        <span className="data">Site diagram</span>
        <span className="data">Not to scale</span>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-[180px_1fr] sm:items-center">
        <svg viewBox="0 0 200 200" className="w-full max-w-[180px]" role="img" aria-label={`Plot oriented ${facingName(p.facing)}`}>
          <defs>
            <pattern id="hatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#f0b23f" strokeOpacity="0.35" strokeWidth="1" />
            </pattern>
          </defs>

          {[40, 80, 120, 160].map((v) => (
            <g key={v} stroke="#2b2140">
              <line x1={v} y1="20" x2={v} y2="180" />
              <line x1="20" y1={v} x2="180" y2={v} />
            </g>
          ))}

          <rect x="58" y="58" width="84" height="84" fill="url(#hatch)" stroke="#f0b23f" strokeWidth="1.5" />

          <g transform={`rotate(${deg} 100 100)`}>
            <line x1="100" y1="58" x2="100" y2="24" stroke="#f4effa" strokeOpacity="0.7" strokeDasharray="3 3" />
            <path d="M100 16 L104 28 L100 25.5 L96 28 Z" fill="#f4effa" />
          </g>

          <text x="100" y="12" textAnchor="middle" fill="#7a6b96" fontSize="9" fontFamily="monospace">N</text>
          <text x="100" y="196" textAnchor="middle" fill="#7a6b96" fontSize="9" fontFamily="monospace">S</text>
          <text x="190" y="103" textAnchor="middle" fill="#7a6b96" fontSize="9" fontFamily="monospace">E</text>
          <text x="10" y="103" textAnchor="middle" fill="#7a6b96" fontSize="9" fontFamily="monospace">W</text>
        </svg>

        <dl className="grid grid-cols-2 gap-px bg-line">
          <div className="field border-0">
            <dt>Frontage</dt>
            <dd>{facingName(p.facing)}</dd>
          </div>
          <div className="field border-0">
            <dt>Locality</dt>
            <dd>{p.address.locality}</dd>
          </div>
          <div className="field border-0">
            <dt>Pincode</dt>
            <dd>{p.address.pincode}</dd>
          </div>
          <div className="field border-0">
            <dt>Coordinates</dt>
            <dd className="text-xs">{p.address.lat.toFixed(4)}, {p.address.lng.toFixed(4)}</dd>
          </div>
        </dl>
      </div>

      <div className="hairline-t px-5 py-3">
        <a href={maps} target="_blank" rel="noreferrer" className="data ulink text-gold" data-cursor="MAPS">
          Open in Google Maps ↗
        </a>
      </div>
    </div>
  );
}
