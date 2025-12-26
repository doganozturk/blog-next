"use client";

import { useTheme } from "~/components/theme-provider";
import styles from "./theme-switcher.module.css";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeSwitcher} onClick={toggleTheme}>
      {theme === "dark" && (
        <span className={`${styles.switch} ${styles.switchLight}`}>🌞</span>
      )}
      {theme === "light" && (
        <span className={`${styles.switch} ${styles.switchDark}`}>🌚</span>
      )}
      {!theme && (
        <span className={`${styles.switch} ${styles.switchLoading}`}>
          &nbsp;
        </span>
      )}
    </div>
  );
}
