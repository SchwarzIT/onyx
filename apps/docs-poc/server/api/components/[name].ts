import fs from "node:fs/promises";
import { capitalize } from "vue";
import { ComponentMeta, createChecker } from "vue-component-meta";

const metaChecker = createChecker(getFilePath("../../../../packages/sit-onyx/tsconfig.app.json"), {
  forceUseTs: false,
  noDeclarations: true,
  printer: { newLine: 1 },
});

export default defineEventHandler(async (event) => {
  const componentName = getRouterParam(event, "name")!;

  const meta = getComponentMeta(componentName);
  return {
    name: componentName,
    meta,
    stories: await getStories(componentName),
  };
});

const getStories = async (componentName: string) => {
  try {
    const stories = await fs.readdir(
      getFilePath(`../../../../packages/sit-onyx/src/components/${componentName}/stories`),
    );
    return stories.filter((file) => file.endsWith(".vue")).map((file) => file.replace(".vue", ""));
  } catch {
    return [];
  }
};

const getComponentMeta = (componentName: string) => {
  const meta = metaChecker.getComponentMeta(
    getFilePath(
      `../../../../packages/sit-onyx/src/components/${componentName}/${componentName}.vue`,
    ),
  );

  const sortByName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);

  return {
    props: meta.props
      .filter((prop) => !prop.global)
      .toSorted(sortByName)
      .sort((a, b) => {
        if (a.required && !b.required) return -1;
        if (!a.required && b.required) return 1;
        return 0;
      }),
    events: meta.events.toSorted(sortByName),
    slots: meta.slots.toSorted(sortByName),
    // remove redundant expose information
    exposed: meta.exposed
      .filter((expose) => {
        if (expose.name === "$slots") return false;
        const isProp = meta.props.find((prop) => prop.name === expose.name);
        const isEvent = meta.events.find((event) => expose.name === `on${capitalize(event.name)}`);
        if (isProp || isEvent) return false;
        return true;
      })
      .toSorted(sortByName),
  } satisfies Omit<ComponentMeta, "type">;
};
