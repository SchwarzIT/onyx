import { SIT_ONYX_COMPONENT_META_FILE, USER_AGENT } from "../config.js";
import type { MetaSource } from "../types.js";
import { cached } from "./cached.js";
import { getFilesFromPackage } from "./package.js";

export const retrieveComponentMetaJsonFile = cached(
  async (versionOrTag: string): Promise<MetaSource[]> => {
    const [file] = await getFilesFromPackage(
      { name: "sit-onyx", versionOrTag },
      [SIT_ONYX_COMPONENT_META_FILE],
      USER_AGENT,
    );
    return JSON.parse(file.data.toString("utf-8") ?? "");
  },
);
