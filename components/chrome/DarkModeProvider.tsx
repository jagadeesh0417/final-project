"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeCtx);

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("akradhi_theme") as Theme | null;
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initial = stored || prefers;
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("akradhi_theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  if (!mounted) return <>{children}</>;

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}
