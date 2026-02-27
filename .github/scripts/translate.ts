import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const config = {
  api: {
    url: "https://live.api.schwarz/sit/assortment-generative-ai/assortment-generative-ai-api/v1/api/external/generate",
    templateID: 262,
  },
  myApi: {
    tokenUrl: "https://live.api.schwarz/oauth/accesstoken/v3",
    clientId: process.env.MY_API_CLIENT_ID || "",
    clientSecret: process.env.MY_API_CLIENT_SECRET || "",
  },
  branch: process.env.GITHUB_REF_NAME || "main",
};

console.log("Determining existing onyx locales...");

const locales = await getOnyxLocales();

console.log(`Translating locales: ${locales.join(", ")}...`);
const translations = await translate(locales);
console.log("Generated translations:", translations);

console.log("Writing new translations...");
await writeTranslations(translations);

console.log("Done.");

//
// UTILITY FUNCTIONS
//
async function translate(locales: string[]) {
  const accessToken = await getMyAPIAccessToken();

  const response = await fetch(config.api.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      templateId: config.api.templateID,
      variables: [
        { variableName: "locales", value: locales.join(", ") },
        { variableName: "branch", value: config.branch },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to translate: ${await response.text()}`);
  }

  const data: { result: string } = await response.json();
  return JSON.parse(data.result) as Record<string, TranslationJson>;
}

async function writeTranslations(translations: Record<string, TranslationJson>) {
  await Promise.allSettled(
    Object.entries(translations).map(async ([locale, translation]) => {
      try {
        const localePath = getFilePath(`../../packages/sit-onyx/src/i18n/locales/${locale}.json`);
        const existingTranslations: TranslationJson = JSON.parse(
          await readFile(localePath, "utf-8"),
        );
        const newTranslations = mergeTranslations(existingTranslations, translation);
        await writeFile(localePath, JSON.stringify(newTranslations, null, 2));
      } catch (e) {
        console.error(`File write failed for ${locale}`, e);
      }
    }),
  );
}

/**
 * Gets a new MyAPI access token.
 */
async function getMyAPIAccessToken() {
  const response = await fetch(config.myApi.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: config.myApi.clientId,
      client_secret: config.myApi.clientSecret,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get MyAPI access token: ${await response.text()}`);
  }

  const data: { access_token: string } = await response.json();
  return data.access_token;
}

/**
 * Gets a list of all available onyx locales.
 *
 * @example ["de-DE", "en-US"]
 */
async function getOnyxLocales() {
  const localePath = getFilePath("../../packages/sit-onyx/src/i18n/locales");
  const files = await readdir(localePath, { encoding: "utf-8" });
  return files
    .map((file) => file.replace(".json", ""))
    .filter((locale) => !["en-US", "de-DE"].includes(locale));
}

/**
 * Merges the new translations from "updates" into "base".
 */
function mergeTranslations(base: TranslationJson, update: TranslationJson) {
  // create a copy of the base to avoid mutation
  const output = structuredClone(base);

  // iterate over keys in the update object
  Object.keys(update).forEach((key) => {
    const baseValue = output[key];
    const updateValue = update[key];

    // check if both values are objects; if so, recurse
    if (isObject(baseValue) && isObject(updateValue)) {
      output[key] = mergeTranslations(baseValue, updateValue);
    } else {
      // otherwise, overwrite the value (handles string updates or type changes)
      output[key] = updateValue;
    }
  });

  return output;
}

/**
 * Checks whether the given data is an object.
 */
function isObject(item: unknown): item is Record<string, unknown> {
  return !!item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Gets the given path while ensuring cross-platform and correct decoding.
 */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}

type TranslationValue = string | TranslationJson;

type TranslationJson = {
  [key: string]: TranslationValue;
};

export {};
