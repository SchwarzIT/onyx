---
"@sit-onyx/nuxt-docs": patch
---

fix: correctly pack files when publishing

After the release of version `1.0.0-beta.92`, the Nuxt docs layer did not work at all when used inside a project.
The reason is that due to the Nuxt 4 migration, all relevant files are now placed inside the "app" directory but our "files" definition in package.json did not include the directory when publishing so the file were missing in the npm package.
