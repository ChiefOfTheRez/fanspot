import { BookmarksClient } from "@/components/BookmarksClient";
import { RightRail } from "@/components/RightRail";
import { Shell } from "@/components/Shell";

export default function BookmarksPage() {
  return (
    <Shell active="/bookmarks" rightRail={<RightRail />}>
      <BookmarksClient />
    </Shell>
  );
}
