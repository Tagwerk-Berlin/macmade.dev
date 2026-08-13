import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const cwd = process.cwd();
const manifestPath = path.join(cwd, "dist", "static-artifact-manifest.json");

async function buildManifest() {
  await execFileAsync(process.execPath, ["scripts/run-static-build.mjs"], {
    cwd,
    env: process.env,
  });
  await execFileAsync(process.execPath, ["scripts/static-artifact.mjs", "create"], {
    cwd,
    env: process.env,
  });

  return JSON.parse(await readFile(manifestPath, "utf8"));
}

const firstManifest = await buildManifest();
const secondManifest = await buildManifest();

if (JSON.stringify(firstManifest) !== JSON.stringify(secondManifest)) {
  throw new Error(
    `Nicht reproduzierbarer Export: ${firstManifest.treeSha256} != ${secondManifest.treeSha256}`,
  );
}

console.log(
  `Reproduzierbar: ${secondManifest.releaseId} ${secondManifest.treeSha256} ${secondManifest.fileCount} Dateien`,
);
