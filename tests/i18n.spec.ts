import { test, expect } from '@playwright/test';

const BASE_URL = 'https://i18n-preview--bamboo-valley-school.netlify.app';

test.describe('i18n Implementation', () => {
  test('root URL should redirect to /en/', async ({ page }) => {
    await page.goto(BASE_URL);
    // Check if we're redirected to /en/ or if we get a 404
    const url = page.url();
    console.log('Current URL:', url);
    // This will likely fail - showing the issue
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('English homepage loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);
    await expect(page).toHaveTitle(/Bamboo Valley/);
    // Check for English nav text
    await expect(page.locator('text=Our Story').first()).toBeVisible();
  });

  test('Thai homepage loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/th/`);
    await expect(page).toHaveTitle(/Bamboo Valley/);
    // Check for Thai nav text
    await expect(page.locator('text=เรื่องราวของเรา')).toBeVisible();
  });

  test('Russian homepage loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/ru/`);
    await expect(page).toHaveTitle(/Bamboo Valley/);
    // Check for Russian nav text
    await expect(page.locator('text=Наша история')).toBeVisible();
  });

  test('Chinese homepage loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/zh/`);
    await expect(page).toHaveTitle(/Bamboo Valley/);
    // Check for Chinese nav text
    await expect(page.locator('text=我们的故事')).toBeVisible();
  });

  test('language switcher works', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);

    // Find and click language switcher
    const langSwitcher = page.locator('button:has-text("English")').first();
    await langSwitcher.click();

    // Select Thai
    await page.locator('button:has-text("ไทย")').click();

    // Should navigate to Thai version
    await expect(page).toHaveURL(/\/th\//);
  });

  test('navigation links work in different locales', async ({ page }) => {
    await page.goto(`${BASE_URL}/th/`);

    // Click on Programs in Thai
    await page.locator('a:has-text("โปรแกรม")').first().click();

    // Should go to Thai programs page
    await expect(page).toHaveURL(/\/th\/programs/);
  });
});
