import { iconCheck, iconX } from "@sit-onyx/icons";
import { h } from "vue";
import OnyxSkeleton from "../../../components/OnyxSkeleton/OnyxSkeleton.vue";
import {
  injectI18n,
  type OnyxDateFormatOptions,
  type OnyxNumberFormatOptions,
} from "../../../i18n/index.js";
import { allObjectEntries } from "../../../utils/objects.js";
import type { DateValue } from "../../OnyxDatePicker/types.js";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import type { OnyxIconProps } from "../../OnyxIcon/types.js";
import OnyxVisuallyHidden from "../../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { DataGridEntry } from "../types.js";
import HeaderCell from "./HeaderCell.vue";
import { type DataGridFeatureDescription, type TypeRenderer, type TypeRenderMap } from "./index.js";
import "./renderer.scss";

export const FALLBACK_RENDER_VALUE = "-";

const fallback = (opts?: { fallback?: string }) => opts?.fallback ?? FALLBACK_RENDER_VALUE;

/**
 * Allows for creating `TypeRenderer` with typed options.
 * These options are then made available via the column configuration.
 *
 * While typeRenderer can be defined without this helper, they cannot define any options.
 */
export const createTypeRenderer = <
  TOptions = undefined,
  TEntry extends DataGridEntry = DataGridEntry,
>(
  typeRenderer: TypeRenderer<TEntry, TOptions>,
) => Object.freeze(typeRenderer);

export type NumberCellOptions = {
  format?: OnyxNumberFormatOptions;
  /**
   * Fallback value to display when the value is undefined or invalid.
   * Defaults to "-" if not provided.
   */
  fallback?: string;
};

export const numberFormatter = <TEntry extends DataGridEntry>(
  value: TEntry[keyof TEntry] | undefined,
  opts?: NumberCellOptions,
): string => {
  // using loose "==" here to catch both undefined and null
  if (
    value == undefined ||
    value instanceof Date ||
    typeof value === "boolean" ||
    typeof value === "symbol"
  ) {
    return fallback(opts);
  }

  const { n } = injectI18n();

  // We format the given value as Number. In case it renders as NaN, we replace it with `-`.
  // The typing is incorrect, the `format` method accepts any value
  return n.value(value as number, opts?.format ?? "decimal").replace("NaN", FALLBACK_RENDER_VALUE);
};

export const NUMBER_RENDERER = createTypeRenderer<NumberCellOptions>({
  header: { component: HeaderCell },
  cell: {
    component: ({ metadata, modelValue }) => numberFormatter(modelValue, metadata?.typeOptions),
    tdAttributes: { class: "onyx-data-grid-number-cell" },
  },
});

export type StringCellOptions = {
  /**
   * Fallback value to display when the value is undefined.
   * Defaults to "-" if not provided.
   */
  fallback?: string;
};

