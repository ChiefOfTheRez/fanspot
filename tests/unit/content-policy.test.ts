import { describe, expect, it } from "vitest";
import { validateUploadInput } from "@/lib/content-policy";

describe("upload policy", () => {
  it("accepts supported image uploads", () => {
    expect(validateUploadInput({ mimeType: "image/png", sizeBytes: 1000 }).ok).toBe(true);
  });

  it("rejects unsupported files", () => {
    expect(validateUploadInput({ mimeType: "application/x-msdownload", sizeBytes: 1000 }).ok).toBe(false);
  });
});
