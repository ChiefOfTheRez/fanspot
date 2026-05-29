import { describe, expect, it } from "vitest";
import { calculateCreatorShare, calculateRollingReserve } from "@/lib/billing";

describe("billing helpers", () => {
  it("calculates bronze creator split", () => {
    expect(calculateCreatorShare(1000, "bronze")).toEqual({ grossCents: 1000, creatorCents: 800, platformCents: 200, split: "80/20" });
  });

  it("calculates rolling reserve", () => {
    expect(calculateRollingReserve(1000)).toEqual({ reserveCents: 100, availableNowCents: 900 });
  });
});
