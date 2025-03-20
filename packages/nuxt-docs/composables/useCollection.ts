export type UseCollectionOptions = {
  collection: Parameters<typeof queryCollection>[0];
};

export const useCollection = async (options: UseCollectionOptions) => {
  const route = useRoute();
  const collection = await useAsyncData(() =>
    queryCollection(options.collection).path(route.path).first(),
  );

  if (!collection.data.value) {
    throw createError({
      message: "Page not found",
      statusCode: 404,
    });
  }

  const data = toRef(() => collection.data.value!);
  useSeoMeta({ ...data.value.seo });

  return { ...collection, data };
};
