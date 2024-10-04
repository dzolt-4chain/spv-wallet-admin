import { expect, test } from '@playwright/test';

test.describe('login page', () => {
  test('login form', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('form#login-form');

    await expect(page).toHaveScreenshot();
  });

  test('login with credentials', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('form#login-form');

    await page
      .locator('input[type="password"]')
      .fill(
        'xprv9s21ZrQH143K3CbJXirfrtpLvhT3Vgusdo8coBritQ3rcS7Jy7sxWhatuxG5h2y1Cqj8FKmPp69536gmjYRpfga2MJdsGyBsnB12E19CESK',
      );

    await page.getByText('Sign in').click();

    await expect(page).toHaveScreenshot();
  });
});
