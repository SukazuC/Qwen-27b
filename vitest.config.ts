import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/test/**/*.test.ts"],
    exclude: ["node_modules", "tests/e2e", ".next"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
