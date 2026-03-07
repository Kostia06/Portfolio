const puppeteer = require('puppeteer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const url = process.argv[2] || 'https://mrblu.com';
const name = process.argv[3] || 'mrblu';

async function capture() {
  console.log(`Capturing screenshot of ${url}...`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait for entrance animations to complete (5 seconds)
  await new Promise(r => setTimeout(r, 5000));

  const screenshotPath = path.join(__dirname, '..', 'static', 'screenshots', `${name}.png`);
  await page.screenshot({ path: screenshotPath });

  await browser.close();

  console.log(`Screenshot saved to ${screenshotPath}`);

  // Optimize to WebP
  const outputDir = path.join(__dirname, '..', 'static', 'screenshots');

  // Desktop WebP
  await sharp(screenshotPath)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(outputDir, `${name}.webp`));

  // Mobile WebP
  await sharp(screenshotPath)
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(path.join(outputDir, `${name}-mobile.webp`));

  const webpSize = fs.statSync(path.join(outputDir, `${name}.webp`)).size;
  console.log(`Optimized WebP: ${(webpSize / 1024).toFixed(0)}KB`);

  console.log('Done!');
}

capture().catch(console.error);
