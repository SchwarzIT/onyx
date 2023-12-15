# Changesets

Hello and welcome! This folder is used by `@changesets/cli`, a build tool that works
with multi-package repos, or single-package repos to help you version and publish your code. You can
find the full documentation for it [in its repository](https://github.com/changesets/changesets).

There is also a list of common questions to get you started engaging with changesets in
[their documentation](https://github.com/changesets/changesets/blob/main/docs/common-questions.md).

## Getting started with Changesets

To work with changesets an understanding of [Semantic Versioning](https://semver.org/) is necessary:

> **Summary**
>
> Given a version number MAJOR.MINOR.PATCH, increment the:
>
> 1. MAJOR version when you make incompatible API changes
> 2. MINOR version when you add functionality in a backward compatible manner
> 3. PATCH version when you make backward compatible bug fixes

<br />

Did you perform a code change that results in a **behavior or visual change** for the consumer of **any published package** in this repo?

Then you **must** create a changeset to inform the users about this change.

Creating a changeset is easy enough!

## Creating a Changeset

Run `npx changeset` in the root of this repository and you will be guided through the process of creating a changeset.

Write a summary that tells the package user what changed for him.

Afterwards a changeset file will have been created and committed.
If more details are necessary, open the changeset file and edit it manually. It's just a markdown file!
