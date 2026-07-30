"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    (async () => {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
        });
        const raf = (t: number) => {
          lenis?.raf(t);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch {
        /* lenis not available */
      }
    })();
    return () => lenis?.destroy();
  }, []);
  return null;
}
