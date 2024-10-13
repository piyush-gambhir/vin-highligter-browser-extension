import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    manifest_version: 3,
    name: "VIN Highlighter",
    version: "1.0",
    description: "Highlights VINs on webpages.",
    permissions: ["activeTab", "scripting"],
  },
});
