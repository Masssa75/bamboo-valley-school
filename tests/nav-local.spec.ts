import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

test.describe('Navigation Dropdowns - Local Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);
    await page.waitForLoadState('networkidle');
  });

  test('Programs dropdown opens on click', async ({ page }) => {
    // Find the Programs button
    const programsButton = page.locator('button:has-text("Programs")').first();
    await expect(programsButton).toBeVisible();

    // Click to open dropdown
    await programsButton.click();
    await page.waitForTimeout(300);

    // Check if dropdown is visible
    const allProgramsLink = page.locator('text=All Programs');
    await expect(allProgramsLink).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/programs-click.png' });

    // Click a dropdown item
    await allProgramsLink.click();
    await page.waitForTimeout(500);

    // Should navigate to programs page
    expect(page.url()).toContain('/programs');
  });

  test('Child Wellbeing dropdown opens on click', async ({ page }) => {
    // Find the Child Wellbeing button
    const wellbeingButton = page.locator('button:has-text("Child Wellbeing")').first();
    await expect(wellbeingButton).toBeVisible();

    // Click to open dropdown
    await wellbeingButton.click();
    await page.waitForTimeout(300);

    // Check if dropdown is visible
    const overviewLink = page.locator('text=Overview').first();
    await expect(overviewLink).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/wellbeing-click.png' });
  });

  test('Language switcher switches to Thai', async ({ page }) => {
    // Find and click language button
    const langButton = page.locator('button:has-text("EN")').first();
    await expect(langButton).toBeVisible();
    await langButton.click();
    await page.waitForTimeout(300);

    // Click Thai option
    const thaiOption = page.locator('text=ไทย');
    await expect(thaiOption).toBeVisible();
    await thaiOption.click();

    // Wait for page load
    await page.waitForTimeout(1000);

    // Should be on Thai page
    expect(page.url()).toContain('/th/');
  });

  test('Dropdown closes when clicking outside', async ({ page }) => {
    // Open programs dropdown
    const programsButton = page.locator('button:has-text("Programs")').first();
    await programsButton.click();
    await page.waitForTimeout(300);

    // Verify it's open
    const dropdown = page.locator('text=All Programs');
    await expect(dropdown).toBeVisible();

    // Click outside (on the body/hero area)
    await page.click('body', { position: { x: 100, y: 400 } });
    await page.waitForTimeout(300);

    // Dropdown should be closed
    await expect(dropdown).not.toBeVisible();
  });
});
