"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const spring = { stiffness: 80, damping: 25, mass: 0.8 };

  const rx = useSpring(useTransform(y, [0, 1], [6, -6]), spring);
  const ry = useSpring(useTransform(x, [0, 1], [-8, 8]), spring);
  const ix = useSpring(useTransform(x, [0, 1], [15, -15]), spring);
  const iy = useSpring(useTransform(y, [0, 1], [10, -10]), spring);

  const handleMouse = (e: React.MouseEvent) => {
    if (still || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };

  const reset = () => { x.set(0.5); y.set(0.5); };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="absolute inset-0"
    >
      <motion.div
        style={{ rotateX: still ? 0 : rx, rotateY: still ? 0 : ry }}
        className="h-full w-full"
      >
        <motion.img
          style={{ x: still ? 0 : ix, y: still ? 0 : iy }}
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
