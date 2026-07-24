"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

const SPRING = { stiffness: 180, damping: 16, mass: 0.4 };

function useMagnet(strength: number) {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING);
  const y = useSpring(my, SPRING);

  const onMouseMove = (e: React.MouseEvent) => {
    if (still || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return { ref, x, y, onMouseMove, onMouseLeave };
}

/** Pulls toward the pointer while inside its bounds, springs back on exit. */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
  type = "button",
  cursor,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  type?: "button" | "submit";
  cursor?: string;
}) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnet(strength);

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-cursor={cursor}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/** Same behaviour, for links. */
export function MagneticLink({
  children,
  href,
  className = "",
  strength = 0.35,
  cursor,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  strength?: number;
  cursor?: string;
}) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnet(strength);

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-cursor={cursor}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
