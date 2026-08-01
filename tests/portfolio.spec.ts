import { test, expect } from '@playwright/test';

test.describe('QA Portfolio Web App E2E Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Scenario 1: Page Title and Hero Section Heading', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Abdur Raffae Masood/);

    // Hero name heading check
    const heroName = page.locator('h1.hero-name, h1').first();
    await expect(heroName).toBeVisible();
    await expect(heroName).toContainText('Abd-ur-Raffae Masood');
  });

  test('Scenario 2: Header Navigation Bar Presence', async ({ page }) => {
    // Verify header element exists
    const header = page.locator('header, nav').first();
    await expect(header).toBeVisible();
  });

  test('Scenario 3: Interactive Call To Action Buttons', async ({ page }) => {
    // Check if main CTA button or contact link exists
    const ctaButtons = page.locator('a, button').filter({ hasText: /projects|contact|resume|hire/i });
    const count = await ctaButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Scenario 4: Responsive Mobile Viewport Layout', async ({ page }) => {
    // Set viewport size to mobile screen
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify main content container renders on mobile width
    const root = page.locator('#root');
    await expect(root).toBeVisible();

    // Verify page hero name remains visible on mobile
    const heroName = page.locator('h1').first();
    await expect(heroName).toBeVisible();
  });

});
