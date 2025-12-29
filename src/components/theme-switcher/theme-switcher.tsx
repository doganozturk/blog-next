"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./theme-switcher.module.css";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className={styles.themeSwitcher}>
        <span className={`${styles.switch} ${styles.switchLoading}`}>
          &nbsp;
        </span>
      </div>
    );
  }

  return (
    <div className={styles.themeSwitcher} onClick={toggleTheme}>
      {resolvedTheme === "dark" && (
        <span className={`${styles.switch} ${styles.switchLight}`}>🌞</span>
      )}
      {resolvedTheme === "light" && (
        <span className={`${styles.switch} ${styles.switchDark}`}>🌚</span>
      )}
    </div>
  );
}
