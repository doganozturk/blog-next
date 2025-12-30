import { afterEach, expect, mock } from "bun:test";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Mock server-only to allow testing server modules
mock.module("server-only", () => ({}));

expect.extend(matchers);

// Clean up DOM after each test
afterEach(() => {
  cleanup();
});

// Mock matchMedia for next-themes compatibility
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
