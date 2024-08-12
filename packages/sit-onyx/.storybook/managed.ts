import { walkTree } from "@sit-onyx/storybook-utils";
import type {
  ArgTypesEnhancer,
  InputType,
  SBType,
  StrictInputType,
} from "storybook/internal/types";

const SB_TYPE_CONTROL_MAP: Partial<Record<SBType["name"], InputType["control"]>> = {
  boolean: { type: "boolean" },
  string: { type: "text" },
  number: { type: "number" },
};

const getManagedParent = (inputType?: StrictInputType) => {
  if (!inputType?.type || inputType.table?.defaultValue?.summary !== "MANAGED_SYMBOL") {
    return undefined;
  }

  return walkTree(inputType.type, (elem, parent) =>
    elem.name === "symbol" || (elem.name === "other" && elem.value === "unique symbol")
      ? parent
      : undefined,
  );
};

export const enhanceManagedSymbol: ArgTypesEnhancer = (context) => {
  Object.values(context.argTypes)
    .map((argType) => {
      const parent = getManagedParent(argType);
      return { argType, parent };
    })
    .filter(({ parent }) => parent)
    .forEach(({ argType, parent }) => {
      const firstAvailableControl = walkTree(
        parent || argType.type!,
        (sb) => SB_TYPE_CONTROL_MAP[sb.name],
      );

      if (firstAvailableControl && argType.table?.defaultValue) {
        argType.control = firstAvailableControl;
        argType.table.defaultValue.detail =
          "If no value (or `undefined`) is passed, `MANAGED_SYMBOL` is the internal default value for this prop.\n" +
          "It signals the component that the prop is managed and it's state tracked internally.\n" +
          "So in that case no prop binding or `v-model` is necessary.\n" +
          "Updates for the prop will still be emitted.\n";
      }
    });

  return context.argTypes;
};
