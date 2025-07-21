import { generateChangeset } from "./generate-changeset.js";

await generateChangeset({
  packageName: "@sit-onyx/icons",
  title: "feat: update icons",
  directory: "src/assets",
});
