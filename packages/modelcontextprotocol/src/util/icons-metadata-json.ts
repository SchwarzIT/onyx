import { SIT_ONYX_ICONS_METADATA_FILE, USER_AGENT } from "../config.js";
import type { IconMetadata } from "../types.js";
import { getSingleFileFromPackage } from "./package.js";

export async function retrieveIconsMetadataJsonFile(versionOrTag: string): Promise<IconMetadata> {
  const data = await getSingleFileFromPackage(
    { name: "@sit-onyx/icons", versionOrTag },
    (header) => header.name === SIT_ONYX_ICONS_METADATA_FILE,
    USER_AGENT,
  );
  return JSON.parse(data.toString("utf-8"));
}
