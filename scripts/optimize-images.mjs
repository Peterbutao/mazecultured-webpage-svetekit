import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 78;

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full, files);
    else files.push(full);
  }
  return files;
}

async function optimizeImage(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG'].includes(ext) && !['.jpg','.jpeg','.png'].includes(ext.toLowerCase())) return null;
  // skip webp already generated? we generate from jpg, so skip if original is webp
  // Check size before
  const s0 = await stat(file);
  const before = s0.size;
  if (before < 80 * 1024) return null; // already tiny, skip

  const tmp = file + '.tmp';
  try {
    const img = sharp(file, { failOnError: false });
    const meta = await img.metadata();
    // only resize if larger than MAX_WIDTH
    const shouldResize = (meta.width || 0) > MAX_WIDTH;
    let pipeline = sharp(file, { failOnError: false }).rotate();
    if (shouldResize) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: 'inside' });

    if (ext === '.png') {
      await pipeline.png({ compressionLevel: 9, palette: true }).toFile(tmp);
    } else {
      // jpeg
      await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true }).toFile(tmp);
    }
    const s1 = await stat(tmp);
    const after = s1.size;
    // only keep if smaller
    if (after >= before) {
      await unlink(tmp);
      return { file, before, after: before, saved: 0, skipped: true };
    }
    // replace original atomically
    await sharp(tmp).toFile(file + '.swap');
    await unlink(file);
    await unlink(tmp);
    // rename swap to original
    const { rename } = await import('node:fs/promises');
    await rename(file + '.swap', file);

    // also generate webp variant alongside (same basename .webp) for future use
    const webpPath = file.replace(/\.(jpe?g|png)$/i, '.webp');
    // avoid double if original already webp
    if (ext !== '.webp' && !existsSync(webpPath)) {
      try {
        let wp = sharp(file).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 75 });
        await wp.toFile(webpPath);
      } catch {}
    }

    return { file: path.relative(ROOT, file), before, after, saved: before - after, ratio: ((1 - after/before)*100).toFixed(1) };
  } catch (e) {
    console.error('Failed', file, e.message);
    try { await unlink(tmp); } catch {}
    return null;
  }
}

async function removeJunk() {
  const files = await walk(PUBLIC);
  let removed = 0;
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (['.dng', '.docx', '.txt'].includes(ext)) {
      // keep JEZE CAPTION.txt ? user may want it but it's 617 bytes, keep txt? remove dng/docx only
      if (ext === '.txt') continue;
      console.log('Removing junk from public:', path.relative(ROOT, f));
      await unlink(f);
      removed++;
    }
  }
  return removed;
}

async function main() {
  console.log('Scanning public images...');
  const junk = await removeJunk();
  console.log(`Removed ${junk} junk files (.dng/.docx) from public`);

  const all = await walk(PUBLIC);
  const images = all.filter(f => ['.jpg','.jpeg','.png','.JPG','.JPEG','.PNG'].includes(path.extname(f)));
  console.log(`Found ${images.length} images to consider (max width ${MAX_WIDTH}, quality ${JPEG_QUALITY})`);

  let totalBefore = 0, totalAfter = 0, count = 0;
  for (const img of images) {
    const res = await optimizeImage(img);
    if (res && !res.skipped) {
      totalBefore += res.before;
      totalAfter += res.after;
      count++;
      console.log(`${res.file}: ${(res.before/1024/1024).toFixed(2)} MB → ${(res.after/1024).toFixed(1)} KB (saved ${res.ratio}%)`);
    } else if (res?.skipped) {
      console.log(`Skip (no saving): ${path.relative(ROOT, img)}`);
    }
  }
  console.log(`\nDone: ${count} optimized`);
  console.log(`Total: ${(totalBefore/1024/1024).toFixed(2)} MB → ${(totalAfter/1024/1024).toFixed(2)} MB  saved ${(totalBefore-totalAfter)/1024/1024} MB (${ totalBefore ? ((1-totalAfter/totalBefore)*100).toFixed(1) : 0 }%)`);

  // Also report final public size
  const finalFiles = await walk(PUBLIC);
  let finalSize = 0;
  for (const f of finalFiles) finalSize += (await stat(f)).size;
  console.log(`Final public folder size: ${(finalSize/1024/1024).toFixed(2)} MB across ${finalFiles.length} files`);
}

main().catch(e=>{ console.error(e); process.exit(1); });
