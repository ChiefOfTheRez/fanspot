export const featureFlags = {
  creatorApplications: true,
  foundingCreatorCap: true,
  paidSubscriptions: false,
  directMessages: true,
  creatorScheduling: true,
  advancedModeration: true,
  publicApi: false,
  referrals: false,
  liveEvents: false,
  lightMode: false
} as const;

export type FeatureFlag = keyof typeof featureFlags;

export function isFeatureEnabled(flag: FeatureFlag) {
  return Boolean(featureFlags[flag]);
}

export const featureFlagRows = Object.entries(featureFlags).map(([key, enabled]) => ({
  key,
  enabled,
  rollout: enabled ? "Internal MVP" : "Post-launch"
}));
