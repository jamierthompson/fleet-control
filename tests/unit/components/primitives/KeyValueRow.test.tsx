import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KeyValueRow } from "@/components/primitives/KeyValueRow";

// KeyValueRow renders a bare <dt> + <dd> fragment meant to live
// inside a <dl>. We wrap in a <dl> here so the HTML is valid and
// Testing Library doesn't warn about orphaned <dt>/<dd> elements.

describe("KeyValueRow", () => {
  it("renders the label as a <dt> and the value as a <dd>", () => {
    const { container } = render(
      <dl>
        <KeyValueRow label="Finding">Remote code execution</KeyValueRow>
      </dl>,
    );

    const dt = container.querySelector("dt");
    const dd = container.querySelector("dd");

    expect(dt).toBeInTheDocument();
    expect(dt).toHaveTextContent("Finding");

    expect(dd).toBeInTheDocument();
    expect(dd).toHaveTextContent("Remote code execution");
  });

  it("renders rich content (code, bold) inside the value", () => {
    const { container } = render(
      <dl>
        <KeyValueRow label="Authority">
          <code>vuln.patch:staging</code> ✓ · <b>requires-human</b>
        </KeyValueRow>
      </dl>,
    );

    // The <code> and <b> descendants should be present inside the <dd>
    const dd = container.querySelector("dd");
    expect(dd?.querySelector("code")).toHaveTextContent("vuln.patch:staging");
    expect(dd?.querySelector("b")).toHaveTextContent("requires-human");
  });

  it("applies the label and value style classes", () => {
    const { container } = render(
      <dl>
        <KeyValueRow label="Status">Nominal</KeyValueRow>
      </dl>,
    );

    const dt = container.querySelector("dt");
    const dd = container.querySelector("dd");

    expect(dt?.className).toContain("label");
    expect(dd?.className).toContain("value");
  });
});
