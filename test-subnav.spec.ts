import { test, expect } from '@playwright/test';

test('debug programs sub-nav behavior', async ({ page }) => {
  await page.goto('https://schwyn.co/programs');
  
  // Wait for page to fully load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  // Get all nav buttons
  const navButtons = page.locator('nav button');
  const count = await navButtons.count();
  console.log(`Found ${count} nav buttons`);
  
  // Print all button labels
  for (let i = 0; i < count; i++) {
    const text = await navButtons.nth(i).textContent();
    console.log(`Button ${i}: ${text}`);
  }
  
  // Test clicking each button and observe behavior
  const buttonLabels = ['Kindergarten', 'Primary', 'Toddler Class', 'After School', 'Saturday', 'Camps', 'Nursery'];
  
  for (const label of buttonLabels) {
    console.log(`\n--- Clicking ${label} ---`);
    
    // Get scroll position before click
    const scrollBefore = await page.evaluate(() => window.scrollY);
    console.log(`Scroll before: ${scrollBefore}`);
    
    // Click the button
    await page.locator(`nav button:has-text("${label}")`).first().click();
    
    // Wait for smooth scroll to complete
    await page.waitForTimeout(800);
    
    // Get scroll position after click
    const scrollAfter = await page.evaluate(() => window.scrollY);
    console.log(`Scroll after: ${scrollAfter}`);
    
    // Check which button is now active (has the green background)
    const activeButton = await page.locator('nav button.bg-\\[\\#BED7AF\\]').textContent();
    console.log(`Active button: ${activeButton}`);
    
    // Check if the target section is visible
    const sectionId = label.toLowerCase().replace(' ', '-').replace(' class', '');
    const section = page.locator(`#${sectionId}`);
    const isVisible = await section.isVisible().catch(() => false);
    console.log(`Section #${sectionId} visible: ${isVisible}`);
  }
  
  // Now test rapid clicking
  console.log('\n\n=== RAPID CLICK TEST ===');
  
  await page.locator('nav button:has-text("Nursery")').first().click();
  await page.waitForTimeout(200);
  await page.locator('nav button:has-text("Camps")').first().click();
  await page.waitForTimeout(200);
  
  const activeAfterRapid = await page.locator('nav button.bg-\\[\\#BED7AF\\]').textContent();
  console.log(`Active after rapid clicks: ${activeAfterRapid}`);
  
  await page.waitForTimeout(1000);
  
  const activeAfterSettle = await page.locator('nav button.bg-\\[\\#BED7AF\\]').textContent();
  console.log(`Active after settling: ${activeAfterSettle}`);
});
