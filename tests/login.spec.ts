import { test, expect } from '@playwright/test';

test('has hero name heading', async ({ page }) => {
  await page.goto('/');

  const nameHeading = page.locator('h1.hero-name').first();
  await expect(nameHeading).toBeVisible();
  await expect(nameHeading).toContainText('Abd-ur-Raffae Masood');
});



