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
 */
export const useCollection = async <TCollection extends keyof Collections = keyof Collections>(
  options: UseCollectionOptions<TCollection>,
) => {
  const { locale } = useI18n();
  const route = useRoute();
  const collection = computed(() => toValue(options.collection));

  const path = computed(() => {
    let _path = toValue(options.path);
    if (_path) return _path;

    // get base path of current route (remove a potential locale prefix)
    _path = route.path;
    const localePrefix = `/${locale.value}/`;

    if (_path === `/${locale.value}`) return "/";
    if (_path.startsWith(localePrefix)) return `/${_path.slice(localePrefix.length)}`;
    return _path;
  });

  const key = computed(() => `collection-${collection.value}-${path.value}`);

  const asyncData = await useAsyncData(
    key,
    () => queryCollection(collection.value).path(path.value).first(),
    {
      // when multiple parallel requests are made for the same page, "defer" will make sure only the first
      // is executed and the result is shared with all other requests
      dedupe: "defer",
    },
  );

  const error = computed(() => {
    const { data: _data, error: _error } = asyncData;
    if (_error.value) {
      return _error.value;
    } else if (!_data.value) {
      return createError({ status: 404, message: "Page not found", fatal: true });
    } else {
      return null;
    }
  });

  return { ...asyncData, error };
};
