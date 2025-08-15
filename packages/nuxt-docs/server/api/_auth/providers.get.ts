export default defineEventHandler(() => {
  const config = useRuntimeConfig();

  const availableProviders = Object.entries(config.oauth)
    .filter(([_, config]) => "clientId" in config && !!config.clientId)
    .map(([provider]) => provider as AuthProviderName);

  return availableProviders.map((provider) => ({
    name: provider,
    // we can add additional data here in the future if needed
  }));
});
