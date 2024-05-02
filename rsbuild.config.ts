import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  html: { template: "./public/index.html" },
  source: {
    alias: {
      "@interfaces/*": "./src/interfaces/*",
    },
  },
});