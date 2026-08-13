import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  createArtifactManifest,
  verifyArtifactManifest,
  verifyManifestFile,
} from "../scripts/static-artifact.mjs";
import {
  assertCleanWorktree,
  resolveReleaseId,
} from "../scripts/run-static-build.mjs";

async function createTestRepository() {
  const repository = await mkdtemp(path.join(os.tmpdir(), "macmade-build-id-"));
  execFileSync("git", ["init", "--quiet"], { cwd: repository });
  execFileSync("git", ["config", "user.name", "Codex Test"], { cwd: repository });
  execFileSync("git", ["config", "user.email", "codex-test@example.invalid"], {
    cwd: repository,
  });
  await writeFile(path.join(repository, "tracked.txt"), "versioniert", "utf8");
  execFileSync("git", ["add", "tracked.txt"], { cwd: repository });
  execFileSync("git", ["commit", "--quiet", "-m", "test baseline"], {
    cwd: repository,
  });
  return repository;
}

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

test("akzeptiert als Release-ID ausschließlich den tatsächlichen HEAD", async () => {
  const repository = await createTestRepository();

  try {
    const headRevision = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: repository,
      encoding: "utf8",
    }).trim();

    assert.equal(resolveReleaseId({ cwd: repository, env: {} }), headRevision);
    assert.equal(
      resolveReleaseId({
        cwd: repository,
        env: { MACMADE_RELEASE_ID: headRevision },
      }),
      headRevision,
    );
    assert.throws(
      () =>
        resolveReleaseId({
          cwd: repository,
          env: { MACMADE_RELEASE_ID: "0".repeat(40) },
        }),
      /stimmt nicht mit HEAD überein/,
    );
  } finally {
    await rm(repository, { recursive: true, force: true });
  }
});

test("weist einen veränderten oder unversionierten Arbeitsbaum zurück", async () => {
  const repository = await createTestRepository();

  try {
    assert.doesNotThrow(() => assertCleanWorktree({ cwd: repository }));

    await writeFile(path.join(repository, "tracked.txt"), "verändert", "utf8");
    assert.throws(
      () => assertCleanWorktree({ cwd: repository }),
      /vollständig sauberen Git-Arbeitsbaum/,
    );

    execFileSync("git", ["restore", "tracked.txt"], { cwd: repository });
    await writeFile(path.join(repository, "untracked.txt"), "neu", "utf8");
    assert.throws(
      () => assertCleanWorktree({ cwd: repository }),
      /vollständig sauberen Git-Arbeitsbaum/,
    );
  } finally {
    await rm(repository, { recursive: true, force: true });
  }
});
