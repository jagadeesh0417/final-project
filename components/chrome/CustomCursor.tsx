"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setVisible(true);
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[999] hidden md:block"
      style={{
        left: pos.x - 12,
        top: pos.y - 12,
        width: 24,
        height: 24,
        borderRadius: "50%",
        border: "1.5px solid rgba(184, 134, 45, 0.5)",
        transition: "width 0.2s, height 0.2s, border-color 0.2s",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
