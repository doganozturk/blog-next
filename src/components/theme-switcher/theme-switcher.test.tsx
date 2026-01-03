import { describe, expect, it, mock, beforeEach } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeSwitcher } from "./theme-switcher";

// Mock next-themes
const mockSetTheme = mock(() => {});
let mockResolvedTheme = "light";

mock.module("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
  }),
}));

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
    mockResolvedTheme = "light";
  });

  it("renders switch to dark button in light mode", () => {
    mockResolvedTheme = "light";
    render(<ThemeSwitcher />);

    // In light mode, button shows moon icon and offers to switch to dark
    const button = screen.getByRole("button", { name: /switch to dark theme/i });
    expect(button).toBeInTheDocument();
  });

  it("renders switch to light button in dark mode", () => {
    mockResolvedTheme = "dark";
    render(<ThemeSwitcher />);

    // In dark mode, button shows sun icon and offers to switch to light
    const button = screen.getByRole("button", { name: /switch to light theme/i });
    expect(button).toBeInTheDocument();
  });

  it("calls setTheme with 'dark' when clicking in light mode", () => {
    mockResolvedTheme = "light";
    render(<ThemeSwitcher />);

    const button = screen.getByRole("button", { name: /switch to dark theme/i });
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("calls setTheme with 'light' when clicking in dark mode", () => {
    mockResolvedTheme = "dark";
    render(<ThemeSwitcher />);

    const button = screen.getByRole("button", { name: /switch to light theme/i });
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
});
