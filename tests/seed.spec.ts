import { test, expect } from '@playwright/test';

test.describe('Agent Environment Seed', () => {
  test('seed initial environment state', async ({ page }) => {
    // Navigate to portfolio site base URL
    await page.goto('/');
    // Ensure body and root element are loaded
    await expect(page.locator('#root')).toBeVisible();
  });
});

