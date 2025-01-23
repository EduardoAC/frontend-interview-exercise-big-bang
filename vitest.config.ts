import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Enable global test functions like `describe` and `it`
    environment: "jsdom", // or 'node' depending on your needs
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"], // Coverage report formats
    },
    setupFiles: "./src/test/setup.ts",
  },
});
