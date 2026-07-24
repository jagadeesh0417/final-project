"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Plate from "../ui/Plate";

const CrystalScene = dynamic(() => import("./CrystalScene"), { ssr: false, loading: () => null });

type Tier = "off" | "low" | "high";

/**
 * Grades the device before committing to WebGL. Refraction and bloom are
 * expensive, so a mid-tier laptop gets the scene without postprocessing and
 * anything weaker gets the poster.
 */
function grade(): Tier {
  if (typeof window === "undefined") return "off";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  if (!window.matchMedia("(min-width: 768px)").matches) return "off";

  const cores = navigator.hardwareConcurrency ?? 2;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) return "off";
  } catch {
    return "off";
  }

  if (cores >= 8 && memory >= 8) return "high";
  if (cores >= 4) return "low";
  return "off";
}

export default function Crystal() {
  const [tier, setTier] = useState<Tier>("off");
  const [visible, setVisible] = useState(true);
  const host = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useEffect(() => setTier(grade()), []);

  useEffect(() => {
    if (tier === "off" || !host.current) return;
    const el = host.current;

    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      progress.current = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [tier]);

  return (
    <div ref={host} className="absolute inset-0" aria-hidden>
      {tier !== "off" && visible ? (
        <CrystalScene progress={progress} quality={tier === "high" ? "high" : "low"} />
      ) : (
        <div className="relative h-full w-full">
          <div className="absolute inset-0 opacity-70"><Plate seed={3} /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
        </div>
      )}
    </div>
  );
}
