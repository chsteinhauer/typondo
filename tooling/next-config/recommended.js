import fs from "fs";
import { builtinModules } from "module";
import path from "path";

import { config } from "dotenv";
import fg from "fast-glob";

import withLinaria from "./with-linaria.js";

// source the default environment variables for the local env automatically
// when building
config({
  path: path.resolve(
    import.meta.dirname,
    "..",
    "..",
    ".environment",
    `${(process.env["APP_ENV"] ?? "test").replace(/[^a-z0-9-]/g, "")}.env`,
  ),
});

/**
 * @param [nextConfig] {import('next').NextConfig}
 * @returns {import('next').NextConfig}
 */
function withRecommendedConfig(nextConfig = {}) {
  return withLinaria({
    eslint: {
      // NB: We deliberately disable ESLint during builds as we already run
      // ESLint at previous stages of our pipeline.
      ignoreDuringBuilds: true,
    },
    typescript: {
      // NB: We deliberately disable TypeScript during builds as we already run
      // TypeScript at previous stages of our pipeline.
      ignoreBuildErrors: true,
    },

    reactStrictMode: true,
    trailingSlash: true,

    // create a standalone build that can be used in a Docker environment
    // without needing node_modules installed in production
    //
    // @see https://nextjs.org/docs/advanced-features/output-file-tracing
    output: "standalone",

    experimental: {
      // disable built-in node polyfilling, as we do not ever want these
      // constructs to leak to the browser
      fallbackNodePolyfills: false,

      // resolve files from the root of the repository when doing output tracing
      // so that all relevant source files are included in a standalone build
      outputFileTracingRoot: path.join(import.meta.dirname, "../../"),

      optimizePackageImports: extractMonorepoPackages(),
    },

    ...nextConfig,

    webpack: (config, options) => {
      if (!options.isServer) {
        // in case the browser ever attempts to load node.js modules, disable
        // then all together
        config.resolve.fallback = Object.fromEntries(
          builtinModules.map((val) => [val, false]),
        );
      }

      config.externals = [...config.externals, "canvas", "jsdom"];

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
}

export default withRecommendedConfig;

function extractMonorepoPackages() {
  const output = new Set();
  const workspaceRoot = path.resolve(import.meta.dirname, "..", "..");

  // eslint-disable-next-line import-x/no-named-as-default-member
  const packagePaths = fg.sync(
    [
      "**/node_modules/@apps/*",
      "**/node_modules/@i-ark/*",
      "**/node_modules/@pm2/*",
      "**/node_modules/@provider/*",
      "**/node_modules/@ui/*",
      "**/node_modules/@utils/*",
    ],
    {
      cwd: workspaceRoot,
      onlyDirectories: true,
    },
  );

  for (const pkgPath of packagePaths) {
    const pkg = JSON.parse(
      fs.readFileSync(
        path.join(workspaceRoot, pkgPath, "package.json"),
        "utf-8",
      ),
    );

    output.add(pkg.name);
  }

  return Array.from(output);
}
