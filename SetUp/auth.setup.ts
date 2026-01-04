import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Go to login page
  await page.goto('https://97044913-17-0-all.runbot106.odoo.com/web/login');

  // Perform login
  await page.fill('#username', 'admin');
  await page.fill('#password', 'admin');
  await page.click('button[type="submit"]');

  // Save storage state
  await page.context().storageState({ path: 'storageState.json' });

}

export default globalSetup;