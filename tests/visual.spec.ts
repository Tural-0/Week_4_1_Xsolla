import { test, expect } from '@playwright/test';

test('the whole checkout page looks right', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('[data-testid="order-summary"]')).toBeVisible();

  // TODO (1): give this screenshot a filename, ending in .png
  await expect(page).toHaveScreenshot('screens/checkout.png', {
    fullPage: true,
    mask: [page.locator('[data-testid="order-id"]')],
  });
});

test('the order summary looks right', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  // TODO (2): find the order summary. Open public/index.html and look for
  //           the data-testid attribute on the summary panel.
  const summary = page.locator('[data-testid="order-summary"]');

  await expect(summary).toHaveScreenshot('order-summary.png', {
    mask: [page.locator('[data-testid="order-id"]')],
  });
});

test('the promo error appears when applying a promo code', async ({ page }) => {

  await page.goto('/');

  const promoInput = page.locator('[data-testid="promo-input"]');
  const promoSubmit = page.locator('[data-testid="promo-submit"]');
  const promoError = page.locator('[data-testid="promo-error"]');
  const paymentForm = page.locator('[data-testid="payment-form"]');

  await promoInput.fill('TESTCODE');
  await promoSubmit.click();
  await expect(promoError).toBeVisible();

  await expect(paymentForm).toHaveScreenshot('promo-error.png');

});