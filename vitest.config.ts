import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Vitest configuration.
//
// - @vitejs/plugin-react: transforms JSX/TSX for React component tests.
// - resolve.tsconfigPaths: native Vite support for the "@/*" alias defined
//   in tsconfig.json — no plugin required.
// - environment: "jsdom" gives tests a browser-like DOM (document, window).
// - globals: true makes describe/it/expect available without imports.
// - setupFiles: runs before every test file — used here to install the
//   jest-dom matchers (toBeInTheDocument, toHaveClass, etc.).
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
});
