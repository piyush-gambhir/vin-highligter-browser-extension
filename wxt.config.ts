import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifestVersion: 3,
  manifest: {
    name: "VIN Highlighter",
    description: "Highlights VINs on webpages.",
    permissions: ["activeTab", "scripting"],
  },
});
