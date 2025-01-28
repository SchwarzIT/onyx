---
"sit-onyx": major
---

refactor(OnyxAvatar): update default initials

Previously the initials were taken from the first two words. Now they will be determined as described [here](https://github.com/SchwarzIT/onyx/issues/2454) by considering the locale.
If the username contains unsupported characters (e.g. for some Korean characters) a fallback icon will be displayed.

Example for "John Middlename Doe":

- Previously: "JM"
- Now: "JD"

#### Breaking changes

- OnyxAvatar: The `label` property has been removed in favor of `fullName` which now als supports passing a locale for determining the initials (will use the i18n locale by default).
- OnyxAvatar: The default slot has been removed in favor of the `initials` property to set custom initials.
- OnyxUsername: The `username` property has been renamed to `fullName` to align with the OnyxAvatar
