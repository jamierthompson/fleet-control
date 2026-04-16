import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "@/components/primitives/Badge";

// Badge has prop combinatorics worth pinning: variant + appearance
// + size each contribute a class, the children must be rendered as
// the accessible label, and the documented "filled falls back to
// outlined for unsupported variants" behaviour should not regress.
//
// We assert against className substrings rather than computed styles
// because the CSS Module class names pass through verbatim under
// vitest's jsdom environment.
describe("Badge", () => {
  it("renders its children as the accessible label", () => {
    render(<Badge>NOW · CRIT</Badge>);
    expect(screen.getByText("NOW · CRIT")).toBeInTheDocument();
  });

  it("applies the muted default when no variant is passed", () => {
    const { container } = render(<Badge>NOM</Badge>);
    const className = container.querySelector("span")?.className ?? "";
    // Base + md (default size). No variant class, no filled class.
    expect(className).toContain("base");
    expect(className).toContain("md");
    expect(className).not.toContain("crit");
    expect(className).not.toContain("filled");
  });

  it("applies the variant and appearance classes when passed", () => {
    const { container } = render(
      <Badge variant="crit" appearance="filled" size="sm">
        NOW · CRIT
      </Badge>,
    );
    const className = container.querySelector("span")?.className ?? "";
    expect(className).toContain("crit");
    expect(className).toContain("filled");
    expect(className).toContain("sm");
  });

  // Documents the "filled is only meaningful for crit and linked"
  // behaviour: the `filled` class is still applied to the DOM, but
  // the variant CSS does not define a fill rule for nominal/stale,
  // so the result is the outlined treatment. We assert that the
  // variant class wins by being present.
  it("still applies the variant class when filled is requested on an unsupported variant", () => {
    const { container } = render(
      <Badge variant="stale" appearance="filled">
        STALE
      </Badge>,
    );
    const className = container.querySelector("span")?.className ?? "";
    expect(className).toContain("stale");
    expect(className).toContain("filled");
  });
});
