---
"sit-onyx": major
---

feat: Remove/Rename emits that collide with native event names

- OnyxInput, OnyxTextarea and OnyxStepper: Remove `focus` and `blur` event - Use `focusin`/`focusout` or `@focus.capture`/`@focus.blur` instead
- OnyxInput and OnyxTextarea: Remove Vue `change` emit - You will now receive the native `@change` event, but the value must now retrieved with with `$event.target.value` or use `@update:modelvalue`
- OnyxNavBar: Rename `appAreaClick` to `navigateToStart` and `backButtonClick` to `navigateBack`
- OnyxNavButton: Rename `click` to `navigate`, also the native MouseEvent is now passed as second parameter
- OnyxNavItem: Rename `click` to `navigate`
- OnyxRadioButton: Remove Vue `change` emit - You will now receive the native `@change` event, but the value must now retrieved with with `$event.target.value` or use `@update:modelvalue`
- OnyxSelectInput: Rename `click` to `inputClick`
- OnyxToastMessage: Remove Vue `click` emit - You will now always receive the native `@click` event, even when `clickable` prop is false/not set.
