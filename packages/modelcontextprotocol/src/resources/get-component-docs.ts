import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { RegisterableResource } from "../types.js";
import { retrieveComponentDocsMdFile } from "../util/component-docs-md.js";

export const getComponentDocs: RegisterableResource<true> = [
  "get-component-docs",
  new ResourceTemplate("sit-onyx://docs/{component}", {
    list: undefined,
  }),
  {
    title: "Get Component Docs",
    description: "Gets the component docs including code snippet examples.",
    mimeType: "text/markdown",
  },
  async (uri, { component: _component }) => {
    const component = Array.isArray(_component) ? _component[0] : _component;
    const text = await retrieveComponentDocsMdFile(component);

    if (!text) {
      throw new Error(`Component docs ${component} not found!`);
    }

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
