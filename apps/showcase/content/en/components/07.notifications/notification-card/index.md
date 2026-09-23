---
title: Notification card
componentName: OnyxNotificationCard
---

Used to display (system / user) notifications, e.g. to build a [notification center](/components/notifications/notification-center).

## Examples

### Basic

The notification shows a required headline, description and creation date. A relative time is displayed automatically. Optionally, an icon and unread indicator (dot) can be displayed.

<<< ./examples/Basic.example.vue preview=true  layout="grow"

### Actions

Two types of custom actions can be displayed to provide additional functionality such as marking as read, view more details or delete: Always-visible actions at the bottom or header actions at the top right that are only disabled on hover.

<p style="color: var(--onyx-color-text-icons-info-intense)">Hover the card to see the header actions.</p>

<<< ./examples/Actions.example.vue preview=true  layout="grow"

### Skeleton

Use the skeleton on initial load while the data for the notification is being loaded.

<<< ./examples/Skeleton.example.vue preview=true  layout="grow"
