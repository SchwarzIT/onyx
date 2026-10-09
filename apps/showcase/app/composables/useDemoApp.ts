export const useDemoApp = () => {
  const { loggedIn } = useUserSession();
  const demoAppLink = computed(() => {
    if (loggedIn.value) return "https://demo-internal.onyx.schwarz";
    return "https://demo.onyx.schwarz";
  });

  return { demoAppLink };
};
