import type { NextConfig } from "next";

const configuredReleaseId = process.env.MACMADE_RELEASE_ID?.trim();
const releaseId = configuredReleaseId || "local-development";

if (configuredReleaseId && !/^[a-f0-9]{40}$/.test(configuredReleaseId)) {
  throw new Error(
    "MACMADE_RELEASE_ID muss der vollständige Git-Commit-SHA des Builds sein.",
  );
}

const nextConfig: NextConfig = {
  deploymentId: releaseId,
  generateBuildId: async () => releaseId,
  output: "export",
};

export default nextConfig;
