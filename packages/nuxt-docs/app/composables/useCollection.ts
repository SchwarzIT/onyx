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

  return useAsyncData(
    key,
    async () => {
      const data = await queryCollection(collection.value).path(path.value).first();
      if (data) return data;
      throw createError({
        status: 404,
        message: "Page not found",
        fatal: true,
        data: {
          collection: collection.value,
          path: path.value,
        },
      });
    },
    {
      // when multiple parallel requests are made for the same page, "defer" will make sure only the first
      // is executed and the result is shared with all other requests
      dedupe: "defer",
    },
  );
};
