import packageJson from '@/../package.json';
import type { SiamAuthStoreOptions } from '@sit/vue-core';
import { Log } from 'oidc-client-ts';

/** Global app configuration. */
const config = {
  app: {
    /** The name of the app (will be displayed inside the topbar) */
    name: 'Vue Blueprint',
    /** Current app version as defined in package.json. */
    version: packageJson.version,
    /** The base URL the application bundle will be deployed at. */
    baseUrl: import.meta.env.BASE_URL,
  },
  i18n: {
    /**
     * Mapping of BCP 47 language codes (= local file inside i18n/locales without .json extension) to the written name of the language
     */
    locales: {
      'en-US': 'English',
      'de-DE': 'Deutsch',
    } as Record<string, string>,
  },
  api: {
    host: import.meta.env.BACKEND_URI,
  },
  auth: {
    idp: import.meta.env.AUTH_IDP,
    clientId: import.meta.env.AUTH_CLIENT_ID,
    disabled: import.meta.env.VITE_AUTH_DISABLED === 'true',
    logLevel: getLogLevel(),
    useDecryptedAccessToken: false, // set to true if your backend requires a decrypted token to read out user data
  } satisfies SiamAuthStoreOptions,
};

function getLogLevel(): Log {
  const { MODE } = import.meta.env;
  if (MODE === 'development') return Log.DEBUG;
  if (MODE === 'test') return Log.NONE;
  return Log.ERROR;
}

export default config;
