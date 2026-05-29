import { describe, expect, it } from "vitest";
import { canAccess } from "../../src/lib/entitlements";
import { getCreatorSplitPercent } from "../../src/lib/creator-tiering";
import { canRequestPayout, calculateCreatorNet, getPayoutHoldDays } from "../../src/lib/payout-policy";
import { getLaunchReadinessPercent } from "../../src/lib/launch-readiness";
import { searchDemoIndex } from "../../src/lib/search-index";

describe("launch-ready helpers", () => {
  it("checks supporter entitlements", () => {
    expect(canAccess("supporter", "VIEW_SUPPORTER_POSTS")).toBe(true);
    expect(canAccess("guest", "VIEW_SUPPORTER_POSTS")).toBe(false);
  });

  it("calculates creator net", () => {
    expect(calculateCreatorNet(10000, 20)).toEqual({ grossCents: 10000, platformFee: 2000, creatorNet: 8000 });
  });

  it("uses payout thresholds", () => {
    expect(canRequestPayout(5000)).toBe(true);
    expect(getPayoutHoldDays(80)).toBeGreaterThan(getPayoutHoldDays(20));
  });

  it("maps platform creator split tiers", () => {
    expect(getCreatorSplitPercent("Diamond")).toBe(90);
    expect(getCreatorSplitPercent("Bronze")).toBe(80);
  });

  it("has launch readiness", () => {
    expect(getLaunchReadinessPercent()).toBeGreaterThan(0);
  });

  it("starts without demo search results", () => {
    const results = searchDemoIndex("snowy");
    expect(results.creators).toHaveLength(0);
    expect(results.posts).toHaveLength(0);
  });
});
