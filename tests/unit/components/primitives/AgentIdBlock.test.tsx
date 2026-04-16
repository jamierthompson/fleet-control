import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AgentIdBlock } from "@/components/primitives/AgentIdBlock";

describe("AgentIdBlock", () => {
  it("renders the agent name and namespace", () => {
    const { container } = render(
      <AgentIdBlock
        name="vuln-scanner"
        namespace="prod"
        description="Vulnerability · production dependency scan"
      />,
    );

    expect(container.textContent).toContain("vuln-scanner");
    expect(container.textContent).toContain("prod");
  });

  it("renders the middot separator between name and namespace", () => {
    const { container } = render(
      <AgentIdBlock
        name="vuln-scanner"
        namespace="prod"
        description="Vulnerability · production dependency scan"
      />,
    );

    // The full ID line should contain the middot-separated name·namespace
    expect(container.textContent).toContain("vuln-scanner·prod");
  });

  it("renders the description line", () => {
    const { container } = render(
      <AgentIdBlock
        name="threat-detector"
        namespace="prod"
        description="Threat correlation · behavioural analysis"
      />,
    );

    expect(container.textContent).toContain(
      "Threat correlation · behavioural analysis",
    );
  });

  it("renders a two-line structure with ID and description", () => {
    const { container } = render(
      <AgentIdBlock
        name="vuln-scanner"
        namespace="prod"
        description="Vulnerability · production dependency scan"
      />,
    );

    // Root div contains two child spans — the ID line and the description
    const root = container.firstElementChild;
    const spans = root?.querySelectorAll(":scope > span");
    expect(spans?.length).toBe(2);

    // First span is the ID line, second is the description
    expect(spans?.[0].textContent).toContain("vuln-scanner");
    expect(spans?.[1].textContent).toContain("Vulnerability");
  });
});
