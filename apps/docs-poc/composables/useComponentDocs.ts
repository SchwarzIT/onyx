import type { DefineComponent } from "vue";

export type ComponentStory = {
  title: string;
  sourceCode: string;
  component: DefineComponent;
};

export const useComponentDocs = async () => {
  const route = useRoute();

  useHead({
    title: Array.isArray(route.params.name) ? route.params.name[0] : route.params.name,
  });

  const { data } = await useFetch(`/api/components/${route.params.name}`);

  const stories = await Promise.all(
    data.value?.stories.map(async (storyName) => {
      const story: ComponentStory = {
        title: storyName,
        sourceCode: (
          await import(
            `../../../packages/sit-onyx/src/components/${data.value!.name}/stories/${storyName}.vue?raw`
          )
        ).default,
        component: (
          await import(
            `../../../packages/sit-onyx/src/components/${data.value!.name}/stories/${storyName}.vue`
          )
        ).default,
      };

      return story;
    }) ?? [],
  );

  return { data: data.value!, stories };
};
