import { injectI18n } from "../../../i18n";
import { allObjectEntries } from "../../../utils/objects";
import type { DataGridEntry } from "../types";
import HeaderCell from "./HeaderCell.vue";
import type { DataGridFeature, TypeRenderer, TypeRenderMap } from "./index";

export type DefaultSupportedTypes = "string" | "number";

const numberFormatter = <TEntry extends DataGridEntry>(value: TEntry[keyof TEntry] | undefined) => {
  if (typeof value !== "number") {
    return;
  }
  const locale = injectI18n().locale;
  const formatter = new Intl.NumberFormat(locale.value);

  return formatter.format(value);
};

const NUMBER_RENDERER = Object.freeze({
  cell: {
    component: (props) => numberFormatter(props.modelValue),
    tdAttributes: { class: "onyx-text--monospace" },
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
