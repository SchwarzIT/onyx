import fs from "node:fs/promises";
import { getFilePath } from "../../utils/node";

export default defineEventHandler(async () => {
  const files = await fs.readdir(getFilePath("../../../../packages/sit-onyx/src/components"), {
    recursive: true,
  });

  const storyFiles = files
    .filter((file) => file.endsWith(".stories.ts"))
    .map((file) => file.split("/").at(-1)!.replace(".stories.ts", ""))
    .sort();

  return {
    components: storyFiles,
  };
});
