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

const getFormInjectedParent = (inputType?: StrictInputType) => {
  if (!inputType?.type || inputType.table?.defaultValue?.summary !== "FORM_INJECTED_SYMBOL") {
    return undefined;
  }

  return walkTree(inputType.type, (elem, parent) =>
    elem.name === "symbol" || (elem.name === "other" && elem.value === "unique symbol")
      ? parent
      : undefined,
  );
};

export const enhanceFormInjectedSymbol: ArgTypesEnhancer = (context) => {
  Object.values(context.argTypes)
    .map((argType) => {
      const parent = getFormInjectedParent(argType);
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
          "If no value (or `undefined`) is provided, `FORM_INJECTED_SYMBOL` is the internal default value for this prop.\n" +
          "In that case the props value will be derived from it's parent form (if it exists).\n";
      }
    });

  return context.argTypes;
};
