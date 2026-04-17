import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UserChip } from "@/components/primitives/UserChip";

// Smoke tests for the UserChip primitive. The chip renders meaningful
// text (initials + identity label) that the user actually reads, so
// we query by visible text rather than by structure.
describe("UserChip", () => {
  it("renders the initials inside the avatar box", () => {
    render(<UserChip initials="RA">R.AHN · L3 ON-CALL</UserChip>);
    expect(screen.getByText("RA")).toBeInTheDocument();
  });

  it("renders the identity label children", () => {
    render(<UserChip initials="RA">R.AHN · L3 ON-CALL</UserChip>);
    expect(screen.getByText("R.AHN · L3 ON-CALL")).toBeInTheDocument();
  });
});
