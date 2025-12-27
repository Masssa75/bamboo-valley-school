import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

test('Debug Programs dropdown', async ({ page }) => {
  await page.goto(`${BASE_URL}/en/`);
  await page.waitForLoadState('networkidle');

  // Take initial screenshot
  await page.screenshot({ path: 'tests/screenshots/debug-1-initial.png', fullPage: true });

  // Find and click the Programs button
  const programsButton = page.locator('button:has-text("Programs")').first();
  console.log('Programs button found:', await programsButton.count());

  if (await programsButton.count() > 0) {
    await programsButton.click();
    await page.waitForTimeout(500);

    // Take screenshot after click
    await page.screenshot({ path: 'tests/screenshots/debug-2-after-click.png', fullPage: true });

    // Check what's on the page
    const allText = await page.locator('body').innerText();
    console.log('Page contains "All Programs":', allText.includes('All Programs'));
    console.log('Page contains "Nursery":', allText.includes('Nursery'));
  }

  // Also try hover
  await page.goto(`${BASE_URL}/en/`);
  await page.waitForLoadState('networkidle');

  const programsBtn2 = page.locator('button:has-text("Programs")').first();
  await programsBtn2.hover();
  await page.waitForTimeout(500);

  await page.screenshot({ path: 'tests/screenshots/debug-3-after-hover.png', fullPage: true });
});
