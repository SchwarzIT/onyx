import { generateChangeset } from "../../icons/scripts/generate-changeset.js";

await generateChangeset({
  packageName: "@sit-onyx/flags",
  title: "feat: update flags",
  directory: "src/assets",
});
