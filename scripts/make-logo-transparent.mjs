// One-off: turn the black-background brand JPG into a transparent-background PNG
// lockup (icon + correctly-fonted wordmark) so it can sit on any surface and the
// real logo font is used everywhere instead of CSS text.
import sharp from "sharp";

const SRC = "public/codlinx logo.jpg";
const OUT = "public/codlinx-logo.png";

// Soft alpha key: pixels darker than LO become fully transparent, brighter than
// HI fully opaque, with a ramp between for anti-aliased edges. White wordmark and
// teal icon are well above HI, so they stay solid; the black field drops out.
const LO = 30;
const HI = 85;

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const m = Math.max(r, g, b);
  let a = ((m - LO) / (HI - LO)) * 255;
  a = a < 0 ? 0 : a > 255 ? 255 : a;
  data[i + 3] = Math.round(a);
}

await sharp(data, { raw: { width, height, channels } })
  .trim() // crop the now-transparent border tight to the lockup
  .resize({ width: 1100, withoutEnlargement: true }) // keep asset light + crisp
  .png()
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`wrote ${OUT} -> ${meta.width}x${meta.height}`);
