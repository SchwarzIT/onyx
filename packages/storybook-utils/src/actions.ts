import type { Decorator } from "@storybook/vue3";
import { action } from "storybook/actions";
import { useArgs } from "storybook/internal/preview-api";
import type { ArgTypes, ArgTypesEnhancer, StrictInputType } from "storybook/internal/types";
import { h, isReactive, reactive, watch, type Component, type Events } from "vue";
import type { ComponentProps, ComponentSlots } from "vue-component-type-helpers";
import { EVENT_DOC_MAP } from "./events";

type ComponentEmits<Props extends ComponentProps<unknown>> = keyof {
  [Key in keyof Props as Key extends `on${string}` ? Key : never]: true;
};

/**
 * Wraps the original component and adds [Storybook action logging](https://storybook.js.org/docs/essentials/actions).
 * This is useful for slotted child components that emit relevant events.
 *
 * Returns a wrapped component, which can be used in place of the original component.
 *
 * ```ts
 * import { createActionLoggerWrapper } from "@sit-onyx/storybook-utils";
 * import _ChildComponent from "./_ChildComponent.vue";
 *
 * // Usual story setup...
 *
 * const ChildComponent = createActionLoggerWrapper(_ChildComponent, ["onChildEmit"]);
 *
 * export const Default = {
 *   args: {
 *   propName: 'Value'
 *     someSlot: () => h(ChildComponent, { label: "Item 1" }),
 *   },
 * } satisfies Story;
 * ```
 */
export const createActionLoggerWrapper =
  <C extends Component>(component: C, emitsToLog: ComponentEmits<ComponentProps<C>>[]) =>
  (props: ComponentProps<C>, ctx: { slots: ComponentSlots<C> }) => {
    const entries = emitsToLog.map((emitName) => [
      emitName,
      // Log action in the format of `<component name> ~ <emit name>`
      action(`${(component as { __name: string }).__name} ~ ${String(emitName)}`),
    ]);
    const eventHandler = Object.fromEntries(entries);
    return h(
      component,
      {
        ...eventHandler,
        ...props,
      },
      ctx.slots,
    );
  };

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
        table: { disable: true }, // do not add a second table entry for event name prefixed with "on"
        action: name,
      };
    });
  return argTypes;
};

/**
 * Allows logging and documentation for the passed event listener names in Storybook.
 * Will be documented in a extra "Relevant HTML events" section in the Storybook documentation.
 *
 * @example
 * ```typescript
 * const meta: Meta<typeof OnyxButton> = {
 *   title: "Buttons/Button",
 *   component: OnyxButton,
 *   argTypes: {
 *     somethingElse: { ...someOtherArgType },
 *     ...withNativeEventLogging(["onClick"]),
 *  },
 *};
 * ```
 *
 * @param relevantEvents a list of event names that should be logged
 * @returns Storybook ArgTypes object
 */
export const withNativeEventLogging = (relevantEvents: (keyof Events)[]) =>
  relevantEvents.reduce((argTypes, eventName) => {
    const { constructor, event } = EVENT_DOC_MAP[eventName];
    argTypes[eventName] = {
      name: event.name,
      control: false,
      description: `The native HTML [${event.name}](${event.url}) event which dispatches an [${constructor.name}](${constructor.url}).`,
      table: {
        category: "Relevant HTML events",
        type: { summary: constructor.name },
      },
      action: event.name,
    };
    return argTypes;
  }, {} as ArgTypes);

export type WithVModelDecoratorOptions = {
  /**
   * The matcher for the v-model events.
   * @default /^update:/
   */
  filter: (argType: StrictInputType, index: number, array: StrictInputType[]) => boolean;
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
