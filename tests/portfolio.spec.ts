import { test, expect } from '@playwright/test';

test.describe('Studio Portfolio Navigation', () => {
  test('should verify portfolio navigation, modal transitions, and responsive menu', async ({ page, isMobile }) => {
    await page.goto('/');

    // 1. Verify Portfolio Navigation
    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeVisible();

    const portfolioCards = portfolioSection.locator('.portfolio-card');
    await expect(portfolioCards).toHaveCount(3);

    // Check links of portfolio cards
    await expect(portfolioCards.nth(0)).toHaveAttribute('href', '/case-studies/game-lab/');
    await expect(portfolioCards.nth(1)).toHaveAttribute('href', '/case-studies/ai-pipeline/');
    await expect(portfolioCards.nth(2)).toHaveAttribute('href', '/case-studies/freeworkshop/');

    // 2. Responsive Menu Behavior
    if (isMobile) {
      // On mobile, the hamburger menu is used
      const mobToggle = page.locator('#mobToggle');
      await expect(mobToggle).toBeVisible();

      const mobMenu = page.locator('#mobMenu');
      await expect(mobMenu).not.toHaveClass(/open/);

      // Open the menu
      await mobToggle.click();
      await expect(mobMenu).toHaveClass(/open/);
      await expect(mobMenu).toBeVisible();

      // Close the menu
      const mobClose = page.locator('#mobClose');
      await mobClose.click();
      await expect(mobMenu).not.toHaveClass(/open/);
    } else {
      // On desktop, regular nav is used
      const navLinks = page.locator('.nav-links');
      await expect(navLinks).toBeVisible();

      // Desktop Explore Menu
      const exploreButton = page.locator('#navMoreButton');
      const exploreMenu = page.locator('#navMoreMenu');

      await expect(exploreMenu).not.toHaveClass(/open/);
      await exploreButton.click();
      await expect(exploreMenu).toHaveClass(/open/);

      // Close menu by clicking elsewhere
      await page.locator('body').click({ position: { x: 0, y: 0 } });
      await expect(exploreMenu).not.toHaveClass(/open/);
    }

    // 3. Navigate to a portfolio detail (to check transitions / modal equivalents)
    // Wait for the animation before clicking
    await portfolioCards.nth(0).click();

    // Check if URL changed
    await expect(page).toHaveURL(/.*\/case-studies\/game-lab\//);
  });
});
