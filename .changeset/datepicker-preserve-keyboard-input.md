---
"sit-onyx": patch
---

fix(OnyxDatePicker): preserve keyboard input while typing the year segment

The native date input emits `input` on every segment change once a valid date exists, so typing the year digit by digit briefly produced valid dates with a 1-3 digit year. The setter reformatted each intermediate value (zero-padding the year) and wrote it back through `v-model`, overwriting the segment being typed - the year "danced" (0002 -> 0020 -> 0202 -> …), most visibly in locales the browser renders as `dd/mm/yyyy` (e.g. es-ES). The setter now ignores intermediate values with an incomplete year, so the native input keeps the user's in-progress input. Complete dates, calendar-popup selections and clearing the field are unaffected.
