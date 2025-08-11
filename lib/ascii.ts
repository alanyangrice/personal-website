import fs from "node:fs";
import path from "node:path";

export async function loadAsciiFrames(): Promise<string[]> {
  const framesDir = path.join(process.cwd(), "ascii_art_output");
  let entries: string[] = [];
  try {
    entries = await fs.promises.readdir(framesDir);
  } catch {
    return ["ASCII frames directory not found."];
  }

  const frameFiles = entries
    .filter((name) => /^frame\d+\.txt$/.test(name))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] ?? "0", 10);
      const numB = parseInt(b.match(/\d+/)?.[0] ?? "0", 10);
      return numA - numB;
    });

  const frames: string[] = [];
  for (const file of frameFiles) {
    const abs = path.join(framesDir, file);
    try {
      const content = await fs.promises.readFile(abs, "utf8");
      frames.push(content);
    } catch {
      // skip bad files
    }
  }

  // Avoid end seam by removing duplicate last frame if identical to first
  if (frames.length > 1) {
    const first = frames[0].trimEnd();
    const last = frames[frames.length - 1].trimEnd();
    if (first === last) {
      frames.pop();
    }
  }

  return frames.length > 0 ? frames : ["No ASCII frames loaded."];
}


