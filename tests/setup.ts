// Global test setup. Runs once before each test file.
//
// Importing this module registers the @testing-library/jest-dom custom
// matchers (e.g. toBeInTheDocument, toHaveClass, toHaveTextContent) on
// Vitest's expect, so component tests can assert against the DOM
// semantically instead of inspecting raw attributes.
import "@testing-library/jest-dom/vitest";
