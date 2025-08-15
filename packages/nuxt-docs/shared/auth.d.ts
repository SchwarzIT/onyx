declare module "#auth-utils" {
  /**
   * Custom user data (will be available publicly).
   * DO NOT ADD SENSITIVE DATA HERE!
   *
   * Note: Property names should follow the OIDC standard: https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
   */
  export interface User {
    /**
     * Full user name.
     */
    name: string;

    /**
     * Full URL to the users profile picture / avatar.
     */
    picture?: string;
    /**
     * Email address.
     */
    email?: string;
  }

  // optionally include custom session data:
  export interface UserSession {
    /**
     * Information about the OAuth provider that the user logged in with.
     */
    provider: AuthProvider;
  }

  /**
   * Secure session data. Will only be available in server code.
   */
  export interface SecureSessionData {
    accessToken: string;
  }
}

export {};
