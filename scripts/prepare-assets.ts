import * as fs from "node:fs";
import * as path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = process.env.ASSET_SOURCE_DIR || "E:/hydre-nutrition";
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DESIGN_REF_DIR = path.join(PROJECT_ROOT, "docs", "design-reference");
const SOURCE_ASSETS_DIR = path.join(PROJECT_ROOT, "public", "assets", "source");
const OPTIMIZED_DIR = path.join(PROJECT_ROOT, "public", "assets", "optimized");

const DESIGN_REFERENCES = [
  "Mobile section 1.png",
  "Mobile section 2-3.png",
  "Mobile section 4-5.png",
  "Mobile section 6.png",
  "PC section 1.png",
  "PC section 2-3.png",
  "pc section 4-5.png",
  "PC section 6.png",
];

const PRODUCTION_ASSETS: Array<{
  source: string;
  dest: string;
  width: number;
  height: number;
}> = [
  {
    source: "hero-product-scene+background.png",
    dest: "hero-product-scene-background.png",
    width: 2048,
    height: 1152,
  },
  { source: "flavor-passion-scene.png", dest: "flavor-passion-scene.png", width: 1638, height: 2048 },
  { source: "flavor-berry-scene.png", dest: "flavor-berry-scene.png", width: 1365, height: 2048 },
  { source: "flavor-next-scene.png", dest: "flavor-next-scene.png", width: 1638, height: 2048 },
  { source: "electrolyte-temple.png", dest: "electrolyte-temple.png", width: 1638, height: 2048 },
  {
    source: "electrolyte-temple-background.png",
    dest: "electrolyte-temple-background.png",
    width: 2048,
    height: 1152,
  },
  {
    source: "comparison-arena-scene.png",
    dest: "comparison-arena-scene.png",
    width: 2048,
    height: 1152,
  },
  { source: "hydratis-packshot.png", dest: "hydratis-packshot.png", width: 1086, height: 1448 },
  { source: "decathlon-packshot.png", dest: "decathlon-packshot.png", width: 1086, height: 1448 },
  { source: "dragon-mark-gold.png", dest: "dragon-mark-gold.png", width: 1254, height: 1254 },
  { source: "founder-passport.png", dest: "founder-passport.png", width: 2048, height: 2048 },
  { source: "hydre-wordmark.png", dest: "hydre-wordmark.png", width: 2048, height: 682 },
];

function normalizeFilename(name: string): string {
  return name
    .replace(/\+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .toLowerCase();
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function copyFile(src: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(src);
    const writeStream = fs.createWriteStream(dest);
    readStream.on("error", reject);
    writeStream.on("error", reject);
    writeStream.on("finish", resolve);
    readStream.pipe(writeStream);
  });
}

async function optimizeImage(src: string, dest: string) {
  try {
    await sharp(src).webp({ quality: 80 }).toFile(dest);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log("🎨 HYDRE Nutrition — Asset Preparation Script\n");

  ensureDir(DESIGN_REF_DIR);
  ensureDir(SOURCE_ASSETS_DIR);
  ensureDir(OPTIMIZED_DIR);

  const manifest: Array<{ action: string; source: string; dest: string }> = [];

  console.log("📋 Copying design references...\n");
  for (const ref of DESIGN_REFERENCES) {
    const srcPath = path.join(SOURCE_DIR, ref);
    const destName = normalizeFilename(ref);
    const destPath = path.join(DESIGN_REF_DIR, destName);

    if (fs.existsSync(srcPath)) {
      await copyFile(srcPath, destPath);
      manifest.push({ action: "design-ref", source: ref, dest: destName });
      console.log(`  ✓ ${ref} → ${destName}`);
    } else {
      console.log(`  ✗ ${ref} — not found at ${srcPath}`);
    }
  }

  console.log("\n📦 Copying production assets...\n");
  for (const asset of PRODUCTION_ASSETS) {
    const srcPath = path.join(SOURCE_DIR, asset.source);
    const destPath = path.join(SOURCE_ASSETS_DIR, asset.dest);

    if (fs.existsSync(srcPath)) {
      await copyFile(srcPath, destPath);
      manifest.push({ action: "source", source: asset.source, dest: asset.dest });
      console.log(`  ✓ ${asset.source} → ${asset.dest} (${asset.width}×${asset.height})`);

      const webpDest = path.join(OPTIMIZED_DIR, `${asset.dest.replace(/\.\w+$/, ".webp")}`);
      const optimized = await optimizeImage(destPath, webpDest);
      if (optimized) {
        console.log(`    → Optimized WebP: ${webpDest}`);
      }
    } else {
      console.log(`  ✗ ${asset.source} — not found at ${srcPath}`);
    }
  }

  console.log(`\n✅ Done. ${manifest.length} files processed.`);
  console.log(`\nManifest:`);
  for (const entry of manifest) {
    console.log(`  [${entry.action}] ${entry.source} → ${entry.dest}`);
  }
}

main().catch((err) => {
  console.error("Asset preparation failed:", err);
  process.exit(1);
});
