import { useArgs } from "@storybook/client-api";
import type { ArgTypes, Meta } from "@storybook/vue3";
import { deepmerge } from "deepmerge-ts";
import type { DefineStorybookActionsAndVModelsOptions, ExtractVueEventNames } from ".";

/**
 * Utility to define Storybook meta for a given Vue component which will take care of defining argTypes for
 * the given events as well as implementing v-model handlers so that the Storybook controls are updated when you interact with the component.
 * Should be preferred over manually defining argTypes for *.stories.ts files.
 *
 * @example
 * ```ts
 * // Input.stories.ts
 * import { defineStorybookActionsAndVModels } from '@sit-onyx/storybook-utils';
 * import type { Meta } from '@storybook/vue3';
 * import Input from './Input.vue';
 *
 * const meta: Meta<typeof Input> = {
 *   title: 'components/Input',
 *   ...defineStorybookActionsAndVModels({
 *     component: Input,
 *     events: ['update:modelValue', 'change'],
 *   }),
 * };
 * ```
 */
export const defineStorybookActionsAndVModels = <T>(
  options: DefineStorybookActionsAndVModelsOptions<T>,
): Meta<T> => {
  const defaultMeta = {
    argTypes: {
      ...defineActions(options.events),
      ...{}, // this is needed to fix a type issue
    },
    decorators: [
      (story, context) => {
        // provide the `updateArgs` function so we can use it in the render() function below
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, updateArgs] = useArgs();
        return story({ ...context, updateArgs });
      },
    ],
    /**
     * Define a custom render function will provide event handlers for all v-models
     * so that the Storybook controls are updated live when the user interacts with the component
     */
    render: defineRenderFunctionForVModels(options),
  } satisfies Meta<T>;

  return deepmerge(options, defaultMeta);
};

/**
 * Defines Storybook actions ("argTypes") for the given events.
 * Reason for this wrapper function is that Storybook expects event names to be prefixed
 * with "on", e.g. "onClick".
 *
 * However in Vue, the event names are plain like "click" instead of "onClick" because
 * otherwise we would use it like "@on-click="..."" which is redundant.
 *
 * So this utility will remove the on[eventName] entry from the Storybook panel/table
 * and register the correct eventName as action so it is logged in the "Actions" tab.
 *
 * @example defineActions(["click", "input"])
 */
export const defineActions = <T>(events: ExtractVueEventNames<T>[]): ArgTypes => {
  return events.reduce<ArgTypes>((argTypes, eventName) => {
    argTypes[`on${capitalizeFirstLetter(eventName)}`] = {
      table: { disable: true },
      action: eventName,
    };

    argTypes[eventName] = { control: false };
    return argTypes;
  }, {});
};

/**
 * Defines a custom render function that will provide event handlers for all v-models
 * so that the Storybook controls are updated live when the user interacts with the component
 */
const defineRenderFunctionForVModels = <T>(
  options: Pick<DefineStorybookActionsAndVModelsOptions<T>, "component" | "events">,
): Meta<T>["render"] => {
  const componentName = options.component.__name;
  const vModelEvents = options.events.filter((event) => event.startsWith("update:"));

  // if the component does not have any v-models, we don't need to specify a custom render function
  if (!vModelEvents.length || !componentName) return;

  return (args, context) => {
    /**
     * Mapped event handlers, e.g. `["update:modelValue"]` will be changed to:
     *
     * @example
     * ```ts
     * const eventHandler = {
     *    updateModelValue: (value) => updateArgs({ modelValue: value })
     * }
     * ```
     */
    const eventHandlers = vModelEvents.reduce<Record<string, () => void>>((handler, event) => {
      const methodName = vModelEventToMethodName(event);
      handler[methodName] = (value?: unknown) =>
        context.updateArgs({ [event.replace("update:", "")]: value });
      return handler;
    }, {});

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      components: { [componentName]: options.component } as Record<string, any>,
      setup: () => ({ args, ...eventHandlers }),
      /**
       * Add v-model event handlers to source code
       *
       * @example
       * ```html
       * <MyComponent v-bind="args" @update:modelValue="updateModelValue" />
       * ```
       */
      template: `<${componentName} v-bind="args" ${vModelEvents
        .map((event) => `@${event}="${vModelEventToMethodName(event)}"`)
        .join(" ")} />`,
    };
  };
};

/** Capitalizes the first letter of the given string */
const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * Converts a v-model event name to a corresponding method name.
 * @example "update:modelValue" => "updateModelValue"
 */
const vModelEventToMethodName = (eventName: string) => {
  const index = eventName.indexOf(":");
  return `${eventName.substring(0, index)}${eventName[
    index + 1
  ].toUpperCase()}${eventName.substring(index + 2)}`;
};
