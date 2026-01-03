import { describe, expect, it, mock } from "bun:test";
import { render, screen } from "@testing-library/react";
import { Header, HeaderType } from "./header";

// Mock next-themes for ThemeSwitcher
mock.module("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: "light",
    setTheme: () => {},
  }),
}));

describe("Header", () => {
  it("renders children", () => {
    render(
      <Header type={HeaderType.Main}>
        <span>Test Child</span>
      </Header>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("renders ThemeSwitcher", () => {
    render(
      <Header type={HeaderType.Main}>
        <span>Content</span>
      </Header>
    );

    // ThemeSwitcher renders as a button with aria-label in light mode
    const themeSwitcher = screen.getByRole("button", { name: /switch to dark theme/i });
    expect(themeSwitcher).toBeInTheDocument();
  });

  it("renders link to home page with locale", () => {
    render(
      <Header type={HeaderType.Main}>
        <span>Content</span>
      </Header>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/en/");
  });

  it("has aria-label='back' when type is Post", () => {
    render(
      <Header type={HeaderType.Post}>
        <span>Content</span>
      </Header>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label", "back");
  });

  it("has no aria-label when type is Main", () => {
    render(
      <Header type={HeaderType.Main}>
        <span>Content</span>
      </Header>
    );

    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("aria-label");
  });
});
