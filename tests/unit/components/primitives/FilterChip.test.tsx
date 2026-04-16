import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FilterChip } from "@/components/primitives/FilterChip";

describe("FilterChip", () => {
  it("renders the label and count", () => {
    render(<FilterChip label="ALL" count={24} />);
    expect(screen.getByRole("button")).toHaveTextContent("ALL");
    expect(screen.getByRole("button")).toHaveTextContent("24");
  });

  it("is not pressed by default", () => {
    render(<FilterChip label="DEMAND" count={2} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("is pressed when active", () => {
    render(<FilterChip label="ALL" count={24} active />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("applies the active class when active", () => {
    render(<FilterChip label="ALL" count={24} active />);
    expect(screen.getByRole("button").className).toContain("active");
  });

  it("does not apply the active class when inactive", () => {
    render(<FilterChip label="STALE" count={1} />);
    expect(screen.getByRole("button").className).not.toContain("active");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<FilterChip label="LINKED" count={2} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
