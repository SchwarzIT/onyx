import { injectI18n } from "../../../i18n";
import type { DatetimeFormat } from "../../../i18n/datetime-formats";
import { allObjectEntries } from "../../../utils/objects";
import type { DateValue } from "../../OnyxDatePicker/types";
import type { DataGridEntry } from "../types";
import HeaderCell from "./HeaderCell.vue";
import type { DataGridFeature, DefaultSupportedTypes, TypeRenderer, TypeRenderMap } from "./index";
import "./renderer.scss";

export const FALLBACK_RENDER_VALUE = "-" as const;

const numberFormatter = <TEntry extends DataGridEntry>(
  value: TEntry[keyof TEntry] | undefined,
): string => {
  // using loose "==" here to catch both undefined and null
  if (
    value == undefined ||
    value instanceof Date ||
    typeof value === "boolean" ||
    typeof value === "symbol"
  ) {
    return FALLBACK_RENDER_VALUE;
  }

  const { n } = injectI18n();

  // We format the given value as Number. In case it renders as NaN, we replace it with `-`.
  // The typing is incorrect, the `format` method accepts any value
  return n.value(value as number, "decimal").replace("NaN", FALLBACK_RENDER_VALUE);
};

const stringFormatter = <TEntry extends DataGridEntry>(
  value: TEntry[keyof TEntry] | undefined,
): string => {
  // using loose "==" here to catch both undefined and null
  if (value == undefined) return FALLBACK_RENDER_VALUE;
  if (Array.isArray(value)) {
    return value
      .map((entry) => stringFormatter(entry))
      .filter((i) => i != FALLBACK_RENDER_VALUE)
      .join(", ");
  }
  if (value instanceof Date) return value.toString();
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const dateFormatter = <TEntry extends DataGridEntry>(
  value: TEntry[keyof TEntry] | undefined,
  type: DatetimeFormat,
): string => {
  // using loose "==" here to catch both undefined and null
  if (value == undefined || typeof value === "boolean") return FALLBACK_RENDER_VALUE;

  const { d } = injectI18n();

  try {
    const date = new Date(typeof value === "bigint" ? Number(value) : (value as DateValue));
    return d.value(date, type);
  } catch {
    return FALLBACK_RENDER_VALUE;
  }
};

const NUMBER_RENDERER = Object.freeze({
  cell: {
    component: (props) => numberFormatter(props.modelValue),
    tdAttributes: { class: "onyx-data-grid-number-cell" },
  },
}) satisfies TypeRenderer<DataGridEntry>;

const STRING_RENDERER = Object.freeze({
  header: { component: HeaderCell },
  cell: { component: (props) => stringFormatter(props.modelValue) },
}) satisfies TypeRenderer<DataGridEntry>;

const DATE_RENDERER = Object.freeze({
  header: { component: HeaderCell },
  cell: { component: (props) => dateFormatter(props.modelValue, "date") },
}) satisfies TypeRenderer<DataGridEntry>;

const DATETIME_RENDERER = Object.freeze({
  header: { component: HeaderCell },
  cell: { component: (props) => dateFormatter(props.modelValue, "datetime-local") },
}) satisfies TypeRenderer<DataGridEntry>;

const TIME_RENDERER = Object.freeze({
  header: { component: HeaderCell },
  cell: { component: (props) => dateFormatter(props.modelValue, "time") },
}) satisfies TypeRenderer<DataGridEntry>;

const TIMESTAMP_RENDERER = Object.freeze({
  header: { component: HeaderCell },
  cell: { component: (props) => dateFormatter(props.modelValue, "timestamp") },
}) satisfies TypeRenderer<DataGridEntry>;

const BASE_RENDERER_MAP = Object.freeze({
  number: NUMBER_RENDERER,
  string: STRING_RENDERER,
  date: DATE_RENDERER,
  "datetime-local": DATETIME_RENDERER,
  time: TIME_RENDERER,
  timestamp: TIMESTAMP_RENDERER,
}) satisfies Record<DefaultSupportedTypes, TypeRenderer<DataGridEntry>>;

export const createRenderer = <TEntry extends DataGridEntry>(
  features: DataGridFeature<TEntry, TypeRenderMap<TEntry>, symbol>[],
) => {
  const init = [
    ...Object.entries(BASE_RENDERER_MAP),
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
    getFor: <TComponent extends "cell" | "header">(
      component: TComponent,
      type?: PropertyKey,
    ): NonNullable<TypeRenderer<TEntry>[TComponent]> =>
      typeRendererMap.get(type!)?.[component] ?? STRING_RENDERER[component], // Map returns undefined if `type` is undefined, so it's safe to use the Non-Null assertion.
  };
};
