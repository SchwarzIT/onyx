export type AuthProviderName = keyof ReturnType<typeof useRuntimeConfig>["oauth"];

export type AuthProvider = {
  /**
   * Name / ID of the auth provider.
   */
  name: AuthProviderName;
};
