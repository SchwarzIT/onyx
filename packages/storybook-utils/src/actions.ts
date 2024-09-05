import type { Decorator } from "@storybook/vue3";
import { useArgs } from "storybook/internal/preview-api";
import type { ArgTypesEnhancer, StrictInputType } from "storybook/internal/types";
import { isReactive, reactive, watch } from "vue";

/**
 * Adds actions for all argTypes of the 'event' category, so that they are logged via the actions plugin.
 */
export const enhanceEventArgTypes: ArgTypesEnhancer = ({ argTypes }) => {
  Object.values(argTypes)
    .filter(({ table }) => table?.category === "events")
    .forEach(({ name }) => {
      const eventName = `on${capitalizeFirstLetter(name)}`;
      if (eventName in argTypes) {
        return;
      }
      argTypes[eventName] = {
        name: eventName,
        table: { disable: true },
        action: eventName,
      };
    });
  return argTypes;
};

export type WithVModelDecoratorOptions = {
  /**
   * The matcher for the v-model events.
   * @default /^update:/
   */
  filter: (argType: StrictInputType) => boolean;
};

/**
 * Defines a custom decorator that will implement event handlers for all v-models,
 * so that the Storybook controls are updated live when the user interacts with the component.
 * This ensures that the story and component props stay in sync.
 *
 * @example
 * ```ts
 * // .storybook/preview.ts
 *
 * {
 *   decorators: [withVModelDecorator()]
 * }
 * ```
 */

export const withVModelDecorator = (options?: WithVModelDecoratorOptions): Decorator => {
  return (story, ctx) => {
    const vModelFilter =
      options?.filter ||
      (({ table, name }) => table?.category === "events" && name.startsWith("update:"));

    const vModelEvents = Object.values(ctx.argTypes)
      .filter(vModelFilter)
      .map(({ name }) => name);

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
