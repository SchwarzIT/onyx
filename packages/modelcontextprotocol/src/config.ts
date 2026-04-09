import packageJson from "../package.json" with { type: "json" };
const { version } = packageJson;

export const USER_AGENT = `onyx-mcp/${version}`;
export const REGISTRY_URL = process.env.REGISTRY_URL ?? "https://registry.npmjs.org";

/**
 * Minimum `sit-onyx` version that provides `vue-component-meta`
 */
export const SIT_ONYX_MIN_VERSION = "1.12.0";
export const SIT_ONYX_COMPONENT_META_FILE = "package/dist/component-meta.json";
