//
// This file is only a temporary copy of the improved source code generation for Storybook.
// It is intended to be deleted once its officially released in Storybook itself, see:
// https://github.com/storybookjs/storybook/pull/27194
//
import { SourceType } from "@storybook/docs-tools";
import type { Args, StoryContext } from "@storybook/vue3";
import type { VNode } from "vue";
import { isVNode } from "vue";
import { replaceAll } from "./preview";

/**
 * Generate Vue source code for the given Story.
 * @returns Source code or empty string if source code could not be generated.
 */
export const generateSourceCode = (
  ctx: Pick<StoryContext, "title" | "component" | "args">,
): string => {
  const componentName = ctx.component?.__name || ctx.title.split("/").at(-1)!;

  const slotNames = extractSlotNames(ctx.component);
  const slotSourceCode = generateSlotSourceCode(ctx.args, slotNames);
  const propsSourceCode = generatePropsSourceCode(ctx.args, slotNames);

  if (slotSourceCode) {
    return `<template>
    <${componentName} ${propsSourceCode}> ${slotSourceCode} </${componentName}>
    </template>`;
  }

  // prefer self closing tag if no slot content exists
  return `<template>
  <${componentName} ${propsSourceCode} />
  </template>`;
};

/**
 * Checks if the source code generation should be skipped for the given Story context.
 * Will be true if one of the following is true:
 * - view mode is not "docs"
 * - story is no arg story
 * - story has set custom source code via parameters.docs.source.code
 * - story has set source type to "code" via parameters.docs.source.type
 */
export const shouldSkipSourceCodeGeneration = (context: StoryContext): boolean => {
  const sourceParams = context?.parameters.docs?.source;
  if (sourceParams?.type === SourceType.DYNAMIC) {
    // always render if the user forces it
    return false;
  }

  const isArgsStory = context?.parameters.__isArgsStory;
  const isDocsViewMode = context?.viewMode === "docs";

  // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.
  return (
    !isDocsViewMode || !isArgsStory || sourceParams?.code || sourceParams?.type === SourceType.CODE
  );
};

/**
 * Gets all slot names from the `__docgenInfo` of the given component if available.
 * Requires Storybook docs addon to be enabled.
 * Default slot will always be sorted first, remaining slots are sorted alphabetically.
 */
export const extractSlotNames = (
  component?: StoryContext["component"] & { __docgenInfo?: unknown },
): string[] => {
  if (!component || !("__docgenInfo" in component)) return [];

  // type check __docgenInfo to prevent errors
  if (!component.__docgenInfo || typeof component.__docgenInfo !== "object") return [];
  if (
    !("slots" in component.__docgenInfo) ||
    !component.__docgenInfo.slots ||
    !Array.isArray(component.__docgenInfo.slots)
  ) {
    return [];
  }

  return component.__docgenInfo.slots
    .map((slot) => slot.name)
    .filter((i): i is string => typeof i === "string")
    .sort((a, b) => {
      if (a === "default") return -1;
      if (b === "default") return 1;
      return a.localeCompare(b);
    });
};

/**
 * Generates the source code for the given Vue component properties.
 *
 * @param args Story args / property values.
 * @param slotNames All slot names of the component. Needed to not generate code for args that are slots.
 * Can be extracted using `extractSlotNames()`.
 */
export const generatePropsSourceCode = (
  args: Record<string, unknown>,
  slotNames: string[],
): string => {
  const props: string[] = [];

  Object.entries(args).forEach(([propName, value]) => {
    // ignore slots
    if (slotNames.includes(propName)) return;

    switch (typeof value) {
      case "string":
        if (value === "") return; // do not render empty strings

        if (value.includes('"')) {
          props.push(`${propName}='${value}'`);
        } else {
          props.push(`${propName}="${value}"`);
        }

        break;
      case "number":
        props.push(`:${propName}="${value}"`);
        break;
      case "bigint":
        props.push(`:${propName}="BigInt(${value.toString()})"`);
        break;
      case "boolean":
        props.push(value === true ? propName : `:${propName}="false"`);
        break;
      case "object":
        if (value === null) return; // do not render null values
        props.push(`:${propName}="${replaceAll(JSON.stringify(value), '"', "'")}"`);
        break;
      case "symbol": {
        const symbol = `Symbol(${value.description ? `'${value.description}'` : ""})`;
        props.push(`:${propName}="${symbol}"`);
        break;
      }
      case "function":
        // TODO: check if functions should be rendered in source code
        break;
    }
  });

  return props.join(" ");
};

