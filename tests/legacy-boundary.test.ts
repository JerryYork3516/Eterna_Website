import { readFileSync, readdirSync } from "node:fs";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";
import { describe, expect, it } from "vitest";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ignoredDirectories = new Set([
  ".agents",
  ".git",
  ".next",
  "docs",
  "legacy",
  "node_modules",
  "references",
  "tests",
]);
const sourceExtensions = new Set([
  ".cjs",
  ".css",
  ".cts",
  ".js",
  ".jsx",
  ".mjs",
  ".mts",
  ".ts",
  ".tsx",
]);

type SourceFile = Readonly<{
  path: string;
  contents: string;
}>;

function collectRootSourceFiles(directory: string): SourceFile[] {
  return readdirSync(directory, { withFileTypes: true })
    .sort((left, right) =>
      left.name < right.name ? -1 : left.name > right.name ? 1 : 0,
    )
    .flatMap((entry) => {
      const sourcePath = resolve(directory, entry.name);

      if (entry.isDirectory()) {
        return ignoredDirectories.has(entry.name)
          ? []
          : collectRootSourceFiles(sourcePath);
      }

      return sourceExtensions.has(extname(entry.name))
        ? [{ path: sourcePath, contents: readFileSync(sourcePath, "utf8") }]
        : [];
    });
}

function importedSpecifiers(sourceFile: SourceFile): string[] {
  if (extname(sourceFile.path) === ".css") {
    return Array.from(
      sourceFile.contents.matchAll(
        /@import\s+(?:url\(\s*)?(?:["']([^"']+)["']|([^\s;)]+))/g,
      ),
      (match) => match[1] ?? match[2],
    );
  }

  return ts
    .preProcessFile(sourceFile.contents, true, true)
    .importedFiles.map(({ fileName }) => fileName);
}

function forbiddenBoundary(
  sourcePath: string,
  specifier: string,
): string | undefined {
  const normalizedSpecifier = specifier
    .replaceAll("\\", "/")
    .split(/[?#]/, 1)[0];

  if (/^ogl(?:\/|$)/.test(normalizedSpecifier)) {
    return "Legacy OGL";
  }

  const candidates = [normalizedSpecifier];

  if (normalizedSpecifier.startsWith(".")) {
    candidates.push(
      relative(
        repositoryRoot,
        resolve(dirname(sourcePath), normalizedSpecifier),
      ).replaceAll("\\", "/"),
    );
  }

  for (const candidate of candidates) {
    if (/(^|\/)legacy\/src(?:\/|$)/.test(candidate)) {
      return "legacy/src";
    }

    if (/(^|\/)legacy\/styles\.css$/.test(candidate)) {
      return "legacy/styles.css";
    }

    if (/(^|\/)legacy\/api\/create\.js$/.test(candidate)) {
      return "legacy/api/create.js";
    }
  }

  return undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readDependencyNames(manifestContents: string): string[] {
  const manifest: unknown = JSON.parse(manifestContents);

  if (!isRecord(manifest)) {
    throw new Error("package.json must contain an object");
  }

  return [
    "dependencies",
    "devDependencies",
    "optionalDependencies",
    "peerDependencies",
  ].flatMap((section) => {
    const dependencies = manifest[section];

    if (dependencies === undefined) {
      return [];
    }

    if (!isRecord(dependencies)) {
      throw new Error(`package.json ${section} must contain an object`);
    }

    return Object.keys(dependencies);
  });
}

function findLegacyBoundaryViolations(
  sourceFiles: readonly SourceFile[],
  dependencyNames: readonly string[],
): string[] {
  const sourceViolations = sourceFiles.flatMap((sourceFile) =>
    importedSpecifiers(sourceFile).flatMap((specifier) => {
      const boundary = forbiddenBoundary(sourceFile.path, specifier);

      return boundary === undefined
        ? []
        : [
            `${relative(repositoryRoot, sourceFile.path)} imports ${specifier} (${boundary})`,
          ];
    }),
  );
  const dependencyViolations = dependencyNames
    .filter((dependencyName) => /^ogl(?:\/|$)/.test(dependencyName))
    .map(
      (dependencyName) =>
        `package.json depends on ${dependencyName} (Legacy OGL)`,
    );

  return [...sourceViolations, ...dependencyViolations];
}

describe("root application Legacy boundary", () => {
  it("accepts the current root application", () => {
    const sourceFiles = collectRootSourceFiles(repositoryRoot);
    const dependencyNames = readDependencyNames(
      readFileSync(resolve(repositoryRoot, "package.json"), "utf8"),
    );

    expect(findLegacyBoundaryViolations(sourceFiles, dependencyNames)).toEqual(
      [],
    );
  });

  it("rejects forbidden Legacy imports and dependencies", () => {
    const fixtureDirectory = resolve(repositoryRoot, "app");
    const sourceFiles: SourceFile[] = [
      {
        path: resolve(fixtureDirectory, "legacy-source-fixture.ts"),
        contents: 'import "../legacy/src/main";',
      },
      {
        path: resolve(fixtureDirectory, "legacy-styles-fixture.css"),
        contents: "@import url(../legacy/styles.css);",
      },
      {
        path: resolve(fixtureDirectory, "legacy-ogl-fixture.ts"),
        contents: 'import "ogl";',
      },
      {
        path: resolve(fixtureDirectory, "legacy-api-fixture.ts"),
        contents: 'import "../legacy/api/create.js";',
      },
    ];

    expect(findLegacyBoundaryViolations(sourceFiles, ["ogl"])).toEqual([
      "app/legacy-source-fixture.ts imports ../legacy/src/main (legacy/src)",
      "app/legacy-styles-fixture.css imports ../legacy/styles.css (legacy/styles.css)",
      "app/legacy-ogl-fixture.ts imports ogl (Legacy OGL)",
      "app/legacy-api-fixture.ts imports ../legacy/api/create.js (legacy/api/create.js)",
      "package.json depends on ogl (Legacy OGL)",
    ]);
  });
});
