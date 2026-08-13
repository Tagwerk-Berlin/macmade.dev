import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  createArtifactManifest,
  verifyArtifactManifest,
  verifyManifestFile,
} from "../scripts/static-artifact.mjs";

test("bindet den exportierten Dateibaum an Release-ID und Digest", async () => {
  const manifest = await verifyManifestFile();
  const storedManifest = JSON.parse(
    await readFile(new URL("../dist/static-artifact-manifest.json", import.meta.url), "utf8"),
  );

  assert.deepEqual(manifest, storedManifest);
  assert.match(manifest.releaseId, /^[a-f0-9]{40}$/);
  assert.match(manifest.treeSha256, /^[a-f0-9]{64}$/);
  assert.equal(manifest.fileCount, manifest.files.length);
  assert.deepEqual(
    manifest.files.map((file) => file.path),
    manifest.files
      .map((file) => file.path)
      .toSorted((left, right) => (left < right ? -1 : left > right ? 1 : 0)),
  );
});

test("erkennt jede Änderung am manifestierten Dateibaum", async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "macmade-artifact-"));

  try {
    await mkdir(path.join(temporaryDirectory, "nested"));
    await writeFile(path.join(temporaryDirectory, "index.html"), "erster Stand", "utf8");
    await writeFile(path.join(temporaryDirectory, "nested", "asset.css"), "body{}", "utf8");

    const manifest = await createArtifactManifest({
      rootDirectory: temporaryDirectory,
      releaseId: "test-release",
    });

    await writeFile(path.join(temporaryDirectory, "index.html"), "zweiter Stand", "utf8");

    await assert.rejects(
      verifyArtifactManifest({
        manifest,
        rootDirectory: temporaryDirectory,
        releaseId: "test-release",
      }),
      /stimmt nicht mit dem Dateibaum überein/,
    );
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});

test("weist Symlinks im öffentlichen Artefakt fail-closed zurück", async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "macmade-artifact-"));

  try {
    await writeFile(path.join(temporaryDirectory, "target.txt"), "target", "utf8");
    await symlink("target.txt", path.join(temporaryDirectory, "link.txt"));

    await assert.rejects(
      createArtifactManifest({
        rootDirectory: temporaryDirectory,
        releaseId: "test-release",
      }),
      /Symlinks sind im statischen Artefakt nicht erlaubt/,
    );
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});
