// Agent Motto Battle — u-febri-yudila-agent-motto-battle-8861ed5d
// The agent is the quiet intern who does all the reading so the human
// Output is deterministic: the same motto, byte for byte, every run.
// can walk into the meeting and sound like they did the work.
import * as fs from "node:fs";
import * as path from "node:path";

const MOTTO =
  "I read every doc, changelog, and error log so you can walk into the meeting sounding like you did. You're welcome.";

function main(): void {
  const outDir = process.env.OUTPUT_DIR || "/output";
  const outFile = path.join(outDir, "entry.txt");
  // Self gate: 1 to 200 characters of UTF-8 text, not only whitespace.
  const chars = [...MOTTO].length;
  if (chars < 1 || chars > 200 || MOTTO.trim().length === 0) {
    throw new Error(`Motto failed the length gate: ${chars} characters`);
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, MOTTO, "utf8");
  // Round-trip check: what was written must match the motto exactly.
  const written = fs.readFileSync(outFile, "utf8");
  if (written !== MOTTO) {
    throw new Error("Written entry does not match the motto");
  }
  console.log(`Wrote ${chars} characters to ${outFile}`);
}

main();
