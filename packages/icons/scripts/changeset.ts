import { generateChangeset } from "./generate-changeset";

await generateChangeset({
  packageName: "@sit-onyx/icons",
  title: "feat: update icons",
  directory: "src/assets",
});
