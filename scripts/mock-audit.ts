import { auditLogs } from "../src/lib/mock-data";

console.log("FanSpot mock audit export");
for (const log of auditLogs) {
  console.log(`${log.createdAt} | ${log.severity} | ${log.actor} | ${log.action} | ${log.entity}`);
}
