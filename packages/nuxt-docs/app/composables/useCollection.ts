import type { Collections } from "@nuxt/content";

export type UseCollectionOptions = {
  /**
   * Slug / route path to use for querying the collection.
   *
   * @default `slug` route parameter
   */
  slug?: MaybeRef<string>;
};

/**
 * Composable for loading the collection content for the current route and locale.
 */
export const useCollection = (options?: MaybeRef<UseCollectionOptions | undefined>) => {
  const route = useRoute();
  const { locale } = useI18n();

  const slug = computed(() => {
    const _slug = toValue(toValue(options)?.slug);
    if (_slug) return _slug;

    const path = Array.isArray(route.params.slug)
      ? route.params.slug.join("/")
      : (route.params.slug ?? "");
    return path.startsWith("/") ? path : `/${path}`;
  });

  return useAsyncData(
    () => `page-${slug.value}-${locale.value}`,
    () => {
      const collection = `content_${locale.value}` as keyof Collections;
      return queryCollection(collection).path(slug.value).first();
    },
  );
};
