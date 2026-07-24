"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLAttributes, ElementType } from "react";

type TagName = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Splits on words and lifts each from behind a mask. Screen readers get the
 * whole string from aria-label; the split spans are hidden from them.
 */
export default function RevealText({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  as?: TagName;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const still = useReducedMotion();
  const words = text.split(" ");
  const Tag = as as ElementType<HTMLAttributes<HTMLElement>>;

  if (still) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        initial="out"
        whileInView="in"
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline"
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.06em]">
            <motion.span
              className="inline-block"
              variants={{
                out: { y: "108%", opacity: 0 },
                in: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 1, ease: EASE }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
