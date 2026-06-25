import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SkillMarkdown } from "../../env.js";
import type { RegisterableResource } from "../types.js";

const skills = import.meta.glob<SkillMarkdown>("./skills/*.md", { eager: true });

export const allSkills = Object.values(skills).map<RegisterableResource>(
  ({ default: text, frontmatter: { description, name } }) => {
    return [
      name,
      new ResourceTemplate(`skills://${name}/{version}`, {
        list: undefined,
      }),
      {
        title: name,
        description,
        mimeType: "text/markdown",
      },
      async (uri, { version: _version }) => ({
        contents: [
          {
            uri: uri.href,
            text,
            mimeType: "text/markdown",
          },
        ],
      }),
    ];
  },
);
