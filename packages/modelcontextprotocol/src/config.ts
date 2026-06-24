import packageJson from "../package.json" with { type: "json" };
const { version } = packageJson;

export const USER_AGENT = `onyx-mcp/${version}`;
export const REGISTRY_URL = process.env.REGISTRY_URL ?? "https://registry.npmjs.org";

/**
 * Minimum `sit-onyx` version that provides the `component-meta.json` file
 */
export const SIT_ONYX_MIN_VERSION = "1.12.0";
export const SIT_ONYX_COMPONENT_META_FILE = "package/dist/component-meta.json";
export const SIT_ONYX_DESIGN_TOKENS_FILE = "package/src/styles/variables/themes/onyx.css";
export const SIT_ONYX_DESIGN_TOKENS_SPACINGS_FILE = "package/src/styles/variables/spacing.css";
/**
 * Minimum `@sit-onyx/icons` version that provides the `metadata.json` file
 */
export const SIT_ONYX_ICONS_MIN_VERSION = "1.9.0";
export const SIT_ONYX_ICONS_METADATA_FILE = "package/dist/metadata.json";
