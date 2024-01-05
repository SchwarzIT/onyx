import fs from "node:fs";
import { defineLoader } from "vitepress";

export interface Data {
  languages: {
    name: string;
    fileContent: object;
    keyCount: number;
  }[];
  totalKeys: number;
}

declare const data: Data;
export { data };

export default defineLoader({
  watch: ["../../../../packages/sit-onyx/src/i18n/locales/*.json"],
  load(watchedFiles): Data {
    const languages = watchedFiles.map((path) => {
      const fileContent = JSON.parse(fs.readFileSync(path, "utf-8"));
      const name = path.split("/").at(-1).replace(".json", "");
      return { name, fileContent, keyCount: countKeys(fileContent) };
    });

    const totalKeys = languages.find((i) => i.name === "en-US").keyCount ?? 0;

    return { languages, totalKeys };
  },
});

const countKeys = (obj: object) => {
  return Object.values(obj).reduce<number>((total, value) => {
    if (!value) return total;
    if (typeof value === "object") return total + countKeys(value);
    return total + 1;
  }, 0);
};
