import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ConfidenceChip } from "@/components/primitives/ConfidenceChip";

describe("ConfidenceChip", () => {
  it("renders the CONF label and percentage value", () => {
    const { container } = render(<ConfidenceChip value={87} />);
    expect(container.textContent).toContain("CONF");
    expect(container.textContent).toContain("87%");
  });

  // ─── Tier coloring ──────────────────────────────────────────────

  it("applies the 'high' tier class for values ≥ 90", () => {
    const { container } = render(<ConfidenceChip value={94} />);
    const valueSpan = container.querySelector("span > span");
    expect(valueSpan?.className).toContain("high");
  });

  it("applies the 'standard' tier class for values 75–89", () => {
    const { container } = render(<ConfidenceChip value={87} />);
    const valueSpan = container.querySelector("span > span");
    expect(valueSpan?.className).toContain("standard");
  });

  it("applies the 'below' tier class for values < 75", () => {
    const { container } = render(<ConfidenceChip value={62} />);
    const valueSpan = container.querySelector("span > span");
    expect(valueSpan?.className).toContain("below");
  });

  // Boundary checks — 75 and 90 are the exact thresholds
  it("treats exactly 75 as standard, not below", () => {
    const { container } = render(<ConfidenceChip value={75} />);
    const valueSpan = container.querySelector("span > span");
    expect(valueSpan?.className).toContain("standard");
    expect(valueSpan?.className).not.toContain("below");
  });

  it("treats exactly 90 as high, not standard", () => {
    const { container } = render(<ConfidenceChip value={90} />);
    const valueSpan = container.querySelector("span > span");
    expect(valueSpan?.className).toContain("high");
  });

  // ─── Delta ───────────────────────────────────────────────────────

  it("does not render a delta when previousValue is omitted", () => {
    const { container } = render(<ConfidenceChip value={87} />);
    expect(container.textContent).not.toContain("from");
  });

  it("renders an up-arrow delta when value increased", () => {
    const { container } = render(
      <ConfidenceChip value={87} previousValue={62} />,
    );
    expect(container.textContent).toContain("↑ from 62%");
  });

  it("renders a down-arrow delta when value decreased", () => {
    const { container } = render(
      <ConfidenceChip value={60} previousValue={78} />,
    );
    expect(container.textContent).toContain("↓ from 78%");
  });
});
