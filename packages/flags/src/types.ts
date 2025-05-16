export type FlagMetadata = {
  continent: string;
  internationalName: string;
};

export type GroupedFlagContinent = {
  /**
   * Country code of the flag.
   */
  code: string;
  /**
   * Additional flag metadata.
   */
  metadata: FlagMetadata;
};

export type FlagContinents = Record<string, GroupedFlagContinent[]>;
