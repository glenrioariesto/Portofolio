import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve('public/screenshots/pemakaman-digital-v2');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const pagesToCapture = [
  { name: 'landing.png', url: 'https://pohonkenangan.vercel.app/id', fullPage: false },
  { name: 'about.png', url: 'https://pohonkenangan.vercel.app/id/about', fullPage: false },
  { name: 'memorials.png', url: 'https://pohonkenangan.vercel.app/id/memorials', fullPage: false },
  { name: 'virtual_cemetery.png', url: 'https://pohonkenangan.vercel.app/en/virtual-cemetery', fullPage: false },
  { name: 'privacy.png', url: 'https://pohonkenangan.vercel.app/id/privacy', fullPage: false },
  { name: 'terms.png', url: 'https://pohonkenangan.vercel.app/id/terms', fullPage: false }
];

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1440,900'
    ],
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2
    }
  });

  const page = await browser.newPage();

  // Disable/skip all tours in localStorage before page loads
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('has_seen_tour_1_v1', 'true');
    localStorage.setItem('has_seen_tour_2_v1', 'true');
    localStorage.setItem('dashboard_tour_main_v1', 'true');
    localStorage.setItem('dashboard_tour_sidebar_v1', 'true');
    localStorage.setItem('has_seen_tour', 'true');
    localStorage.setItem('tour_completed', 'true');
  });

  for (const item of pagesToCapture) {
    console.log(`Navigating to ${item.url} for ${item.name}...`);
    try {
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 35000 });
      
      // Wait for animations and ensure any overlay/tooltip is skipped/removed
      await new Promise((r) => setTimeout(r, 2000));
      
      await page.evaluate(() => {
        // Remove any joyride or tour tooltips/overlays if present
        document.querySelectorAll('[data-action="skip"], button[title="Skip"], button[aria-label="Skip"]').forEach(btn => btn.click());
        document.querySelectorAll('.react-joyride__tooltip, .react-joyride__overlay, [data-tour-active]').forEach(el => el.remove());
      });

      await new Promise((r) => setTimeout(r, 1000));

      const dest = path.join(OUTPUT_DIR, item.name);
      await page.screenshot({ path: dest, fullPage: item.fullPage });
      console.log(`Saved screenshot to ${dest}`);
    } catch (err) {
      console.error(`Failed to capture ${item.name}:`, err.message);
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture();
