# Release flow

We use _Trunk Based Development_ with the _[Release from trunk](https://trunkbaseddevelopment.com/release-from-trunk/)_ approach.

## Prereleases vs. snapshots

Every releasable commit to the default `main` branch is released automatically so the onyx team and early adopters can tests out the latest development version before the next official stable version is published.

There are two different approaches that are supported by changesets for this:

1. [Prereleases](https://github.com/changesets/changesets/blob/main/docs/prereleases.md)
2. [Snapshot releases](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md)

> Decision: We are using **prereleases** instead of snapshot releases which has the following main reasons:

- From the [prelease docs](https://github.com/changesets/changesets/blob/main/docs/prereleases.md): "You might want to release a version of your packages before you do an actual release" which is exactly what we are looking for
- From the [snapshot docs](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md#what-to-do-with-the-snapshot-branch): "the snapshot is intended for installation only, not to represent the correct published state of the repo". This is NOT what we are looking for. The released development version should always represent the latest published version of our packages
- we still want to have a changelog for the dev releases so that the changes can be tracked by the onyx team and users. However, snapshot releases are intended to NOT be merged back to the main branch so this does not work
- Since snapshot releases are just a "snapshot" of time, they loose the relation / history to the previous stable version. Example:
  - Current version: 1.1.0
  - Snapshot release is created: e.g. 0.0.0-dev.DATETIMESTAMP
  - If we now want to release the next stable minor version (which would be 1.2.0), changesets can not determine the next version automatically because the current version is 0.0.0-dev.DATETIMESTAMP, so the relation to 1.1.0 is lost
- the changesets used while releasing the dev versions should be kept so once the next stable version should be published, changeset can generate a correct changelog with all relevant changes. This is not possible with snapshots since they will delete the changeset .md files during the publishing. Prereleases will keep the files until the next production release.

## Release types

The following release types are documented for production / stable releases.
Prereleases are always released automatically as described above.

### Major Releases

_To be defined..._

### Minor Release

Example: `1.x.0`

Minor releases are triggered manually and are also released from the `main` branch.
We use the [Changesets Release Action](https://github.com/changesets/action) here:

1. It applies all changesets, determines the next version for all packages and creates a PR. This allows us to check the version bumps and changelog updates.
2. After the PR is merged, the version is published.

**Warning:** New changes **must not** be merged between steps `1.` and `2.`, otherwise the release process might break!

### Patch Release

Example: `1.0.x`

The patches / fixes are cherry-picked from the `main` branch (which is already released as pre-release) onto a dedicated release branch.

1. Assume the current stable version is 1.1.0-next.42
2. Create a release branch `release/v1` from git tab `v1.0.0`
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
