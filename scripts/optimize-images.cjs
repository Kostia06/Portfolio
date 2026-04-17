const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const staticDir = './static';

  // Screenshots - resize to max 800px wide, quality 80
  const screenshotsDir = path.join(staticDir, 'screenshots');
  const screenshots = fs.readdirSync(screenshotsDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  console.log('Optimizing screenshots...');
  for (const file of screenshots) {
    const input = path.join(screenshotsDir, file);
    const name = path.parse(file).name;
    const stats = fs.statSync(input);
    const metadata = await sharp(input).metadata();

    console.log(`\n${file}: ${(stats.size / 1024).toFixed(0)}KB (${metadata.width}x${metadata.height})`);

    // Desktop WebP (max 800px)
    await sharp(input)
      .resize({ width: Math.min(metadata.width, 800), withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(screenshotsDir, `${name}.webp`));

    // Mobile WebP (max 400px)
    await sharp(input)
      .resize({ width: Math.min(metadata.width, 400), withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(path.join(screenshotsDir, `${name}-mobile.webp`));

    const desktopSize = fs.statSync(path.join(screenshotsDir, `${name}.webp`)).size;
    const mobileSize = fs.statSync(path.join(screenshotsDir, `${name}-mobile.webp`)).size;

    console.log(`  → Desktop WebP: ${(desktopSize / 1024).toFixed(0)}KB`);
    console.log(`  → Mobile WebP:  ${(mobileSize / 1024).toFixed(0)}KB`);
    console.log(`  → Saved: ${((1 - desktopSize / stats.size) * 100).toFixed(0)}%`);
  }

  // Profile image - max 400px
  const profilePath = path.join(staticDir, 'profile.jpg');
  if (fs.existsSync(profilePath)) {
    console.log('\n\nOptimizing profile image...');
    const stats = fs.statSync(profilePath);
    const metadata = await sharp(profilePath).metadata();

    console.log(`profile.jpg: ${(stats.size / 1024).toFixed(0)}KB (${metadata.width}x${metadata.height})`);

    await sharp(profilePath)
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(staticDir, 'profile.webp'));

    const newSize = fs.statSync(path.join(staticDir, 'profile.webp')).size;
    console.log(`  → WebP: ${(newSize / 1024).toFixed(0)}KB`);
    console.log(`  → Saved: ${((1 - newSize / stats.size) * 100).toFixed(0)}%`);
  }

  console.log('\n\nDone! Remember to update image references to use .webp files');
}

optimizeImages().catch(console.error);
