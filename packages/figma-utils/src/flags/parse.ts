import { Component, ParsedFlag } from "../types/figma.js";

export type ParseFlagComponentsOptions = {
  /**
   * Available Figma components.
   */
  components: Component[];
  /**
   * Page ID that contains all flags. Components will be filtered accordingly.
   */
  pageId: string;
};

/**
 * Map of country names for country codes that are not (yet) supported by `Intl.DisplayNames`.
 */
const UNKNOWN_COUNTRY_NAMES: Record<string, string | undefined> = {
  "CA-BC": "British Columbia",
  "GB-ENG": "England",
  "GB-SCT": "Scotland",
  "GB-WLS": "Wales",
  "US-HI": "Hawaii",
};

export const parseComponentsToFlags = (options: ParseFlagComponentsOptions): ParsedFlag[] => {
  const pageComponents = options.components.filter(
    ({ containing_frame }) => containing_frame.pageId === options.pageId,
  );

  const countryCodeFormatter = new Intl.DisplayNames("en", { type: "region" });

  return (
    pageComponents
      .map<ParsedFlag>((component) => {
        const code = component.description.trim();
        let internationalName = UNKNOWN_COUNTRY_NAMES[code] ?? "";

        try {
          internationalName = countryCodeFormatter.of(code) || internationalName;
        } catch {
          // noop
        }

        return {
          id: component.node_id,
          code,
          continent: component.containing_frame.name.trim(),
          internationalName,
        };
      })
      // remove invalid flags without a country code
      .filter(({ code }) => code)
      .sort((a, b) => a.code.localeCompare(b.code))
  );
};
