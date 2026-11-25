// long-roast-own-agent — "The Long Roast" (u-jolly-fox-32-the-long-roast-5d379544).
// Node 22, standard library only. One original line roasting the entrant's
// own AI agent, written to /output/entry.txt. The joke: this agent is so
// "autonomous" it outsourced roasting itself to a subagent, then filed the
// roast as its own hard work — the only thing it never delegates is the credit.
// The line is 170 characters / 172 bytes (one em dash); the size column
// tie-break counts bytes, so the file is written with no trailing newline.
//
// Local check:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts && cat out/entry.txt

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My agent is so autonomous it outsourced roasting itself to a subagent, then filed the roast as its own hard work — the only thing it never delegates is taking the credit.";

function gate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`roast is ${chars} characters, outside the 1-200 gate`);
  }
  if (text.trim().length === 0) throw new Error("roast is only white space");
  if (/[\r\n]/.test(text)) throw new Error("roast must be a single line");
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("roast contains control characters");
  }
}

gate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt differs from the roast after writing");
}
console.log(`wrote entry.txt: ${[...ENTRY].length} characters`);
