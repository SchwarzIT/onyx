import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { RegisterableResource } from "../types.js";
import { cached } from "../util/cached.js";
import { retrieveOnyxDesignTokens } from "../util/onyx-css-design-tokens.js";

export const listCssDesignTokens: RegisterableResource = [
  "list-css-design-tokens",
  new ResourceTemplate("css-design-token://sit-onyx/{version}", {
    list: undefined,
  }),
  {
    title: "List @sit-onyx/icons design-tokens by their CSS custom property name",
    description:
      "List all allowed design tokens with their CSS custom property name in a specific version of sit-onyx",
    mimeType: "text/markdown",
  },
  cached(async (uri, { version: _version }) => {
    const version = Array.isArray(_version) ? _version[0] : _version;
    const tokens = await retrieveOnyxDesignTokens(version);

    const title = `# Design Tokens for \`sit-onyx@${version}\`\n\n`;
    const content = tokens.map((n) => `- \`${n}\``).join("\n");
    const text = `${title}${content}`;
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
