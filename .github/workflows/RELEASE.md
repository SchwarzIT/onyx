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

Example: `1.0.0` -> `2.0.0`

Major releases are planned long-term and comprised of many bigger changes, as well as **[Breaking Changes](#breaking-changes)**.

_TODO: Define process for major releases_

### Minor Release

Example: `1.0.0` -> `1.1.0`

Minor releases are triggered manually and are always released from the `main` branch.

A **Minor** release is initiated using the [Prepare Version pipeline](https://github.com/SchwarzIT/onyx/actions/workflows/prepare-version.yml):

1. The pipeline applies all changesets, determines the next version for all packages and creates a PR.
2. The PR is then reviewed and approved by the maintainers. This process allows the verification of the version bumps (e.g. no accidental version bump) and changelog updates.
3. When the PR is then merged, the [Release pipeline](https://github.com/SchwarzIT/onyx/actions/workflows/release.yml) triggers automatically and publishes the packages.

**⚠️ Warning:** New changesets **must not** be merged between steps `1.` and `2.`, otherwise the release process might break!

### Patch Release

Example: `1.0.0` -> `1.0.1`

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

## Breaking Changes

**Definition:** We define a Breaking Change as any change that requires the library consumer to make an effort to integrate the changes.
This includes any adaptation to the end user's interaction flow.

### Types of Breaking Changes

The following sections describes different kind of breaking changes with examples.

#### API

- Changes that produce compile-time errors.

Components and functions are treated equally.

E.g.

- 🚫 _Forbidden:_ Adding a required property
- 🚫 _Forbidden:_ Requiring a new dependency
- ✅ _Allowed:_ Making a required property optional

#### Styles

- Changes that affect the position or layout of the root element of the components.

As long as the aforementioned rule is not violated, the inner styles of a component can be changed.

E.g.

- 🚫 _Forbidden:_ Changing a component from `static` to `fixed` position.
- ✅ _Allowed:_ Updating the border color and width.

#### UX

- Changes that alter the user's interaction flow.

E.g.

- 🚫 _Forbidden:_ Replacing an input field with a mouse-only widget.
- 🚫 _Forbidden:_ Changing the initially focused element.
- ✅ _Allowed:_ Visual-only changes

### Phases

The following are the phases that a component or function usually goes through in order:

1. **Experimental:** Feature currently in development and/or feedback is being gathered. Although it can be used, it is not necessarily encouraged. This is because breaking changes can still happen.
   These features are marked with the jsdoc tags `@experimental` and `@deprecated` (for IDE highlighting) tag. In Storybook, they have the `🧪 Unstable` tag.
2. **Stable:** The default for all components. No breaking changes will be introduced for these components. However, they can be marked as _deprecated_ while stable.
3. **Deprecated**: It can currently still be used, but it will be broken, removed, or changed in the next major version update. These are marked with the `@deprecated` tag and are usually accompanied by a recommendation on what to do instead.

### Exceptions

- Internal (i.e., not exported via the main entry point) or experimental utilities, components, or types.
- Removal or changes to clearly bugged or unusable features
- Security-related changes

### Attribution

- [Fluid-Framework: Breaking vs Non breaking Changes](https://github.com/microsoft/FluidFramework/wiki/Breaking-vs-Non-breaking-Changes)
- [Timo Mämecke: Breaking UI Changes](https://timomeh.de/posts/breaking-ui-changes)
