export function buildNotification(title: string, body: string, href = "/notifications") {
  return {
    id: `notification_${Date.now()}`,
    title,
    body,
    href,
    read: false,
    createdAt: "Just now"
  };
}

export const notificationTemplates = {
  welcomeCreator: "Your creator application has been received.",
  payoutReady: "Your weekly payout batch is ready for review.",
  reportResolved: "A report you submitted has been reviewed.",
  systemNotice: "FanSpot has posted a platform update."
};
