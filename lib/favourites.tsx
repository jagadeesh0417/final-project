"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const KEY = "akradhi:shortlist";

interface Ctx {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  clear: () => void;
  ready: boolean;
}

const FavouritesContext = createContext<Ctx | null>(null);

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // Read after mount so the server and client render the same first pass.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      /* storage unavailable — the shortlist just won't persist */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [ids, ready]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]));
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(() => ({ ids, has, toggle, clear, ready }), [ids, has, toggle, clear, ready]);

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used inside <FavouritesProvider>");
  return ctx;
}
