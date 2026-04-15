import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatusPip } from "@/components/primitives/StatusPip";

// StatusPip has prop-driven variant and size logic, so it gets a few
// shape tests on top of the basic render assertion. We assert against
// className substrings rather than CSS Module hashes — vitest sees the
// raw class names because vite-tsconfig-paths + the vitest jsdom env
// pass through CSS Module identifiers as-is.
describe("StatusPip", () => {
  it("renders a presentational element with the default size", () => {
    const { container } = render(<StatusPip />);
    const pip = container.querySelector("span");
    expect(pip).toBeInTheDocument();
    expect(pip).toHaveAttribute("aria-hidden", "true");
    // No variant passed: only the base + size class should be applied.
    expect(pip?.className).toContain("pip");
    expect(pip?.className).toContain("xs");
  });

  it("applies the requested variant class", () => {
    const { container } = render(<StatusPip variant="crit" />);
    expect(container.querySelector("span")?.className).toContain("crit");
  });

  it("applies the sm size when requested", () => {
    const { container } = render(<StatusPip size="sm" variant="linked" />);
    const className = container.querySelector("span")?.className ?? "";
    expect(className).toContain("sm");
    expect(className).toContain("linked");
  });
});
