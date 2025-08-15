import type { UserSession } from "#auth-utils";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      // User data
      user: {
        name: user.name,
        email: user.email ?? undefined,
        picture: user.avatar_url,
      },
      provider: {
        name: "github",
      },
      // Private data accessible only on server/ routes
      secure: {
        accessToken: tokens.access_token,
      },
    } satisfies Omit<UserSession, "id">);

    return sendRedirect(event, "/");
  },
});
