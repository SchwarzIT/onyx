import { mergeImportMap, useStore as useOriginalStore, useVueImportMap } from "@vue/repl";
import { computed, ref, watchEffect } from "vue";
import App from "../template/App.vue?raw";
import NewFile from "../template/NewFile.vue?raw";
import { fetchVersions } from "../utils/versions";

/**
 * Wrapper around `useStore` from `@vue/repl` which defines onyx-specific settings/options.
 */
export const useStore = () => {
  const { vueVersion, importMap } = useVueImportMap({ vueVersion: "latest" });

  /**
   * Currently selected onyx version.
   */
  const onyxVersion = ref("beta");

  /**
   * List of available onyx versions.
   */
  const availableVersions = ref<string[]>([]);

  /**
   * Whether the list of onyx versions is loading.
   */
  const isLoadingOnyxVersions = ref(true);

  fetchVersions("sit-onyx")
    .then((versions) => (availableVersions.value = versions))
    .finally(() => (isLoadingOnyxVersions.value = false));

  const store = useOriginalStore(
    {
      vueVersion,
      typescriptVersion: ref("latest"),
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
          onyxVersion.value.includes(".") || !availableVersions.value.length
            ? onyxVersion.value
            : availableVersions.value[0];
        return { "sit-onyx": version };
      }),
    },
    // initialize repl with previously serialized state
    location.hash.slice(1),
  );

  // persist state in URL
  watchEffect(() => history.replaceState({}, "", store.serialize()));

  return { store, onyxVersion, isLoadingOnyxVersions };
};
