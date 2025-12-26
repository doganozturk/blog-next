"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { applyThemeMeta, ColorScheme, getColorScheme } from "~/util";
import type { ThemeMetaKey } from "~/util";

export type ThemeValue = "light" | "dark" | "";

const LS_THEME = "theme";

interface ThemeContextValue {
  theme: ThemeValue;
  setTheme: (theme: ThemeValue) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const isValidTheme = (value: string | null | undefined): value is ThemeMetaKey =>
  value === "light" || value === "dark";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeValue>("");

  const setTheme = useCallback((newTheme: ThemeValue) => {
    setThemeState(newTheme);

    if (isValidTheme(newTheme)) {
      localStorage.setItem(LS_THEME, newTheme);
      applyThemeMeta(newTheme);

      // Update theme-container class
      const themeContainer = document.querySelector(".theme-container");
      if (themeContainer) {
        themeContainer.classList.remove("light", "dark");
        themeContainer.classList.add(newTheme);
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  }, [theme, setTheme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem(LS_THEME);
    if (isValidTheme(storedTheme)) {
      setThemeState(storedTheme);
    } else {
      // Fall back to system preference if no stored theme
      const systemTheme =
        getColorScheme() === ColorScheme.Dark ? "dark" : "light";
      setThemeState(systemTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
