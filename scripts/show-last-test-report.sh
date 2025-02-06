#!/usr/bin/env sh
set -ex

# check if gh cli is installed
if ! command -v gh &>/dev/null; then
    echo "gh CLI is not installed. Please install it first: https://github.com/cli/cli#installation"
    exit 1
fi

# Create temporary directory
TMP_DIR=$(mktemp -d)

# Create shell trap to clean up temporary directory
function cleanup {
    rm -r ${TMP_DIR}
}
trap cleanup EXIT

# query the id of the last failed run for the current branch
GH_LAST_RUN_ID=$(gh run list -s failure -b $(git branch --show-current) --json "createdAt,databaseId" --jq "sort_by(.createdAt) | last.databaseId")

# download report
gh run download $GH_LAST_RUN_ID -D $TMP_DIR -p "html-report--attempt-1"

# show report
(cd $TMP_DIR/html-report--attempt-1/packages/sit-onyx && pnpm dlx playwright show-report)
