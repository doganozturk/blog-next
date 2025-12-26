import { describe, it, expect } from "vitest";
import {
  THEME_META,
  getThemeMeta,
  DEFAULT_THEME_META_KEY,
  THEME_COLOR_META_ID,
  APPLE_STATUS_BAR_META_ID,
} from "./theme-meta";

describe("theme-meta", () => {
  describe("THEME_META", () => {
    it("has light theme configuration", () => {
      expect(THEME_META.light).toEqual({
        themeColor: "#faf8f5",
        appleStatusBarStyle: "default",
      });
    });

    it("has dark theme configuration", () => {
      expect(THEME_META.dark).toEqual({
        themeColor: "#0c0a09",
        appleStatusBarStyle: "black",
      });
    });
  });

  describe("getThemeMeta", () => {
    it("returns light theme meta", () => {
      const meta = getThemeMeta("light");
      expect(meta.themeColor).toBe("#faf8f5");
      expect(meta.appleStatusBarStyle).toBe("default");
    });

    it("returns dark theme meta", () => {
      const meta = getThemeMeta("dark");
      expect(meta.themeColor).toBe("#0c0a09");
      expect(meta.appleStatusBarStyle).toBe("black");
    });
  });

  describe("constants", () => {
    it("has correct default theme key", () => {
      expect(DEFAULT_THEME_META_KEY).toBe("dark");
    });

    it("has correct meta element IDs", () => {
      expect(THEME_COLOR_META_ID).toBe("meta-theme-color");
      expect(APPLE_STATUS_BAR_META_ID).toBe("meta-apple-status-bar-style");
    });
  });
});
