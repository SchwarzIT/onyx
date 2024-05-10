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
  };
});

export const getComponentMeta = (componentName: string) => {
  const prefixedComponentName = `Onyx${componentName}`;

  const meta = metaChecker.getComponentMeta(
    getFilePath(
      `../../../../packages/sit-onyx/src/components/${prefixedComponentName}/${prefixedComponentName}.vue`,
    ),
  );

  const sortByName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);

  return {
    props: meta.props
      .filter((prop) => !prop.global)
      .sort(sortByName)
      .sort((a, b) => {
        if (a.required && !b.required) return -1;
        if (!a.required && b.required) return 1;
        return 0;
      }),
    events: meta.events.sort(sortByName),
    slots: meta.slots.sort(sortByName),
    // remove redundant expose information
    exposed: meta.exposed
      .filter((expose) => {
        if (expose.name === "$slots") return false;
        const isProp = meta.props.find((prop) => prop.name === expose.name);
        const isEvent = meta.events.find((event) => expose.name === `on${capitalize(event.name)}`);
        if (isProp || isEvent) return false;
        return true;
      })
      .sort(sortByName),
  } satisfies Omit<ComponentMeta, "type">;
};
