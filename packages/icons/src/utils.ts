import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { optimize } from "svgo";

export function optimizeSvg(svgContent: string) {
  const { data } = optimize(svgContent, {
    path: svgContent,
    multipass: true,
    plugins: [
      {
        name: "removeAttrs",
        params: {
          // remove all fills so we can set the color via CSS
          attrs: ["fill"],
        },
      },
    ],
  });
  return data;
}

export async function isDirectory(path: string) {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

export async function readAllIconPaths() {
  const INPUT_FOLDER = fileURLToPath(new URL("./assets", import.meta.url));
  const folders = await fs.readdir(INPUT_FOLDER, "utf-8");

  /** List of all available icons paths. */
  const ALL_ICON_PATHS: string[] = [];

  for (const folder of folders) {
    const folderPath = path.join(INPUT_FOLDER, folder);
    if (!(await isDirectory(folderPath))) continue;
    const icons = await fs.readdir(folderPath, "utf-8");

    const iconPaths = icons
      .map((filename) => path.join(folderPath, filename))
      .filter((path) => path.endsWith(".svg"));

    ALL_ICON_PATHS.push(...iconPaths);
  }

  return ALL_ICON_PATHS;
}
