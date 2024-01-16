import { useArgs } from "@storybook/preview-api";
import type { ArgTypes, Meta } from "@storybook/vue3";
import { deepmerge } from "deepmerge-ts";
import { isReactive, reactive, watch } from "vue";
import type {
  ArrayElement,
  DefineStorybookActionsAndVModelsOptions,
  ExtractVueEventNames,
} from ".";

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
    decorators: [withVModelDecorator(options.events)],
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
 * Defines a custom decorator that will implement event handlers for all v-models
 * so that the Storybook controls are updated live when the user interacts with the component
 *
 * @example
 * ```ts
 * import Input from './Input.vue';
 *
 * {
 *   decorators: [withVModelDecorator<typeof Input>(["update:modelValue"])]
 * }
 * ```
 */
export const withVModelDecorator = <T>(
  events: ExtractVueEventNames<T>[],
): ArrayElement<Meta<T>["decorators"]> => {
  return (story, ctx) => {
    const vModelEvents = events.filter((event) => event.startsWith("update:"));
    if (!vModelEvents.length) return story();

    const [args, updateArgs] = useArgs();

    // proxy the args so that we can add custom event handlers for all v-models below
    // the destructuring is needed to fix the Storybook issue that the code preview is broken
    const proxiedArgs = reactive({ ...args });

    vModelEvents.forEach((eventName) => {
      const propName = eventName.replace("update:", "");
      const argName = `onUpdate:${propName}`;
      const originalEventHandler = proxiedArgs[argName];

      // emit event to update the value of the property inside the Storybook controls / table.
      const updateVModel = (newValue?: unknown) => {
        updateArgs({ [propName]: newValue });
        proxiedArgs[propName] = newValue;
      };

      // proxy the original event handler to additionally call our custom `updateVModel` function
      proxiedArgs[argName] = (...args: unknown[]) => {
        const newValue = args.at(0);
        updateVModel(newValue);
        if (typeof originalEventHandler === "function") originalEventHandler(...args);
      };
    });

    // since we are proxying the args, we need to watch the "original" `args` to
    // reflect the changes when the user updates the control/input for a property inside Storybooks property table
    if (isReactive(args)) {
      watch(args, (newArgs) => {
        for (const key in newArgs) {
          if (key.startsWith("onUpdate:")) continue;
          proxiedArgs[key] = newArgs[key];
        }
      });
    }

    ctx.args = proxiedArgs as typeof ctx.args;
    return story(ctx);
  };
};

/** Capitalizes the first letter of the given string */
const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
