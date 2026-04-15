import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Styleguide from "@/app/styleguide/page";

// Smoke test for the /styleguide page. Exercises the full pipeline:
// Server Component rendering, typography.module.css compilation, and
// the primitive/semantic token enumerations. A failure here almost
// always means one of the token data arrays references a class name
// that does not exist in typography.module.css.
describe("Styleguide page", () => {
  it("renders the page title", () => {
    render(<Styleguide />);
    expect(
      screen.getByRole("heading", { name: /Fleet Control · Styleguide/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("renders the Semantic colors section", () => {
    render(<Styleguide />);
    expect(
      screen.getByRole("heading", { name: /Semantic colors/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it("renders the Typography section", () => {
    render(<Styleguide />);
    expect(
      screen.getByRole("heading", { name: /Typography/i, level: 2 }),
    ).toBeInTheDocument();
  });
});
