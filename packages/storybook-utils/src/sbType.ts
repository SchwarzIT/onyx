import type {
  ArgTypesEnhancer,
  InputType,
  SBType,
  StrictInputType,
} from "storybook/internal/types";

/**
 * Call a function `cb` for every type node in the storybook type tree.
 * @param inputType the root type
 * @param cb the function that is called for every type. If any non-nullish value is returned by `cb` the execution is stopped and this value is returned.
 * @param parent optional, the parent type. Is only used as input for the `cb` function and provided when recursing.
 * @returns the first non-nullish value that is returned by `cb`
 */
export const walkTree = <TValue>(
  inputType: SBType,
  cb: (sb: SBType, parent?: SBType) => TValue,
  parent?: SBType,
): TValue | undefined => {
  const shouldReturn = cb(inputType, parent);
  if (shouldReturn) {
    return shouldReturn;
  }

  if (inputType.name === "union" || inputType.name === "intersection") {
    return inputType.value.reduce<TValue | undefined>(
      (prev, it) => prev ?? walkTree(it, cb, inputType),
      undefined,
    );
  }
  if (inputType.name === "array") {
    return walkTree(inputType.value, cb, inputType);
  }
  if (inputType.name === "object") {
    return Object.values(inputType.value).reduce<TValue | undefined>(
      (prev, it) => prev ?? walkTree(it, cb, inputType),
      undefined,
    );
  }
};

const SB_TYPE_CONTROL_MAP: Partial<Record<SBType["name"], InputType["control"]>> = {
  boolean: { type: "boolean" },
  string: { type: "text" },
  number: { type: "number" },
};

const getFormInjectedParent = (symbol: string, inputType?: StrictInputType) => {
  if (!inputType?.type || inputType.table?.defaultValue?.summary !== symbol) {
    return undefined;
  }

  return walkTree(inputType.type, (elem, parent) =>
    elem.name === "symbol" || (elem.name === "other" && elem.value === "unique symbol")
      ? parent
      : undefined,
  );
};

/**
 * Can be used to create an `ArgTypesEnhancer` which matches a Symbol that is used as default Prop.
 * When it matches the passed  description text will be set.
 *
 * @param symbol description of the symbol that should be matched.
 * @param description the description text that should be shown in Storybook for this prop.
 * @returns An `ArgTypesEnhancer` which can be passed to storybook.
 *
 * @example
 * ```ts
 * import { createSymbolArgTypeEnhancer } from "@sit-onyx/storybook-utils";
 *
 * export const enhanceFormInjectedSymbol = createSymbolArgTypeEnhancer(
 *   "FORM_INJECTED_SYMBOL",
 *   "If no value (or `undefined`) is provided, `FORM_INJECTED_SYMBOL` is the internal default value for this prop.\n" +
 *     "In that case the props value will be derived from it's parent form (if it exists).\n",
 * );
 * ```
 */
export const createSymbolArgTypeEnhancer = (
  symbol: string,
  description: string,
): ArgTypesEnhancer => {
  return (context) => {
    Object.values(context.argTypes)
      .map((argType) => {
        const parent = getFormInjectedParent(symbol, argType);
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
          argType.table.defaultValue.detail = description;
        }
      });

    return context.argTypes;
  };
};
