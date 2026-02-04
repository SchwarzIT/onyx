---
"@sit-onyx/headless": minor
---

feat(createSlider): adapt `mark` left position style calculation

There is no additional `transform` necessary to align the marks, instead the necessary calculations parameters changed:

- `positionOffset` is removed
- `padding` is added to allow for the definition of safe-zones at the start and beginning of the trail.
- `markWidth` is added to account it's width in the calculation and no additional transform is necessary.

E.g.

```ts
mark({ value: markItem.value, label: markItem.label, positionOffset: "0.25rem" });
```

is now

```ts
mark({ value: markItem.value, label: markItem.label, padding: "0.1rem", markWidth: "0.375rem" });
```
