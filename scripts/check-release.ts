import { launchGates } from "../src/lib/launch-readiness";

const blockers = launchGates.filter((gate) => gate.status !== "Ready");
console.log("FanSpot release gate summary");
for (const gate of launchGates) {
  console.log(`${gate.status === "Ready" ? "✓" : "!"} ${gate.title} - ${gate.status}`);
}

if (blockers.length) {
  console.log("\nRelease is not production-ready yet. Resolve these gates before public launch:");
  for (const gate of blockers) console.log(`- ${gate.title}: ${gate.description}`);
  process.exitCode = 1;
}
