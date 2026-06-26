import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getAbbreviatedPackument } from "query-registry";
import { REGISTRY_URL, SIT_ONYX_MIN_VERSION } from "../config.js";
import type { RegisterableResource } from "../types.js";
import { retrieveComponentMetaJsonFile } from "../util/component-meta-json.js";
import { versionCompare } from "../util/version-compare.js";

export const listComponents: RegisterableResource<true> = [
  "list-components",
  new ResourceTemplate("sit-onyx://components/{version}", {
    list: async () => {
      const { versions } = await getAbbreviatedPackument("sit-onyx", REGISTRY_URL);
      const relevantVersions = Object.keys(versions).filter(
        (version) => versionCompare(SIT_ONYX_MIN_VERSION, version) >= 0,
      );
      const resources = relevantVersions.map((version) => ({
        uri: `components://sit-onyx/${version}`,
        name: `components for sit-onyx@${version}`,
      }));
      return { resources };
    },
  }),
  {
    title: "Component Overview",
    description: "Lists all components for a specific version of onyx",
    mimeType: "text/markdown",
  },
  async (uri, { version: _version }) => {
    const version = Array.isArray(_version) ? _version[0] : _version;
    const componentMetaJson = await retrieveComponentMetaJsonFile(version);
    const componentsText = componentMetaJson
      .toSorted((a, b) => a.displayName.localeCompare(b.displayName))
      .map(({ displayName, description }) => `## ${displayName}\n\n${description ?? ""}\n`)
      .join("\n");
    const text = `# Components for \`sit-onyx@${version}\`\n\n${componentsText}`;

    return {
      contents: [
        {
          uri: uri.href,
          text,
          mimeType: "text/markdown",
        },
      ],
    };
  },
];
