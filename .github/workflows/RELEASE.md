# Release flow

We use _Trunk Based Development_ with the _[Release from trunk](https://trunkbaseddevelopment.com/release-from-trunk/)_ approach.

## Snapshot Release

Every releasable commit to the default `main` branch is released automatically as [snapshot release](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md).

These releases are mainly for testing and development purposes.

> **Snapshots or Prereleases?**
>
> Snapshots are easier to handle using changesets, as [Prereleases](https://github.com/changesets/changesets/blob/main/docs/prereleases.md) needs extra handling for intermediate release (entering and exiting).
> The Snapshot releases also have no direct dependency between each-other, which allows us to have _Breaking Changes_ in-between minor releases.

## Major Releases

_To be defined..._

## Minor Release

Minor releases are triggered manually and are also released from the `main` branch.
We use the [Changesets Release Action](https://github.com/changesets/action) here:

1. It applies the changesets, determines the versions and creates a PR. This allows us to check the version bumps and changelog updates.
2. After the PR is merged the version is published.

**Warning:** New changes **must not** be merged between steps `1.` and `2.`, otherwise the release process might break!

## Patch Release

Patch (_"Fix"_) releases are merged to the `main` branch as usual and released as snapshot.
For prior major releases the fix is cherry-picked onto the release branches.
From there an automatic fix release is performed.

E.g.:

**Before:**

```text
main: ... --> v1.0.0 --> ...
```

```sh
# If release branch, doesn't exist yet, then create branch from version tag
git checkout v1.0.0
git checkout -b release/v1.0
# cherry-pick merged fix commit from main using its commit hash onto release branch
git cherry-pick e14471...
git push
```

**After:**

```text
release/v1:                    /-> hotfix A (tag: v1.0.1)
main:      ... --> tag: v1.0.0 --> ... --> hotfix A
```

**Only patches are allowed to be cherry-picked onto older releases!**
