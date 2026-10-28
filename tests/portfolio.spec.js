const { test, expect } = require('@playwright/test');

test.describe('Portfolio Studio', () => {
  test('should load index page and verify portfolio grid renders', async ({ page }) => {
    await page.goto('/');
    const portfolioSection = page.locator('#portfolio');
    await expect(portfolioSection).toBeVisible();

    const portfolioGrid = page.locator('.portfolio-grid');
    await expect(portfolioGrid).toBeVisible();

    const cards = portfolioGrid.locator('.portfolio-card');
    await expect(cards).toHaveCount(3);
  });

  test('should lazy load images in portfolio', async ({ page }) => {
    await page.goto('/');

    const portfolioImage = page.locator('.portfolio-card-img img').first();
    await expect(portfolioImage).toBeVisible();
    await expect(portfolioImage).toHaveAttribute('loading', 'lazy');
  });

  test('contact section should be present with correct links', async ({ page }) => {
    await page.goto('/');

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    const mailLink = contactSection.locator('a[href^="mailto:"]');
    await expect(mailLink).toBeVisible();
    await expect(mailLink).toHaveAttribute('href', 'mailto:lo246179268@gmail.com?subject=Hao0321%20Studio%20合作提案');
  });

  test('hao0321-studio contact section should have email and social links', async ({ page }) => {
    await page.goto('/hao0321-studio.html');

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    const emailLink = contactSection.locator('.contact-email');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:hello@hao0321.studio');

    const socialLinks = contactSection.locator('.contact-socials a');
    await expect(socialLinks).toHaveCount(4); // YouTube, Discord, Instagram, StreetVoice
  });

  test('about page contact section should have email and social links', async ({ page }) => {
    await page.goto('/about.html');

    const contactSection = page.locator('.contact-box');
    await expect(contactSection).toBeVisible();

    const emailLink = contactSection.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:lo246179268@gmail.com');
  });
});
