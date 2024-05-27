---
"sit-onyx": major
---

refactor: rename listbox to select

- rename component `OnyxListbox` to `OnyxSelect`
- rename component `OnyxListboxOption` to `OnyxSelectOption`

In addition the following types have been renamed:

| Old name               | New name              |
| ---------------------- | --------------------- |
| SelectOption           | BaseSelectOption      |
| ListboxOption          | SelectOption          |
| OnyxListboxProps       | OnyxSelectProps       |
| ListboxModelValueProps | SelectModelValueProps |
| ListboxLazyLoading     | SelectLazyLoading     |
| SelectModelValue       | SelectInputModelValue |
| OnyxListboxOptionProps | OnyxSelectOptionProps |
