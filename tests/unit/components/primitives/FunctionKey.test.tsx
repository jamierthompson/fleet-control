import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FunctionKey } from "@/components/primitives/FunctionKey";

describe("FunctionKey", () => {
  it("renders the key name and label", () => {
    render(<FunctionKey keyName="F1" label="NOW" />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("F1");
    expect(button).toHaveTextContent("NOW");
  });

  it("is not pressed by default", () => {
    render(<FunctionKey keyName="F2" label="ROSTER" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("is pressed when active", () => {
    render(<FunctionKey keyName="F1" label="NOW" active />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("applies the active class when active", () => {
    render(<FunctionKey keyName="F1" label="NOW" active />);
    expect(screen.getByRole("button").className).toContain("active");
  });

  it("does not apply the active class when inactive", () => {
    render(<FunctionKey keyName="F3" label="LOG" />);
    expect(screen.getByRole("button").className).not.toContain("active");
  });

  it("renders the key name in a separate span for styling", () => {
    const { container } = render(<FunctionKey keyName="F1" label="NOW" />);
    const keySpan = container.querySelector("span");
    expect(keySpan).toHaveTextContent("F1");
    expect(keySpan?.className).toContain("key");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<FunctionKey keyName="F5" label="PERMS" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
