import { mergeImportMap, useStore as useOriginalStore, useVueImportMap } from "@vue/repl";
import { computed, ref, watch, watchEffect } from "vue";
import App from "../template/App.vue?raw";
import NewFile from "../template/NewFile.vue?raw";
import { fetchVersions } from "../utils/versions";

/**
 * Wrapper around `useStore` from `@vue/repl` which defines onyx-specific settings/options.
 */
export const useStore = () => {
  const { vueVersion, importMap } = useVueImportMap({ vueVersion: "latest" });

  const query = new URLSearchParams(location.search);

  /**
   * Currently selected onyx version.
   */
  const onyxVersion = ref(query.get("onyxVersion") || "beta");

  /**
   * List of available onyx versions.
   */
  const availableOnyxVersions = ref<string[]>([]);

  /**
   * Whether the list of onyx versions is loading.
   */
  const isLoadingOnyxVersions = ref(true);

  fetchVersions("sit-onyx")
    .then((versions) => (availableOnyxVersions.value = versions))
    .finally(() => (isLoadingOnyxVersions.value = false));

  const store = useOriginalStore(
    {
      vueVersion,
      typescriptVersion: ref(query.get("typescriptVersion") || "latest"),
      template: ref({
        newSFC: NewFile,
        welcomeSFC: App,
      }),
      builtinImportMap: computed(() =>
        mergeImportMap(importMap.value, {
          imports: {
            "sit-onyx": `https://cdn.jsdelivr.net/npm/sit-onyx@${onyxVersion.value}/dist/index.js`,
          },
        }),
      ),
      /**
       * Specify onyx version which is needed for the Monaco editor so that is loads the correct types for the current version
       */
      dependencyVersion: computed(() => {
        // the dependencyVersion must be a real version number and not a range like "alpha"
        const version =
          onyxVersion.value.includes(".") || !availableOnyxVersions.value.length
            ? onyxVersion.value
            : availableOnyxVersions.value[0];
        return { "sit-onyx": version };
      }),
    },
    // initialize repl with previously serialized state
    location.hash.slice(1),
  );

  watch(onyxVersion, (newVersion) => {
    updateQueryParam("onyxVersion", newVersion);
  });
  watch(
    () => store.typescriptVersion,
    (newVersion) => {
      updateQueryParam("typescriptVersion", newVersion);
    },
  );

  const updateQueryParam = (key: string, value: string) => {
    const url = new URL(location.href);
    url.searchParams.set(key, value);
    history.pushState(null, "", url);
  };

  // persist state in URL
  watchEffect(() => history.replaceState({}, "", store.serialize()));

  return { store, onyxVersion, isLoadingOnyxVersions };
};
