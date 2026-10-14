const { chromium } = require('playwright');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const path = require('path');

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  // Typical desktop size to get the layout matching the screenshot
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log("Navigating to gallery...");
  await page.goto('http://localhost:5173/#girish-memorial/gallery', { waitUntil: 'networkidle' });

  // Wait a bit for the modal to fully appear and first image to load
  await page.waitForTimeout(3000);

  const totalSlides = 36;
  const screenshots = [];

  for (let i = 1; i <= totalSlides; i++) {
    console.log(`Capturing slide ${i}...`);
    // Wait for animations and image load
    await page.waitForTimeout(1500); 

    const screenshotPath = `slide-${i}.png`;
    await page.screenshot({ path: screenshotPath });
    screenshots.push(screenshotPath);

    if (i < totalSlides) {
      // Click Next
      const nextBtn = page.getByRole('button', { name: /Next/i });
      if (await nextBtn.isVisible()) {
          await nextBtn.click();
      } else {
          console.log("Next button not found, stopping early.");
          break;
      }
    }
  }

  await browser.close();
  console.log("Browser closed. Merging to PDF...");

  const pdfDoc = await PDFDocument.create();
  
  for (const imgPath of screenshots) {
    const imgBytes = fs.readFileSync(imgPath);
    const image = await pdfDoc.embedPng(imgBytes);
    const { width, height } = image.scale(1);
    
    const pdfPage = pdfDoc.addPage([width, height]);
    pdfPage.drawImage(image, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });
    
    // Clean up the PNG
    fs.unlinkSync(imgPath);
  }

  const outPath = path.resolve(process.cwd(), 'Girish_Chronicles.pdf');
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outPath, pdfBytes);
  
  console.log("PDF created successfully at: " + outPath);
  
  // Create artifact metadata for AI
  fs.writeFileSync('artifact_info.txt', outPath);

})();
