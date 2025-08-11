# @sit-onyx/flags

## 1.0.0-beta.7

### Minor Changes

- b4d113a: feat: add `getFlagImportName` utility

## 1.0.0-beta.6

### Patch Changes

- a18d955: fix declaration of "sideEffects" in package.json

## 1.0.0-beta.5

### Major Changes

- c235692: feat: export all flags also as JavaScript constants

  All flags are now also offered as JavaScript exports instead of only providing the raw SVG files.
  This enables a better developer experience, IDE intellisense and easier import handling.
  The SVG imports are still available. However, it is recommended to use the JavaScript exports for a better developer experience if possible.

  When using the JavaScript exports, the flag names are prefixed with "flag", followed by the upper case flag name.
  This ensures there are no naming conflicts and also makes it clearer that you are working with a flag.

  Option 1: JavaScript exports (recommended)

  ```ts
  import { flagDE, flagGB } from "@sit-onyx/flags";

  // to import all flags:
  // import * as ALL_FLAGS from "@sit-onyx/flags";
  ```

  Option 2: import SVG files directly

  ```ts
  import DE from "@sit-onyx/flags/DE.svg?raw";
  import GB from "@sit-onyx/flags/GB.svg?raw";
  ```

  #### Breaking changes
  - utility functions and types are moved from `@sit-onyx/flags` to `@sit-onyx/flags/utils` so the root path only includes flags
  - removed import `@sit-onyx/flags/metadata.json`, use `import { FLAG_METADATA } from "@sit-onyx/flags/utils";` instead

## 1.0.0-beta.4

### Major Changes

- 1911f6c: feat(dist)!: Removed commonjs builds
  - **BREAKING CHANGE:** We dropped commonjs (cjs) builds and packages are now shipped as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.

## 1.0.0-beta.3

### Major Changes

- 80d36ec: feat: update flags

  #### Renamed
  - GF => PF

  #### Modified
  - LI
  - ME
  - MU
  - MY
  - NO
  - NZ
  - RS
  - SE
  - TK
  - TN
  - TT
  - TZ
  - WS

## 1.0.0-beta.2

### Minor Changes

- 88e1af3: feat: update flags

  #### New
  - CC

  #### Modified
  - CK

## 1.0.0-beta.1

### Minor Changes

- be50701: - feat: add `groupFlagsByContinent` utility
  - fix(flags): fix SVG of "CK" flag (Cook islands)

## 1.0.0-beta.0

### Major Changes

- 8b48c62: feat: update flags

  #### New
  - AD
  - AE
  - AF
  - AG
  - AI
  - AL
  - AM
  - AO
  - AR
  - AS
  - AT
  - AU
  - AW
  - AX
  - AZ
  - BA
  - BB
  - BD
  - BE
  - BF
  - BG
  - BH
  - BI
  - BJ
  - BM
  - BN
  - BO
  - BQ
  - BR
  - BS
  - BT
  - BW
  - BY
  - BZ
  - CA-BC
  - CA
  - CD
  - CF
  - CG
  - CH
  - CI
  - CK
  - CL
  - CM
  - CN
  - CO
  - CR
  - CU
  - CV
  - CW
  - CY
  - CZ
  - DE
  - DJ
  - DK
  - DM
  - DO
  - DZ
  - EC
  - EE
  - EG
  - ER
  - ES
  - ET
  - EU
  - FI
  - FJ
  - FK
  - FM
  - FO
  - FR
  - GA
  - GB-ENG
  - GB-SCT
  - GB-WLS
  - GB
  - GD
  - GE
  - GF
  - GG
  - GH
  - GI
  - GL
  - GM
  - GN
  - GQ
  - GR
  - GT
  - GU
  - GW
  - GY
  - HK
  - HN
  - HR
  - HT
  - HU
  - ID
  - IE
  - IL
  - IM
  - IN
  - IO
  - IQ
  - IR
  - IS
  - IT
  - JE
  - JM
  - JO
  - JP
  - KE
  - KG
  - KH
  - KI
  - KM
  - KP
  - KR
  - KW
  - KY
  - KZ
  - LA
  - LB
  - LC
  - LI
  - LK
  - LR
  - LS
  - LT
  - LU
  - LV
  - LY
  - MA
  - MC
  - MD
  - ME
  - MG
  - MH
  - MK
  - ML
  - MM
  - MN
  - MO
  - MP
  - MQ
  - MR
  - MS
  - MT
  - MU
  - MV
  - MW
  - MX
  - MY
  - MZ
  - NA
  - NE
  - NF
  - NG
  - NI
  - NL
  - NO
  - NP
  - NR
  - NU
  - NZ
  - OM
  - PA
  - PE
  - PG
  - PH
  - PK
  - PL
  - PN
  - PR
  - PS
  - PT
  - PW
  - PY
  - QA
  - RO
  - RS
  - RU
  - RW
  - SA
  - SB
  - SC
  - SD
  - SE
  - SG
  - SI
  - SK
  - SL
  - SM
  - SN
  - SO
  - SR
  - SS
  - ST
  - SV
  - SX
  - SY
  - SZ
  - TC
  - TD
  - TG
  - TH
  - TJ
  - TK
  - TL
  - TM
  - TN
  - TO
  - TR
  - TT
  - TV
  - TW
  - TZ
  - UA
  - UG
  - US-HI
  - US
  - UY
  - UZ
  - VA
  - VC
  - VE
  - VI
  - VN
  - VU
  - WS
  - YE
  - ZA
  - ZM
  - ZW
