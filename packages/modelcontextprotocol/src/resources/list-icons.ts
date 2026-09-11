import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { IconMetadata, RegisterableResource } from "../types.js";
import { cached } from "../util/cached.js";
import { retrieveIconsMetadataJsonFile } from "../util/icons-metadata-json.js";

export const listIcons: RegisterableResource<true> = [
  "list-icons",
  new ResourceTemplate("sit-onyx://icons/{version}", {
    list: undefined,
  }),
  {
    title: "List @sit-onyx/icons icons",
    description: "List all icons available in a specific version of @sit-onyx/icons",
    mimeType: "text/markdown",
  },
  cached(async (uri, { version: _version }) => {
    const version = Array.isArray(_version) ? _version[0] : _version;
    const iconsMetadata = await retrieveIconsMetadataJsonFile(version);

    const categoryMap = new Map<string, (IconMetadata[string] & { name: string })[]>();
    Object.entries(iconsMetadata).forEach(([name, data]) => {
      if (!categoryMap.has(data.category)) {
        categoryMap.set(data.category, []);
      }
      categoryMap.get(data.category)!.push({ name, ...data });
    });

    const categoriesText = categoryMap
      .entries()
      .toArray()
      .toSorted(([a], [b]) => a.localeCompare(b))
      .map(([category, icons]) => {
        const iconList = icons
          .map(({ aliases, name }) => `- \`${name}\` (aliases: ${aliases.join(", ")})`)
          .join("\n");
        return `## ${category}

${iconList}`;
      })
      .join("\n\n");

    const text = `# Icons for \`@sit-onyx/icons@${version}\`

This is a list of all icons offered by the \`@sit-onyx/icons@${version}\` package.
The icons are grouped by category.

${categoriesText}`;

    return {
      contents: [
        {
          uri: uri.href,
          text,
          mimeType: "text/markdown",
        },
      ],
    };
  }),
];
