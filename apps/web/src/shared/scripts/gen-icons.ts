import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.resolve(__dirname, "../assets/icons");
const outDir = path.resolve(__dirname, "../constants");

const outIconsFile = path.join(outDir, "icons.ts");
const outSpriteFile = path.join(outDir, "sprite.ts");

if (!fs.existsSync(iconsDir)) {
  console.error(`❌ icons directory not found: ${iconsDir}`);
  process.exit(1);
}
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function stripXmlAndDoctype(svg: string) {
  return svg
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!doctype[\s\S]*?>/gi, "")
    .trim();
}

function extractViewBox(svg: string) {
  const open = svg.match(/<svg\b([^>]*)>/i);
  const attrs = open?.[1] ?? "";
  const vb = attrs.match(/\bviewBox=["']([^"']+)["']/i)?.[1];
  if (vb) return vb;

  const w = attrs.match(/\bwidth=["']([^"']+)["']/i)?.[1];
  const h = attrs.match(/\bheight=["']([^"']+)["']/i)?.[1];
  const wn = w ? Number(String(w).replace(/[^\d.]/g, "")) : NaN;
  const hn = h ? Number(String(h).replace(/[^\d.]/g, "")) : NaN;
  if (Number.isFinite(wn) && Number.isFinite(hn)) return `0 0 ${wn} ${hn}`;

  return "0 0 24 24";
}

function extractInner(svg: string) {
  return svg
    .replace(/^[\s\S]*?<svg\b[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "")
    .trim();
}

/* 1) 아이콘 파일 목록 */
const files = fs
  .readdirSync(iconsDir)
  .filter((f) => f.toLowerCase().endsWith(".svg"))
  .map((f) => ({ file: f, name: path.basename(f, ".svg") }))
  .sort((a, b) => a.name.localeCompare(b.name));

/* 2) icons.ts 생성 */
const iconNames = files.map((x) => x.name);
const iconsContent =
  `export const ICONS = ${JSON.stringify(iconNames, null, 2)} as const;\n` +
  `export type IconName = (typeof ICONS)[number];\n`;

fs.writeFileSync(outIconsFile, iconsContent, "utf8");

/* 3) sprite.ts 생성 */
const symbols = files.map(({ file, name }) => {
  const fullPath = path.join(iconsDir, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const cleaned = stripXmlAndDoctype(raw);
  const viewBox = extractViewBox(cleaned);
  const inner = extractInner(cleaned);

  return `<symbol id="icon-${name}" viewBox="${viewBox}">\n${inner}\n</symbol>`;
});

const spriteSvg =
  `<svg xmlns="http://www.w3.org/2000/svg">\n` +
  symbols.join("\n") +
  `\n</svg>\n`;

const spriteTsContent = `export const SPRITE = ${JSON.stringify(spriteSvg)} as const;\n`;
fs.writeFileSync(outSpriteFile, spriteTsContent, "utf8");

console.log(
  `🎨 Generated:\n- ${outIconsFile}\n- ${outSpriteFile}\n(icons: ${files.length})`
);
