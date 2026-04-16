import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AgentRow } from "@/components/primitives/AgentRow";

describe("AgentRow", () => {
  it("renders the agent name and status badge", () => {
    render(<AgentRow name="vuln-scanner" namespace="prod" status="CRIT" />);
    expect(screen.getByText("CRIT")).toBeInTheDocument();
  });

  it("renders the namespace with a middot separator", () => {
    const { container } = render(
      <AgentRow name="vuln-scanner" namespace="prod" status="NOM" />,
    );
    expect(container.textContent).toContain("vuln-scanner·prod");
  });

  it("renders without a namespace when omitted", () => {
    const { container } = render(
      <AgentRow name="access-monitor" status="LOCK" />,
    );
    expect(container.textContent).toContain("access-monitor");
    expect(container.textContent).not.toContain("·");
  });

  it("applies the variant class for crit rows", () => {
    const { container } = render(
      <AgentRow variant="crit" name="vuln-scanner" namespace="prod" status="CRIT" />,
    );
    expect(container.firstElementChild?.className).toContain("crit");
  });

  it("applies the variant class for linked rows", () => {
    const { container } = render(
      <AgentRow variant="linked" name="access-monitor" status="LOCK" />,
    );
    expect(container.firstElementChild?.className).toContain("linked");
  });

  it("applies the variant class for stale rows", () => {
    const { container } = render(
      <AgentRow variant="stale" name="patch-manager" namespace="prod" status="STALE" />,
    );
    expect(container.firstElementChild?.className).toContain("stale");
  });

  it("renders a circle StatusPip", () => {
    const { container } = render(
      <AgentRow name="vuln-scanner" namespace="prod" status="NOM" />,
    );
    // The pip is the first span inside the row with aria-hidden
    const pip = container.querySelector('[aria-hidden="true"]');
    expect(pip).toBeInTheDocument();
    expect(pip?.className).toContain("circle");
  });
});
