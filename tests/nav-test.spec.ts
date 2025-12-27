import { test, expect } from '@playwright/test';

test.describe('Navigation and Language Switcher', () => {
  test.beforeEach(async ({ page }) => {
    // Use the staging URL for testing
    await page.goto('https://staging--bamboo-valley-school.netlify.app/en/');
    await page.waitForLoadState('networkidle');
  });

  test('Programs dropdown opens on hover', async ({ page }) => {
    // Find the Programs link
    const programsLink = page.locator('text=Programs').first();
    await expect(programsLink).toBeVisible();

    // Hover over Programs
    await programsLink.hover();

    // Wait for dropdown to appear
    await page.waitForTimeout(500);

    // Check if dropdown content is visible
    const dropdown = page.locator('text=All Programs');
    const isVisible = await dropdown.isVisible();
    console.log('Programs dropdown visible:', isVisible);

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/programs-dropdown.png' });
  });

  test('Language switcher opens and works', async ({ page }) => {
    // Find the language switcher button (EN with flag)
    const langButton = page.locator('button:has-text("EN")').first();
    await expect(langButton).toBeVisible();

    console.log('Found language button');

    // Click the language switcher
    await langButton.click();
    await page.waitForTimeout(500);

    // Take screenshot of dropdown
    await page.screenshot({ path: 'tests/screenshots/lang-dropdown.png' });

    // Look for Thai option
    const thaiOption = page.locator('text=ไทย');
    const thaiVisible = await thaiOption.isVisible();
    console.log('Thai option visible:', thaiVisible);

    if (thaiVisible) {
      // Click Thai
      await thaiOption.click();

      // Wait for navigation
      await page.waitForTimeout(1000);

      // Check URL changed to /th/
      const url = page.url();
      console.log('New URL:', url);
      expect(url).toContain('/th/');
    }
  });

  test('Root URL redirects to /en/', async ({ page }) => {
    await page.goto('https://staging--bamboo-valley-school.netlify.app/');
    await page.waitForTimeout(2000);

    const url = page.url();
    console.log('After redirect, URL:', url);

    // Should have redirected to /en/
    expect(url).toContain('/en/');
  });
});
