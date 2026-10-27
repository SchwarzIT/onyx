import { normalizedIncludes } from "sit-onyx";

export const useComponentSearch = () => {
  const searchTerm = useState("componentSearch", () => "");

  const getFilteredComponents = computed(() => {
    return (navigation: SidebarNavigationItem<"components_en">[]) => {
      const search = searchTerm.value.trim();
      if (!search) return navigation;

      return navigation
        .map((item) => {
          return {
            ...item,
            children: item.children?.filter((child) => {
              // support searching by title and componentName
              return (
                normalizedIncludes(child.title, search) ||
                (child.fields?.componentName &&
                  normalizedIncludes(child.fields.componentName, search))
              );
            }),
          };
        })
        .filter((item) => item.children?.length);
    };
  });

  return { searchTerm, getFilteredComponents };
};
