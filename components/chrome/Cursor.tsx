"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A drafting cross-hair with a lagging ring. The ring reads the nearest
 * [data-cursor] label, so hovering a listing says what the click will do.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    document.documentElement.classList.add("has-cursor");
    setReady(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...target };
    let frame = 0;

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      const hit = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button"
      );
      setActive(Boolean(hit));
      setLabel(hit?.dataset.cursor ?? "");
    };

    const loop = () => {
      eased.x += (target.x - eased.x) * 0.14;
      eased.y += (target.y - eased.y) * 0.14;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!ready) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] hidden md:block">
      <div ref={dot} className="fixed left-0 top-0">
        <div className="h-[3px] w-[3px] bg-gold" />
      </div>
      <div ref={ring} className="fixed left-0 top-0">
        <div
          className="flex items-center justify-center rounded-full border border-gold transition-[width,height,background-color] duration-500"
          style={{
            width: label ? 78 : active ? 34 : 22,
            height: label ? 78 : active ? 34 : 22,
            backgroundColor: label ? "rgba(240,178,63,0.14)" : "transparent",
          }}
        >
          {label ? <span className="data text-[0.55rem] text-gold">{label}</span> : null}
        </div>
      </div>
    </div>
  );
}
