"use client";

import { useFavourites } from "../../lib/favourites";

/** Square bracket toggle — a drawing-set convention, not a heart. */
export default function Favourite({ id, className = "" }: { id: string; className?: string }) {
  const { has, toggle, ready } = useFavourites();
  const on = has(id);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Remove from your favourites" : "Add to your favourites"}
      data-cursor={on ? "REMOVE" : "FAVOURITE"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      className={`group relative grid h-10 w-10 place-items-center border transition-colors duration-500 ${
        on ? "border-gold bg-gold/10" : "border-line hover:border-line-2"
      } ${className}`}
      style={{ opacity: ready ? 1 : 0.4 }}
    >
      <span
        className={`data text-[0.6rem] leading-none transition-colors duration-500 ${
          on ? "text-gold" : "text-muted group-hover:text-pearl"
        }`}
      >
        {on ? "\u2715" : "+"}
      </span>
    </button>
  );
}
