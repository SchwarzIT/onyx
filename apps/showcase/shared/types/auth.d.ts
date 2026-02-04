/**
 * @see https://github.com/atinux/nuxt-auth-utils?tab=readme-ov-file#session-management
 */
declare module "#auth-utils" {
  interface User {
    /**
     * Unique user ID.
     */
    id: string;
    /**
     * Full user name
     */
    name: string;
    /**
     * Email address
     */
    email: string;
    /**
     * Which OAuth provider was used to login the user.
     */
    provider: "siam";
  }

  // interface UserSession {}

  // interface SecureSessionData {}
}

export {};
