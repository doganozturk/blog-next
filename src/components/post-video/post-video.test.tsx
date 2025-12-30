import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { PostVideo } from "./post-video";

describe("PostVideo", () => {
  const defaultProps = {
    id: "dQw4w9WgXcQ",
    title: "Test Video",
  };

  it("renders iframe element", () => {
    render(<PostVideo {...defaultProps} />);

    const iframe = screen.getByTitle("Test Video");
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe("IFRAME");
  });

  it("has correct YouTube embed URL in src", () => {
    render(<PostVideo {...defaultProps} />);

    const iframe = screen.getByTitle("Test Video");
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });

  it("has correct dimensions", () => {
    render(<PostVideo {...defaultProps} />);

    const iframe = screen.getByTitle("Test Video");
    expect(iframe).toHaveAttribute("width", "560");
    expect(iframe).toHaveAttribute("height", "315");
  });

  it("has lazy loading enabled", () => {
    render(<PostVideo {...defaultProps} />);

    const iframe = screen.getByTitle("Test Video");
    expect(iframe).toHaveAttribute("loading", "lazy");
  });

  it("has allowFullScreen attribute", () => {
    render(<PostVideo {...defaultProps} />);

    const iframe = screen.getByTitle("Test Video");
    expect(iframe).toHaveAttribute("allowfullscreen");
  });

  it("has correct allow attribute for media features", () => {
    render(<PostVideo {...defaultProps} />);

    const iframe = screen.getByTitle("Test Video");
    expect(iframe).toHaveAttribute(
      "allow",
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    );
  });

  it("has srcDoc with video ID", () => {
    render(<PostVideo {...defaultProps} />);

    const iframe = screen.getByTitle("Test Video");
    const srcDoc = iframe.getAttribute("srcdoc");

    expect(srcDoc).toContain("dQw4w9WgXcQ");
    expect(srcDoc).toContain("youtube.com/embed/dQw4w9WgXcQ?autoplay=1");
    expect(srcDoc).toContain("img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg");
  });

  it("has srcDoc with video title in alt attribute", () => {
    render(<PostVideo {...defaultProps} />);

    const iframe = screen.getByTitle("Test Video");
    const srcDoc = iframe.getAttribute("srcdoc");

    expect(srcDoc).toContain("alt='Test Video'");
  });

  it("has play button in srcDoc", () => {
    render(<PostVideo {...defaultProps} />);

    const iframe = screen.getByTitle("Test Video");
    const srcDoc = iframe.getAttribute("srcdoc");

    expect(srcDoc).toContain("<span>▶</span>");
  });
});
