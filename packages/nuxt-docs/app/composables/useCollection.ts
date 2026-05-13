import type { Collections } from "@nuxt/content";

export type UseCollectionOptions<TCollection extends keyof Collections = keyof Collections> = {
  /**
   * Collection name to query.
   */
  collection: MaybeRef<TCollection>;
  /**
   * Path to query the collection item for.
   *
   * @default Current locale route.
   */
  path?: MaybeRef<string>;
};

/**
 * Composable for loading the collection data for the current route and locale.
 */
export const useCollection = async <TCollection extends keyof Collections = keyof Collections>(
  options: UseCollectionOptions<TCollection>,
) => {
  const nuxtApp = useNuxtApp();

  const route = useRoute();
  const localePath = useLocalePath();

  const collection = computed(() => toValue(options.collection));
  const path = computed(() => toValue(options.path) ?? localePath(route.path));

  const { data: collectionData } = await useAsyncData(
    () => `collection-${collection.value}-${path.value}`,
    () => queryCollection(collection.value).path(path.value).first(),
  );

  watch(
    collectionData,
    (newValue) => {
      // if data is "null", the page content was not found. "undefined" means it is not loaded yet
      if (newValue !== null) return;
      throw showError({
        message: "Page not found",
        statusCode: 404,
        fatal: true,
      });
    },
    { immediate: true },
  );

  const data = computed<Collections[TCollection]>((previousData) => {
    // fallback to previousData here is used because the data is undefined when then key for "useAsyncData" changes
    // e.g. due to routing. We keep the previous data until the new one is loaded so the data is never "undefined"
    return (collectionData.value ?? previousData) as Collections[TCollection];
  });

  // runWithContext is needed due to async usage above
  nuxtApp.runWithContext(() => {
    useSeoMeta({
      title: () => data.value.seo.title,
      description: () => data.value.seo.description,
    });
  });

  return { data };
};
