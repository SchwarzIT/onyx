// import OnyxInput from "src/components/OnyxInput/OnyxInput.vue";
// import { computed, h, toRef, toValue, type Ref } from "vue";
// import { createFeature } from "..";
// import OnyxMenuItem from "../../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
// import type { DataGridEntry } from "../../types";
// import FilterAction from "./FilterAction.vue";
// import type { FilterOptions, FilterState } from "./types";

// export const FILTERING_FEATURE = Symbol("Filtering");

// export const useFiltering = createFeature(
//   <TEntry extends DataGridEntry>(options?: FilterOptions<TEntry>) => {
//     const filter: Ref<FilterState<TEntry>> = toRef(
//       options?.filter ?? {
//         column: undefined,
//         filter: "",
//       },
//     );

//     const getFilterFunc = computed(() => (col: keyof TEntry) => {
//       const config = toValue(options?.columns);
//       return config?.[col]?.filterFunc ?? (() => true); // Standard: keine Filterung
//     });

//     const getFilterEnabled = computed(() => (col: keyof TEntry) => {
//       const config = toValue(options?.columns);
//       return !config || config?.[col]?.enabled === true;
//     });

//     const filterData = (data: Readonly<TEntry>[]) => {
//       const { column, filter: value } = filter.value;
//       if (!column || !value) return data; // Kein Filter aktiv
//       const filterFunc = getFilterFunc.value(column);
//       return data.filter((entry) => filterFunc(entry[column as keyof any], value));
//     };

//     const isFilterActive = computed(() => (column: keyof DataGridEntry) => {
//       return filter.value.column === column;
//     });

//     const handleInput = (column: keyof TEntry, value: string) => {
//       filter.value = {
//         column,
//         filter: value,
//       };
//     };

//     const getMenuItem = (column: keyof DataGridEntry) => {
//       return h(
//         OnyxMenuItem,
//         {
//           active: isFilterActive.value(column),
//         },
//         () => [
//           h(OnyxInput, {
//             placeholder: "Filter eingeben",
//             modelValue: filter.value.filter,
//             "onUpdate:modelValue": (val: string) => handleInput(column, val),
//           }),
//         ],
//       );
//     };

//     return {
//       name: FILTERING_FEATURE,
//       watch: [filter],
//       mutation: {
//         func: filterData,
//       },
//       header: {
//         actions: (column) => {
//           if (!getFilterEnabled.value(column)) return [];
//           return [
//             {
//               iconComponent: h(FilterAction, {
//                 buttonLabel: String(column),
//                 filter: "hi",
//               }),
//               menuItems: [getMenuItem(column)],
//             },
//           ];
//         },
//       },
//     };
//   },
// );
