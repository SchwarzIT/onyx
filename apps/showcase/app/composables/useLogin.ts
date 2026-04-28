export const useLogin = () => {
  const route = useRoute();
  const login = () => navigateTo(`/auth/siam?redirectTo=${route.fullPath}`, { external: true });
  return { login };
};
