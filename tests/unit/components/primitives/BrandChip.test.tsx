import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrandChip } from "@/components/primitives/BrandChip";

// Smoke tests for the BrandChip primitive. Exercises the CSS Module
// compilation and confirms the brand text renders. The text content of
// the chip is split across two text nodes by the `/` separator, so we
// assert on the full rendered text rather than a single matcher.
describe("BrandChip", () => {
  it("renders the SENTRYOS/FLEET wordmark", () => {
    const { container } = render(<BrandChip />);
    expect(container.textContent).toBe("SENTRYOS/FLEET");
  });

  it("renders a decorative phosphor dot marked aria-hidden", () => {
    const { container } = render(<BrandChip />);
    const dot = container.querySelector("[aria-hidden='true']");
    expect(dot).toBeInTheDocument();
  });
});
