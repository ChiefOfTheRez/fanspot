# Critical FanSpot UI/account-isolation patch

This patch addresses the latest round of feedback from testing.

## Fixed

- Moved creator profile tier/award cards into the Shell right rail so creator posts stay in the main feed area.
- Moved Settings control cards into a functional right-side settings rail.
- Removed inline comments from feed cards; comments now show only on `/post/[id]` detail pages.
- Changed post comment button to link to the post detail page instead of expanding comments inline.
- Bookmarks now save a full post snapshot, not just an id, so bookmarked posts appear on the Bookmarks page.
- Bookmark custom groups now use the same saved snapshots and are scoped to the current user.
- Likes, bookmarks, comments, reports, hidden posts, follows, support tiers, tip totals, messages, and settings controls are now namespaced by `session.user.id`.
- Creator follow snapshots are saved so followed creators appear on the fan profile page, including real DB usernames like `snowyskylar`.
- Messages no longer seed the same fake inbox for every account; conversations are account-specific and start from creator profile message links.
- Creator support tip jar now shows a confetti-style goal-complete overlay when a tip reaches the goal.
- Fixed the community guidelines apostrophe build blocker.

## Notes

Because the previous test build used global browser localStorage keys, old local activity may still exist in the browser but is no longer read by the new account-scoped code. New likes/bookmarks/messages/follows will be separated by logged-in account.
