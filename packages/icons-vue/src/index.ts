import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createOrClearDirectory, toPascalCase, transformSvgToVueSfc } from "./utils";

type RawIcon = {
  category: string;
  content: string;
  vueFileName: string;
};

/**
 * This script generates .vue files for all icons inside the iconFolder below and writes them to the outputFolder.
 */
const iconFolder = fileURLToPath(new URL("../../icons/src", import.meta.url));
const outputFolder = fileURLToPath(new URL("./tmp", import.meta.url));

const ALL_ICONS: RawIcon[] = [];

const folderNames = await fs.readdir(iconFolder);

for (const folderName of folderNames) {
  const iconsPath = path.join(iconFolder, folderName);

  const stats = await fs.stat(iconsPath);
  if (!stats.isDirectory()) continue;

  const icons = await fs.readdir(iconsPath);

  for (const filename of icons) {
    const content = await fs.readFile(path.join(iconsPath, filename), "utf-8");
    const iconName = filename.replace(".svg", "");

    ALL_ICONS.push({
      vueFileName: toPascalCase(iconName),
      category: folderName,
      content,
    });
  }
}

await createOrClearDirectory(outputFolder);
await createOrClearDirectory(path.join(outputFolder, "components"));

console.log(`Generating ${ALL_ICONS.length} icons...`);

// transform all icons to vue files
for (const icon of ALL_ICONS) {
  const vueFileContent = await transformSvgToVueSfc(icon.vueFileName, icon.content);
  await fs.writeFile(
    path.join(outputFolder, "components", `${icon.vueFileName}.vue`),
    vueFileContent,
    "utf-8",
  );
}

// create entry file for vite so it can use it to build all icons
const entryFileContent = `/* eslint-disable prettier/prettier */
${ALL_ICONS.map(
  ({ vueFileName }) =>
    `export { default as ${vueFileName} } from './components/${vueFileName}.vue';`,
).join("\n")}
`;

await fs.writeFile(path.join(outputFolder, "index.ts"), entryFileContent, "utf-8");
