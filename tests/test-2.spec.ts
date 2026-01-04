import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://97044913-17-0-all.runbot106.odoo.com/web/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('option', { name: 'Purchase' }).click();
  await page.getByRole('searchbox', { name: 'Search...' }).click();
  await page.getByRole('searchbox', { name: 'Search...' }).fill('asd');
  await page.getByRole('searchbox', { name: 'Search...' }).press('Enter');
});