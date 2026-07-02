import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { RegisterableResource } from "../types.js";
import { retrieveComponentMetaJsonFile } from "../util/component-meta-json.js";

/**
 * Returns true if both parameters are defined and equal (ignoring surrounding whitespaces and case)
 */
const compareDefined = (a: string | undefined | null, b: string | undefined | null) =>
  a && b && a.trim().toLowerCase() === b.trim().toLowerCase();

type Tag = {
  name?: string;
  text?: string;
};

const tagsToList = (tags: Tag[]) =>
  tags
    .filter(({ name }) => !!name)
    .map(({ text, name }) => `- ${name}: ${text}`)
    .join("\n");

export const getComponentApi: RegisterableResource<true> = [
  "get-component-api",
  new ResourceTemplate("sit-onyx://components/{version}/{component}", {
    list: undefined,
  }),
  {
    title: "Get Component API",
    description: "Gets the component API for a specific component and version of onyx",
    mimeType: "text/markdown",
  },
  async (uri, { version: _version, component: _component }) => {
    const version = Array.isArray(_version) ? _version[0] : _version;
    const component = Array.isArray(_component) ? _component[0] : _component;
    const componentMetaJson = await retrieveComponentMetaJsonFile(version);
    const componentMeta = componentMetaJson.find(
      ({ displayName, name }) =>
        compareDefined(displayName, component) || compareDefined(name, component),
    );

    if (!componentMeta) {
      throw new Error(`Component ${component} not found for version ${version}`);
    }

    // TODO: improve code readability through use of better templating

    const propsText = componentMeta.props
      .map(
        (prop) => `### ${prop.name}

- required: ${prop.required}
- type: ${prop.type}
${tagsToList(prop.tags)}

${prop.description}`,
      )
      .join("\n\n");

    const slotsText = componentMeta.slots
      .map(
        (slot) => `### ${slot.name}

${tagsToList(slot.tags)}

${slot.description}`,
      )
      .join("\n\n");

    const eventsText = componentMeta.events
      .map(
        (event) => `### ${event.name}

- type: ${event.type}
${tagsToList(event.tags)}

${event.description}`,
      )
      .join("\n\n");

    const exposedText = componentMeta.exposed
      .map(
        (exposed) => `### ${exposed.name}

- type: ${exposed.type}
${tagsToList(exposed.tags)}

${exposed.description}`,
      )
      .join("\n\n");

    const text = `# Component API of \`${componentMeta.displayName}\`

*Version: \`sit-onyx@${version}\`*

## Props

${propsText}

## Slots

${slotsText}

## Events

${eventsText}

## Exposed

${exposedText}
`;

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
