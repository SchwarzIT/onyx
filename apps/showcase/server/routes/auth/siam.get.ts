const REDIRECT_COOKIE_NAME = "auth_redirect_to";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (query.redirectTo && typeof query.redirectTo === "string") {
    setCookie(event, REDIRECT_COOKIE_NAME, query.redirectTo);
  }

  const siamHandler = defineOAuthOidcEventHandler({
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

      const redirectTo = getCookie(event, REDIRECT_COOKIE_NAME) ?? "/";
      deleteCookie(event, REDIRECT_COOKIE_NAME);
      return sendRedirect(event, redirectTo);
    },
  });

  return siamHandler(event);
});
