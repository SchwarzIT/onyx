export default defineNuxtRouteMiddleware((to, from) => {
  const theme = from.query.theme;

  if (theme == null || "theme" in to.query) return;

  return navigateTo(
    {
      path: to.path,
      query: { ...to.query, theme },
      hash: to.hash,
    },
    { replace: true },
  );
});
