import { injectI18n } from "../../../i18n";
import { allObjectEntries } from "../../../utils/objects";
import type { DataGridEntry } from "../types";
import HeaderCell from "./HeaderCell.vue";
import type { DataGridFeature, TypeRenderer, TypeRenderMap } from "./index";
import "./renderer.scss";

export type DefaultSupportedTypes = "string" | "number";

const numberFormatter = <TEntry extends DataGridEntry>(value: TEntry[keyof TEntry] | undefined) => {
  const locale = injectI18n().locale;
  const formatter = new Intl.NumberFormat(locale.value);

  // We format the given value as Number. In case it renders as NaN, we replace it with `-`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- The typing is incorrect, the `format` method accepts any value
  return formatter.format(value as any).replace("NaN", "-");
};

const NUMBER_RENDERER = Object.freeze({
  cell: {
    component: (props) => numberFormatter(props.modelValue),
    tdAttributes: { class: "onyx-data-grid-number-cell" },
  },
}) satisfies TypeRenderer<DataGridEntry>;

const STRING_RENDERER = Object.freeze({
  header: { component: HeaderCell },
  cell: { component: (props) => String(props.modelValue) },
}) satisfies TypeRenderer<DataGridEntry>;

const BASE_RENDERER_MAP = Object.freeze({
  number: NUMBER_RENDERER,
  string: STRING_RENDERER,
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
