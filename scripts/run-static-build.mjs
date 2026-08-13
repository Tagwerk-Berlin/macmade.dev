import { execFileSync, spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const RELEASE_ID_PATTERN = /^[a-f0-9]{40}$/;

export function resolveReleaseId({ cwd = process.cwd(), env = process.env } = {}) {
  const explicitReleaseId = env.MACMADE_RELEASE_ID?.trim();
  const releaseId =
    explicitReleaseId ||
    execFileSync("git", ["rev-parse", "--verify", "HEAD^{commit}"], {
      cwd,
      encoding: "utf8",
    }).trim();

  if (!RELEASE_ID_PATTERN.test(releaseId)) {
    throw new Error(
      "Die Release-ID muss der vollständige Git-Commit-SHA des Builds sein.",
    );
  }

  return releaseId;
}

function runVinextBuild({ cwd, releaseId }) {
  const executable = path.join(
    cwd,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "vinext.cmd" : "vinext",
  );

  return new Promise((resolve, reject) => {
    const child = spawn(executable, ["build"], {
      cwd,
      env: {
        ...process.env,
        MACMADE_RELEASE_ID: releaseId,
        WRANGLER_LOG_PATH: ".wrangler/wrangler.log",
      },
      stdio: "inherit",
    });

    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          signal
            ? `vinext build wurde durch ${signal} beendet.`
            : `vinext build wurde mit Exit-Code ${code ?? "unbekannt"} beendet.`,
        ),
      );
    });
  });
}

export async function runStaticBuild({ cwd = process.cwd() } = {}) {
  const releaseId = resolveReleaseId({ cwd });
  const distDirectory = path.join(cwd, "dist");
  const releaseIdPath = path.join(distDirectory, "build-release-id");
  const manifestPath = path.join(distDirectory, "static-artifact-manifest.json");

  await Promise.all([
    rm(releaseIdPath, { force: true }),
    rm(manifestPath, { force: true }),
  ]);
  await runVinextBuild({ cwd, releaseId });
  await mkdir(distDirectory, { recursive: true });
  await writeFile(releaseIdPath, `${releaseId}\n`, "utf8");

  return releaseId;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  runStaticBuild().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
