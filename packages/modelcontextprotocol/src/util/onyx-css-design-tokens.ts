import { CssTypes, parse } from "@adobe/css-tools";
import {
  SIT_ONYX_DESIGN_TOKENS_FILE,
  SIT_ONYX_DESIGN_TOKENS_SPACINGS_FILE,
  USER_AGENT,
} from "../config.js";
import { cached } from "./cached.js";
import { getFilesFromPackage } from "./package.js";

export const retrieveOnyxDesignTokens = cached(async (versionOrTag: string) => {
  const files = await getFilesFromPackage(
    { name: "sit-onyx", versionOrTag },
    [SIT_ONYX_DESIGN_TOKENS_FILE, SIT_ONYX_DESIGN_TOKENS_SPACINGS_FILE],
    USER_AGENT,
  );

  return files.flatMap(({ data }) => {
    const css = data.toString();
    return parse(css)
      .stylesheet.rules.filter((e) => e.type === CssTypes.rule)
      .flatMap((r) => r.declarations)
      .map((d) => (d.type === CssTypes.declaration ? d.property : undefined))
      .filter((p) => p !== undefined)
      .filter((p) => p.startsWith("--"));
  });
});