/**
 * Generates the source code for the given Vue component slots.
 *
 * @param args Story args.
 * @param slotNames All slot names of the component. Needed to only generate slots and ignore props etc.
 * Can be extracted using `extractSlotNames()`.
 */
export const generateSlotSourceCode = (args: Args, slotNames: string[]): string => {
  /** List of slot source codes (e.g. <template #slotName>Content</template>) */
  const slotSourceCodes: string[] = [];

  slotNames.forEach((slotName) => {
    const arg = args[slotName];
    if (!arg) return;

    const slotContent = generateSlotChildrenSourceCode([arg]);
    if (!slotContent) return; // do not generate source code for empty slots

    // TODO: support generating bindings
    const bindings = "";

    if (slotName === "default" && !bindings) {
      // do not add unnecessary "<template #default>" tag since the default slot content without bindings
      // can be put directly into the slot without need of "<template #default>"
      slotSourceCodes.push(slotContent);
    } else {
      slotSourceCodes.push(`<template #${slotName}${bindings}>${slotContent}</template>`);
    }
  });

  return slotSourceCodes.join("\n\n");
};

/**
 * Generates the source code for the given slot children (the code inside <template #slotName></template>).
 */
const generateSlotChildrenSourceCode = (children: unknown[]): string => {
  const slotChildrenSourceCodes: string[] = [];

  /**
   * Recursively generates the source code for a single slot child and all its children.
   * @returns Source code for child and all nested children or empty string if child is of a non-supported type.
   */
  const generateSingleChildSourceCode = (child: unknown): string => {
    if (isVNode(child)) {
      return generateVNodeSourceCode(child);
    }

    switch (typeof child) {
      case "string":
      case "number":
      case "boolean":
        return child.toString();

      case "object":
        if (child === null) return "";
        if (Array.isArray(child)) {
          // if child also has children, we generate them recursively
          return child
            .map(generateSingleChildSourceCode)
            .filter((code) => code !== "")
            .join("\n");
        }
        return JSON.stringify(child);

      case "function": {
        const returnValue = child();
        return generateSlotChildrenSourceCode([returnValue]);
      }

      case "bigint":
        return `{{ BigInt(${child.toString()}) }}`;

      // the only missing case here is "symbol"
      // because rendering a symbol as slot / HTML does not make sense and is not supported by Vue
      default:
        return "";
    }
  };

  children.forEach((child) => {
    const sourceCode = generateSingleChildSourceCode(child);
    if (sourceCode !== "") slotChildrenSourceCodes.push(sourceCode);
  });

  return slotChildrenSourceCodes.join("\n");
};

/**
 * Generates source code for the given VNode and all its children (e.g. created using `h(MyComponent)` or `h("div")`).
 */
const generateVNodeSourceCode = (vnode: VNode): string => {
  let componentName = "component";
  if (typeof vnode.type === "string") {
    // this is e.g. the case when rendering native HTML elements like, h("div")
    componentName = vnode.type;
  } else if (typeof vnode.type === "object" && "__name" in vnode.type) {
    // this is the case when using custom Vue components like h(MyComponent)
    if ("name" in vnode.type && vnode.type.name) {
      // prefer custom component name set by the developer
      componentName = vnode.type.name;
    } else if ("__name" in vnode.type && vnode.type.__name) {
      // otherwise use name inferred by Vue from the file name
      componentName = vnode.type.__name;
    }
  }

  let childrenCode = "";

  if (typeof vnode.children === "string") {
    childrenCode = vnode.children;
  } else if (Array.isArray(vnode.children)) {
    childrenCode = generateSlotChildrenSourceCode(vnode.children);
  } else if (vnode.children) {
    // children are an object, just like if regular Story args where used
    // so we can generate the source code with the regular "generateSlotSourceCode()".
    childrenCode = generateSlotSourceCode(
      vnode.children,
      // $stable is a default property in vnode.children so we need to filter it out
      // to not generate source code for it
      Object.keys(vnode.children).filter((i) => i !== "$stable"),
    );
  }

  const props = vnode.props ? generatePropsSourceCode(vnode.props, []) : "";

  // prefer self closing tag if no children exist
  if (childrenCode)
    return `<${componentName}${props ? ` ${props}` : ""}>${childrenCode}</${componentName}>`;
  return `<${componentName}${props ? ` ${props}` : ""} />`;
};
