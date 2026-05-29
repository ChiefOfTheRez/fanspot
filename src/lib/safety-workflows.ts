export type SafetyWorkflow = {
  title: string;
  trigger: string;
  firstAction: string;
  escalation: string;
  auditEvent: string;
};

export const safetyWorkflows: SafetyWorkflow[] = [
  {
    title: "Post report",
    trigger: "Fan reports a post or comment.",
    firstAction: "Hide from recommendations while a moderator reviews priority and category.",
    escalation: "Admin review if repeated reports, impersonation, payment issue, or legal issue appears.",
    auditEvent: "REPORT_REVIEWED"
  },
  {
    title: "Creator application review",
    trigger: "New creator applies for one of the founding spots.",
    firstAction: "Check profile quality, posting plan, identity consistency, and community fit.",
    escalation: "Request more info or reject if the creator cannot meet platform rules.",
    auditEvent: "APPLICATION_DECISIONED"
  },
  {
    title: "Chargeback review",
    trigger: "Processor sends a chargeback or refund event.",
    firstAction: "Put related ledger entries on hold and collect subscription/payment evidence.",
    escalation: "Admin decision before payout release when risk or repeat disputes are detected.",
    auditEvent: "CHARGEBACK_CASE_UPDATED"
  },
  {
    title: "Account restriction",
    trigger: "Repeated policy violations, suspicious payment activity, or confirmed abuse.",
    firstAction: "Apply temporary limit and preserve evidence for admin review.",
    escalation: "Suspend or close account after documented admin decision.",
    auditEvent: "ACCOUNT_STATUS_CHANGED"
  }
];
