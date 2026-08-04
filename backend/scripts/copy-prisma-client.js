const fs = require("node:fs");
const path = require("node:path");

const source = path.join(__dirname, "..", "src", "generated", "prisma");
const destination = path.join(__dirname, "..", "dist", "src", "generated", "prisma");
const assetExtensions = new Set([".node", ".wasm", ".prisma", ".json"]);

if (!fs.existsSync(source)) {
  console.warn("Prisma generated client folder was not found. Run prisma generate before building.");
  process.exit(0);
}

const copyAssets = (fromDir, toDir) => {
  fs.mkdirSync(toDir, { recursive: true });

  for (const entry of fs.readdirSync(fromDir, { withFileTypes: true })) {
    const fromPath = path.join(fromDir, entry.name);
    const toPath = path.join(toDir, entry.name);

    if (entry.isDirectory()) {
      copyAssets(fromPath, toPath);
      continue;
    }

    if (!assetExtensions.has(path.extname(entry.name))) {
      continue;
    }

    fs.copyFileSync(fromPath, toPath);
  }
};

copyAssets(source, destination);

console.log("Copied Prisma runtime assets to dist.");
