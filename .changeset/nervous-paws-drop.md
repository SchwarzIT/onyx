---
"sit-onyx": patch
---

fix(OnyxInput, OnyxTextarea): `maxlength` doesn't restrict the user from typing more than the allowed characters.
The previous behavior, which restricts the user from typing more than the allowed characters, can be achieved by setting `strictMaxlength`.
