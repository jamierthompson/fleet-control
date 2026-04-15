import { describe, expect, it } from "vitest";

// Smoke test. Exists solely to prove the Vitest runner, jsdom environment,
// and tsconfig path resolution are all wired up correctly. Real tests
// will be added alongside the first React primitives in later commits.
describe("test infrastructure", () => {
  it("runs Vitest successfully", () => {
    expect(1 + 1).toBe(2);
  });
});
