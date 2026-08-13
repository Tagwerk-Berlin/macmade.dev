import { mkdir, readdir, rename } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

async function collectHtmlRoutes(rootDirectory, currentDirectory = rootDirectory) {
  const routes = [];
  const entries = await readdir(currentDirectory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(currentDirectory, entry.name);

    if (entry.isDirectory()) {
      routes.push(...(await collectHtmlRoutes(rootDirectory, absolutePath)));
      continue;
    }

    if (
      entry.isFile() &&
      entry.name.endsWith(".html") &&
      entry.name !== "index.html" &&
      entry.name !== "404.html"
    ) {
      routes.push(absolutePath);
    }
  }

  return routes.sort();
}

export async function normalizeStaticRoutes({ rootDirectory }) {
  const routeFiles = await collectHtmlRoutes(rootDirectory);

  for (const sourcePath of routeFiles) {
    const targetDirectory = sourcePath.slice(0, -".html".length);
    const targetPath = path.join(targetDirectory, "index.html");

    await mkdir(targetDirectory, { recursive: true });
    await rename(sourcePath, targetPath);
  }

  return routeFiles.length;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  normalizeStaticRoutes({ rootDirectory: path.resolve(process.argv[2] || "dist/client") })
    .then((count) => console.log(`${count} statische Routen normalisiert`))
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    });
}
