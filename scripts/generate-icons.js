import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../public/icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// SVG Source for PWA icons
const svgSource = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <!-- Background: deep forest green -->
  <rect width="512" height="512" rx="128" fill="#013E37" />
  
  <!-- Subtle clay blob in tangerine with 30% opacity -->
  <path d="M 256,100 C 370,80 430,160 410,256 C 390,352 320,430 256,410 C 192,430 120,360 102,256 C 80,140 142,120 256,100 Z" fill="#F58F20" opacity="0.3" />
  
  <!-- Central stylized leaf structure -->
  <g transform="translate(156, 100) scale(4)">
    <!-- Leaf base -->
    <path d="M25,5 C12,18 12,35 25,45 C38,35 38,18 25,5 Z" fill="#467434" />
    <!-- Stem and main vein -->
    <path d="M25,48 L25,5" stroke="#FFEFB3" stroke-width="2" stroke-linecap="round" />
    <!-- Side veins -->
    <path d="M25,15 L32,10 M25,23 L34,18 M25,31 L32,26" stroke="#FFEFB3" stroke-width="1.5" stroke-linecap="round" />
    <path d="M25,15 L18,10 M25,23 L16,18 M25,31 L18,26" stroke="#FFEFB3" stroke-width="1.5" stroke-linecap="round" />
  </g>

  <!-- Monogram: FN -->
  <text x="256" y="440" font-family="'Playfair Display', 'Georgia', serif" font-weight="900" font-size="75" text-anchor="middle" dominant-baseline="middle">
    <tspan fill="#FFEFB3">F</tspan><tspan fill="#F58F20">N</tspan>
  </text>
</svg>
`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  console.log('Generating PWA icons...');
  try {
    const svgBuffer = Buffer.from(svgSource);

    for (const size of sizes) {
      const outputPath = path.join(iconsDir, `icon-${size}.png`);
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`✓ Generated icon-${size}.png`);
    }

    // Also generate a favicon.ico by converting a small png to ico or using a 32x32 png
    // We will save a 32x32 png as favicon.ico or write a simple favicon file.
    const faviconPath = path.join(__dirname, '../public/favicon.ico');
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(faviconPath); // using png format for favicon.ico works in modern browsers
    console.log('✓ Generated favicon.ico');
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
