---
"sit-onyx": major
---

- feat(OnyxDataGrid): support new `headline` property
- fix(OnyxDataGrid): do not render empty slots
- fix(OnyxDataGrid): fix pagination mutation order to work correctly when used together with filtering and/or selection
- fix(OnyxDataGrid): do not render pagination skeleton when usePagination feature is disabled

#### Breaking change

- useSelection: remove property `disabled` in favor of new `enabled` property to align with other features
