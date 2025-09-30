# Release flow

We use _Trunk Based Development_ with the _[Release from trunk](https://trunkbaseddevelopment.com/release-from-trunk/)_ approach.

## Release types

The following release types are documented for production / stable releases.
Snapshots are always released automatically as described above.

### Dev Releases

Every releasable commit (=> when a changeset exists) to the default `main` branch is released automatically so the onyx team and early adopters can tests out the latest development version before the next official stable version is published.
These are released as [snapshot releases](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md) with the `dev` tag.

Snapshot releases are not stable and will have breaking to the next minor release.

<details>
<summary>Snapshots vs. Prereleases</summary>
There are two different approaches that are supported by changesets for this:

1. [Prereleases](https://github.com/changesets/changesets/blob/main/docs/prereleases.md)
2. [Snapshot releases](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md)

- prereleases require more complex setup / pipelines because it has to be entered / exited manually
- we do not want to have changelogs for the dev releases so that they are not "spammed" by several intermediate versions. Snapshot releases support this out-of-the-box since they are NOT be merged back to the main branch (unlike prereleases)
- we want to be able to introduce breaking changes within the dev versions so if we implement and release a feature as dev version, we should be able to e.g. change its API before doing a regular release. Snapshot release to do not have a linear version bump like prereleases (beta.0, beta.1 etc.) so they are ideal for this.

> Decision: We are using **snapshots** releases.

</details>

### Major Releases

_To be defined..._

### Minor Release

Example: `1.x.0`

Minor releases are triggered manually and are always released from the `main` branch.

A **Minor** release is initiated using the [Prepare Version pipeline](https://github.com/SchwarzIT/onyx/actions/workflows/prepare-version.yml):

1. The pipeline applies all changesets, determines the next version for all packages and creates a PR.
2. The PR is then reviewed and approved by the maintainers. This process allows the verification of the version bumps (e.g. no accidental version bump) and changelog updates.
3. When the PR is then merged, the [Release pipeline](https://github.com/SchwarzIT/onyx/actions/workflows/release.yml) triggers automatically and publishes the packages.

**⚠️ Warning:** New changesets **must not** be merged between steps `1.` and `2.`, otherwise the release process might break!

### Patch Release

Example: `1.0.x`

The patches / fixes are cherry-picked from the `main` branch (which is already released as snapshot) onto a dedicated release branch.

1. Assume the current stable version is 1.1.0-dev.DATETIMESTAMP
2. Create a release branch `release/v1` from git tag `v1.0.0`
3. Cherry-pick all relevant fixes onto the `release/v1` branch. **Only patches are allowed here, not minor or major changes!**
4. Trigger a production release for the `release/v1` branch so `1.0.1` is released

Patch (_"Fix"_) releases are merged to the `main` branch as usual and released as snapshot.
For prior major releases the fix is cherry-picked onto the release branches.
From there an automatic fix release is performed.

```sh
# If release branch, doesn't exist yet, then create branch from version tag
git checkout v1.0.0
git checkout -b release/v1
# cherry-pick merged fix commit from main using its commit hash onto release branch
git cherry-pick e14471...
git push
# trigger release for "release/v1" branch so that version tag version "1.0.1" is released
```

This allows as to apply hot-fixes for bugs to "previous" stable versions without having to release all current development changes as next minor version.

## Future Components and `@experimental` Features

Unstable and work-in-progress components might be introduced as part of Minor and Patch releases.

- These components are recognizable by their `OnyxUnstable` prefix, e.g. `import { OnyxUnstableBrainInput } from sit-onyx;`.
- Features (composables, props etc.) are prefixed with `_unstable`, e.g. `<OnyxInput _unstableColor="olo" />`

::: warning
Unstable features are **NOT** production ready and only to be used for testing and development. Breaking changes will be introduced in patch releases!
:::
