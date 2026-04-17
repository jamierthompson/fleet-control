import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BreadcrumbPath } from "@/components/primitives/BreadcrumbPath";

describe("BreadcrumbPath", () => {
  it("renders ancestors, current, and siblings", () => {
    render(
      <BreadcrumbPath
        ancestors={["CONTROL"]}
        current="NOW"
        siblings={["LOG", "REPLAY"]}
      />,
    );
    expect(screen.getByText("CONTROL")).toBeInTheDocument();
    expect(screen.getByText("NOW")).toBeInTheDocument();
    expect(screen.getByText("LOG")).toBeInTheDocument();
    expect(screen.getByText("REPLAY")).toBeInTheDocument();
  });

  it("marks the current page with aria-current", () => {
    render(<BreadcrumbPath current="NOW" />);
    expect(screen.getByText("NOW")).toHaveAttribute("aria-current", "page");
  });

  // The ancestor/sibling roles are visual but also structural —
  // ancestors come before the current page, siblings come after. We
  // enforce ordering here so a refactor cannot silently swap them.
  it("renders the ancestor › current › siblings order", () => {
    const { container } = render(
      <BreadcrumbPath
        ancestors={["CONTROL"]}
        current="NOW"
        siblings={["LOG"]}
      />,
    );
    const labels = Array.from(
      container.querySelectorAll("[aria-current], span"),
    )
      .map((el) => el.textContent)
      .filter((text) => text === "CONTROL" || text === "NOW" || text === "LOG");
    expect(labels).toEqual(["CONTROL", "NOW", "LOG"]);
  });

  it("renders without ancestors or siblings when none are passed", () => {
    render(<BreadcrumbPath current="NOW" />);
    expect(screen.getByText("NOW")).toBeInTheDocument();
    // No › separator should be present when there are zero ancestors.
    expect(screen.queryByText("›")).not.toBeInTheDocument();
    // No · separators should be present when there are zero siblings.
    expect(screen.queryByText("·")).not.toBeInTheDocument();
  });
});
