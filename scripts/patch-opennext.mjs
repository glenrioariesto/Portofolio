import fs from "node:fs";
import path from "node:path";

function patchFile(relPath, transformFn) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    return;
  }
  const original = fs.readFileSync(fullPath, "utf8");
  const updated = transformFn(original);
  if (updated !== original) {
    fs.writeFileSync(fullPath, updated, "utf8");
    console.log(`[patch-opennext] Patched ${relPath}`);
  }
}

// 1. Patch @opennextjs/aws copyTracedFiles.js (Windows symlink fallback)
patchFile("node_modules/@opennextjs/aws/dist/build/copyTracedFiles.js", (src) => {
  let out = src;
  if (!out.includes("realpathSync")) {
    out = out.replace("readlinkSync,", "readlinkSync, realpathSync,");
  }
  if (!out.includes('e.code === "EPERM"')) {
    out = out.replace(
      'if (e.code !== "EEXIST") {\n                    throw e;\n                }',
      `if (e.code === "EPERM" || e.code === "EACCES") {
                    try {
                        const realPath = realpathSync(from);
                        const stat = statSync(realPath);
                        if (stat.isDirectory()) {
                            cpSync(realPath, to, { recursive: true });
                        } else {
                            copyFileAndMakeOwnerWritable(realPath, to);
                        }
                    } catch (err) {
                        if (err.code !== "EEXIST") {
                            throw e;
                        }
                    }
                } else if (e.code !== "EEXIST") {
                    throw e;
                }`
    );
  }
  return out;
});

// 2. Patch @opennextjs/cloudflare next-server.js (Next.js 16 getMiddlewareManifest compatibility)
patchFile(
  "node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/next-server.js",
  (src) => {
    if (src.includes("disableMiddlewareManifestRule")) return src;
    let out = src.replace(
      "contents = patchCode(contents, disableNodeMiddlewareRule);",
      "contents = patchCode(contents, disableNodeMiddlewareRule);\n                contents = patchCode(contents, disableMiddlewareManifestRule);"
    );
    out = out.replace(
      "export const disableNodeMiddlewareRule =",
      `export const disableMiddlewareManifestRule = \`
rule:
  pattern:
    selector: method_definition
    context: "class { getMiddlewareManifest($$$PARAMS) { $$$_ } }"
fix: |-
  getMiddlewareManifest($$$PARAMS) {
    return null;
  }
\`;
export const disableNodeMiddlewareRule =`
    );
    return out;
  }
);

// 3. Patch @opennextjs/cloudflare turbopack.js (Windows path normalization)
patchFile(
  "node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/turbopack.js",
  (src) => {
    if (src.includes('file.replace(/\\\\/g, "/")')) return src;
    let out = src.replace(
      `        if (file === "[turbopack]_runtime.js") {
            continue;
        }
        if (file.includes(".next/server/chunks/")) {
            chunks.add(file);
        }`,
      `        const normalized = file.replace(/\\\\/g, "/");
        if (normalized.endsWith("[turbopack]_runtime.js")) {
            continue;
        }
        if (normalized.includes(".next/server/chunks/")) {
            chunks.add(normalized);
        }`
    );
    out = out.replace(
      "  function requireChunk(chunkPath) {\n    switch(chunkPath) {",
      '  function requireChunk(chunkPath) {\n    const p = chunkPath.replace(/\\\\\\\\/g, "/");\n    switch(p) {'
    );
    return out;
  }
);

// 4. Patch @opennextjs/cloudflare copy-package-cli-files.js (@swc/helpers copy)
patchFile(
  "node_modules/@opennextjs/cloudflare/dist/cli/build/utils/copy-package-cli-files.js",
  (src) => {
    if (src.includes("node_modules/@swc/helpers")) return src;
    return src.replace(
      'fs.copyFileSync(path.join(packageDistDir, "cli/templates/worker.js"), getOutputWorkerPath(buildOpts));',
      `fs.copyFileSync(path.join(packageDistDir, "cli/templates/worker.js"), getOutputWorkerPath(buildOpts));
    try {
        const swcSrc = path.join(buildOpts.appPath, "node_modules/@swc/helpers");
        const swcDest = path.join(buildOpts.outputDir, "server-functions/default/node_modules/@swc/helpers");
        if (fs.existsSync(swcSrc)) {
            fs.mkdirSync(swcDest, { recursive: true });
            fs.cpSync(swcSrc, swcDest, { recursive: true });
        }
    } catch (e) {
        // ignore
    }`
    );
  }
);