export const stringFormatter = <TEntry extends DataGridEntry>(
  value: TEntry[keyof TEntry] | undefined,
  opts?: StringCellOptions,
): string => {
  // using loose "==" here to catch both undefined and null
  if (value == undefined) return fallback(opts);
  if (Array.isArray(value)) {
    return value
      .map((entry) => stringFormatter(entry))
      .filter((i) => i != fallback(opts))
      .join(", ");
  }
  if (value instanceof Date) return value.toString();
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

export const STRING_RENDERER = createTypeRenderer<StringCellOptions>({
  header: { component: HeaderCell },
  cell: {
    component: (props) => stringFormatter(props.modelValue, props.metadata?.typeOptions),
  },
});

export type DateCellOptions = {
  format?: OnyxDateFormatOptions;
  /**
   * Fallback value to display when the value is undefined or invalid.
   * Defaults to "-" if not provided.
   */
  fallback?: string;
};

export const dateFormatter = <TEntry extends DataGridEntry>(
  value: TEntry[keyof TEntry] | undefined,
  opts?: DateCellOptions,
): string => {
  // using loose "==" here to catch both undefined and null
  if (value == undefined || typeof value === "boolean") return fallback(opts);

  const { d } = injectI18n();

  try {
    const date = new Date(typeof value === "bigint" ? Number(value) : (value as DateValue));
    return d.value(date, opts?.format);
  } catch {
    return fallback(opts);
  }
};

export const DATE_RENDERER = createTypeRenderer<DateCellOptions>({
  header: { component: HeaderCell },
  cell: {
    component: (props) =>
      dateFormatter(props.modelValue, { format: "date", ...props.metadata?.typeOptions }),
  },
});

export const DATETIME_RENDERER = createTypeRenderer<DateCellOptions>({
  header: { component: HeaderCell },
  cell: {
    component: (props) =>
      dateFormatter(props.modelValue, { format: "datetime-local", ...props.metadata?.typeOptions }),
  },
});

export const TIME_RENDERER = createTypeRenderer<DateCellOptions>({
  header: { component: HeaderCell },
  cell: {
    component: (props) =>
      dateFormatter(props.modelValue, { format: "time", ...props.metadata?.typeOptions }),
  },
});

export const TIMESTAMP_RENDERER = createTypeRenderer<DateCellOptions>({
  header: { component: HeaderCell },
  cell: {
    component: (props) =>
      dateFormatter(props.modelValue, { format: "timestamp", ...props.metadata?.typeOptions }),
  },
});
export const SKELETON_RENDERER = createTypeRenderer<StringCellOptions>({
  cell: {
    component: () => h(OnyxSkeleton),
  },
});

export type BooleanCellOptions = {
  /**
   * Icon to display when the value is truthy.
   */
  truthy?: BooleanCellIconOptions;
  /**
   * Icon to display when the value is falsy.
   */
  falsy?: BooleanCellIconOptions;
};

export type BooleanCellIconOptions = Partial<OnyxIconProps> & {
  /**
   * Label to display (visually hidden) for e.g. screen readers.
   *
   * @default "Yes" / "No" label depending on the current locale
   */
  label?: string;
};

export const BOOLEAN_RENDERER = createTypeRenderer<BooleanCellOptions>({
  header: { component: HeaderCell },
  cell: {
    tdAttributes: {
      class: "onyx-data-grid-boolean-cell",
    },
    component: ({ modelValue, metadata }) => {
      const value = Boolean(modelValue);
      const { t } = injectI18n();

      const truthyProps = {
        icon: iconCheck,
        label: t.value("yes"),
        ...metadata?.typeOptions?.truthy,
      } satisfies BooleanCellIconOptions;

      const falsyProps = {
        icon: iconX,
        label: t.value("no"),
        ...metadata?.typeOptions?.falsy,
      } satisfies BooleanCellIconOptions;

      const props = value ? truthyProps : falsyProps;

      return [
        h(OnyxIcon, props),
        // since icons are aria hidden (visual only), we include the value with OnyxVisuallyHidden here for screen readers
        h(OnyxVisuallyHidden, undefined, () => props.label),
      ];
    },
  },
});

export const createRenderer = <TEntry extends DataGridEntry>(
  features: DataGridFeatureDescription<TEntry, TypeRenderMap<TEntry>, symbol>[],
) => {
  const init = [
    ...features
      .flatMap(({ typeRenderer }) => typeRenderer! && allObjectEntries(typeRenderer))
      .filter(Boolean),
  ] as [PropertyKey, TypeRenderer<TEntry>][];

  /**
   * Maps type names to their respective component.
   */
  const typeRendererMap = new Map(init);

  return {
    /**
     * Returns a renderer for any given component and type.
     * Uses the fallbackRenderer if necessary.
     */
    getFor: <
      TComponent extends "cell" | "header",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- We don't care about the specific renderer type
      TRenderer extends NonNullable<TypeRenderer<TEntry, any>[TComponent]>,
    >(
      component: TComponent,
      type?: PropertyKey,
    ): TRenderer =>
      (typeRendererMap.get(type!)?.[component] ?? STRING_RENDERER[component]) as TRenderer, // Map returns undefined if `type` is undefined, so it's safe to use the Non-Null assertion.
  };
};
