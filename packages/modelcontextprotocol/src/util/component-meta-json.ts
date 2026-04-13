import { SIT_ONYX_COMPONENT_META_FILE, USER_AGENT } from "../config.js";
import type { MetaSource } from "../types.js";
import { getSingleFileFromPackage } from "./package.js";

export async function retrieveComponentMetaJsonFile(versionOrTag: string): Promise<MetaSource[]> {
  const data = await getSingleFileFromPackage(
    { name: "sit-onyx", versionOrTag },
    (header) => header.name === SIT_ONYX_COMPONENT_META_FILE,
    USER_AGENT,
  );
  return JSON.parse(data.toString("utf-8"));
}
