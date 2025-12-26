import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatDistance, Locale } from "./format-distance";

describe("formatDistance", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-15T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("formats date in English by default", () => {
    const result = formatDistance("2025-01-10");
    expect(result).toContain("day");
  });

  it("formats date in Turkish when locale is tr", () => {
    const result = formatDistance("2025-01-10", Locale.tr);
    expect(result).toContain("gün");
  });

  it("formats older dates correctly", () => {
    const result = formatDistance("2024-12-15");
    expect(result).toContain("month");
  });
});
