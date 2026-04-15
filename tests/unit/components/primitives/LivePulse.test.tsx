import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LivePulse } from "@/components/primitives/LivePulse";

// Smoke test for the LivePulse primitive. Asserts the component renders
// to a single element in the document. Because LivePulse is presentational
// (aria-hidden, no text), we query by container rather than by role.
describe("LivePulse", () => {
  it("renders a presentational element", () => {
    const { container } = render(<LivePulse />);
    const dot = container.querySelector("span");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveAttribute("aria-hidden", "true");
  });
});
