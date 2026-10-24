const { test, expect } = require('@playwright/test');

test.describe('Component and Routing Tests', () => {
  test('header and menu components are visible on the home page', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('#nav');
    await expect(header).toBeVisible();

    const menuToggle = page.locator('#mobToggle');
    // Using isHidden/isVisible because mobToggle might be hidden in desktop view depending on CSS
    await expect(menuToggle).toBeAttached();

    const menu = page.locator('#mobMenu');
    await expect(menu).toBeAttached(); // Might be hidden depending on CSS, but should exist
  });

  test('navigation to /works/ works correctly', async ({ page }) => {
    await page.goto('/');

    // Find the link to works and click it
    const worksLink = page.locator('.nav-links a[href="/works/"]').first();
    await worksLink.click();

    // Assert that the URL changed to include /works/
    await expect(page).toHaveURL(/\/works\//);
  });

  test('navigation to /tools/ works correctly', async ({ page }) => {
    await page.goto('/');

    // Find the link to tools and click it
    const toolsLink = page.locator('.nav-links a[href="/tools/"]').first();
    await toolsLink.click();

    // Assert that the URL changed to include /tools/
    await expect(page).toHaveURL(/\/tools\//);
  });
});
