# FanSpot Critical Patch: Universal Posts, Admin Actions, Server Messages, Creator Media

## Fixed

### Creator posts are universal
- Creator/admin post publishing is now server-backed and approved immediately in the test build.
- Removed test-build email-verification gating from creator posting so seeded creator accounts can publish without being blocked by the banner.
- Public creator posts continue to appear through the shared Prisma feed/profile queries rather than account-local storage.

### Messages are sent between accounts
- Replaced account-local message storage with `/api/messages/threads` backed by the Prisma `Message` table.
- Messages now load for the logged-in user, grouped by the other account in the conversation.
- Sending a message to a creator from `/messages?username=...` writes a real `Message` row, so the receiver sees it when they log in.

### Admin panel and applications
- Added an Admin link to the sidebar for admin accounts.
- Restored database-backed creator application review.
- Approving an application upgrades the user to CREATOR and creates default tiers.

### Admin post removal
- Added global post removal through `DELETE /api/posts/[id]`.
- Admin post removal now marks the post `REMOVED` globally and creates an audit log entry.
- The post 3-dot menu shows “Remove post globally” for admins instead of local-only hide.

### Media uploads for creators
- Creator Studio media page now has a working local media staging dropzone for images/videos.
- `/api/upload/presign` now checks creator/admin role and grants upload permission in test mode even when S3 is disabled.
