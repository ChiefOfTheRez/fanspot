# FanSpot Functional UI Patch

This patch focuses on the issues reported during FanSpot live testing:

- Removed visible badge/tag pills globally by making the Badge component render nothing and simplifying PageHero headers.
- Removed alert page eyebrow/unread tags.
- Made notification links point to relevant destinations, including Snowy's mock post.
- Added post-level comment composer, local comments, local like/bookmark persistence, and filled icons.
- Connected bookmarks to local saved post IDs and added functional custom bookmark groups.
- Replaced post 3-dot alert with a real dropdown menu for share/copy link, report, and hide.
- Rebuilt messages as a server page with a client inbox component to avoid runtime Shell/client errors.
- Added working in-site message composer with localStorage persistence.
- Added support ticket submission with localStorage persistence.
- Added creator support modal with subscription tiers, buy simulation, tip jar goal, and progress bar.
- Added fan profile following list based on followed creators.
- Made Google and Apple auth buttons visible. Real OAuth still requires provider environment variables.
- Updated email verification resend route to auto-verify in console/test mode.
- Fixed Dockerfile Prisma copy step.
- Added Button and Textarea components needed by messaging.
