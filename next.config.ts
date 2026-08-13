import type { NextConfig } from "next";

const configuredReleaseId = process.env.MACMADE_RELEASE_ID?.trim();

if (process.env.NODE_ENV === "production" && !configuredReleaseId) {
  throw new Error(
    "Ein Produktionsbuild benötigt MACMADE_RELEASE_ID als vollständigen Git-Commit-SHA.",
  );
}

if (configuredReleaseId && !/^[a-f0-9]{40}$/.test(configuredReleaseId)) {
  throw new Error(
    "MACMADE_RELEASE_ID muss der vollständige Git-Commit-SHA des Builds sein.",
  );
}

const releaseId = configuredReleaseId || "local-development";

const nextConfig: NextConfig = {
  deploymentId: releaseId,
  generateBuildId: async () => releaseId,
  output: "export",
};

export default nextConfig;
