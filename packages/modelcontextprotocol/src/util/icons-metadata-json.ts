import { SIT_ONYX_ICONS_METADATA_FILE, USER_AGENT } from "../config.js";
import type { IconMetadata } from "../types.js";
import { cached } from "./cached.js";
import { getFilesFromPackage } from "./package.js";

export const retrieveIconsMetadataJsonFile = cached(
  async (versionOrTag: string): Promise<IconMetadata> => {
    const [file] = await getFilesFromPackage(
      { name: "@sit-onyx/icons", versionOrTag },
      [SIT_ONYX_ICONS_METADATA_FILE],
      USER_AGENT,
    );
    return JSON.parse(file.data.toString("utf-8") ?? "");
  },
);
