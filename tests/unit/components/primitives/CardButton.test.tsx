import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CardButton } from "@/components/primitives/CardButton";

describe("CardButton", () => {
  it("renders the label text", () => {
    render(<CardButton>APPROVE</CardButton>);
    expect(screen.getByRole("button")).toHaveTextContent("APPROVE");
  });

  it("applies no variant class for the default treatment", () => {
    render(<CardButton>DEFER 30M</CardButton>);
    const className = screen.getByRole("button").className;
    expect(className).toContain("base");
    expect(className).not.toContain("primary");
    expect(className).not.toContain("crit");
    expect(className).not.toContain("ghost");
  });

  it("applies the primary variant class", () => {
    render(<CardButton variant="primary">CONFIRM</CardButton>);
    expect(screen.getByRole("button").className).toContain("primary");
  });

  it("applies the crit variant class", () => {
    render(<CardButton variant="crit">APPROVE PROD DEPLOY</CardButton>);
    expect(screen.getByRole("button").className).toContain("crit");
  });

  it("applies the ghost variant class", () => {
    render(<CardButton variant="ghost">INVESTIGATE</CardButton>);
    expect(screen.getByRole("button").className).toContain("ghost");
  });

  it("renders a key hint when provided", () => {
    const { container } = render(
      <CardButton keyHint="↵">CONFIRM</CardButton>,
    );
    const hint = container.querySelector("span");
    expect(hint).toBeInTheDocument();
    expect(hint).toHaveTextContent("↵");
  });

  it("does not render a key hint when omitted", () => {
    const { container } = render(<CardButton>RELEASE</CardButton>);
    const hint = container.querySelector("span");
    expect(hint).not.toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<CardButton onClick={handleClick}>DEFER</CardButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
