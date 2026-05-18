import type { Collections } from "@nuxt/content";

export type UseCollectionOptions<TCollection extends keyof Collections = keyof Collections> = {
  /**
   * Collection name to query.
   */
  collection: MaybeRef<TCollection>;
  /**
   * Path to query the collection item for.
   *
   * @default Current route.
   */
  path?: MaybeRef<string>;
};

/**
 * Composable for loading the collection data for the current route and locale.
 * Will throw an 404 error if the collection item could not be found.
 * Sets SEO data with `useSeoMeta()` automatically.
 */
export const useCollection = async <TCollection extends keyof Collections = keyof Collections>(
  options: UseCollectionOptions<TCollection>,
) => {
  const nuxtApp = useNuxtApp();
  const { locale } = useI18n();
  const route = useRoute();

  const collection = computed(() => toValue(options.collection));
  const path = computed(() => {
    let _path = toValue(options.path);
    if (_path) return _path;

    // get base path of current route (remove a potential locale prefix)
    _path = route.path;
    const localePrefix = `/${locale.value}`;

    if (_path.startsWith(localePrefix)) return _path.slice(localePrefix.length);
    return _path;
  });

  const { data: collectionData } = await useAsyncData(
    () => `collection-${collection.value}-${path.value}`,
    () => queryCollection(collection.value).path(path.value).first(),
  );

  const data = computed<Collections[TCollection] | undefined>(() => {
    return collectionData.value as Collections[TCollection];
  });

  watch(
    data,
    async (newValue) => {
      // if data is "null", the page content was not found. "undefined" means it is not loaded yet
      if (newValue !== null) return;
      await nuxtApp.runWithContext(() =>
        showError({
          message: "Page not found",
          statusCode: 404,
          fatal: true,
        }),
      );
    },
    { immediate: true },
  );

  // runWithContext is needed due to async usage above
  await nuxtApp.runWithContext(() => {
    useSeoMeta({
      title: () => data.value?.seo.title,
      description: () => data.value?.seo.description,
    });
  });

  return { data };
};
