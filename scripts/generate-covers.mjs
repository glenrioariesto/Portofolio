import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('public/screenshots/pemakaman-digital-v2');
const LOGO_PATH = path.resolve('../pohonkenangan/public/images/brand-tree-logo.webp');

const logoBase64 = fs.existsSync(LOGO_PATH) 
  ? `data:image/webp;base64,${fs.readFileSync(LOGO_PATH).toString('base64')}`
  : '';

function getImgBase64(filename) {
  const p = path.join(SCREENSHOTS_DIR, filename);
  if (!fs.existsSync(p)) return '';
  return `data:image/png;base64,${fs.readFileSync(p).toString('base64')}`;
}

const coverCompositions = [
  {
    output: 'cover.png',
    title: 'Pohon Kenangan',
    subtitle: 'Digital Memorial & Virtual Cemetery Platform',
    badge: 'Platform Showcase',
    mainScreen: 'landing.png',
    leftScreen: 'dashboard.png',
    rightScreen: 'virtual_cemetery.png'
  },
  {
    output: 'cover_dashboard.png',
    title: 'Pohon Kenangan',
    subtitle: 'Comprehensive Admin & Member Ecosystem',
    badge: 'Admin & Operations',
    mainScreen: 'dashboard.png',
    leftScreen: 'memorials_admin.png',
    rightScreen: 'transactions.png'
  },
  {
    output: 'cover_memorial_detail.png',
    title: 'Pohon Kenangan',
    subtitle: 'Memorial Profile, Lineage & Photo Overlay',
    badge: 'Memorial & Lineage',
    mainScreen: 'memorial_detail.png',
    leftScreen: 'family_tree.png',
    rightScreen: 'frame_overlay.png'
  },
  {
    output: 'cover_virtual_cemetery.png',
    title: 'Pohon Kenangan',
    subtitle: 'Interactive 3D Virtual Canvas & Cemetery Gate',
    badge: '3D Virtual Space',
    mainScreen: 'virtual_cemetery.png',
    leftScreen: 'gate.png',
    rightScreen: 'about.png'
  }
];

async function generateMultiPageCovers() {
  console.log('Generating multi-page composite cover mockups...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  for (const item of coverCompositions) {
    const mainImg = getImgBase64(item.mainScreen);
    const leftImg = getImgBase64(item.leftScreen);
    const rightImg = getImgBase64(item.rightScreen);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            width: 1200px;
            height: 630px;
            background-color: #FBEAD4;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
            padding: 26px 44px;
          }

          /* Ambient warmth */
          .glow-1 {
            position: absolute;
            top: -80px;
            right: -80px;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(251, 234, 212, 0) 70%);
            border-radius: 50%;
            pointer-events: none;
          }

          .glow-2 {
            position: absolute;
            bottom: -100px;
            left: -80px;
            width: 550px;
            height: 550px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(251, 234, 212, 0) 70%);
            border-radius: 50%;
            pointer-events: none;
          }

          /* Top Header Bar */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 48px;
            margin-bottom: 22px;
            z-index: 30;
          }

          .brand-left {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .logo-img {
            width: 44px;
            height: 44px;
            object-fit: contain;
            filter: drop-shadow(0 4px 10px rgba(0,0,0,0.08));
          }

          .brand-text {
            display: flex;
            flex-direction: column;
          }

          .brand-title {
            font-size: 21px;
            font-weight: 800;
            color: #451a03;
            letter-spacing: -0.02em;
            line-height: 1.2;
          }

          .brand-sub {
            font-size: 12px;
            font-weight: 600;
            color: #92400e;
          }

          .badge {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.85);
            color: #78350f;
            padding: 7px 18px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.02em;
            box-shadow: 0 4px 14px rgba(120, 53, 15, 0.06);
          }

          /* Multi-window Mockup Stage */
          .stage {
            flex: 1;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .window {
            position: absolute;
            background: #ffffff;
            border-radius: 14px;
            box-shadow: 0 24px 50px -10px rgba(69, 26, 3, 0.22), 0 0 0 1px rgba(69, 26, 3, 0.08);
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .window-bar {
            height: 28px;
            background: #fdfbf8;
            border-bottom: 1px solid #f3ece4;
            display: flex;
            align-items: center;
            padding: 0 12px;
            gap: 10px;
          }

          .window-dots {
            display: flex;
            gap: 5px;
          }

          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
          }
          .dot-red { background: #ff5f56; }
          .dot-yellow { background: #ffbd2e; }
          .dot-green { background: #27c93f; }

          .window-body {
            flex: 1;
            overflow: hidden;
            background: #faf8f5;
          }

          .window-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
          }

          /* Left Window */
          .window-left {
            width: 520px;
            height: 380px;
            left: 10px;
            bottom: 0px;
            z-index: 10;
            transform: perspective(1000px) rotateY(6deg) rotateZ(-2deg) scale(0.92);
            opacity: 0.95;
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.12));
          }

          /* Right Window */
          .window-right {
            width: 520px;
            height: 380px;
            right: 10px;
            bottom: 0px;
            z-index: 10;
            transform: perspective(1000px) rotateY(-6deg) rotateZ(2deg) scale(0.92);
            opacity: 0.95;
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.12));
          }

          /* Center Main Window */
          .window-main {
            width: 680px;
            height: 440px;
            bottom: -20px;
            z-index: 20;
            box-shadow: 0 35px 70px -15px rgba(69, 26, 3, 0.32), 0 0 0 1.5px rgba(69, 26, 3, 0.1);
          }
        </style>
      </head>
      <body>
        <div class="glow-1"></div>
        <div class="glow-2"></div>

        <div class="header">
          <div class="brand-left">
            ${logoBase64 ? `<img src="${logoBase64}" class="logo-img" alt="Logo" />` : ''}
            <div class="brand-text">
              <span class="brand-title">${item.title}</span>
              <span class="brand-sub">${item.subtitle}</span>
            </div>
          </div>
          <div class="badge">${item.badge}</div>
        </div>

        <div class="stage">
          ${leftImg ? `
            <div class="window window-left">
              <div class="window-bar">
                <div class="window-dots">
                  <div class="dot dot-red"></div>
                  <div class="dot dot-yellow"></div>
                  <div class="dot dot-green"></div>
                </div>
              </div>
              <div class="window-body">
                <img src="${leftImg}" class="window-img" />
              </div>
            </div>
          ` : ''}

          ${rightImg ? `
            <div class="window window-right">
              <div class="window-bar">
                <div class="window-dots">
                  <div class="dot dot-red"></div>
                  <div class="dot dot-yellow"></div>
                  <div class="dot dot-green"></div>
                </div>
              </div>
              <div class="window-body">
                <img src="${rightImg}" class="window-img" />
              </div>
            </div>
          ` : ''}

          ${mainImg ? `
            <div class="window window-main">
              <div class="window-bar">
                <div class="window-dots">
                  <div class="dot dot-red"></div>
                  <div class="dot dot-yellow"></div>
                  <div class="dot dot-green"></div>
                </div>
              </div>
              <div class="window-body">
                <img src="${mainImg}" class="window-img" />
              </div>
            </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    const outputPath = path.join(SCREENSHOTS_DIR, item.output);
    await page.screenshot({ path: outputPath, type: 'png' });
    console.log(`✅ Generated multi-page cover: ${item.output}`);
  }

  await browser.close();
  console.log('🎉 Multi-page covers generated successfully!');
}

generateMultiPageCovers();
