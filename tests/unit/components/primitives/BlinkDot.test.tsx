import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlinkDot } from "@/components/primitives/BlinkDot";

// Smoke test for the BlinkDot primitive. Like LivePulse, this component
// has no props and no logic, so the only thing worth pinning is that it
// renders and is marked aria-hidden so the badge text it sits beside
// remains the accessible name.
describe("BlinkDot", () => {
  it("renders a presentational element", () => {
    const { container } = render(<BlinkDot />);
    const dot = container.querySelector("span");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveAttribute("aria-hidden", "true");
  });
});
