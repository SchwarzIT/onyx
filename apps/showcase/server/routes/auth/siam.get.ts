export default defineOAuthOidcEventHandler({
  config: {
    scope: ["openid", "siambasicuserprofileoidc"],
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        id: user.sub,
        email: user.email ?? "",
        name: user.name ?? "",
        provider: "siam",
      },
    });
    return sendRedirect(event, "/");
  },
});
