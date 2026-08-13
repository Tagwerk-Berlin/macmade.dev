import { createHash } from "node:crypto";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function collectFiles(rootDirectory, currentDirectory = rootDirectory) {
  const directoryEntries = await readdir(currentDirectory, { withFileTypes: true });
  const files = [];

  for (const entry of directoryEntries) {
    const absolutePath = path.join(currentDirectory, entry.name);
    const relativePath = path
      .relative(rootDirectory, absolutePath)
      .split(path.sep)
      .join("/");

    if (entry.isSymbolicLink()) {
      throw new Error(`Symlinks sind im statischen Artefakt nicht erlaubt: ${relativePath}`);
    }

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(rootDirectory, absolutePath)));
      continue;
    }

    if (!entry.isFile()) {
      throw new Error(`Nicht unterstützter Dateityp im Artefakt: ${relativePath}`);
    }

    const content = await readFile(absolutePath);
    files.push({
      path: relativePath,
      bytes: content.byteLength,
      sha256: sha256(content),
    });
  }

  return files.sort((left, right) =>
    left.path < right.path ? -1 : left.path > right.path ? 1 : 0,
  );
}

export async function createArtifactManifest({ rootDirectory, releaseId }) {
  const rootStat = await stat(rootDirectory);
  if (!rootStat.isDirectory()) {
    throw new Error(`Artefaktwurzel ist kein Verzeichnis: ${rootDirectory}`);
  }

  const files = await collectFiles(rootDirectory);
  const totalBytes = files.reduce((total, file) => total + file.bytes, 0);
  const treeSha256 = sha256(JSON.stringify(files));

  return {
    schemaVersion: 1,
    releaseId,
    root: "dist/client",
    fileCount: files.length,
    totalBytes,
    treeSha256,
    files,
  };
}

export async function verifyArtifactManifest({ manifest, rootDirectory, releaseId }) {
  const actualManifest = await createArtifactManifest({ rootDirectory, releaseId });

  if (JSON.stringify(manifest) !== JSON.stringify(actualManifest)) {
    throw new Error(
      `Artefaktmanifest stimmt nicht mit dem Dateibaum überein: erwartet ${manifest.treeSha256 ?? "ohne Digest"}, erhalten ${actualManifest.treeSha256}.`,
    );
  }

  return actualManifest;
}

async function readBuildReleaseId(distDirectory) {
  const releaseId = (await readFile(path.join(distDirectory, "build-release-id"), "utf8")).trim();
  if (!releaseId) {
    throw new Error("Die revisionsgebundene Build-Release-ID fehlt.");
  }
  return releaseId;
}

export async function createManifestFile({ cwd = process.cwd() } = {}) {
  const distDirectory = path.join(cwd, "dist");
  const rootDirectory = path.join(distDirectory, "client");
  const manifestPath = path.join(distDirectory, "static-artifact-manifest.json");
  const releaseId = await readBuildReleaseId(distDirectory);
  const manifest = await createArtifactManifest({ rootDirectory, releaseId });

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return manifest;
}

export async function verifyManifestFile({ cwd = process.cwd() } = {}) {
  const distDirectory = path.join(cwd, "dist");
  const rootDirectory = path.join(distDirectory, "client");
  const manifestPath = path.join(distDirectory, "static-artifact-manifest.json");
  const releaseId = await readBuildReleaseId(distDirectory);
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

  return verifyArtifactManifest({ manifest, rootDirectory, releaseId });
}

async function main() {
  const command = process.argv[2];
  let manifest;

  if (command === "create") {
    manifest = await createManifestFile();
  } else if (command === "verify") {
    manifest = await verifyManifestFile();
  } else {
    throw new Error("Aufruf: node scripts/static-artifact.mjs <create|verify>");
  }

  console.log(
    `${manifest.releaseId} ${manifest.treeSha256} ${manifest.fileCount} Dateien`,
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
